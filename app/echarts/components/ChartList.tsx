'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEchartsStore } from '@/app/store';
import { CHART_OPTIONS, ChartOption } from './ChartTypes';
import LazyEChartsComponent from '../../components/LazyEChartsComponent';

const ChartList: React.FC = () => {
  const router = useRouter();
  const { setOption } = useEchartsStore();

  const goToEchartsPage = (option: ChartOption) => {
    setOption(option);
    let title = 'xxx';
    if (Array.isArray(option.title)) {
      title = option.title[0]?.text || 'xxx';
    } else if (option.title) {
      title = option.title.text || 'xxx';
    }
    router.push(`/echarts/${title}`);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      {CHART_OPTIONS.map((option, index) => (
        <div key={index} style={{ flex: '0 0 49%', boxSizing: 'border-box', padding: '10px' }}>
          <div onClick={() => goToEchartsPage(option)}>
            <LazyEChartsComponent
              style={{ height: '400px' }}
              option={option}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartList;
