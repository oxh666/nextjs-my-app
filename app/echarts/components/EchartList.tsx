'use client'
import React from 'react';
import { Card, Row, Col } from 'antd';
import EChartsComponent from './echarts-compoent';

export default function EchartList() {  
    const option: echarts.EChartsOption = {
        title: {
            text: 'ECharts Example'
        },
        tooltip: {},
        xAxis: {
            data: ['A', 'B', 'C', 'D', 'E', 'F']
        },
        yAxis: {},
        series: [
            {
                name: 'Sales',
                type: 'pie',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    };
    const echartsList = Array.from({ length: 8 }, (_, index) => (
        <Col span={12} key={index}>
            <Card title={`Echart ${index + 1}`}  > 
                <EChartsComponent option={option} />
            </Card>
        </Col>



    ));
  return (
    <>
        <Row gutter={[24, 24]}>
            {echartsList}

        </Row>
    </>

       

  );

}


