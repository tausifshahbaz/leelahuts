'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header({ onOpenSidebar }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <>
      {/* Desktop & Main Header */}
      <header
        className={`hotelio-header-area d-none d-lg-block ${isSticky ? 'sticky' : ''}`}
        id="sticky-header"
      >
        <div className="container-fluid px-3 px-xl-5">
          <div className="row header-wrap align-items-center justify-content-between g-0">
            {/* Left: Sidebar Toggle & Brand Logo */}
            <div className="col-auto d-flex align-items-center gap-3 gap-xl-4">
              <div
                className="header-sidbar-button navSidebar-button"
                style={{ cursor: 'pointer' }}
                onClick={onOpenSidebar}
              >
                <button
                  type="button"
                  aria-label="Open sidebar menu"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  <svg
                    width="30"
                    height="18"
                    viewBox="0 0 30 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line y1="1" x2="30" y2="1" stroke="#C09763" strokeWidth="2" />
                    <line y1="9" x2="30" y2="9" stroke="#C09763" strokeWidth="2" />
                    <line y1="17" x2="20" y2="17" stroke="#C09763" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              <div className="header-logo d-flex align-items-center">
                <Link
                  className="active_logo"
                  href="/"
                  style={{ display: isSticky ? 'none' : 'inline-flex', alignItems: 'center' }}
                >
                  <img
                    src="/assets/images/logo.svg"
                    alt="Leela Huts Logo"
                    style={{ maxHeight: '34px', width: 'auto', objectFit: 'contain' }}
                  />
                </Link>
                <Link
                  className="logo_two"
                  href="/"
                  style={{ display: isSticky ? 'inline-flex' : 'none', alignItems: 'center' }}
                >
                  <img
                    src="/assets/images/footer-logo.svg"
                    alt="Leela Huts Logo"
                    style={{ maxHeight: '34px', width: 'auto', objectFit: 'contain' }}
                  />
                </Link>
              </div>
            </div>

            {/* Center: Navigation Menu */}
            <div className="col-auto">
              <div className="header-menu">
                <ul className="nav_scroll m-0">
                  <li className={pathname === '/' ? 'current' : ''}>
                    <Link href="/">Home</Link>
                  </li>
                  <li className={pathname === '/about' ? 'current' : ''}>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li className={pathname === '/room' ? 'current' : ''}>
                    <Link href="/room">Room</Link>
                  </li>
                  <li className={pathname === '/contact' ? 'current' : ''}>
                    <Link href="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Phone & Book Now */}
            <div className="col-auto">
              <div className="header-right-wrapper d-flex align-items-center gap-3">
                <div className="header-call-info d-none d-xl-block">
                  <p>Call : <a href="tel:+918800673533" style={{ color: 'inherit', textDecoration: 'none' }}>+91 88006 73533</a></p>
                </div>
                <div className="header-sidebar">
                  <div className="header-btn">
                    <Link href="/room">
                      BOOK Now{' '}
                      <svg
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.96 4.9808C12.8146 4.9808 10.8592 3.0272 10.8592 0.88V0H9.0992V0.88C9.0992 2.44112 9.78384 3.90544 10.8583 4.9808H0V6.7408H10.8583C9.78384 7.81616 9.0992 9.28048 9.0992 10.8416V11.7216H10.8592V10.8416C10.8592 8.69528 12.8146 6.7408 14.96 6.7408H15.84V4.9808H14.96Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Area */}
      <div className="leela-mobile-header d-block d-lg-none" style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#0e1317' }}>
        <div className="leela-mobile-menu">
          <div className="d-flex justify-content-between align-items-center px-3 py-2" style={{ background: '#0e1317' }}>
            <Link href="/" className="mobile-logo d-flex align-items-center">
              <img src="/assets/images/footer-logo.svg" alt="Leela Huts Logo" style={{ maxHeight: '28px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <div className="d-flex align-items-center gap-3">
              <a
                href="tel:+918800673533"
                aria-label="Call resort"
                style={{ color: '#C09763', fontSize: '18px', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
              >
                <i className="fa-solid fa-phone"></i>
              </a>
              <button
                type="button"
                className="btn btn-sm p-0"
                onClick={onOpenSidebar}
                style={{ color: '#C09763', background: 'transparent', fontSize: '18px', border: 'none', display: 'flex', alignItems: 'center' }}
                aria-label="Open information sidebar"
              >
                <i className="fa-solid fa-circle-info"></i>
              </button>
              <button
                type="button"
                className="btn btn-sm p-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ color: '#C09763', background: 'transparent', fontSize: '22px', border: 'none', display: 'flex', alignItems: 'center' }}
                aria-label="Toggle navigation menu"
              >
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="mobile-nav-panel p-3" style={{ background: '#12181d', borderTop: '1px solid #222' }}>
              <ul className="nav_scroll flex-column d-flex gap-2 list-unstyled m-0">
                <li>
                  <Link href="/" className="text-white text-decoration-none d-block py-2">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white text-decoration-none d-block py-2">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/room" className="text-white text-decoration-none d-block py-2">
                    Room
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white text-decoration-none d-block py-2">
                    Contact Us
                  </Link>
                </li>
                <li className="pt-2">
                  <Link href="/room" className="btn d-block text-center py-2" style={{ background: '#C09763', color: '#fff' }}>
                    BOOK NOW
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
