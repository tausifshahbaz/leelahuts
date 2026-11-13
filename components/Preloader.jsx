'use client';

import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 200);

    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className="preloader"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 500ms ease-out',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <div className="loader"></div>
    </div>
  );
}
