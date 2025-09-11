'use client'
import { inter } from '@/app/ui/fonts';
import "./globals.css";
import LayoutHeader from './components/LayoutHeader';
import React, { useState, useEffect } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <AntdRegistry>
        <div className="h-full w-full bg-white text-slate-600 transition-colors dark:bg-theme-dark dark:text-slate-300">
        <div
            className={`m-auto flex h-fit flex-col items-center  ${
              isScrolled ? 'sticky  top-0 z-50 backdrop-blur-md shadow-md' : ''
            }`}
            style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }} // Ensure smooth transition for shadow
          >
            <LayoutHeader  />
          </div>
          <div className='p-2'>
            {children}
          </div>
        </div>
        </AntdRegistry>
      </body>
    </html>

  );
}
