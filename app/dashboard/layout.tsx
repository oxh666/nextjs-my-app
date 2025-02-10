'use client';
import React, { useState } from 'react';
import Link from 'next/link';
const Layout = ({ children }: { children: React.ReactNode }) => {
    const [count, setCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div>
                <Link href="/dashboard/about">About</Link>
                <br />
                <Link href="/dashboard/settings">Settings</Link>
            </div>
            <h1>Layout {count}</h1>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
            {children}
        </>
    )

};

export default Layout;
