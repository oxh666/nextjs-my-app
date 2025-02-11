'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import EChartsComponent from '../components/echarts-compoent';
import * as echarts from 'echarts';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

interface Params {
    // Define the specific type for params if needed
}

export default function EchartsPage(params: Params) {
    const router = useRouter();
    console.log('params', params);
    const searchParams = useSearchParams();
    const [option, setOption] = useState<echarts.EChartsOption>({});

    useEffect(() => {
        const optionParam = searchParams.get('option');
        if (optionParam) {
            try {
                setOption(JSON.parse(optionParam));
            } catch (error) {
                console.error('Invalid JSON string:', error);
            }
        }
    }, [searchParams]);

    return (<>
        <Button onClick={() => {
            router.push('/echarts');
        }}>返回</Button>
        <EChartsComponent option={option} />

    </>);
}
