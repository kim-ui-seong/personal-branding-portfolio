import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

// Import Skill Icons
import skillPs from '../../assets/skill-ps.png';
import skillPr from '../../assets/skill-pr.png';
import skillHtml from '../../assets/skill-html.png';
import skillCss from '../../assets/skill-css.png';
import skillReact from '../../assets/skill-react.png';
import skillJs from '../../assets/skill-js.png';
import skillFigma from '../../assets/skill-figma.png';
import skillAi from '../../assets/skill-ai.png';
import skillC4d from '../../assets/skill-cinema4d.png';

const Skills = () => {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const currentScroll = -rect.top;
            const totalScroll = rect.height - windowHeight;
            const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);

        const handleResize = () => {
            const width = window.innerWidth || 1920;
            const height = window.innerHeight || 1080;
            const scaleX = width / 1920;
            const scaleY = (height - 40) / 1300; // Refined baseline for 1300px wrapper
            const scale = Math.max(Math.min(scaleX, scaleY), 0.35);
            document.documentElement.style.setProperty('--skills-scale', scale.toString());
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Keep observer for basic intersection but rely on scroll for 'reveal'
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    // Content reveals starting from 0.05 progress and stays fully visible until the next section
    const isRevealed = scrollProgress > 0.05;
    const contentOpacity = (() => {
        if (scrollProgress < 0.05) return 0;
        if (scrollProgress < 0.2) return (scrollProgress - 0.05) / 0.15;
        return 1; // No fade-out at the end
    })();

    const skillList = [
        skillPs, skillPr, skillHtml, skillCss, skillReact,
        skillJs, skillFigma, skillAi, skillC4d
    ];

    // Triple the list for seamless loop
    const displaySkills = [...skillList, ...skillList, ...skillList];

    return (
        <section id="skills" className="skills-section" ref={sectionRef}>
            <div className="skills-sticky-container">
                <div className="skills-scale-wrapper">
                    {/* Background elements if any */}
                    <div className="skills-bg-elements">
                        <div className="skills-circle sc-1"></div>
                        <div className="skills-circle sc-2"></div>
                    </div>

                    <div
                        className={`skills-content ${isRevealed ? 'reveal' : ''}`}
                        style={{ opacity: contentOpacity }}
                    >
                        <h2 className="skills-title">SKILLS!</h2>

                        <div className="marquee-container">
                            {/* Row 1: Left to Right */}
                            <div className="marquee-row row-1">
                                <div className="marquee-track">
                                    {displaySkills.map((skill, idx) => (
                                        <div key={`r1-${idx}`} className="skill-box">
                                            <img src={skill} alt="skill icon" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Row 2: Right to Left */}
                            <div className="marquee-row row-2">
                                <div className="marquee-track-reverse">
                                    {displaySkills.map((skill, idx) => (
                                        <div key={`r2-${idx}`} className="skill-box">
                                            <img src={skill} alt="skill icon" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
