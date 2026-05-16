'use client';

import Tags from '../features/tag';
import HeaderText from '../common/headerText';
import Image from 'next/image';
import TalkToRashiDemo from '@/components/talk-to-rashi/TalkToRashiDemo';

function AiSection() {
  return (
    <div
      id="about"
      className=" mx-[16px] 2xl:bg-[#F4F6FF] lg:mx-[30px] 2xl:mx-[25%] rounded-t-[10px] overflow-hidden"
    >
      <div className="w-[100%] min-h-[480px] lg:min-h-[590px] bg-[#F4F6FF] pt-[35px] lg:pt-[120px]">
        <div className="w-[100%] flex h-[100%] flex-col lg:flex-row">
          <div className="relative flex h-[100%] w-[100%] flex-col items-center px-[16px] lg:w-[50%] lg:px-[70px]">
            <div className="mb-[10px] flex w-full justify-center lg:mb-[14px]">
              <Tags bgColor="#EDF0FF" text="AI Voice Agent" />
            </div>

            <div className="relative z-[10] mt-[14px] flex w-full max-w-[520px] flex-col items-center gap-6">
              <HeaderText
                PrimaryText="Try Our AI Agent Now!"
                secondaryText="Meet Rashi and try a realtime voice demo."
                primaryStyle={{
                  width: '100%',
                  textAlignment: 'center',
                  primaryTextWidth: '100%',
                  primaryTextMobileWidth: '100%',
                  mobile: {
                    width: '100%',
                  },
                }}
              />
              <TalkToRashiDemo placement="inline" />
            </div>

            <img
              src="/assets/people.svg"
              alt="ai"
              style={{
                objectFit: 'fill',
              }}
              className="absolute top-21 left-0 hidden w-[100%] lg:block 2xl:h-[510px] lg:h-[600px] 2xl:w-[100%]"
            />

            <img
              src="/assets/dashboard-mobile.png"
              alt="ai"
              // style={{
              //   objectFit: 'fill',
              // }}
              className="lg:hidden w-[100%] h-[210px] absolute bottom-[-227px] left-0 px-[16px]"
            />
          </div>

          <div className="h-[100%] w-[100%] lg:w-[50%]">
            <img
              src="/assets/dashboard-image.svg"
              alt="ai"
              className="w-[100%] hidden lg:block mt-[-60px]"
            />
          </div>
        </div>
      </div>

      <div className="w-[100%] min-h-[406px] bg-[#11111C] rounded-b-[10px] px-[16px] py-[80px] lg:p-[70px] flex flex-col lg:flex-row justify-center items-start relative  rounded-b-[10px] overflow-hidden">
        <div className="w-[100%] lg:w-[30%]">
          <Image src="/assets/headerlogo.svg" width={40} height={40} alt="ai" />

          <h1 className="max-w-[201px] font-[Forum] text-[30px] text-[#FFFFFF] mt-[10px] leading-[30px]">
            Our Business Impact
          </h1>
        </div>

        <div className="w-[100%] lg:w-[70%] mt-[30px] lg:mt-[0px] z-[1]">
          <div className="w-[100%] flex flex-col lg:flex-row justify-between items-center">
            {[
              {
                percentage: '65%',
                text: 'Agents using SquareMeter close deals faster compared to traditional CRMs',
              },
              {
                percentage: '80%',
                text: 'Automated follow-ups reduce missed leads and manual workload',
              },
              {
                percentage: '72%',
                text: 'Brokerages see higher lead-to-sale conversions with AI scoring',
              },
            ].map((item, index) => {
              return (
                <div className="w-[100%] mt-[30px] lg:mt-[0px]" key={index}>
                  <h2 className=" font-[Forum] text-[50px] text-[#FFFFFF] mt-[10px] leading-[30px]">
                    {item.percentage}
                  </h2>
                  <p className="lg:max-w-[235px] font-[DM-Sans-light] text-[16px] text-[#FFFFFF] mt-[30px] lg:mt-[25px]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <Image
          className="absolute bottom-0 left-0"
          src="/assets/side-boxes.svg"
          width={240}
          height={320}
          alt="ai"
        />
      </div>
    </div>
  );
}

export default AiSection;
