'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ScrollUp from './ScrollUp';
import Preloader from './Preloader';

export default function ClientWrapper({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Handle client-side navigation for any standard <a> links inside page contents
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Check if it's an internal route link starting with /
      if (
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !href.startsWith('/assets') &&
        !target.hasAttribute('download') &&
        target.target !== '_blank'
      ) {
        e.preventDefault();
        router.push(href);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [router]);

  // Handle dynamic DOM interactions on route change (room section hover, float labels, background images)
  useEffect(() => {
    // 1. Data background image support
    const bgElements = document.querySelectorAll('[data-background]');
    bgElements.forEach((el) => {
      const bg = el.getAttribute('data-background');
      if (bg) {
        el.style.backgroundImage = `url(${bg})`;
      }
    });

    // 2. Room section hover background switcher
    const roomsSection = document.getElementById('rooms-section');
    const roomItems = document.querySelectorAll('.room-item');
    if (roomsSection && roomItems.length > 0) {
      roomItems.forEach((item) => {
        const handleEnter = () => {
          const bg = item.getAttribute('data-bg');
          if (bg) {
            roomsSection.style.backgroundImage = `url(${bg})`;
          }
        };
        const handleLeave = () => {
          roomsSection.style.backgroundImage = `url("/assets/images/leela/IMG_6446.jpg")`;
        };
        item.addEventListener('mouseenter', handleEnter);
        item.addEventListener('mouseleave', handleLeave);
      });
    }

    // 3. Float label input & date picker interactions
    const floatInputs = document.querySelectorAll('.floatLabel');
    floatInputs.forEach((input) => {
      const updateLabel = () => {
        if (input.value && input.value !== 'blank') {
          input.nextElementSibling?.classList.add('active');
        } else if (document.activeElement !== input) {
          input.nextElementSibling?.classList.remove('active');
        }
      };

      const handleFocus = () => {
        input.nextElementSibling?.classList.add('active');
      };

      const handleBlur = () => {
        if (!input.value || input.value === 'blank') {
          input.nextElementSibling?.classList.remove('active');
        }
      };

      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      input.addEventListener('input', updateLabel);
      input.addEventListener('change', updateLabel);
      updateLabel();
    });

    // 4. Click anywhere on booking date box to open calendar picker
    const bookingBoxes = document.querySelectorAll('.booking-input-box');
    bookingBoxes.forEach((box) => {
      const dateInput = box.querySelector('input[type="date"]');
      if (dateInput) {
        box.addEventListener('click', (e) => {
          if (e.target !== dateInput) {
            dateInput.focus();
          }
          if (typeof dateInput.showPicker === 'function') {
            try {
              dateInput.showPicker();
            } catch (err) {}
          }
        });
      }
    });

    // 5. Ensure reveal images and fade elements are visible
    document.querySelectorAll('.reveal, .reveal img, .gs_fade_anim').forEach((el) => {
      el.style.visibility = 'visible';
    });

    // 6. WOW and ScrollTrigger animation support
    if (typeof window !== 'undefined') {
      if (window.WOW) {
        new window.WOW().init();
      }
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    }
  }, [pathname]);

  return (
    <>
      <Preloader />
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main id="main-content">{children}</main>
      <Footer />
      <ScrollUp />
    </>
  );
}
