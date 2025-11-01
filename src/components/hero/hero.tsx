'use client';
import Image from 'next/image';
import HeroText from './hero-text';
function Hero() {
  return (
    <div className="overflow-x-hidden">
      <div className="w-[100%] h-[470px] lg:h-[97vh] relative overflow-hidden">
        <img
          src="/assets/hero.gif"
          alt="heroimage"
          className="hidden lg:block w-screen h-screen -mt-[14px]"
        />

        <img
          src="/assets/hero/boxes.svg"
          alt="heroimage"
          className="w-[100%] block lg:hidden  absolute bottom-0 left-0 z-[-1] w-full h-screen object-cover"
          // style={{
          //   objectFit: 'fill',
          // }}
        />
        <img
          src="/assets/hero/buildings.svg"
          alt="heroimage"
          className="w-[100%] block lg:hidden  absolute bottom-0 z-[-1]"
          // style={{
          //   objectFit: 'scale-down',
          // }}
        />
        <div className="w-[100%] w-full h-[100vh] top-[6%] lg:top-[1%] lg:px-[5%] absolute lg:absolute z-10 py-[6%] px-[16px] lg:px-[0%]">
          <HeroText />
        </div>
      </div>
    </div>
  );
}

export default Hero;
