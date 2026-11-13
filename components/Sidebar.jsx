'use client';

import React from 'react';
import Link from 'next/link';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`xs-sidebar-group info-group ${isOpen ? 'isActive' : ''}`}>
      <div className="xs-overlay xs-bg-black" onClick={onClose}></div>
      <div className="xs-sidebar-widget">
        <div className="sidebar-widget-container">
          <div className="widget-heading">
            <button
              type="button"
              className="close-side-widget"
              onClick={onClose}
              aria-label="Close sidebar"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
            >
              <i className="far fa-times-circle"></i>
            </button>
          </div>
          <div className="sidebar-textwidget">
            {/* Sidebar Info Content */}
            <div className="sidebar-info-contents">
              <div className="content-inner">
                <div className="nav-logo" style={{ margin: '15px 0 35px' }}>
                  <Link href="/" onClick={onClose}>
                    <img
                      src="/assets/images/footer-logo.svg"
                      alt="Leela Huts Logo"
                      style={{ maxHeight: '34px', maxWidth: '190px', width: 'auto', objectFit: 'contain' }}
                    />
                  </Link>
                </div>
                <div className="content-box">
                  <h2>About Us</h2>
                  <p className="text">
                    Welcome to Leela Huts, your premier mountain retreat. Experience bespoke luxury, pristine alpine views, and warm hospitality crafted to make every moment unforgettable.
                  </p>
                  <Link href="/room" onClick={onClose} className="theme-btn btn-style-two">
                    <span>Book A Room</span> <i className="fas fa-heart"></i>
                  </Link>
                </div>
                <div className="contact-info">
                  <h2>Contact Info</h2>
                  <ul className="list-style-one">
                    <li>
                      <span className="icon flaticon-email"></span>Club House Road, Old Manali, Manali, Himachal Pradesh 175131
                    </li>
                    <li>
                      <span><i className="fa-solid fa-phone"></i></span> <a href="tel:+918800673533" style={{ color: 'inherit', textDecoration: 'none' }}>+91 88006 73533</a>
                    </li>
                    <li>
                      <span><i className="fa-solid fa-envelope"></i></span> <a href="mailto:leelahutsmanali@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>leelahutsmanali@gmail.com</a>
                    </li>
                    <li>
                      <span><i className="fa-solid fa-clock"></i></span> Week Days: 09.00 to 18.00 Sunday: Closed
                    </li>
                  </ul>
                </div>
                {/* Social Box */}
                <ul className="social-box">
                  <li className="facebook"><a href="#" className="fab fa-facebook-f"></a></li>
                  <li className="twitter"><a href="#" className="fab fa-instagram"></a></li>
                  <li className="linkedin"><a href="#" className="fa-brands fa-x-twitter"></a></li>
                  <li className="instagram"><a href="#" className="fab fa-pinterest-p"></a></li>
                  <li className="youtube"><a href="#" className="fab fa-linkedin-in"></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
