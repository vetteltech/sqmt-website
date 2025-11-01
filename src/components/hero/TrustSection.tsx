'use client';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
function TrustSection() {
  return (
    <div className="w-[100%] h-[65px] lg:h-[95px] flex justify-center items-center bg-[#EDF0FF]">
      <div className="w-[50%] lg:w-[16%] h-[100%] flex justify-center items-center">
        <p className="font-[DM-Sans-Medium] text-[12px] lg:text-[16px] leading-[32px] text-[#11111C]">
          Trusted By
        </p>
      </div>

      <Marquee className="w-[90%] h-[100%]" gradient={false} speed={40}>
        {[
          'Solo Agents',
          'Small & Mid-size Brokerages',
          'Builders & Developers',
          'Real Estate Marketing Teams',
          'Channel Partners',
        ].map((logo, index) => (
          <div className="flex justify-center items-center gap-[11px] pr-[60px]" key={index}>
            <Image
              width={30}
              height={30}
              src={`/assets/tick.svg`}
              alt="logo"
              className="hidden lg:block"
            />
            <Image
              width={20}
              height={20}
              src={`/assets/tick.svg`}
              alt="logo"
              className=" lg:hidden"
            />
            <p className="font-[DM-Sans-light] text-[12px] lg:text-[16px] leading-[145%] text-[#535460]">
              {logo}
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default TrustSection;
