import React, { useEffect, useState } from 'react';
import Tabs from './tabs';
import SelectionBar from './selection-bar';
import { motion, AnimatePresence } from 'framer-motion';

const AutoSliderSection = () => {
  const options = ['Lead Management', 'Listing & Inventory', 'Booking Tracker', 'Sales Insights'];
  const [selected, setSelected] = useState(options[0]);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setSelected(prev => {
        const currentIndex = options.indexOf(prev);
        const nextIndex = (currentIndex + 1) % options.length;
        return options[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [options, paused]);

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
        'Get a 360° view of revenue, lead performance, and agent productivity. AI highlights what’s working — and what needs attention — so you can grow smarter.',
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

  return (
    <div
      className="w-full mt-[40px] lg:mt-[80px] transition-all duration-500"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Selection bar visible only on large screens */}
      <div className="w-full hidden lg:block">
        <SelectionBar selected={selected} setSelected={setSelected} />
      </div>

      {/* Mobile view */}
      {/* <div className="w-full lg:hidden overflow-x-scroll">
        <SelectionBar selected={selected} setSelected={setSelected} />
      </div> */}

      {/* Tabs container */}
      <div className="w-full h-[420px] border border-[rgba(0,0,0,0.1)] rounded-[20px] lg:mt-[40px] overflow-hidden">
        <AnimatePresence mode="wait">
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
            className=" w-full"
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
      </div>
    </div>
  );
};

export default AutoSliderSection;
