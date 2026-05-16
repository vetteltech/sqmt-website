'use client';

import { type ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { type AgentState } from '@livekit/components-react';
import { AgentAudioVisualizerAura } from '@/components/agents-ui/agent-audio-visualizer-aura';
import { cn } from '@/lib/utils';
import type { RashiLanguage } from '@/lib/rashi-openai-realtime';

const ACCENT = '#00ffe1' as const;

const AURA_THEME: 'dark' = 'dark';

const pillClassName = cn(
  'inline-flex h-12 items-center gap-3 rounded-full border border-neutral-600/80',
  'bg-neutral-800 pl-5 pr-1.5 shadow-md shadow-black/35',
);

const pillInteractiveClassName = cn(
  'transition-[background-color,box-shadow] hover:bg-neutral-700 hover:shadow-lg',
);

const langPillBase = cn(
  'min-w-[36px] rounded-[2px] bg-white px-2.5 py-1 font-[DM-Sans-Medium] text-[12px] leading-tight uppercase tracking-[0.08em] text-[#11111C]',
  'transition-[border-color,opacity] disabled:cursor-not-allowed disabled:opacity-45',
);

type PhaseUi = 'idle' | 'connecting' | 'live';

function AuraInButton({
  state,
  themeMode,
  audioTrack,
}: {
  state: AgentState;
  themeMode: 'dark' | 'light';
  audioTrack?: ComponentProps<typeof AgentAudioVisualizerAura>['audioTrack'];
}) {
  return (
    <AgentAudioVisualizerAura
      size="xl"
      color={ACCENT}
      colorShift={0.71}
      state={state}
      themeMode={themeMode}
      audioTrack={audioTrack}
      className="pointer-events-none aspect-square size-auto w-full scale-[1.2]"
    />
  );
}

function phaseToAgentState(phase: PhaseUi): AgentState {
  switch (phase) {
    case 'connecting':
      return 'thinking';
    case 'live':
      return 'listening';
    default:
      return 'disconnected';
  }
}

type TalkToRashiDemoProps = {
  placement?: 'floating' | 'inline';
};

/** Find Realtime API function_call payloads (recursive; shapes vary by event version). */
function findFunctionCall(
  payload: unknown,
  functionName: string,
): { call_id: string } | null {
  if (payload === null || typeof payload !== 'object') return null;
  if (Array.isArray(payload)) {
    for (const item of payload) {
      const found = findFunctionCall(item, functionName);
      if (found) return found;
    }
    return null;
  }
  const o = payload as Record<string, unknown>;
  if (
    (o.type === 'function_call' || o.type === 'function') &&
    o.name === functionName &&
    typeof o.call_id === 'string'
  ) {
    return { call_id: o.call_id };
  }
  if (typeof o.name === 'string' && o.name === functionName && typeof o.call_id === 'string') {
    return { call_id: o.call_id };
  }
  for (const value of Object.values(o)) {
    const found = findFunctionCall(value, functionName);
    if (found) return found;
  }
  return null;
}

export default function TalkToRashiDemo({ placement = 'floating' }: TalkToRashiDemoProps) {
  const [lang, setLang] = useState<RashiLanguage>('hi');
  const [phase, setPhase] = useState<PhaseUi>('idle');
  const [error, setError] = useState<string | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);

  const stopSession = useCallback(() => {
    dcRef.current?.close();
    dcRef.current = null;

    pcRef.current?.getSenders().forEach((s) => {
      try {
        s.track?.stop();
      } catch {
        /* ignore */
      }
    });
    pcRef.current?.close();
    pcRef.current = null;

    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;

    if (audioElRef.current) {
      audioElRef.current.srcObject = null;
      audioElRef.current.pause();
      audioElRef.current = null;
    }

    setPhase('idle');
  }, []);

  const startSession = useCallback(async () => {
    if (phase !== 'idle') return;
    setError(null);
    setPhase('connecting');

    try {
      const sessRes = await fetch('/api/openai/rashi-realtime-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: lang }),
      });
      const sessJson = (await sessRes.json()) as {
        ok?: boolean;
        error?: string;
        hint?: string;
        clientSecret?: string;
        model?: string;
      };
      if (!sessRes.ok || !sessJson.ok || !sessJson.clientSecret) {
        const combined = [sessJson.error, sessJson.hint].filter(Boolean).join(' — ');
        throw new Error(combined || `Session failed (${sessRes.status})`);
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      streamRef.current = stream;

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      const audioEl = new Audio();
      audioEl.autoplay = true;
      audioElRef.current = audioEl;
      pc.ontrack = (event) => {
        const [remoteStream] = event.streams;
        if (remoteStream) audioEl.srcObject = remoteStream;
      };

      for (const track of stream.getTracks()) {
        pc.addTrack(track, stream);
      }

      const dc = pc.createDataChannel('oai-events');
      dcRef.current = dc;
      dc.onmessage = (event) => {
        let parsed: unknown;
        try {
          parsed = JSON.parse(event.data as string);
        } catch {
          return;
        }

        let hit = findFunctionCall(parsed, 'end_session');
        if (!hit && typeof event.data === 'string') {
          const m = event.data.match(/"call_id"\s*:\s*"([^"]+)"/);
          if (event.data.includes('end_session') && m?.[1]) {
            hit = { call_id: m[1] };
          }
        }
        if (!hit) return;

        try {
          if (dc.readyState === 'open') {
            dc.send(
              JSON.stringify({
                type: 'conversation.item.create',
                item: {
                  type: 'function_call_output',
                  call_id: hit.call_id,
                  output: JSON.stringify({ ok: true }),
                },
              }),
            );
          }
        } catch {
          /* channel may race with teardown */
        }
        window.queueMicrotask(() => {
          stopSession();
        });
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpRes = await fetch('https://api.openai.com/v1/realtime/calls', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessJson.clientSecret}`,
          'Content-Type': 'application/sdp',
        },
        body: offer.sdp || '',
      });

      const answerSdp = await sdpRes.text();
      if (!sdpRes.ok) {
        throw new Error(answerSdp || `Realtime connection failed (${sdpRes.status})`);
      }
      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });

      setPhase('live');
    } catch (e) {
      console.error(e);
      stopSession();
      setError(e instanceof Error ? e.message : 'Could not start voice session');
    }
  }, [lang, phase, stopSession]);

  const handleMainClick = useCallback(async () => {
    if (phase === 'connecting') return;
    if (phase === 'live') {
      stopSession();
      return;
    }
    await startSession();
  }, [phase, startSession, stopSession]);

  useEffect(() => () => stopSession(), [stopSession]);

  const busy = phase === 'connecting';
  const sessionLocked = phase === 'connecting' || phase === 'live';

  return (
    <div
      className={cn(
        'pointer-events-auto flex flex-col items-center gap-3',
        placement === 'floating'
          ? 'fixed bottom-6 left-1/2 z-[100] -translate-x-1/2'
          : 'relative z-10 mt-0',
      )}
    >
      <div className="flex justify-center gap-2" role="group" aria-label="Conversation language">
        <button
          type="button"
          disabled={sessionLocked}
          aria-pressed={lang === 'hi'}
          aria-label="Hindi"
          onClick={() => setLang('hi')}
          className={cn(
            langPillBase,
            lang === 'hi'
              ? 'border-2 border-[#2563EB]'
              : 'border-2 border-[#E4E4E7] hover:border-[#C4C9D4]',
          )}
        >
          HI
        </button>
        <button
          type="button"
          disabled={sessionLocked}
          aria-pressed={lang === 'en'}
          aria-label="English"
          onClick={() => setLang('en')}
          className={cn(
            langPillBase,
            lang === 'en'
              ? 'border-2 border-[#2563EB]'
              : 'border-2 border-[#E4E4E7] hover:border-[#C4C9D4]',
          )}
        >
          EN
        </button>
      </div>

      <button
        type="button"
        onClick={handleMainClick}
        disabled={busy}
        title={
          phase === 'live'
            ? 'End conversation'
            : phase === 'connecting'
              ? 'Connecting…'
              : lang === 'en'
                ? 'Start talking with Rashi in English'
                : 'राशि से हिंदी में बात करें — शुरू करें'
        }
        className={cn(
          pillClassName,
          pillInteractiveClassName,
          'cursor-pointer select-none',
          'hover:shadow-black/40 disabled:cursor-wait disabled:opacity-80',
        )}
      >
        <span className="pointer-events-none shrink-0 font-[DM-Sans-Medium] text-[16px] leading-[21px] text-neutral-100">
          {phase === 'live'
            ? 'End conversation'
            : phase === 'connecting'
              ? 'Connecting…'
              : 'Talk to Rashi'}
        </span>
        <div className="pointer-events-none relative size-9 shrink-0 overflow-hidden rounded-full bg-neutral-900/90 ring-1 ring-white/10">
          <AuraInButton state={phaseToAgentState(phase)} themeMode={AURA_THEME} />
        </div>
      </button>

      {phase === 'live' ? (
        <p
          className={cn(
            'max-w-sm text-center font-[DM-Sans-light] text-xs opacity-85',
            placement === 'floating' ? 'text-neutral-200' : 'text-[#585860]',
          )}
        >
          {lang === 'en'
            ? 'Speak naturally — Rashi listens in English (OpenAI Realtime).'
            : 'बोलिए — राशि सुन रही है। पॉज़ के बाद जवाब मिलेगा।'}
        </p>
      ) : null}

      {error ? (
        <p
          className={cn(
            'max-w-sm px-0.5 text-center font-[DM-Sans-light] text-xs',
            placement === 'floating' ? 'text-red-300' : 'text-red-600',
          )}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
