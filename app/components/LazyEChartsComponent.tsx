'use client'
import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';

// 懒加载 ECharts 组件
const EChartsComponent = lazy(() => import('./EChartsComponent'));

interface LazyEChartsComponentProps {
  option: any;
  style?: React.CSSProperties;
}

// 加载中的占位组件
const ChartSkeleton = () => (
  <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
    <div className="text-center">
      <Spin size="large" />
      <p className="mt-4 text-gray-500">图表加载中...</p>
    </div>
  </div>
);

const LazyEChartsComponent: React.FC<LazyEChartsComponentProps> = ({ option, style }) => {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <EChartsComponent option={option} style={style} />
    </Suspense>
  );
};

export default LazyEChartsComponent;
