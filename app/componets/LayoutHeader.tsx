'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
//这个文件
export default function LayoutHeader() : JSX.Element{
    const [isStickyNavBar, setIsStickyNavBar] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter()
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
        <header
            className={` w-full px-5 font-customFont transition-all duration-300 ease-linear   ${isStickyNavBar ? 'sticky top-0 z-10' : ''
                } ${isStickyNavBar && isScrolled
                    ? 'glass bg-gradient-to-r from-transparent via-white/10 to-transparent shadow-md'
                    : ''
                }`}
        >
            <div >
                {/*增加移入移出模糊特效
                 */}
                <div className='logo cursor-pointer mr-6 hidden overflow-hidden rounded-md md:block'>
                    <Image
                        src='/hero.png'
                        alt='水冰月'
                        width={100}
                        height={100}
                        priority
                        onClick={() => router.push('/')}
                    />
                </div>


            </div>
        </header>
    );
}
