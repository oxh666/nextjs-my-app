'use client'
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Card } from 'antd';

interface EChartsComponentProps {
  option: echarts.EChartsOption;
  style?: React.CSSProperties;
}

const EChartsComponent: React.FC<EChartsComponentProps> = ({ option, style }: EChartsComponentProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

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

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.dispose();
      };
    }
  }, [option]);

  return (
    <Card>
      <div 
        ref={chartRef} 
        style={{ 
          width: '100%', 
          height: '400px', 
          cursor: 'pointer', 
          zIndex: 1, 
          ...style 
        }} 
      />
    </Card>
  );
};

export default EChartsComponent;
