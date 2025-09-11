'use client'
import React from 'react';
import { theme } from 'antd';
import StaticLayout from './StaticLayout';

export default function ClientLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <StaticLayout 
      colorBgContainer={colorBgContainer} 
      borderRadiusLG={borderRadiusLG} 
    />
  );
}
