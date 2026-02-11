import React from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import AboutMe from '../components/sections/AboutMe';
import Skills from '../components/sections/Skills';
import AboutBall from '../components/sections/AboutBall';
import Connect from '../components/sections/Connect';
import Projects from '../components/sections/Projects';
import Gallery from '../components/sections/Gallery';
import FAQ from '../components/sections/FAQ';
import Running from '../components/sections/Running';
import Footer from '../components/layout/Footer';
import PopupHost from '../components/common/PopupHost';

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <main>
        <Hero />
        <About />
        <AboutMe />
        <Skills />
        <AboutBall />
        <Connect />
        <Projects />
        <Gallery />
        <FAQ />
        <Running />
      </main>
      <Footer />
      <PopupHost />
    </div>
  )
}

export default Home;
