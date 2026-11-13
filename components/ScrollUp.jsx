'use client';

import React, { useEffect, useState } from 'react';

export default function ScrollUp() {
  const [isVisible, setIsVisible] = useState(false);
  const [dashOffset, setDashOffset] = useState(307.919);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const totalLength = 307.919;
      
      if (height > 0) {
        const offset = totalLength - (scroll * totalLength) / height;
        setDashOffset(Math.max(0, Math.min(totalLength, offset)));
      }

      if (scroll > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`prgoress_indicator ${isVisible ? 'active-progress' : ''}`}
      onClick={scrollToTop}
      role="button"
      tabIndex={0}
      aria-label="Scroll to top"
      style={{ cursor: 'pointer' }}
    >
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          style={{
            transition: 'stroke-dashoffset 10ms linear',
            strokeDasharray: '307.919, 307.919',
            strokeDashoffset: dashOffset,
          }}
        />
      </svg>
    </div>
  );
}
