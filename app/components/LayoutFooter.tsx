'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LayoutFooter(): JSX.Element {
    const router = useRouter();

    return (
        <footer className="w-full bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo 和简介 */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center mb-4">
                            <Image
                                src='/hero.png'
                                alt='水冰月'
                                width={32}
                                height={32}
                                className="mr-3"
                            />
                            <span className="text-xl font-bold text-slate-800 dark:text-slate-200">
                                我的应用
                            </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            这是一个基于 Next.js 构建的现代化 Web 应用，集成了图表展示、博客系统、照片管理等功能。
                        </p>
                    </div>

                    {/* 快速链接 */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                            快速链接
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { label: '首页', path: '/' },
                                { label: '图表', path: '/echarts' },
                                { label: '博客', path: '/blog' },
                                { label: '照片', path: '/photos' },
                            ].map((item) => (
                                <li key={item.path}>
                                    <button
                                        onClick={() => router.push(item.path)}
                                        className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm transition-colors duration-200"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 联系信息 */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                            联系信息
                        </h3>
                        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <p>📧 example@email.com</p>
                            <p>🌐 www.example.com</p>
                            <p>�� 中国</p>
                        </div>
                    </div>
                </div>

                {/* 底部版权信息 */}
                <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-slate-500 dark:text-slate-500">
                            © {new Date().getFullYear()} 我的应用. 保留所有权利.
                        </p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a 
                                href="#" 
                                className="text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm transition-colors duration-200"
                            >
                                隐私政策
                            </a>
                            <a 
                                href="#" 
                                className="text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm transition-colors duration-200"
                            >
                                服务条款
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
