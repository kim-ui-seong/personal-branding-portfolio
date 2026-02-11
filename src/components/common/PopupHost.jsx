import React, { useEffect, useState } from 'react';
import './PopupHost.css';
import mailLogo from '../../assets/hero-mail-logo.png';
import tellLogo from '../../assets/hero-tell-logo.png';
import instaLogo from '../../assets/hero-insta-logo.png';
import popupBall from '../../assets/popup-ball.png';
import popupPen from '../../assets/popup-pen.png';
import popupBulb from '../../assets/popup-bulb.png';

const contactItems = [
  { id: 'mail', label: 'MAIL', value: 'v0514v@naver.com', iconImg: mailLogo },
  { id: 'tel', label: 'TEL', value: '010-6399-8775', iconImg: tellLogo },
  { id: 'insta', label: 'INSTA', value: '@dd_es0_0', iconImg: instaLogo },
];

const portfolioItems = [
  { id: 'dugout', title: 'DUGOUT', desc: 'K-Pandom App', href: 'https://dugout-ruby.vercel.app/', iconImg: popupBall },
  { id: 'monami', title: 'MONAMI', desc: 'Site Renewal', href: 'https://meongpunch.github.io/monamifinal/ #', iconImg: popupPen },
  { id: 'cling', title: 'CLING', desc: 'UIUX Proposal', href: 'https://www.figma.com/proto/2tr9QLDQwi1GGLNPiN06nd/%ED%81%B4%EB%A7%81-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?page-id=0%3A1&node-id=1-986&p=f&viewport=213%2C41%2C0.07&t=bEyfA110aWxhheGp-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A986', iconImg: popupBulb },
];

const PopupHost = () => {
  const [openType, setOpenType] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      const nextType = event?.detail || null;
      setOpenType(nextType);
    };
    window.addEventListener('open-popup', handler);
    return () => window.removeEventListener('open-popup', handler);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpenType(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setOpenType(null);

  const copyValue = async (id, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch (_e) {
      setCopiedId(null);
    }
  };

  if (!openType) return null;

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true">
      <button type="button" className="popup-backdrop" onClick={close} aria-label="Close popup" />
      <div className="popup-card">
        <button type="button" className="popup-close" onClick={close} aria-label="Close popup">
          X
        </button>

        {openType === 'contact' && (
          <>
            <h3 className="popup-title">LET'S WORK TOGETHER!</h3>
            <p className="popup-subtitle">메일/연락처로 연락 주시면 최대한 빠르게 답장드릴게요❤</p>
            <div className="popup-list">
              {contactItems.map((item) => (
                <div key={item.id} className="popup-row">
                  <div className="popup-row-left">
                    <span className="popup-icon" aria-hidden="true">
                      <img src={item.iconImg} alt="" />
                    </span>
                    <div className="popup-row-text">
                      <span className="popup-value">{item.value}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="popup-action"
                    onClick={() => copyValue(item.id, item.value)}
                  >
                    {copiedId === item.id ? 'copied' : 'copy'}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {openType === 'portfolio' && (
          <>
            <h3 className="popup-title">CHECK MY WORK!</h3>
            <p className="popup-subtitle">각 프로젝트의 기획과 디자인 과정을 편하게 둘러봐주세요❤</p>
            <div className="popup-list">
              {portfolioItems.map((item) => (
                <div key={item.id} className="popup-row is-portfolio">
                  <div className="popup-row-left">
                    <span className="popup-icon" aria-hidden="true">
                      <img src={item.iconImg} alt="" />
                    </span>
                    <div className="popup-row-text">
                      <span className="popup-label">{item.title}</span>
                      <span className="popup-value">{item.desc}</span>
                    </div>
                  </div>
                  <a className="popup-action" href={item.href} target="_blank" rel="noopener noreferrer">
                    view
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupHost;
