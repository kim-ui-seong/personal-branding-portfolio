import React, { useState, useEffect } from 'react';
import './Header.css';
import logoImg from '../../assets/hero-logo.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>

      {/* Red Top Line */}
      <div className="header-top-line"></div>

      <div className="header-inner">
        <div className="logo-wrapper">
          <img src={logoImg} alt="KIM UI SEONG" className="header-logo" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
          <span className="logo-text-fallback" style={{ display: 'none' }}>KIM UI SEONG</span>
        </div>

        <nav className="nav">
          <ul>
            <li><a href="#hero">HERO</a></li>
            <li><a href="#about">ABOUT ME</a></li>
            <li><a href="#projects">PROJECT</a></li>
            <li><a href="#qna">Q&A</a></li>
            <li><a href="#contact">CONTACT</a></li>
          </ul>
        </nav>

        {/* Hire Me Button with Dropdown */}
        <div className="hire-me-wrapper">
          <div className="btn-hire-me">HIRE ME</div>
          <div className="hire-me-dropdown">
            <button
              type="button"
              className="dropdown-item"
              onClick={() => window.dispatchEvent(new CustomEvent('open-popup', { detail: 'portfolio' }))}
            >
              Portfolio
            </button>
            <button type="button" className="dropdown-item dropdown-reveal">
              <span className="dropdown-label">Mail</span>
              <span className="dropdown-value">v0514v@naver.com</span>
            </button>
            <button type="button" className="dropdown-item dropdown-reveal">
              <span className="dropdown-label">Tell</span>
              <span className="dropdown-value">010-6399-8775</span>
            </button>
            <button type="button" className="dropdown-item dropdown-reveal">
              <span className="dropdown-label">Instagram</span>
              <span className="dropdown-value">@dd_es0_0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
