'use client'
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EChartsComponentProps {
  option: echarts.EChartsOption;
  style?: React.CSSProperties;
}

const EChartsComponent: React.FC<EChartsComponentProps> = ({ option, style }: EChartsComponentProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  console.log('option1', option);
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      if (option) {
        chartInstance.setOption(option);
      }

      // Handle window resize
      const handleResize = () => {
        chartInstance.resize();
      };
      window.addEventListener('resize', handleResize);

      // Cleanup on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.dispose();
      };
    }
  }, [option]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px', cursor: 'pointer', ...style }} />;
};

export default EChartsComponent;