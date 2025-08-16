import React from 'react';
import './Footer.css';
import { HiOutlineMail } from 'react-icons/hi';
import { FaFacebookF } from 'react-icons/fa';

const Footer = ({ menuItems}) => {
  return (
    <footer className="footer-container">
      <div className="footer-left">
        <h2>Trạm Stress</h2>
      </div>

      <nav className="footer-center">
        <ul className="footer-menu">
          {menuItems?.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="footer-right">
        <HiOutlineMail />
        <FaFacebookF />
      </div>
    </footer>
  );
};

export default Footer;
