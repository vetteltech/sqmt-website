import Tags from '../features/tag';
import ProcessHeader from '../process/process-header';
import HeaderText from '../common/headerText';
import Image from 'next/image';

function AiSection() {
  return (
    <div
      id="about"
      className=" mx-[16px] 2xl:bg-[#F4F6FF] lg:mx-[30px] 2xl:mx-[25%] rounded-t-[10px] overflow-hidden"
    >
      <div className="w-[100%] min-h-[480px] lg:min-h-[590px] bg-[#F4F6FF] pt-[35px] lg:pt-[120px]">
        <div className="max-w-[161px] h-[35px] px-[10px] py-[5px] mx-[5px] lg:mx-[8%] lg:mx-[60px]">
          <Tags bgColor="#FFFFFF" text="Why Zameen?" />
        </div>

        <div className="w-[100%] h-[100%] flex flex-col lg:flex-row">
          <div className="lg:w-[50%] h-[100%] px-[16px] lg:px-[70px] relative ">
            {/* <div>
              <div className="w-[100%] h-[100px] flex flex-col mt-[14px]">
                <h2 className="max-w-[436px] font-[Forum] text-[50px] leading-[50px] text-[#11111C]">
                  {'Built for Agents. Powered by AI'}
                </h2>
                <p className="max-w-[506px] font-[DM-Sans-light] text-left text-[16px] leading-[25px] text-[#585860] mt-[25px]">
                  {
                    'Zameen.app was designed to fit how Indian real estate professionals actually work. No more juggling Excel sheets, WhatsApp messages, and lost leads. Our AI-backed CRM brings everything into one platform — intuitive, localized, and focused on results.'
                  }
                </p>
              </div>
            </div> */}

            <div className="mt-[14px]">
              <HeaderText
                PrimaryText="Built for Agents. Powered by AI"
                secondaryText="Zameen.app was designed to fit how Indian real estate professionals actually work. No more juggling Excel sheets, WhatsApp messages, and lost leads. Our AI-backed CRM brings everything into one platform — intuitive, localized, and focused on results."
                primaryStyle={{
                  width: '506px',
                  textAlignment: 'left',
                  primaryTextWidth: '420px',
                  primaryTextMobileWidth: '317px',
                  mobile: {
                    width: '324px',
                  },
                }}
              />
            </div>

            <img
              src="/assets/people.svg"
              alt="ai"
              style={{
                objectFit: 'fill',
              }}
              className="hidden lg:block w-[100%] 2xl:h-[510px] lg:h-[600px] 2xl:w-[100%] hidden lg:block absolute top-21 left-0"
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

          <div className="w-[50%] h-[100%]">
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
                text: 'Agents using Zameen close deals faster compared to traditional CRMs',
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

          <img
            src="/assets/graph.svg"
            alt="ai"
            className="hidden lg:block w-[100%] lg:mt-[54px]  mt-[50px]"
          />
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
