'use client'
import React, { useState } from 'react';
export default function DashboardPage(props: any) {
  const [error, setError] = useState(false);
  const handleGetError = () => {
    setError(true);
  };

  return (
    <>
      {error ? <div>Error occurred</div> : <button onClick={handleGetError}>Get Error</button>}
    </>
  );
}


