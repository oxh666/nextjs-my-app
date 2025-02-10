'use client'
import React from 'react';

export default function Home() {
  const helloWorlds = Array.from({ length: 100 }, (_, i) => (
    <h1 key={i} className='text-center'>Hello World</h1>
  ));

  return (
    <>
      {helloWorlds}
    </>
  );
}
