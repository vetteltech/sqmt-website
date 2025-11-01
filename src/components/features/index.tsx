'use client';
import { useState } from 'react';
import FeatureText from './feature-text';
import SelectionBar from './selection-bar';
import Tags from './tag';
import Tabs from './tabs';
import AutoSliderSection from './auto-slider';
import HeaderText from '../common/headerText';

function Features() {
  return (
    <div
      id="features"
      className="w-[100%] min-h-[100vh] flex justify-center items-center px-[5%] lg:px-[100px]  2xl:px-[25%] py-[20%] lg:py-[120px]  overflow-x-hidden"
    >
      <div className="w-[100%] flex flex-col justify-center items-center">
        <div className="w-[100%] flex justify-center items-center mb-[10px]">
          <Tags bgColor="#EDF0FF" text="Features" />
        </div>
        <HeaderText
          PrimaryText="Everything You Need to Sell Smarter"
          secondaryText="Transform the Way You Manage with One Powerful AI Platform"
          primaryStyle={{
            width: '627px',
            textAlignment: 'center',
            mobile: {
              width: '324px',
            },
          }}
        />
        <AutoSliderSection />
      </div>
    </div>
  );
}

export default Features;
