'use client';
import { useDeviceType } from '@/hooks/useDeviceType';
import Image from 'next/image';

function Card({
  imgSrc,
  title,
  description,
  width = null,
  height = null,
  isWide = false,
  imgHeight,
}: {
  imgSrc: string;
  title: string;
  description: string;
  width?: number | null;
  height?: number | null;
  isWide?: boolean;
  imgHeight?: number;
}) {
  const { isMobile } = useDeviceType();
  return (
    <div
      className=" max-w-[400px] flex flex-col justify-start items-start  border border-[#E4E4E7] rounded-[10px] rounded-[10px] overflow-hidden "
      style={{
        width: '100%',
        maxWidth: isWide ? width || '605px' : '400px',
        height: isMobile ? 'auto' : height || '457px',
        maxHeight: isWide ? height || '457px' : '457px',
      }}
    >
      <Image
        src={imgSrc || '/assets/feature/featuers-page.svg'}
        alt="process1"
        width={width || 400}
        height={imgHeight || 306}
      />
      <div className={isWide ? 'p-[16px] lg:p-[35px]' : `p-[16px] lg:p-[25px]`}>
        <h3 className="font-[DM-Sans-Medium] text-[18px] lg:text-[24px] leading-[28px] text-[#11111C]">
          {title || 'Listing & Inventory'}
        </h3>
        <p className="font-[DM-Sans-light] text-[16px] lg:text-[16px] leading-[21px] text-[#585860] mt-[10px]">
          {description ||
            ' Easily manage property details, availability, and pricing from one dashboard. Keep your listings accurate and up-to-date across portals, websites, and teams.'}
        </p>
      </div>
    </div>
  );
}

export default Card;
