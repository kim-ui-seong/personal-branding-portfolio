import React from 'react';
import './Footer.css';
import characterImg from '../../assets/footer-ch.png';
import characterBlinkImg from '../../assets/footer-ch-02.png';
import mailIcon from '../../assets/footer-mail-logo.png';
import phoneIcon from '../../assets/footer-tell-logo.png';
import instaIcon from '../../assets/footer-insta-logo.png';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-frame">
        <div className="footer-card">
          <h2 className="footer-title">
            <span className="footer-title-line is-1">THANK YOU FOR WATCHING</span>
            <span className="footer-title-line is-2">MY PORTFOLIO!</span>
          </h2>
          <div className="footer-divider"></div>

          <div className="footer-body">
            <div className="footer-contacts handwritten">
              <p className='tell'>010-6399-8775</p>
              <p>v0514v@naver.com</p>
              <p>@dd_es0_0</p>
            </div>

            <div className="footer-character">
              <img className="character-open" src={characterImg} alt="Character" />
              <img className="character-closed" src={characterBlinkImg} alt="" aria-hidden="true" />
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy handwritten">ALL RIGHT RESERVED. KIMUISEONG@2026</p>
            <div className="footer-icons">
              <button
                type="button"
                className="footer-icon"
                aria-label="Email"
                onClick={() => window.dispatchEvent(new CustomEvent('open-popup', { detail: 'contact' }))}
              >
                <img src={mailIcon} alt="" />
              </button>
              <button
                type="button"
                className="footer-icon"
                aria-label="Phone"
                onClick={() => window.dispatchEvent(new CustomEvent('open-popup', { detail: 'contact' }))}
              >
                <img src={phoneIcon} alt="" />
              </button>
              <button
                type="button"
                className="footer-icon"
                aria-label="Instagram"
                onClick={() => window.dispatchEvent(new CustomEvent('open-popup', { detail: 'contact' }))}
              >
                <img src={instaIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
