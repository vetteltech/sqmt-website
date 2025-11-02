// import React, { useEffect, useState } from 'react';
// import Tabs from './tabs';
// import SelectionBar from './selection-bar';
// import { motion, AnimatePresence } from 'framer-motion';

// const AutoSliderSection = () => {
//   const options = ['Lead Management', 'Listing & Inventory', 'Booking Tracker', 'Sales Insights'];
//   const [selected, setSelected] = useState(options[0]);
//   const [paused, setPaused] = useState(false);
//   const [direction, setDirection] = useState(1);

//   useEffect(() => {
//     if (paused) return;
//     const interval = setInterval(() => {
//       setSelected(prev => {
//         const currentIndex = options.indexOf(prev);
//         const nextIndex = (currentIndex + 1) % options.length;
//         return options[nextIndex];
//       });
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [options, paused]);

//   const variants = {
//     enter: (dir: number) => ({
//       x: dir > 0 ? 100 : -100,
//       opacity: 0,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//     },
//     exit: (dir: number) => ({
//       x: dir > 0 ? -100 : 100,
//       opacity: 0,
//     }),
//   };

//   const tabs = [
//     {
//       title: 'Booking Tracker',
//       description:
//         'Easily manage property availability, pricing, and bookings with AI-powered insights. Keep your inventory up-to-date and prevent double-bookings automatically.',
//       process: {
//         s0: '/assets/feature/booking-tracker/s0.svg',
//         s1: '/assets/feature/booking-tracker/s1.svg',
//       },
//       info: '/assets/feature/booking-tracker/s2.svg',
//     },
//     {
//       title: 'Sales Insights',
//       description:
//         'Get a 360° view of revenue, lead performance, and agent productivity. AI highlights what’s working — and what needs attention — so you can grow smarter.',
//       process: {
//         s0: '/assets/feature/sales-insights/s0.svg',
//         s1: '/assets/feature/sales-insights/s1.svg',
//       },
//       info: '/assets/feature/sales-insights/s2.svg',
//     },
//     {
//       title: 'Lead Management',
//       description:
//         'Automatically capture, score, and assign leads from all channels — ensuring no opportunity slips away. Track conversations and follow-ups seamlessly with AI reminders.',
//       process: {
//         s0: '/assets/feature/lead-management/s0.svg',
//         s1: '/assets/feature/lead-management/s1.svg',
//       },
//       info: '/assets/feature/lead-management/s2.svg',
//     },
//     {
//       title: 'Listing & Inventory',
//       description:
//         'Manage property data, pricing, and availability from one synced dashboard. Every update instantly reflects across your website, portals, and CRM.',
//       process: {
//         s0: '/assets/feature/listing-&-Inventory/s0.svg',
//         s1: '/assets/feature/listing-&-Inventory/s1.svg',
//       },
//       info: '/assets/feature/listing-&-Inventory/s2.svg',
//     },
//   ];

//   return (
//     <div
//       className="w-full mt-[40px] lg:mt-[80px] transition-all duration-500"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       {/* Selection bar visible only on large screens */}
//       <div className="w-full hidden lg:block">
//         <SelectionBar selected={selected} setSelected={setSelected} />
//       </div>

//       {/* Mobile view */}
//       {/* <div className="w-full lg:hidden overflow-x-scroll">
//         <SelectionBar selected={selected} setSelected={setSelected} />
//       </div> */}

//       {/* Tabs container */}
//       <div className="w-full h-[420px] border border-[rgba(0,0,0,0.1)] rounded-[20px] lg:mt-[40px] overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={selected}
//             custom={direction}
//             variants={variants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{
//               x: { type: 'spring', stiffness: 300, damping: 30 },
//               opacity: { duration: 0.3 },
//             }}
//             className=" w-full"
//           >
//             {tabs
//               ?.filter(item => item.title === selected)
//               ?.map((item, index) => (
//                 <Tabs
//                   key={index}
//                   title={item?.title}
//                   description={item?.description}
//                   selected={selected}
//                   progress={item.process}
//                   info={item?.info}
//                 />
//               ))}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default AutoSliderSection;

import React, { useEffect, useState } from 'react';
import Tabs from './tabs';
import SelectionBar from './selection-bar';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';

