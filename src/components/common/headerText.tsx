'use client';
import { useDeviceType } from '@/hooks/useDeviceType';

interface PrimaryStyle {
  width?: string;
  height?: string;
  primaryTextWidth?: string;
  primaryTextMobileWidth?: string;
  textAlignment?: 'left' | 'center' | 'right';
  isSecondaryBottomText?: boolean;
  mobile?: {
    width?: string;
    height?: string;
  };
}
function HeaderText({
  PrimaryText,
  secondaryText,
  primaryStyle,
}: {
  PrimaryText: string;
  secondaryText: string;
  primaryStyle?: PrimaryStyle;
}) {
  const { isMobile } = useDeviceType();
  return (
    <div
      className="w-[100%] flex justify-center items-center "
      style={{
        display: primaryStyle?.textAlignment === 'center' ? 'flex' : 'block',
      }}
    >
      {!primaryStyle?.isSecondaryBottomText ? (
        <div
          className="text-center"
          style={{
            width: primaryStyle?.width
              ? isMobile
                ? primaryStyle?.mobile?.width
                : primaryStyle?.width
              : 'auto',
            height: primaryStyle?.height
              ? isMobile
                ? primaryStyle?.mobile?.height
                : primaryStyle?.height
              : 'auto',
          }}
        >
          <>
            <h1
              className="font-[Forum] text-[35px] lg:text-[50px] leading-[40px] lg:leading-[50px] text-[#11111C]"
              style={{
                textAlign: primaryStyle?.textAlignment ? primaryStyle?.textAlignment : 'center',
                width: isMobile
                  ? primaryStyle?.primaryTextMobileWidth
                  : primaryStyle?.primaryTextWidth
                  ? primaryStyle?.primaryTextWidth
                  : '100%',
              }}
            >
              {PrimaryText}
            </h1>
            <div className="h-[100%] flex lg:items-end">
              <p
                className="w-[100%] font-[DM-Sans-light] text-[16px] leading-[21px] lg:leading-[25px] text-[#585860] mt-[5px]"
                style={{
                  textAlign: primaryStyle?.textAlignment ? primaryStyle?.textAlignment : 'center',
                }}
              >
                {secondaryText}
              </p>
            </div>
          </>
        </div>
      ) : (
        <div className="w-[100%] h-[100px] lg:flex justify-between items-center mt-[10px]">
          <div>
            <h2
              className="font-[Forum] text-[40px] lg:text-[50px] leading-[40px] lg:leading-[50px] text-[#11111C]"
              style={{
                textAlign: primaryStyle?.textAlignment ? primaryStyle?.textAlignment : 'center',
              }}
            >
              {PrimaryText}
            </h2>
          </div>
          <div className=" h-[100%] flex lg:items-end">
            <p className="max-w-[397px] font-[DM-Sans-light] lg:text-right text-[16px] lg:text-[16px] leading-[25px] lg:leading-[25px] text-[#585860] mt-[10px]">
              {secondaryText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderText;
