import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <div className="w-[100%] p-[20px] lg:p-[70px] bg-[#F4F6FF]">
      <div className="w-[100%] flex flex-col lg:flex-row justify-between items-start">
        <div className="lg:w-[20%] flex justify-center items-center gap-[10px]">
          <Image src="/assets/header_logo_with_name.svg" alt="logo" width={174} height={30.24} />
          {/* <h3 className="font-[DM-Sans-light] font-[600] text-[32px] leading-[33px] text-[#11111C]">
            Zameen
          </h3> */}
        </div>

        <div className="w-[100%] mt-[20px] lg:mt-[0px] lg:w-[64%] grid grid-cols-2 lg:grid-cols-4 gap-[20px] justify-around items-start">
          <div>
            <p className="font-[DM-Sans-light] text-[16px] leading-[26px] text-[#585860]">
              Other Links
            </p>
            <ol className="font-[DM-Sans-light] text-[16px] leading-[26px] text-[#000000] mt-[10px]">
              <Link href="/">
                <li>Home</li>
              </Link>
              <a href="#features">
                <li>Features</li>
              </a>
              <a href="#plans">
                <li>Pricing</li>
              </a>
              <a href="#about">
                <li>About Us</li>
              </a>
              <a href="#contact_us">
                <li>Contact</li>
              </a>
            </ol>
          </div>
          <div>
            <p className="font-[DM-Sans-light] font-[400] text-[16px] leading-[26px] text-[#585860]">
              Support
            </p>
            <ol className="font-[DM-Sans-light] text-[16px] leading-[26px] text-[#000000] mt-[10px]">
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ol>
          </div>
          <div>
            <p className="font-[DM-Sans-light]  text-[16px] leading-[26px] text-[#585860]">
              Contact
            </p>
            <ol className="font-[DM-Sans-light] text-[16px] leading-[26px] text-[#11111C] mt-[10px]">
              <li>info@sqmt.com</li>
              <li>+91 12345 67890</li>
            </ol>
          </div>
          <div>
            <p className="font-[DM-Sans-light]  text-[16px] leading-[26px] text-[#585860]">
              Address
            </p>
            <ol className="font-[DM-Sans-light] text-[16px] leading-[26px] text-[#11111C] mt-[10px]">
              <li>SQMT Pvt. Ltd., Andheri East, Mumbai – 400059, India</li>
              <li></li>
            </ol>
          </div>
        </div>
      </div>

      {/* social icons */}
      <div className="w-[100%]">
        <div className="w-[100%] flex justify-center  lg:justify-end  mt-[45px]">
          <div className="flex justify-center items-center gap-[30px]">
            {[
              {
                icon: '/assets/social/instagram.svg',
                url: '',
              },
              {
                icon: '/assets/social/facebook.svg',
                url: '',
              },
              {
                icon: '/assets/social/linkedin.svg',
                url: '',
              },
            ]?.map((item, index) => (
              <div key={index} className="relative group inline-block cursor-pointer">
                <Image src={item?.icon} alt="social" width={24} height={24} />

                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-sm text-[#000000] bg-[#E7EBFF] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-[DM-Sans-light] ">
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[25px] border-t border-[#E4E4E7] pt-[25px] flex flex-col lg:flex-row justify-between items-center">
          <p className="font-[DM-Sans-light] font-[300] text-[16px] leading-[26px] text-[#11111C] opacity-50 text-center">
            © 2024 Zameen. All rights reserved.
          </p>
          <p className="font-[DM-Sans-light] font-[300] text-[16px] leading-[26px] text-[#11111C] opacity-50 text-center">
            Privacy Policy | Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