const AutoSliderSection = () => {
  const options = ['Lead Management', 'Listing & Inventory', 'Booking Tracker', 'Sales Insights'];
  const [selected, setSelected] = useState(options[0]);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setSelected(prev => {
        const currentIndex = options.indexOf(prev);
        const nextIndex = (currentIndex + 1) % options.length;
        return options[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [options, paused]);

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 10;
    const swipeVelocityThreshold = 500;
    console.log({
      swipeThreshold,
      swipeVelocityThreshold,
      condtion:
        Math.abs(info.offset.x) > swipeThreshold ||
        Math.abs(info.velocity.x) > swipeVelocityThreshold,
      info,
    });

    if (
      Math.abs(info.offset.x) > swipeThreshold ||
      Math.abs(info.velocity.x) > swipeVelocityThreshold
    ) {
      const currentIndex = options.indexOf(selected);

      if (info.offset.x > 0) {
        // Swiped right - go to previous
        setDirection(-1);
        const prevIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
        setSelected(options[prevIndex]);
      } else {
        // Swiped left - go to next
        setDirection(1);
        const nextIndex = (currentIndex + 1) % options.length;
        setSelected(options[nextIndex]);
      }
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const tabs = [
    {
      title: 'Booking Tracker',
      description:
        'Easily manage property availability, pricing, and bookings with AI-powered insights. Keep your inventory up-to-date and prevent double-bookings automatically.',
      process: {
        s0: '/assets/feature/booking-tracker/s0.svg',
        s1: '/assets/feature/booking-tracker/s1.svg',
      },
      info: '/assets/feature/booking-tracker/s2.svg',
    },
    {
      title: 'Sales Insights',
      description:
        "Get a 360° view of revenue, lead performance, and agent productivity. AI highlights what's working — and what needs attention — so you can grow smarter.",
      process: {
        s0: '/assets/feature/sales-insights/s0.svg',
        s1: '/assets/feature/sales-insights/s1.svg',
      },
      info: '/assets/feature/sales-insights/s2.svg',
    },
    {
      title: 'Lead Management',
      description:
        'Automatically capture, score, and assign leads from all channels — ensuring no opportunity slips away. Track conversations and follow-ups seamlessly with AI reminders.',
      process: {
        s0: '/assets/feature/lead-management/s0.svg',
        s1: '/assets/feature/lead-management/s1.svg',
      },
      info: '/assets/feature/lead-management/s2.svg',
    },
    {
      title: 'Listing & Inventory',
      description:
        'Manage property data, pricing, and availability from one synced dashboard. Every update instantly reflects across your website, portals, and CRM.',
      process: {
        s0: '/assets/feature/listing-&-Inventory/s0.svg',
        s1: '/assets/feature/listing-&-Inventory/s1.svg',
      },
      info: '/assets/feature/listing-&-Inventory/s2.svg',
    },
  ];

  const handleSelectionChange = (option: string) => {
    const currentIndex = options.indexOf(selected);
    const newIndex = options.indexOf(option);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setSelected(option);
  };

  return (
    <div
      className="w-full mt-[40px] lg:mt-[80px] transition-all duration-500"
      onMouseEnter={() => !isMobile && setPaused(true)}
      onMouseLeave={() => !isMobile && setPaused(false)}
    >
      {/* Selection bar visible only on large screens */}
      <div className="w-full hidden lg:block">
        <SelectionBar selected={selected} setSelected={handleSelectionChange} />
      </div>

      {/* Mobile scroll bar */}
      <div className="w-full lg:hidden overflow-x-auto scrollbar-hide">
        <SelectionBar selected={selected} setSelected={handleSelectionChange} />
      </div>

      {/* Tabs container */}
      <div className="w-full h-[420px] lg:h-[615px] border border-[rgba(0,0,0,0.1)] rounded-[20px] mt-[20px] lg:mt-[40px] overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={selected}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            drag={isMobile ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={isMobile ? handleDragEnd : undefined}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            {tabs
              ?.filter(item => item.title === selected)
              ?.map((item, index) => (
                <Tabs
                  key={index}
                  title={item?.title}
                  description={item?.description}
                  selected={selected}
                  progress={item.process}
                  info={item?.info}
                />
              ))}
          </motion.div>
        </AnimatePresence>

        {/* Swipe indicator for mobile */}
        {isMobile && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {options.map((option, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  option === selected ? 'w-8 bg-blue-500' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoSliderSection;
