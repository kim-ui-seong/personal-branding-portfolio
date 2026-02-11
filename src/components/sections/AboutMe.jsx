import React, { useEffect, useRef, useState } from 'react';
import './AboutMe.css';
import card01 from '../../assets/about-01.png';
import card02 from '../../assets/about-02.png';
import card03 from '../../assets/about-03.png';
import card04 from '../../assets/about-04.png';

const AboutMe = () => {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth || 1920;
            const height = window.innerHeight || 1080;
            const scaleX = width / 1920;
            const scaleY = (height - 40) / 1300; // Reference to 1300px internal frame
            const scale = Math.max(Math.min(scaleX, scaleY), 0.35);
            document.documentElement.style.setProperty('--aboutme-scale', scale.toString());
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress through the section
            // Section starts being active when it hits the top
            const start = rect.top;
            const height = rect.height;

            if (start <= 0 && start > -height) {
                // Buffer to wait for the section to be fully in view
                const progress = Math.abs(start) / (height - windowHeight);
                setScrollProgress(Math.min(Math.max(progress, 0), 1));
            } else if (start > 0) {
                setScrollProgress(0);
            } else {
                setScrollProgress(1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const cards = [
        // Shifted Y to 250px - Centered in 1100px frame
        { id: '01.', title: 'A LITTLE INTRODUCTION', text: 'I design from understanding people.', img: card01, x: 0, y: 350, deg: 7, bgColor: '#F0B5BE' },
        { id: '02.', title: 'WHERE I STARTED', text: 'I learned to see from the user’s side.', img: card02, x: 470, y: 350, deg: 0, bgColor: '#DE919D' },
        { id: '03.', title: 'PEOPLE IN BETWEEN', text: 'I connect users, ideas, and teams.', img: card03, x: 940, y: 350, deg: -11, bgColor: '#DCBEC2' },
        { id: '04.', title: 'DESIGN AS A LANGUAGE', text: 'Good design should be easy to understand.', img: card04, x: 1410, y: 350, deg: 7, bgColor: '#F99CAA' }
    ];

    return (
        <section id="aboutme-cards" className="aboutme-section" ref={sectionRef}>
            <div className="aboutme-sticky-container">
                <div className="aboutme-scale-wrapper">
                    {/* Background Circles */}
                    <div className="aboutme-bg-circles">
                        <div className="aboutme-circle circle-1"></div>
                        <div className="aboutme-circle circle-2"></div>
                        <div className="aboutme-circle circle-3"></div>
                    </div>

                    {/* Introduction Title: Reveal animation based on scroll */}
                    <div className={`aboutme-intro ${scrollProgress > 0.05 ? 'reveal' : ''}`}>
                        <h2 className="aboutme-title">ABOUT ME!</h2>
                    </div>

                    {/* Cards Container */}
                    <div className="aboutme-cards-container">
                        {cards.map((card, index) => {
                            // Calculate opacity and transform based on scroll progress
                            // 40% Scroll Buffer: Gives title plenty of solo time before cards appear
                            const buffer = 0.4;
                            const step = (1 - buffer) / cards.length;
                            const startProgress = buffer + (index * step);

                            let opacity = 0;
                            let translateY = 100; // Start lower for more impact

                            // REMOVED transparency transition as requested
                            if (scrollProgress >= startProgress) {
                                opacity = 1;
                                translateY = 0;
                            } else if (scrollProgress > startProgress - 0.1) {
                                // Short snappy entrance window
                                const t = (scrollProgress - (startProgress - 0.1)) / 0.1;
                                translateY = 100 * (1 - t);
                                opacity = t > 0.1 ? 1 : 0;
                            }

                            return (
                                <div
                                    key={index}
                                    className="aboutme-card"
                                    style={{
                                        left: `${card.x}px`,
                                        top: `${card.y}px`,
                                        transform: `rotate(${card.deg}deg) translateY(${translateY}px)`,
                                        opacity: opacity,
                                        zIndex: 10 + index
                                    }}
                                >
                                    <div className="card-top">
                                        <h3 className="card-title">{card.title}</h3>
                                        <span className="card-num">{card.id}</span>
                                        <p className="card-text">{card.text}</p>
                                    </div>
                                    <div className="card-img-box">
                                        <div className="card-img-bg" style={{ backgroundColor: card.bgColor }}></div>
                                        <div className="card-img-wrapper">
                                            <img src={card.img} alt={card.title} className="card-img" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
