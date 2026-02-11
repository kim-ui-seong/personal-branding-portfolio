import React, { useEffect } from 'react';
import './About.css';

const About = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const sectionRef = React.useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth || 1920;
            const height = window.innerHeight || 1080;
            const scaleX = width / 1920;
            const scaleY = (height - 40) / 1080; // Baseline for content
            const scale = Math.max(Math.min(scaleX, scaleY), 0.35);
            document.documentElement.style.setProperty('--about-scale', scale.toString());
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const observer = new IntersectionObserver(
            ([entry]) => {
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
        <section id="about" className="about-section" ref={sectionRef}>
            <div className={`about-scale-wrapper ${isVisible ? 'reveal' : ''}`}>
                <div className="about-content">
                    {/* Giant Background Circle */}
                    <div className="about-bg-circle"></div>

                    {/* Sub title */}
                    <div className="about-sub-label">KEYWORDS</div>

                    {/* Main Title */}
                    <h2 className="about-main-title">
                        WHO AM I?<br />
                        KIM UI SEONG
                    </h2>

                    {/* Keyword Bubbles */}
                    <div className="keyword-bubble kw-positive">POSITIVE</div>
                    <div className="keyword-bubble kw-passionate">PASSIONATE</div>
                    <div className="keyword-bubble kw-learning">LEARNING</div>
                    <div className="keyword-bubble kw-collaborative">COLLABORATIVE</div>
                    <div className="keyword-bubble kw-enjoying">ENJOYING</div>
                    <div className="keyword-bubble kw-responsible">RESPONSIBLE</div>
                    <div className="keyword-bubble kw-challenging">CHALLENGING</div>
                </div>
            </div>
        </section>
    );
};

export default About;
