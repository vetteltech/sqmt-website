import HeaderText from '../common/headerText';
import Tags from '../features/tag';
import Plan from './plan';

function PlanSection() {
  return (
    <div className="mx-[16px] lg:mx-[30px]  2xl:mx-[25%] rounded-[10px] overflow-hidden">
      <div id="plans" className="w-[100%] lg:px-[30px] px-[16px] bg-[#F4F6FF] overflow-x-hidden">
        <div className="w-[100%] flex flex-col justify-center items-center pt-[35px] lg:pt-[120px]">
          <div className="w-[120px] h-[35px] px-[10px] py-[5px]  mb-[10px] mx-[60px]">
            <Tags bgColor="#FFFFFF" text="Testimonials" />
          </div>

          {/* <div className="w-[100%] flex flex-col lg:flex-row justify-center items-center mt-[80px] lg:mt-[0px]">
            <div className="w-[100%] lg:w-[50%] px-[10%] lg:px-[70px]">
              <div>
                <div className="w-[100%] h-[100px] flex flex-col justify-center items-center mt-[25px] 2xl:mt-[20px]">
                  <h2 className="max-w-[550px] font-[Forum] text-center text-[40px] text-[50px] leading-[50px] text-[#11111C]">
                    {'What Real Estate Pros Say'}
                  </h2>
                  <p className="max-w-[506px] font-[DM-Sans-light] text-center text-[16px] leading-[21px] text-[#585860] mt-[10px]">
                    {
                      'See how Zameen is transforming the way agents and brokers win leads, close deals, and grow business.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <HeaderText
            PrimaryText="What Real Estate Pros Say"
            secondaryText="See how Zameen is transforming the way agents and brokers win leads, close deals, and grow business."
            primaryStyle={{
              width: '627px',
              textAlignment: 'center',
              mobile: {
                width: '264px',
              },
            }}
          />
        </div>

        <div className="w-[100%] mt-[40px] lg:mt-[80px] flex flex-col lg:flex-row justify-center items-center gap-[20px]">
          <Plan
            planName="Starter Plan"
            planDescription="Perfect for small businesses getting started with AI automation."
            features={[
              '500 AI WhatsApp follow-up messages/month',
              '100 AI voice calls/month',
              'Lead tracking dashboard',
              'Smart auto-reply suggestions',
            ]}
            isPopular
          />
          <Plan
            planName="Growth Plan"
            planDescription="Ideal for growing teams looking to scale engagement."
            btnColor="#00104E"
            features={[
              '2,000 AI WhatsApp follow-up messages/month',
              '500 AI voice calls/month',
              'Custom message templates',
              'Advanced performance analytics',
            ]}
          />
        </div>

        <div className="w-[100%] flex justify-center items-center mt-[-95px]">
          <img src="/assets/building.svg" alt="plan" className="w-[100%] pt-[66px] lg:h-[234px]" />
          <img src="/assets/building.svg" alt="plan" className="w-[100%] pt-[66px] lg:h-[234px]" />
        </div>
      </div>
    </div>
  );
}

export default PlanSection;
