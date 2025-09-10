'use client'
import { Spin } from 'antd';

export default function Loading() {
  //返回一个全屏遮罩层，中间有个转圈圈的antd的loading
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin size="large" />
    </div>
  );
}

