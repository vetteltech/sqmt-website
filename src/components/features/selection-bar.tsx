function SelectionBar({
  selected,
  setSelected,
}: {
  selected?: string;
  setSelected?: (value: string) => void;
}) {
  return (
    <div className="selection-bar">
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
  );
}

export default SelectionBar;
