import React from 'react';
import './Home2.css'

const Home = () => {
  return (
    <div className="container">
      <div className="home-container">
        <h1 className="home-title">맥도날드 홈</h1>
        <p className="home-text">여기는 맥도날드 메인페이지입니다.</p>

        <div className="home-section">
          <h2 className="title">🔥 실시간 인기 메뉴</h2>
          <ul className="fandom-list">
            <li>🍔맥스파이시상하이버거</li>
            <li>🍟후렌치후라이</li>
            <li>🥧애플파이</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
