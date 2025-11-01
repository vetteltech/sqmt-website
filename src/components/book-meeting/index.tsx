'use client';
import Image from 'next/image';
import BookingForm from './Form';

const BookMeetingSection = () => {
  return (
    <div
      id="contact_us"
      className="mx-[16px] lg:mx-[30px] lg:h-[707px] bg-[#11111C] py-[40px] lg:py-[0px] 2xl:mx-[25%]  my-[20px] lg:my-[20px] rounded-[10px] flex flex-col lg:flex-row justify-center items-center overflow-hidden"
    >
      <div className="lg:w-[50%] h-[100%] flex flex-col justify-center items-center">
        <div className="w-[100%] px-[16px] lg:px-[0px] mb-[40px] lg:mb-[0px] lg:w-[80%]">
          <h2 className="max-w-[499px] font-[Forum] text-[#FFFFFF] text-[50px] leading-[54px]">
            Book a Meeting with Our Team
          </h2>
          <p className="font-[DM-Sans-light] text-[#585860] text-[16px]">
            Many have already started their redevelopment journey with us — schedule your
            consultation today.
          </p>

          <Image src="/assets/faces.svg" alt="ai" className="mt-[20px]" width={137} height={41} />
        </div>
      </div>

      <div className="w-[100%] h-[100%] lg:w-[50%] py-[30px] lg:py-[0px] px-[16px] lg:p-[70px] flex flex-col  justify-center items-center gap-[20px] bg-[#0C0C15]">
        <BookingForm />
      </div>
    </div>
  );
};

export default BookMeetingSection;
