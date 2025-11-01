'use client';
import Image from 'next/image';
import Card from './card';
import ProcessHeader from './process-header';
import HeaderText from '../common/headerText';

function ProcessSection() {
  return (
    <div
      id="resources"
      className="w-[100%] min-h-[100vh] flex flex-col justify-center items-center px-[16px] lg:px-[100px] 2xl:px-[25%] pt-[80px] lg:pt-[120px] overflow-x-hidden"
    >
      {/* <ProcessHeader
        tagText="Process"
        title="3 Steps to More Conversions"
        description="From adding properties to AI-driven nudges, Zameen streamlines every step so you close faster, every time."
      /> */}

      <HeaderText
        PrimaryText="3 Steps to More Conversions"
        secondaryText="From adding properties to AI-driven nudges, Zameen streamlines every step so you close faster, every time."
        primaryStyle={{
          width: '627px',
          textAlignment: 'left',
          isSecondaryBottomText: true,
          mobile: {
            width: '324px',
          },
        }}
      />

      <div className="mt-[100px] lg:mt-[80px] flex flex-col lg:flex-row  justify-between items-center w-[100%] gap-[20px]">
        <Card
          imgSrc="/assets/cards/add_your_properties.png"
          title="Add Your Properties"
          description="Easily upload your listings, leads, and team members in minutes—no complicated setup, just a smooth start."
        />
        <Card
          imgSrc="/assets/cards/let_ai_organize_&_nudge.png"
          title="Let AI Organize & Nudge"
          description="Our AI tracks every lead's journey, scores interest level, and nudges your team at just the right time."
        />
        <Card
          imgSrc="/assets/cards/focus_on_closing_deals.png"
          title="Focus on Closing Deals"
          description="Get notified when it's time to act. Zameen keeps the follow-ups flowing so you can focus on conversions."
        />
      </div>

      <div className="w-[100%] min-h-[220px] bg-[#11111C] flex flex-col lg:flex-row justify-between items-center px-[10%] lg:px-[100px] py-[67px] rounded-[10px] relative overflow-hidden my-[80px] lg:my-[120px]">
        <p className="max-w-[424px] text-center font-[Forum] text-[35px] lg:text-[50px] leading-[40px] lg:leading-[50px] text-[#FFFFFF] z-[2]">
          Stay Ahead with Smart Features
        </p>

        <a className="z-10" href="#contact_us">
          <button className="w-[100%] lg:w-[137px] h-[50px] mt-[30px] lg:mt-[0px] bg-[#FFFFFF] px-[20px] py-[13.5px] rounded-[5px] text-[#11111C] font-[DM Sans] text-[16px] z-[2] cursor-pointer">
            Book a Demo
          </button>
        </a>

        <Image
          className="absolute left-0 bottom-[0px] z-[1]"
          src="/assets/side-boxes.svg"
          alt="testimonials"
          width={288}
          height={235}
        />

        <Image
          className="absolute right-0 bottom-[0px] z-[1] transform-[rotateY(180deg)]"
          src="/assets/side-boxes.svg"
          alt="testimonials"
          width={288}
          height={235}
        />
      </div>

      {typeof window !== 'undefined' && (
        <div className=" flex flex-col lg:flex-row  justify-between items-center w-[100%] gap-[30px]">
          <Card
            width={innerWidth < 440 ? 388 : 605}
            height={635}
            imgHeight={485}
            isWide={innerWidth > 440 ? true : false}
            imgSrc="/assets/cards/call.gif"
            title="AI Voice Assistant"
            description="Never miss a client call again. Zameen’s AI assistant answers, records details, and updates your CRM — available 24/7 in multiple languages."
          />
          <Card
            width={innerWidth < 440 ? 388 : 605}
            height={635}
            imgHeight={485}
            isWide={innerWidth > 440 ? true : false}
            imgSrc="/assets/whatsapp.svg"
            title="AI-Powered WhatsApp Follow-ups"
            description="Keep conversations alive with automated, personalised WhatsApp replies and reminders. to ensures no lead goes cold with smart engagement."
          />
        </div>
      )}
    </div>
  );
}

export default ProcessSection;
