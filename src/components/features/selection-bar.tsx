function SelectionBar({
  selected,
  setSelected,
}: {
  selected?: string;
  setSelected?: (value: string) => void;
}) {
  return (
    <>
      <div className="hidden lg:block selection-bar">
        <ol className="flex justify-center items-center gap-[20px]">
          {['Lead Management', 'Listing & Inventory', 'Booking Tracker', 'Sales Insights'].map(
            item => (
              <p
                key={item}
                className={
                  'px-[15px] py-[10px] lg:px-[79px] lg:py-[10px] cursor-pointer rounded-[100px] font-[DM-Sans-light] text-[16px] leading-[25px]'
                }
                onClick={() => {
                  if (setSelected) setSelected(item);
                }}
                style={{
                  backgroundColor: selected === item ? '#11111C' : '#F6F6F6',
                  color: selected === item ? '#FFFFFF' : '#585860',
                }}
              >
                {item}
              </p>
            ),
          )}
        </ol>
      </div>
      <div className="w-full lg:hidden overflow-x-auto scrollbar-hide pb-2">
        <div className="flex gap-[12px] px-4 min-w-max">
          {['Lead Management', 'Listing & Inventory', 'Booking Tracker', 'Sales Insights'].map(
            item => (
              <p
                key={item}
                className="px-[20px] py-[10px] cursor-pointer rounded-[100px] font-[DM-Sans-light] text-[14px] leading-[20px] whitespace-nowrap"
                onClick={() => setSelected && setSelected(item)}
                style={{
                  backgroundColor: selected === item ? '#11111C' : '#F6F6F6',
                  color: selected === item ? '#FFFFFF' : '#585860',
                }}
              >
                {item}
              </p>
            ),
          )}
        </div>
      </div>
    </>
  );
}

export default SelectionBar;
