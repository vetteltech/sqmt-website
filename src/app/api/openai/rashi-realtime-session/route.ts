import { NextResponse } from 'next/server';
import {
  buildRashiRealtimeInstructions,
  RASHI_END_SESSION_TOOL,
  RASHI_PLAYGROUND_PROMPT_VERSION,
  RASHI_REALTIME_MODEL,
  RASHI_REALTIME_VOICE,
  RASHI_VAD_PREFIX_PADDING_MS,
  RASHI_VAD_SILENCE_DURATION_MS,
  RASHI_VAD_THRESHOLD,
  rashiPromptVariables,
  rashiTranscriptionLanguage,
  type RashiLanguage,
} from '@/lib/rashi-openai-realtime';

export const runtime = 'nodejs';

function resolveRealtimeModel(): string {
  const m = process.env.OPENAI_RASHI_REALTIME_MODEL?.trim();
  return m && m.length > 0 ? m : RASHI_REALTIME_MODEL;
}

/** Stored Playground pmpt_* — only when OPENAI_RASHI_PROMPT_ID is set (omit for inline system prompt). */
function resolvePromptId(): string | null {
  const raw = process.env.OPENAI_RASHI_PROMPT_ID?.trim();
  if (!raw || raw === 'false' || raw === '0') return null;
  return raw;
}

function resolvePromptVersion(): string {
  const v = process.env.OPENAI_RASHI_PROMPT_VERSION?.trim();
  return v && v.length > 0 ? v : RASHI_PLAYGROUND_PROMPT_VERSION;
}

function resolveVoice(): string {
  const v = process.env.OPENAI_RASHI_VOICE?.trim();
  return v && v.length > 0 ? v : RASHI_REALTIME_VOICE;
}

function extractClientSecret(json: Record<string, unknown>): string | undefined {
  if (typeof json.value === 'string' && json.value.length > 0) return json.value;
  const cs = json.client_secret as { value?: string } | undefined;
  if (typeof cs?.value === 'string' && cs.value.length > 0) return cs.value;
  const sess = json.session as { client_secret?: { value?: string } } | undefined;
  const nested = sess?.client_secret?.value;
  if (typeof nested === 'string' && nested.length > 0) return nested;
  return undefined;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Missing OPENAI_API_KEY',
        hint: 'Add OPENAI_API_KEY to sqmt-website .env.local',
      },
      { status: 503 },
    );
  }

  let body: { language?: string };
  try {
    body = (await req.json()) as { language?: string };
  } catch {
    body = {};
  }

  const rawLang = body.language === 'en' ? 'en' : 'hi';
  const language = rawLang as RashiLanguage;
  const transcriptionLanguage = rashiTranscriptionLanguage(language);
  const promptIdExplicit = resolvePromptId();
  const useVars =
    process.env.OPENAI_RASHI_PROMPT_VARIABLES === '1' || process.env.OPENAI_RASHI_PROMPT_VARIABLES === 'true';
  const model = resolveRealtimeModel();
  const voice = resolveVoice();

  const tools = [
    JSON.parse(JSON.stringify(RASHI_END_SESSION_TOOL)) as Record<string, unknown>,
  ];

  const session: Record<string, unknown> = {
    type: 'realtime',
    model,
    output_modalities: ['audio'],
    tool_choice: 'auto',
    tools,
    audio: {
      input: {
        transcription: {
          model: 'gpt-4o-mini-transcribe',
          language: transcriptionLanguage,
        },
        turn_detection: {
          type: 'server_vad',
          threshold: RASHI_VAD_THRESHOLD,
          silence_duration_ms: RASHI_VAD_SILENCE_DURATION_MS,
          prefix_padding_ms: RASHI_VAD_PREFIX_PADDING_MS,
        },
      },
      output: {
        voice,
      },
    },
  };

  if (promptIdExplicit) {
    const promptBody: Record<string, unknown> = {
      id: promptIdExplicit,
      version: resolvePromptVersion(),
    };
    if (useVars) {
      promptBody.variables = rashiPromptVariables(language);
    }
    session.prompt = promptBody;
  } else {
    session.instructions = buildRashiRealtimeInstructions(language);
  }

  const response = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ session }),
  });

  const json = (await response.json()) as Record<string, unknown> & {
    error?: { message?: string };
  };

  if (!response.ok) {
    const eo = json.error as { message?: string } | undefined;
    return NextResponse.json(
      {
        ok: false,
        error: eo?.message || 'Failed to create OpenAI realtime client secret',
        detail: json,
      },
      { status: response.status >= 400 ? response.status : 502 },
    );
  }

  const clientSecret = extractClientSecret(json);
  if (!clientSecret) {
    return NextResponse.json(
      { ok: false, error: 'OpenAI response missing ephemeral client secret', detail: json },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    clientSecret,
    model,
    voice,
    language,
    promptId: promptIdExplicit,
    promptVersion: promptIdExplicit ? resolvePromptVersion() : null,
  });
}
