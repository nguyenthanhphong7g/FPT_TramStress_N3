import React from 'react';
import './Footer.css';
import { HiOutlineMail } from 'react-icons/hi';
import { FaFacebookF } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Logo from "../../../assets/images/Logo.png"

const Footer = ({ menuItems}) => {
  return (
    <footer className="footer-container">
      <div className="footer-left">
        <img src={Logo} alt="logo" className="footer-logo"/>
        <h2>Trạm Stress</h2>
      </div>

      <nav className="footer-center">
        <ul className="footer-menu">
          {menuItems?.map((item, index) => (
            <li key={index}>
              <NavLink
                  to={item.path}>
                  <span>{item.label}</span>
              </NavLink>
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
