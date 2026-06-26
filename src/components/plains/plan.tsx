import Image from 'next/image';

function Plan({
  planName,
  planDescription,
  onClick,
  features,
  isPopular = false,
  btnColor,
}: {
  planName: string;
  planDescription: string;
  onClick?: () => void;
  features: string[];
  isPopular?: boolean;
  btnColor?: string;
}) {
  return (
    <div className="lg:w-[610px] min-h-[427px] p-[15px] bg-[#FFFFFF] rounded-[10px]">
      <div className="w-[100%] min-h-[180px] bg-[#F4F6FF] rounded-[10px] px-[25px] py-[24.5px] relative">
        <h2 className="font-[Forum] text-[30px] text-[#11111C]">{planName}</h2>
        <p className="font-[DM-Sans-light] text-[16px] text-[gray]">{planDescription}</p>

        <a className="" href="#contact_us">
          <button
            className="w-[100%] p-[10.5px] bg-[#1241FF] rounded-[5px] text-[#FFFFFF] font-[DM-Sans-light] mt-[25px] flex justify-center items-center gap-[14px] cursor-pointer"
            style={{
              background: btnColor ? btnColor : '#1241FF',
            }}
            onClick={onClick}
          >
            I&apos;m Intrested
            <Image
              className="w-[16px] h-[12px]"
              width={16}
              height={12}
              src={'/assets/arrow_right.svg'}
              alt="arrow"
            />
          </button>
        </a>

        {isPopular && (
          <p className="font-[DM-Sans-light] text-[16px] bg-[#112162] absolute top-[25px] right-[25px] rounded-[10px] py-[5px] px-[10px] text-[#FFFFFF]">
            Popular
          </p>
        )}
      </div>

      <div className="w-[100%] px-[15px] mt-[25px]">
        <p className="font-[DM-Sans-Medium] text-[16px] leading-[21px] text-[#11111C]">
          What You Will Get
        </p>

        <ol className="font-[DM-Sans-light] text-[16px] leading-[21px] text-[#585860] flex flex-col gap-[25px] mt-[25px] mb-[10px]">
          {features?.map((feature, index) => (
            <li key={index} className="flex gap-[10px]">
              <Image src="/assets/plan/tick.svg" alt="check" width={16} height={16} />
              {feature}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Plan;
