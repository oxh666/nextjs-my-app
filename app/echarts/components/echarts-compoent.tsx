import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EChartsComponentProps {
  option: echarts.EChartsOption;
}

const EChartsComponent: React.FC<EChartsComponentProps> = ({ option }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      chartInstance.setOption(option);

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

  return <div ref={chartRef} style={{ width: '200px', height: '400px' }} />;
};

export default EChartsComponent;