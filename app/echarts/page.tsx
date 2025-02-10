'use client'
import React, { useState } from 'react';
import EChartsComponent from './components/echarts-compoent';
import EchartList from './components/EchartList';



export default function DashboardPage(props: any) {

  return (
    <>
     <EchartList />
    </>
  );
}