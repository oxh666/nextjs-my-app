'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { Menu, Avatar } from 'antd';
import { usePathname } from 'next/navigation';
// import MusicPlayer from '../components/MusicPlayer';

//这个文件
export default function LayoutHeader(): JSX.Element {
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


    type MenuItem = Required<MenuProps>['items'][number];
    enum MenuEnum {
        home = '首页',
        dashboard = '列表',
        echarts = '图表',
        blog = '博客',
        photos = '照片',
    }

    const items: MenuItem[] = [
        {
            label: MenuEnum.home,
            key: '/',
        },
        {
            label: MenuEnum.dashboard,
            key: '/dashboard',
        },
        {
            label: MenuEnum.echarts,
            key: '/echarts',
        },
        {
            label: MenuEnum.blog,
            key: '/blog',
        },
        {
            label: MenuEnum.photos,
            key: '/photos',
        },
        {
            key: 'alipay',
            disabled: true,
            label: (
                <a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer">
                    百度
                </a>
            ),
        },
    ];

    function MenuNav(): JSX.Element {
        const pathname  = usePathname();
        const [current, setCurrent] = useState(pathname);
        useEffect(() => {
            setCurrent(pathname); // 当 pathname 变化时更新 current
        }, [pathname]);
    
        const onClickMenu: MenuProps['onClick'] = (e) => {
            setCurrent(e.key);
            console.log('pathname', pathname);
            router.push(e.key);
        };

        return <Menu
            className='flex-1 h-full'
            style={{ height: '100%' }}
            onClick={onClickMenu}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />;
    }

    function UserInfo(): JSX.Element {
        return (
            <>
                <MusicPlayer />
                <Avatar>O</Avatar>
            </>
        )
    }
    return (
        <header
            className={` w-full font-customFont transition-all duration-300 ease-linear 
                  ${isStickyNavBar ? 'sticky top-0 z-50' : ''
                } ${isStickyNavBar && isScrolled
                    ? 'glass bg-gradient-to-r from-transparent via-white/10 to-transparent shadow-md'
                    : ''
                }`}
        >
            <div className='flex justify-between items-center'>
                {/*logo*/}
                <Image
                    src='/hero.png'
                    alt='水冰月'
                    width={46}
                    height={46}
                    priority
                    onClick={() => router.push('/')}
                />
                {/* TODO-后期需要添加搜索框和调整整个板块的布局 */}
                <div className='flex-1 h-full flex justify-between items-center'>
                    {/*导航栏*/}
                    <MenuNav />
                    {/*用户信息*/}
                    {/* <UserInfo /> */}
                </div>
            </div>
        </header>
    );
}
