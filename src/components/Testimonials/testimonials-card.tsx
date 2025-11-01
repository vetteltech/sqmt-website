import Image from 'next/image';

function TestimonialsCards({
  title,
  description,
  logo,
  location,
  agents,
  performance,
}: {
  title?: string;
  description?: string;
  logo?: string;
  location: string;
  agents: number;
  performance: {
    key: string | number;
    value: string;
  }[];
}) {
  return (
    <div className="w-[100%] max-w-[605px] min-h-[440px] p-[16px] lg:p-[30px] border border-[#E4E4E7] rounded-[10px]">
      <div>
        <Image
          src={logo || '/assets/features/grow40.svg'}
          alt="testimonials"
          width={164}
          height={48}
        />
      </div>

      <div className="hidden lg:block mt-[20px] flex flex-col lg:flex-row justify-start items-center gap-[16px] lg:gap-[60px]">
        <div className="w-[100%]">
          <h3 className="font-[DM-Sans-light] text-[16px] lg:text-[16px] leading-[21px] text-[#585860]">
            Portfolio Type:
          </h3>
          <p className="font-[DM-Sans-light] text-[16px] lg:text-[16px] leading-[21px] text-[#11111C] mt-[4px] lg:mt-[6px]">
            Residential
          </p>
        </div>
        <div className="w-[100%]">
          <h3 className="font-[DM-Sans-light] font-[300] text-[16px] lg:text-[16px] leading-[21px] text-[#585860]">
            Location:
          </h3>
          <p className="font-[DM-Sans-light] text-[16px]  lg:text-[16px] leading-[21px] text-[#11111C] mt-[4px] lg:mt-[6px]">
            {location || 'Mumbai, India'}
          </p>
        </div>
        <div className="w-[100%]">
          <h3 className="font-[DM-Sans-light] text-[16px] lg:text-[16px] leading-[21px] text-[#585860]">
            No. of Agents:
          </h3>
          <p className="font-[DM-Sans-light] text-[16px] lg:text-[16px] leading-[21px] text-[#11111C] mt-[4px] lg:mt-[6px]">
            {agents}
          </p>
        </div>
      </div>

      <div className="mt-[35px]">
        <Image src="/assets/dot.svg" alt="quote" width={25} height={20} />

        <p className="font-[DM-Sans-light] text-[16px]  lg:text-[20px] leading-[27px] text-[#11111C] mt-[20px]">
          {description ||
            ' "Zameen has revolutionized our real estate business. The AI-driven lead management system has significantly improved our conversion rates and overall efficiency."'}
        </p>

        <div className="w-[100%] mt-[46px] gap-[16px] lg:gap-[29px] flex flex-col lg:flex-row justify-start items-center">
          {performance?.map((item, index) => {
            return (
              <div
                key={index}
                className=" bg-[#F4F6FF] rounded-[8px] w-[100%] lg:w-[258px] h-[78px] flex flex-col justify-center items-start gap-[6px] px-[17px] py-[15px]"
              >
                <h3 className="font-[DM-Sans-Medium] text-[16px] lg:text-[20px] leading-[21px] text-[#11111C]">
                  {item?.key || '65%'}
                </h3>
                <p className="font-[DM-Sans-light] text-[16px] lg:text-[16px] leading-[21px] text-[#585860]">
                  {item?.value || 'Reduction in missed leads'}
                </p>
              </div>
            );
          })}
          {/* <div className=" bg-[#F4F6FF] rounded-[8px] w-[258px] h-[78px] flex justify-center items-center gap-[20px] p-[17px]">
            <h3 className="font-[DM-Sans-light] font-[500] text-[20px] leading-[23px] text-[#11111C]">
              2X
            </h3>
            <p className="font-[DM-Sans-light] font-[300] text-[16px] leading-[21px] text-[#11111C] opacity-50">
              Increase in monthly closings
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsCards;
