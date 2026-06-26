'use client';

import { useRouter } from 'next/navigation';

function HeroText() {
  const router = useRouter();
  return (
    <div className="w-[100%] flex justify-center items-center ">
      <div className="w-[627px] text-center">
        <h1 className="font-[Forum] text-[40px] lg:text-[70px] leading-[40px] lg:leading-[70px] text-[#11111C]">
          Smarter Tools for Smarter Real Estate
        </h1>
        <p className="font-[DM-Sans-light] text-[16px] lg:text-[20px] leading-[25px] text-[#585860] mt-[10px]">
          Manage listings, leads, and clients effortlessly — powered by intelligent automation that
          helps you sell
        </p>

        <a href="#contact_us">
          <button
            className=" h-[50px] bg-[#000000] rounded-[5px] text-[#FFFFFF] font-[DM-Sans-light] mt-[34px] py-[13px] px-[42px] cursor-pointer"
            // onClick={() => {
            //   router?.push('/whitelist');
            // }}
          >
            Book a Free Demo Now
          </button>
        </a>
      </div>
    </div>
  );
}

export default HeroText;
