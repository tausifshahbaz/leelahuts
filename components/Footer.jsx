import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="main-footer-one">
      <div className="main-footer-section">
        <div className="auto-container">
          <div className="row">
            {/* Footer Column 1 */}
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="footer-widget-content social">
                <div className="logo" style={{ marginBottom: '22px' }}>
                  <Link href="/">
                    <img
                      src="/assets/images/footer-logo.svg"
                      alt="Leela Huts Logo"
                      style={{ maxHeight: '36px', width: 'auto', objectFit: 'contain' }}
                    />
                  </Link>
                </div>
                <div className="footer-desc">
                  Leela Huts is a modern & luxury mountain resort offering comfortable retreats, scenic beauty, and bespoke hospitality.
                </div>
                <ul className="footer-social">
                  <li><a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a></li>
                  <li><a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a></li>
                  <li><a href="#" aria-label="Pinterest"><i className="fa-brands fa-pinterest-p"></i></a></li>
                  <li><a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a></li>
                </ul>
              </div>
            </div>

            {/* Footer Column 2 */}
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="footer-widget-content">
                <h3 className="footer-title">Company</h3>
                <ul className="footer-menu">
                  <li><Link href="/">Home<i className="fa-solid fa-arrow-right-long"></i></Link></li>
                  <li><Link href="/about">About Us<i className="fa-solid fa-arrow-right-long"></i></Link></li>
                  <li><Link href="/room">Rooms & Suites<i className="fa-solid fa-arrow-right-long"></i></Link></li>
                  <li><Link href="/contact">Contact Us<i className="fa-solid fa-arrow-right-long"></i></Link></li>
                </ul>
              </div>
            </div>

            {/* Footer Column 3 */}
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="footer-widget-content">
                <h3 className="footer-title">Useful Links</h3>
                <ul className="footer-menu">
                  <li><Link href="/room">Rooms & Suites<i className="fa-solid fa-arrow-right-long"></i></Link></li>
                  <li><Link href="/room-details">Room Details<i className="fa-solid fa-arrow-right-long"></i></Link></li>
                  <li><Link href="/about">About Us<i className="fa-solid fa-arrow-right-long"></i></Link></li>
                  <li><Link href="/contact">Contact Us<i className="fa-solid fa-arrow-right-long"></i></Link></li>
                </ul>
              </div>
            </div>

            {/* Footer Column 4 */}
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="footer-widget-content">
                <h3 className="footer-title">Contact Us</h3>
                <div className="footer-content">
                  <div className="location">
                    <span>Our Address</span>Club House Road, Old Manali, Manali, Himachal Pradesh 175131
                  </div>
                  <ul className="contact-info">
                    <li className="email-text"><a href="mailto:leelahutsmanali@gmail.com">Send E-Mail</a></li>
                    <li className="email-address"><a href="mailto:leelahutsmanali@gmail.com">leelahutsmanali@gmail.com</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6 col-md-8">
              <div className="copyright-text">
                &copy; {new Date().getFullYear()} Leela Huts. All rights reserved.
              </div>
            </div>
            <div className="col-lg-6 col-md-4">
              <div className="footer-bottom-menu">
                <ul>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/room">Rooms</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
