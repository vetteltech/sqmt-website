import Tags from '../features/tag';

function ProcessHeader({
  tagText,
  title,
  description,
  titleWidth,
}: {
  tagText: string;
  title: string;
  description: string;
  titleWidth?: number;
}) {
  return (
    <div className="w-[100%]">
      <div className="max-w-[103px]">
        <Tags bgColor="#F4F6FF" text={tagText || 'Process'} />
      </div>
      <div className="w-[100%] h-[100px] lg:flex justify-between items-center mt-[10px]">
        <div>
          <h2
            className="font-[Forum] text-[40px] lg:text-[50px] leading-[40px] lg:leading-[50px] text-[#11111C]"
            style={{
              maxWidth: titleWidth ? titleWidth : '436px',
            }}
          >
            {title || '3 Steps to More Conversions'}
          </h2>
        </div>
        <div className=" h-[100%] flex lg:items-end">
          <p className="max-w-[397px] font-[DM-Sans-light] lg:text-right text-[16px] lg:text-[16px] leading-[25px] lg:leading-[25px] text-[#585860] mt-[10px]">
            {description ||
              ' From adding properties to AI-driven nudges, SquareMeter streamlines every step so you close faster, every time.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProcessHeader;
