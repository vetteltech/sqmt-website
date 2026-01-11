"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
function Header() {
  const router = useRouter();
  return (
    <div className="w-[100%] h-[60px] lg:h-[70px] flex justify-between items-center py-[21px] px-[16px] lg:px-[55px] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] bg-[#FFFFFF] z-50">
      <div className="flex justify-center items-center gap-[8.32px]">
        <Image
          src="/assets/header_logo_with_name.svg"
          alt="logo"
          width={174}
          height={30.24}
        />
        {/* <p className="text-[#11111C] font-[Afacad] font-[400] text-[26px]">SquareMeter</p> */}
      </div>

      <div className="hidden md:flex">
        <ol className="flex justify-center items-center gap-[35px] text-[#11111C] font-[DM Sans] text-[16px] font-[300] leading-[25px] cursor-pointer">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact_us">Contact Us</a>
          </li>
          <li>
            <a href="#plans">Pricing</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#resources">Resources</a>
          </li>
        </ol>
      </div>

      <div className="">
        <button
          className="w-[105px] h-[43px] rounded-[5px] bg-[#1241FF] text-[#FFFFFF] cursor-pointer"
          onClick={() => {
            router.push("/whitelist");
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default Header;
