import React, { useEffect, useRef, useState } from 'react';
import './AboutBall.css';
import ballGirl from '../../assets/ball-girl.png';

const AboutBall = () => {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(1080);
    const [parallax, setParallax] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth || 1920;
            const height = window.innerHeight || 1080;
            setViewportHeight(height);

            // FILL WIDTH: Prioritize 1920 horizontal fit (Consistent with Connect)
            const scale = width / 1920;
            document.documentElement.style.setProperty('--aboutball-scale', scale.toString());
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const start = rect.top;
            const height = rect.height;

            if (start <= 0 && start > -height) {
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

    useEffect(() => {
        let rafId = 0;
        const handleMove = (event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const relX = (event.clientX - rect.left) / rect.width - 0.5;
            const relY = (event.clientY - rect.top) / rect.height - 0.5;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                setParallax({
                    x: relX * 16,
                    y: relY * 16
                });
            });
        };

        const handleLeave = () => {
            if (rafId) cancelAnimationFrame(rafId);
            setParallax({ x: 0, y: 0 });
        };

        const section = sectionRef.current;
        if (!section) return () => { };
        section.addEventListener('mousemove', handleMove);
        section.addEventListener('mouseleave', handleLeave);

        return () => {
            section.removeEventListener('mousemove', handleMove);
            section.removeEventListener('mouseleave', handleLeave);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    // Spread balls vertically across the deep frame
    const balls = [
        { size: 700, left: '2%', top: '5%', speed: '14s', range: '180px', opacity: 0.45, anim: '1' },
        { size: 550, right: '5%', top: '25%', speed: '16s', range: '220px', opacity: 0.55, anim: '2' },
        { size: 470, left: '18%', top: '12%', speed: '15s', range: '160px', opacity: 0.5, anim: '3' },
        { size: 235, right: '18%', top: '18%', speed: '17s', range: '140px', opacity: 0.48, anim: '1' },
        { size: 900, left: '10%', top: '48%', speed: '20s', range: '280px', opacity: 0.65, anim: '3' },
        { size: 820, right: '-5%', top: '72%', speed: '15s', range: '240px', opacity: 0.7, anim: '1' },
        { size: 600, left: '16%', top: '58%', speed: '18s', range: '200px', opacity: 0.58, anim: '2' },
        { size: 440, right: '70%', top: '1000%', pinnedTop: '1000px', pinnedLeft: '500px', speed: '16s', range: '100px', opacity: 0.6, anim: '3' },
        { size: 210, right: '60%', top: '1500%', pinnedTop: '980px', pinnedLeft: '520px', speed: '18s', range: '140px', opacity: 0.55, anim: '2' },
    ];

    // VERTICAL SLIDING LOGIC (Full Height Explorer)
    const frameHeight = 4500; // Keep in sync with the scale wrapper for clean bottom framing
    const currentScale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--aboutball-scale')) || 1;
    const scaledFrameHeight = frameHeight * currentScale;

    // We scroll through the entire 2780px
    const scrollableDistance = Math.max(scaledFrameHeight - viewportHeight, 0);
    const translateY = -(scrollProgress * scrollableDistance);

    const pinnedCount = 2;
    const pinnedStartIndex = balls.length - pinnedCount;
    const pinnedBalls = balls.slice(-pinnedCount);

    return (
        <>
            <section id="about-ball" className="aboutball-section" ref={sectionRef}>
                <div className="aboutball-sticky-container">
                    <div
                        className="aboutball-scale-wrapper"
                        style={{
                            transform: `translate(calc(-50% + ${parallax.x}px), ${parallax.y}px) scale(var(--aboutball-scale, 1))`,
                            top: `${translateY / currentScale}px`
                        }}
                    >
                        {balls.map((ball, idx) => {
                            const isPinnedBall = idx >= pinnedStartIndex;
                            if (isPinnedBall) return null;
                            return (
                                <div
                                    key={idx}
                                    className={`floating-ball anim-${ball.anim}${idx === balls.length - 1 ? ' is-last' : ''}`}
                                    style={{
                                        width: `${ball.size}px`,
                                        height: `${ball.size}px`,
                                        left: ball.pinnedLeft || ball.left,
                                        right: ball.pinnedLeft ? undefined : ball.right,
                                        top: ball.top,
                                        opacity: ball.opacity,
                                        animationDuration: ball.speed,
                                        '--float-range': ball.range
                                    }}
                                >
                                    {idx === 6 && <img src={ballGirl} className="ball-girl-img" alt="Ball Girl" />}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="aboutball-pinned-layer" aria-hidden="true">
                    <div
                        className="aboutball-pinned-wrapper"
                        style={{
                            transform: `translate(-50%, 0) scale(var(--aboutball-scale, 1))`
                        }}
                    >
                        {pinnedBalls.map((ball, idx) => {
                            const originalIndex = pinnedStartIndex + idx;
                            return (
                                <div
                                    key={originalIndex}
                                    className={`floating-ball anim-${ball.anim}${originalIndex === balls.length - 1 ? ' is-last' : ''}`}
                                    style={{
                                        width: `${ball.size}px`,
                                        height: `${ball.size}px`,
                                        left: ball.left,
                                        right: ball.right,
                                        top: ball.pinnedTop || ball.top,
                                        opacity: ball.opacity,
                                        animationDuration: ball.speed,
                                        '--float-range': ball.range
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutBall;
