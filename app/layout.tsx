'use client'
import { inter } from '@/app/ui/fonts';
import "./globals.css";
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';
import React, { useState, useEffect } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import InitDialog from './components/InitDialog';
import { useUserInfoStore } from './store';
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isVisitor, checkTokenAndSetVisitor } = useUserInfoStore();
  
  // 应用启动时检查 token
  useEffect(() => {
    checkTokenAndSetVisitor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 只在组件挂载时执行一次，checkTokenAndSetVisitor 是稳定的

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
      <ConfigProvider locale={zhCN}>
        <AntdRegistry>
        <div className="min-h-screen flex flex-col bg-white text-slate-600 transition-colors dark:bg-theme-dark dark:text-slate-300">
          {/* Header */}
          <div
            className={`m-auto flex h-fit flex-col items-center w-full ${
              isScrolled ? 'sticky top-0 z-500 backdrop-blur-md shadow-md' : ''
            }`}
            style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
          >
            <LayoutHeader />
            {/* 如果用户是访客，则显示初始化对话框 */}
            {isVisitor && <InitDialog />}
          </div>
          
          {/* Main Content */}
          <main className="flex-1 p-2">
            {children}
          </main>
                    {/* Footer */}
          <LayoutFooter />
        </div>
        </AntdRegistry>
        </ConfigProvider>      
      </body>
    </html>
  );
}
