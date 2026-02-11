import React, { useEffect, useState, useRef } from 'react';
import './Hero.css';
import chImg from '../../assets/hero-ch.png';
import mailLogo from '../../assets/hero-mail-logo.png';
import instaLogo from '../../assets/hero-insta-logo.png';
import tellLogo from '../../assets/hero-tell-logo.png';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const scale = Math.min(window.innerWidth / 1920, 1);
            document.documentElement.style.setProperty('--hero-scale', scale.toString());
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Set visible state based on intersection
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section id="hero" className="hero-section" ref={sectionRef}>
            <div className="hero-scale-wrapper">
                <div className={`hero-content ${isVisible ? 'reveal' : ''}`}>
                    {/* Background Bottom Rectangle: W 1920, H 850, Color F4CED3 */}
                    <div className="hero-bg-bottom"></div>

                    {/* 1. Left Title: X 60, Y 165 */}
                    <h1 className="hero-element left-title big-text">
                        GOOD<br />DESIGN
                    </h1>

                    {/* 2. Right Title: X 1260, Y 685 */}
                    <h2 className="hero-element right-title big-text">
                        MAKES<br />PEOPLE <span className="leaning-letter">S</span>TAY!
                    </h2>

                    {/* 3. Right Subtitle: X 1310, Y 925 */}
                    <p className="hero-element hero-subtitle">
                        UX/UI DESIGNER FOCUSED ON REAL USER EXPERIENCE
                    </p>

                    {/* 4. Social Icons Box: X 60, Y 880 */}
                    <div className="hero-element hero-social-icons">
                        <button
                            type="button"
                            className="social-icon"
                            onClick={() => window.dispatchEvent(new CustomEvent('open-popup', { detail: 'contact' }))}
                            aria-label="Open contact popup"
                        >
                            <img src={mailLogo} alt="Email" />
                        </button>
                        <button
                            type="button"
                            className="social-icon"
                            onClick={() => window.dispatchEvent(new CustomEvent('open-popup', { detail: 'contact' }))}
                            aria-label="Open contact popup"
                        >
                            <img src={tellLogo} alt="Phone" />
                        </button>
                        <button
                            type="button"
                            className="social-icon"
                            onClick={() => window.dispatchEvent(new CustomEvent('open-popup', { detail: 'contact' }))}
                            aria-label="Open contact popup"
                        >
                            <img src={instaLogo} alt="Instagram" />
                        </button>
                    </div>

                    {/* Floating Group: Character + Center Bubble */}
                    <div className="hero-element float-group-center">
                        {/* 5. Character: X 448, Y 218, W 730, H 1100 */}
                        <img src={chImg} alt="Designer Character" className="hero-character" />

                        {/* Center Bubble (Behind Char): X 410, Y 940, W 800, H 800 */}
                        <div className="bg-bubble bubble-center"></div>
                    </div>

                    {/* BUBBLES */}

                    {/* Left Bubble: X -147, Y 690, W 745, H 745 */}
                    <div className="hero-element bg-bubble bubble-left"></div>

                    {/* Top Right Bubble: X 965, Y 600, W 800, H 800 */}
                    <div className="hero-element bg-bubble bubble-right-top"></div>

                    {/* Bottom Right Bubble: X 1490, Y 960, W 800, H 800 */}
                    <div className="hero-element bg-bubble bubble-right-bottom"></div>

                    {/* Pink Scroll Bubble: Clickable to #about */}
                    <div
                        className="hero-element bg-bubble bubble-pink-scroll interactable"
                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <div className="scroll-indicator">
                            SCROLL DOWN ↓
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
