function Tags({ bgColor, text }: { bgColor: string; text: string }) {
  return (
    <div
      className="inline-flex justify-center items-center rounded-[8px] border border-[#C8D4F5]/70 px-[23.5px] py-[6px] shadow-[0_1px_2px_rgba(17,17,28,0.05)]"
      style={{ backgroundColor: bgColor }}
    >
      <p className="font-[DM-Sans-light] font-medium text-[12px] lg:text-[14px] leading-[21px] text-[#11111C]/90 tracking-[-0.01em]">
        {text}
      </p>
    </div>
  );
}

export default Tags;
