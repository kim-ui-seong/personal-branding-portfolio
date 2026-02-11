import React, { useEffect, useRef, useState } from 'react';
import './Connect.css';

import connect01 from '../../assets/connect-01.jpg';
import connect03 from '../../assets/connect-03.jpg';
import connect04 from '../../assets/connect-04.jpg';
import connect05 from '../../assets/connect-05.jpg';
import connect06 from '../../assets/connect-06.jpg';
import connect07 from '../../assets/connect-07.jpg';

const Connect = () => {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(1080);
    const [hoveredIdx, setHoveredIdx] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth || 1920;
            const height = window.innerHeight || 1080;
            setViewportHeight(height);

            // FILL WIDTH: Prioritize 1920 horizontal fit
            const scale = width / 1920;
            document.documentElement.style.setProperty('--connect-scale', scale.toString());

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

    const timelineData = [
        {
            id: '01',
            year: 'THE BEGINNING',
            label: '2000',
            stageTitle: 'THE BEGINNING',
            quoteEn: "THE BEGINNING OF A CREATIVE JOURNEY.\nDESIGN IS CAPTURING THE SPARK.",
            quoteKr: "디자인은 단순히 보이는 것이 아닙니다.\n어떻게 느껴지고, 어떻게 자연스럽게 흐르는가의 문제입니다.",
            img: connect01
        },
        {
            id: '02',
            year: 'BACKSTAGE',
            label: '2015',
            stageTitle: 'BACKSTAGE',
            quoteEn: "I worked behind the scenes.\nI saw how systems create moments.",
            quoteKr: "무대 뒤에서 움직였습니다.\n시스템이 순간을 만든다는 걸 배웠습니다.",
            img: connect03 // Using 03 for 02 as requested
        },
        {
            id: '03',
            year: 'BROADCAST',
            label: '2016',
            stageTitle: 'BROADCAST',
            quoteEn: "VISUAL COMMUNICATION AT SCALE.\nSPREADING STORIES THROUGH MEDIA.",
            quoteKr: "시각적 메시지의 확장.\n다양한 매체를 통해 스토리의 힘을 전달합니다.",
            img: connect03
        },
        {
            id: '04',
            year: 'FLIGHT',
            label: '2019',
            stageTitle: 'FLIGHT',
            quoteEn: "Service lives in movement.\nI began to read people in flow.",
            quoteKr: "서비스는 이동 속에서 이루어집니다.\n흐름 속의 사람을 보기 시작했습니다.",
            img: connect04
        },
        {
            id: '05',
            year: 'NEW PERSPECTIVE ',
            label: '2023',
            stageTitle: 'NEW PERSPECTIVE ',
            quoteEn: "A new world changed my view.\nDifferent users, different needs.",
            quoteKr: "새로운 환경은 관점을 바꾸었습니다.\n사람마다 다른 필요를 보게 되었습니다.",
            img: connect05
        },
        {
            id: '06',
            year: 'CHOOSING DESIGN',
            label: '2025',
            stageTitle: 'CHOOSING DESIGN',
            quoteEn: "I chose to design experiences.\nUnderstanding became my starting point.",
            quoteKr: "경험을 설계하는 길을 선택했습니다.\n이해가 출발점이 되었습니다.",
            img: connect06
        },
        {
            id: '07',
            year: 'NOW & NEXT',
            label: '2026',
            stageTitle: 'NOW & NEXT',
            quoteEn: "I am ready to design real impact.\nAnd grow through collaboration.",
            quoteKr: "이제는 실제 변화를 만드는 디자인을 하고 싶습니다.\n협업 속에서 더 크게 성장하겠습니다.",
            img: connect07
        }
    ];

    // --- 3-PHASE HYBRID SCROLL ---
    const frameHeight = 2780;
    const currentScale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--connect-scale')) || 1;
    const scaledFrameHeight = frameHeight * currentScale;

    // TARGETING THE "SECOND IMAGE" FRAME
    // focusY tuned to 1275 to balance top title and bottom Korean text visibility.
    const focusY = 1250;
    const sweetSpotY = Math.max((focusY * currentScale) - (viewportHeight / 2), 0);
    const endSpotY = Math.max(scaledFrameHeight - viewportHeight, 0);

    let translateY = 0;
    let horizontalProgress = 0;

    const introEnd = 0.12;
    const stickEnd = 1;

    if (scrollProgress < introEnd) {
        // Phase 1: Intro (Top -> Sticky Frame)
        const p = scrollProgress / introEnd;
        translateY = -(p * sweetSpotY);
        horizontalProgress = 0;
    } else if (scrollProgress <= stickEnd) {
        // Phase 2: Sticky (Horizontal progression)
        translateY = -sweetSpotY;
        horizontalProgress = Math.min((scrollProgress - introEnd) / (stickEnd - introEnd), 1);
    } else {
        // Phase 3: Keep frame fixed until section ends (no fade-out)
        translateY = -sweetSpotY;
        horizontalProgress = 1;
    }

    // Horizontal Scroll logic centered on 1540px bar
    const pointGap = 450;
    const barWidth = 1540;
    const barLeft = 180;
    const baseCenter = (1920 / 2) - barLeft;
    const moveRange = pointGap * (timelineData.length - 1);
    const translateX = baseCenter - (horizontalProgress * moveRange);

    // Active Index
    const centerX = baseCenter;
    const activeIndex = timelineData.reduce((bestIdx, _item, idx) => {
        const pointX = (idx * pointGap) + translateX;
        const bestX = (bestIdx * pointGap) + translateX;
        return Math.abs(pointX - centerX) < Math.abs(bestX - centerX) ? idx : bestIdx;
    }, 0);
    const stageTitle = timelineData[activeIndex]?.stageTitle || '';
    const lastIndex = timelineData.length - 1;

    return (
        <section id="connect" className="connect-section" ref={sectionRef}>
            <div className="connect-sticky-container">
                <div
                    className="connect-scale-wrapper"
                    style={{
                        transform: `translate(-50%, 0) scale(var(--connect-scale, 1))`,
                        top: `${translateY / currentScale}px`
                    }}
                >
                    <div className="pixel-bg-pink"></div>
                    <div className="pixel-bg-blue"></div>

                    {/* Hover Image Background */}
                    <div className="connect-hover-bg">
                        {timelineData.map((item, idx) => (
                            <img
                                key={idx}
                                src={item.img}
                                alt={`Connect ${item.year}`}
                                className={`c-hover-img ${hoveredIdx === idx ? 'is-visible' : ''} ${item.id === '07' ? 'is-right' : ''}`}
                            />
                        ))}
                    </div>

                    <div className="pixel-visual-mass">
                        <div className="pixel-bowl"></div>
                        <div className="pixel-ball ball-1"></div>
                        <div className="pixel-ball ball-2"></div>
                        <div className="pixel-ball ball-3"></div>
                        <div className="pixel-ball ball-4"></div>
                    </div>

                    <div className="pixel-content-area">
                        <div className="stage-labels">
                            <h4 className="school-days-text">{stageTitle}</h4>
                        </div>

                        <div className="pixel-timeline-bar">
                            <div className="bar-red-line"></div>
                            <div
                                className="bar-points-track"
                                style={{ transform: `translateX(${translateX}px)` }}
                            >
                                {timelineData.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`bar-point ${idx === activeIndex ? 'is-active' : ''} ${idx === activeIndex && idx === lastIndex ? 'is-final' : ''}`}
                                        onMouseEnter={() => setHoveredIdx(idx)}
                                        onMouseLeave={() => setHoveredIdx(null)}
                                    >
                                        <div className="dot"></div>
                                        <div className="label">
                                            <span className="l-id">{item.id}</span>
                                            <span className="l-txt">{item.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="stage-quote">
                            <h2 className="quote-en">
                                {timelineData[activeIndex].quoteEn.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>{line}<br /></React.Fragment>
                                ))}
                            </h2>
                            <p className="quote-kr">
                                {timelineData[activeIndex].quoteKr.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>{line}<br /></React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Connect;
