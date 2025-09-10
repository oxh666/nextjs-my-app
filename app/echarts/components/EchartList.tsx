'use client'
// pages/echarts-list.tsx
import React from 'react';
import EChartsComponent from './echarts-compoent';
import { useRouter } from 'next/navigation';

const EChartsListPage: React.FC = () => {
    const router = useRouter();
    const options: echarts.EChartsOption[] = [
        {
            title: { text: 'Bar Chart' },
            tooltip: {},
            xAxis: { data: ['A', 'B', 'C', 'D', 'E', 'F'] },
            yAxis: {},
            series: [{ name: 'Sales', type: 'bar', data: [5, 20, 36, 10, 10, 20] }]
        },
        {
            title: { text: 'Line Chart' },
            tooltip: {},
            xAxis: { data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
            yAxis: {},
            series: [{ name: 'Revenue', type: 'line', data: [15, 30, 46, 20, 15, 30] }]
        },
        {
            title: { text: 'Pie Chart' },
            tooltip: { trigger: 'item' },
            series: [
                {
                    name: 'Access Source',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }
            ]
        },
        {
            title: { text: 'Scatter Chart' },
            tooltip: {},
            xAxis: {},
            yAxis: {},
            series: [
                {
                    name: 'Scatter',
                    type: 'scatter',
                    data: [
                        [10, 8],
                        [15, 20],
                        [20, 15],
                        [25, 30],
                        [30, 25]
                    ]
                }
            ]
        },
        {
            title: { text: 'Radar Chart' },
            tooltip: {},
            radar: {
                indicator: [
                    { name: 'Metric1', max: 100 },
                    { name: 'Metric2', max: 100 },
                    { name: 'Metric3', max: 100 },
                    { name: 'Metric4', max: 100 },
                    { name: 'Metric5', max: 100 }
                ]
            },
            series: [
                {
                    name: 'Budget vs spending',
                    type: 'radar',
                    data: [
                        {
                            value: [80, 90, 70, 85, 95],
                            name: 'Allocated Budget'
                        }
                    ]
                }
            ]
        },
        {
            title: { text: 'Area Chart' },
            tooltip: {},
            xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            yAxis: {},
            series: [
                {
                    name: 'Temperature',
                    type: 'line',
                    areaStyle: {},
                    data: [22, 24, 19, 23, 25, 27, 28]
                }
            ]
        },
        {
            title: { text: 'Candlestick Chart' },
            tooltip: { trigger: 'axis' },
            xAxis: { data: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'] },
            yAxis: {},
            series: [
                {
                    name: 'Candlestick',
                    type: 'candlestick',
                    data: [
                        [20, 30, 10, 35],
                        [40, 35, 32, 55],
                        [33, 38, 33, 40],
                        [40, 40, 32, 42],
                        [30, 32, 28, 35]
                    ]
                }
            ]
        }
    ];

    const goToEchartsPage = (option: echarts.EChartsOption) => {
        const title = 'xxx';
        const queryString = `option=${encodeURIComponent(JSON.stringify(option))}`;
        router.push(`/echarts/${title}?${queryString}`);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap'
        }}>
            {options.map((option, index) => (
                <div key={index} style={{ flex: '0 0 49%', boxSizing: 'border-box', padding: '10px' }}>
                    <div onClick={() => {
                        goToEchartsPage(option);
                    }}>
                        <EChartsComponent
                            style={{ height: '400px' }}
                            option={option}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EChartsListPage;