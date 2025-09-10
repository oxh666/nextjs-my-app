'use client'
import React, {createContext, ForwardRefExoticComponent, useState} from 'react';
import Image from 'next/image';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import QuestionList from '@/app/ui/test/QuestionList'
import AnswerButton from '@/app/ui/test/AnswerButton'
import UserProfile from '@/app/ui/test/UserProfile'
import ContextForm from '@/app/ui/test/ContextForm'

export const UserContext:React.Context<any> = createContext({});
interface IMenu {
  key: number | string,
  label: string
}

const {
  Header,
  Content,
  Sider
}: {
  Header: ForwardRefExoticComponent<any>,
  Content: ForwardRefExoticComponent<any>,
  Sider: ForwardRefExoticComponent<any>
} = Layout;
//侧边栏
const topMenu: MenuProps['items'] = ['1', '2', '3'].map((key: string): IMenu => ({
  key,
  label: `nav ${key}`,
}));
const leftMenu: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index: number) => {
    const key: string = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `菜单${key}号`,

      children: new Array(4).fill(null).map((_, j: number): IMenu => {
        const subKey: number = index * 4 + j + 1;
        return {
          key: subKey,
          label: `${subKey}号选项`,
        };
      }),
    };
  },
);



export default function Home(): React.JSX.Element {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  const breads = [
    {
      title: 'Home',
    },
    {
      title: <a href="">Application Center</a>,
    },
    {
      title: <a href="">Application List</a>,
    },
    {
      title: 'An Application',
    },
  ]

  const [isHappy, setIsHappy] = useState(true);

  function onAnswerNo() {
    setIsHappy(false);
  }

  function onAnswerYes() {
    setIsHappy(true);
  }
  const [user, setUser] = useState({
    id: 1,
    username: "unicorn42",
    email: "unicorn42@example.com",
  });

  function updateUsername(newUsername:string):void {
    setUser((userData) => ({ ...userData, username: newUsername }));
  }
  return (
    <Layout
      style={{
        height: '100%',
        overflow: 'hidden',
    }}>
      <Header className='flex items-start justify-between p-0'>
        <Image className='w-16 h-16 ' src={'/hero.png'} alt={''} width={64} height={64}/>
        <div className='text-white pl-1 lh-16'>Next.js后台学习项目</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={topMenu}
          style={{flex: 1, minWidth: 0}}
        />
      </Header>
      <Layout
        style={{
          height: 'calc(100% - 64px)',
          overflow: 'hidden',
        }}>
        <Sider width={200} style={{background: colorBgContainer}}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{height: '100%', borderRight: 0}}
            items={leftMenu}
          />
        </Sider>
        <Layout style={{padding: '0 24px 24px'}}>
          <Breadcrumb style={{margin: '16px 0'}}
                      items={breads}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <QuestionList/>

            {/*props*/}
            <UserProfile
              name="John"
              age={20}
              favouriteColors={["green", "blue", "red"]}
              isAvailable
            />

            {/*childrenToFather*/}
            <p>Are you happy?</p>
            <AnswerButton onYes={onAnswerYes} onNo={onAnswerNo}/>
            <p style={{fontSize: 50}}>{isHappy ? "😀" : "😥"}</p>

            {/*Content*/}
            <h1>Welcome back, {user.username}</h1>
            <UserContext.Provider value={{...user, updateUsername}}>
              <ContextForm />
            </UserContext.Provider>
          </Content>
        </Layout>
      </Layout>
      <div className='text-center text-gray-500 text-sm'>Copyright © 2025-2025, 个人学习网站. All rights reserved.</div>
      <div className='text-center text-gray-500 text-sm cursor-pointer' onClick={() => window.open('https://beian.miit.gov.cn/#/Integrated/index', '_blank')}>蜀ICP备2025123329号-1</div>
    </Layout>

  );
}
