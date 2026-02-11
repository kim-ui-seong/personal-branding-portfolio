import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';
import './CloneCoding.css'; // Keep CSS separate for organization

// Project Images
import monamiImg from '../../assets/project-monami.png';
import dugoutImg from '../../assets/project-dugout.png';
import clingImg from '../../assets/project-cling.png';

// Clone Coding Images
import mini1 from '../../assets/clonecoding-mini-crewalamode.png';
import main1 from '../../assets/clonecoding-main-crewalamode.png';
import hover1 from '../../assets/clonecoding-hover-crewalamode.png';
import mini2 from '../../assets/clonecoding-mini-musign.png';
import main2 from '../../assets/clonecoding-main-musign.png';
import hover2 from '../../assets/clonecoding-hover-musign.png';
import mini3 from '../../assets/clonecoding-mini-daebang.png';
import main3 from '../../assets/clonecoding-main-daebang.png';
import hover3 from '../../assets/clonecoding-hover-daebang.png';
import mini4 from '../../assets/clonecoding-mini-ystudio.png';
import main4 from '../../assets/clonecoding-main-ystudio.png';
import hover4 from '../../assets/clonecoding-hover-ystudio.png';
import mini5 from '../../assets/clonecoding-mini-phomein.png';
import main5 from '../../assets/clonecoding-main-phomein.png';
import hover5 from '../../assets/clonecoding-hover-phomein.png';
import mini6 from '../../assets/clonecoding-mini-concierge.png';
import main6 from '../../assets/clonecoding-main-concierge.png';
import hover6 from '../../assets/clonecoding-hover-concierge.png';

// Individual Card Component for repeatable scroll reveal
const ProjectCard = ({ project, idx, ctaLinks }) => {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Toggle visibility based on viewport
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    const getCtaLabel = (cta) => (typeof cta === 'string' ? cta : cta.label);
    const getCtaHref = (cta, ctaIdx) => {
        if (typeof cta === 'object' && cta && cta.href) return cta.href;
        return ctaLinks?.[ctaIdx] || '#';
    };

    return (
        <div
            ref={cardRef}
            className={`project-card-item ${idx % 2 === 1 ? 'is-reverse' : ''} ${isVisible ? 'is-visible' : ''}`}
        >
            <div className="project-text-box">
                <h3 className="p-title">{project.title}</h3>
                <p className="p-tags">{project.tags.split('\n').map((l, i) => <React.Fragment key={i}>{l}<br /></React.Fragment>)}</p>
                <div className="project-metrics">
                    {project.metrics.map((metric) => (
                        <div key={metric.label} className="metric-row">
                            <span className="metric-label">{metric.label}</span>
                            <div className="metric-bar">
                                <span
                                    className="metric-fill"
                                    style={{ '--metric-value': `${metric.value}%` }}
                                ></span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="project-cta-group">
                    {project.ctas.map((cta, ctaIdx) => (
                        <a
                            key={`${getCtaLabel(cta)}-${ctaIdx}`}
                            href={getCtaHref(cta, ctaIdx)}
                            className="project-cta-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {getCtaLabel(cta)}
                        </a>
                    ))}
                </div>
            </div>
            <div className="project-thumbnail-box">
                <img src={project.img} alt={project.title} className="p-img" />
            </div>
        </div>
    );
};

const Projects = () => {
    const sectionRef = useRef(null);
    const scaleWrapperRef = useRef(null);
    const projectTitleRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const [isSectionActive, setIsSectionActive] = useState(false);
    const [sectionBounds, setSectionBounds] = useState(null);
    const [isProjectTitleVisible, setIsProjectTitleVisible] = useState(false);
    const [isCloneTitleVisible, setIsCloneTitleVisible] = useState(false);
    const [isConnectOverlapping, setIsConnectOverlapping] = useState(false);

    // Clone Coding State
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth || 1920;
            const height = window.innerHeight || 1080;
            setViewportHeight(height);
            setViewportWidth(width);
            const scale = width / 1920;
            document.documentElement.style.setProperty('--projects-scale', scale.toString());
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const start = rect.top;
            const height = rect.height;
            const windowHeight = window.innerHeight;
            const isInView = rect.bottom > 0 && rect.top < windowHeight;
            setSectionBounds({ top: rect.top, bottom: rect.bottom });
            const connectSection = document.getElementById('connect');
            if (connectSection) {
                const connectRect = connectSection.getBoundingClientRect();
                const connectInView = connectRect.bottom > 0 && connectRect.top < windowHeight;
                setIsConnectOverlapping(connectInView);
            } else {
                setIsConnectOverlapping(false);
            }

            if (start <= 0 && rect.bottom > 0) {
                const progress = Math.abs(start) / (height - windowHeight);
                const clampedProgress = Math.min(Math.max(progress, 0), 1);
                setScrollProgress(clampedProgress);
            } else if (start > 0) {
                setScrollProgress(0);
            } else {
                setScrollProgress(1);
            }
            setIsSectionActive(isInView);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const projectCtaLinks = [
        ['https://www.figma.com/proto/qynwlfwUAFyqPuzetAsTgD/%EB%AA%A8%EB%82%98%EB%AF%B8-%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=1-459&viewport=352%2C337%2C0.09&t=pgRcUtGoxl8dmwQ7-1&scaling=scale-down-width&content-scaling=fixed', 'https://meongpunch.github.io/monamifinal/'], //모나미
        ['https://www.figma.com/proto/n3hqv2ylXq3DTAa4P5lmxZ/%EB%8D%95%EC%95%84%EC%9B%83-%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=1-376&viewport=100%2C83%2C0.25&t=90RI3YffneAxMiKQ-1&scaling=scale-down-width&content-scaling=fixed', 'https://dugout-ruby.vercel.app/'], //덕아웃
        ['https://www.figma.com/proto/Spg9aQhesLnbynyPgXXFGu/4.%EA%B9%80%EC%9D%98%EC%84%B1?page-id=1015%3A122&node-id=1607-5238&viewport=5066%2C10315%2C0.46&t=wq65kE3dUcu6BMp8-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=1015%3A4302', 'https://www.figma.com/proto/Spg9aQhesLnbynyPgXXFGu/4.%EA%B9%80%EC%9D%98%EC%84%B1?page-id=1015%3A122&node-id=1015-4302&viewport=1194%2C4276%2C0.17&t=BXfsBEjHdBvmkvjj-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1015%3A4302'] //클링
    ];

    const projectsData = [
        {
            title: "MONAMI SITE RENEWAL",
            tags: "MONAMI WEB SITE DESIGN PROJECT\n2025.11~2025.12",
            img: monamiImg,
            metrics: [
                { label: '디자인', value: 78 },
                { label: '코딩', value: 52 },
                { label: '기획서', value: 80 }
            ],
            ctas: ['기획서 바로가기', 'SITE 바로가기']
        },
        {
            title: "K-PANDOM APP 'DUGOUT'",
            tags: "PANDOM SERVICE APP DESIGN PROJECT\n2025.01~2025.01",
            img: dugoutImg,
            metrics: [
                { label: '디자인', value: 84 },
                { label: '코딩', value: 60 },
                { label: '기획서', value: 72 }
            ],
            ctas: ['기획서 바로가기', 'APP 바로가기']
        },
        {
            title: "RECYCLING APP UXUI",
            tags: "PERSONAL PROJECT / RECYCLE GREEN PLAN\n2025.10~2025.11",
            img: clingImg,
            metrics: [
                { label: '디자인', value: 90 },
                { label: '기획서', value: 90 }
            ],
            ctas: ['기획서 바로가기', 'PROTOTYPE 바로가기']
        }
    ];

    const cloneData = [
        { id: '01', name: 'CREW A LA MODE', mini: mini1, main: main1, hover: hover1, url: '#' },
        { id: '02', name: 'MUSIGN', mini: mini2, main: main2, hover: hover2, url: '#' },
        { id: '03', name: 'DAEBANG', mini: mini3, main: main3, hover: hover3, url: '#' },
        { id: '04', name: 'YSTUDIO', mini: mini4, main: main4, hover: hover4, url: '#' },
        { id: '05', name: 'PHOMEIN', mini: mini5, main: main5, hover: hover5, url: '#' },
        { id: '06', name: 'CONCIERGE', mini: mini6, main: main6, hover: hover6, url: '#' },
    ];

    const currentCloneItem = cloneData[selectedIndex];

    const rotateToIndex = (nextIndex) => {
        const total = cloneData.length;
        const normalizedNext = (nextIndex + total) % total;
        setSelectedIndex(normalizedNext);
    };


    // Growing Ball Logic - SNAP positions (bouncy discrete movement)
    // Define 5 "snap points" with zigzag pattern
    const snapCount = 5;
    const currentSnap = Math.floor(scrollProgress * snapCount);

    // Zigzag positions (left-right-left-right-center) with smaller sizes
    const finalSnapY = Math.max(520, Math.round(viewportHeight * 0.6));
    const snapPositions = [
        { x: -350, y: 120, size: 120 },   // Far left top (lowered to avoid clipping)
        { x: 400, y: 180, size: 180 },    // Far right
        { x: -300, y: 320, size: 240 },   // Far left bottom
        { x: 350, y: 220, size: 310 },    // Far right middle
        { x: 0, y: finalSnapY, size: 420 } // Lower center (final)
    ];

    const currentPosition = snapPositions[Math.min(currentSnap, snapCount - 1)];
    const ballSize = currentPosition.size;
    const ballOffX = currentPosition.x;
    const ballOffY = currentPosition.y;

    // Final transition: center ball, then expand into full 1920x1080 cream frame for Hobby section
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const smoothstep = (t) => t * t * (3 - 2 * t);
    const centerStart = 0.9;
    const transitionStart = 0.97;
    const centerProgressRaw = clamp((scrollProgress - centerStart) / (transitionStart - centerStart), 0, 1);
    const transitionProgressRaw = clamp((scrollProgress - transitionStart) / (1 - transitionStart), 0, 1);
    const centerProgress = smoothstep(centerProgressRaw);
    const transitionProgress = smoothstep(transitionProgressRaw);
    const overscan = 260;
    const fullWidth = Math.max(1920, viewportWidth + overscan);
    const fullHeight = Math.max(1080, viewportHeight + overscan);
    const finalSemiHeight = Math.max(fullWidth / 2, viewportHeight * 0.55);

    const ballWidth = ballSize + (fullWidth - ballSize) * transitionProgress;
    const ballHeight = ballSize + (finalSemiHeight - ballSize) * transitionProgress;
    const centeredX = ballOffX * (1 - centerProgress);
    const centeredY = ballOffY * (1 - centerProgress);
    const ballX = centeredX * (1 - transitionProgress);
    const semiProgress = smoothstep(clamp((transitionProgress - 0.92) / 0.08, 0, 1));
    const ballRadius = semiProgress > 0
        ? '50% 50% 0 0 / 100% 100% 0 0'
        : '50%';
    const semiOffsetY = viewportHeight * 0.35;
    const ballY = (centeredY * (1 - transitionProgress)) + (semiOffsetY * semiProgress);

    // 1920x10000 Total Frame (Projects 7660 + CloneCoding)
    const frameHeight = 9000;
    const currentScale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--projects-scale')) || 1;
    const scrollableDistance = Math.max((frameHeight * currentScale) - viewportHeight, 0);
    // Hold scroll briefly when title is on screen (anchored to title position)
    const titleHold = 0.4;
    const translateY = scrollProgress <= titleHold
        ? 0
        : -(((scrollProgress - titleHold) / (1 - titleHold)) * scrollableDistance);

    const hasBounds = !!sectionBounds;
    const maskBuffer = viewportHeight * 0.2;
    const isNearViewport = hasBounds
        && sectionBounds.bottom > -maskBuffer
        && sectionBounds.top < viewportHeight + maskBuffer;
    const maskVisible = false;
    const maskFadeStart = 0.985;
    const maskFadeEnd = 1;
    const maskFade = smoothstep(clamp((transitionProgress - maskFadeStart) / (maskFadeEnd - maskFadeStart), 0, 1));
    const maskOpacity = maskVisible ? (1 - maskFade) : 0;
    const maskColor = transitionProgress > 0.98 ? '#F3F3E9' : '#AFD8FB';
    const hobbyReveal = transitionProgress >= 0.995;

    useEffect(() => {
        const root = document.documentElement;
        if (maskVisible && !hobbyReveal) {
            root.setAttribute('data-projects-mask', 'on');
        } else {
            root.setAttribute('data-projects-mask', 'off');
        }
        root.setAttribute('data-hobby-reveal', hobbyReveal ? 'on' : 'off');
        return () => {
            root.setAttribute('data-projects-mask', 'off');
            root.setAttribute('data-hobby-reveal', 'off');
        };
    }, [maskVisible, hobbyReveal]);

    return (
        <section id="projects" className={`projects-section ${isSectionActive ? 'reveal' : ''} ${isConnectOverlapping ? 'connect-overlap' : ''}`} ref={sectionRef}>
            <div className="projects-sticky-container">
                {/* Unified Growing Ball Background */}
                <div
                    className="growing-background-ball"
                    style={{
                        width: `${ballWidth}px`,
                        height: `${ballHeight}px`,
                        transform: `translate(calc(-50% + ${ballX}px), calc(-50% + ${ballY}px))`,
                        backgroundColor: '#F3F3E9',
                        borderRadius: ballRadius,
                        opacity: 1
                    }}
                />

                <div
                    className="projects-scale-wrapper"
                    style={{
                        transform: `translate(-50%, 0) scale(var(--projects-scale, 1))`,
                        top: `${translateY / currentScale}px`
                    }}
                    ref={scaleWrapperRef}
                >
                    {/* PROJECTS LAYER */}
                    <div className="projects-content-layer">
                        <TitleReveal title="IT'S MY PROJECT!" className="it-is-title" titleRef={projectTitleRef} disabled={isConnectOverlapping} />
                        <div className="project-title-spacer" />
                        <div className="project-list">
                            {projectsData.map((project, idx) => (
                                <ProjectCard
                                    key={idx}
                                    project={project}
                                    idx={idx}
                                    ctaLinks={projectCtaLinks[idx]}
                                />
                            ))}
                        </div>
                    </div>

                    {/* CLONE CODING LAYER */}
                    <div className="clone-coding-layer">
                        <TitleReveal title="CLONE CODING" className="clone-title" />
                        <div className="clone-interactive-zone">
                            <div className="clone-sidebar">
                                <div className="clone-info-meta">
                                    <span className="c-num">{currentCloneItem.id}</span>
                                    <h3 className="c-name">{currentCloneItem.name}</h3>
                                </div>
                            </div>

                            {/* Main Preview */}
                            <div className="clone-main-preview">
                                <div
                                    className="main-image-frame"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    {isHovered ? (
                                        <a
                                            href={currentCloneItem.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="main-hover-link"
                                            aria-label={`${currentCloneItem.name} 바로가기`}
                                        >
                                            <img src={currentCloneItem.hover} alt={currentCloneItem.name} className="main-display-img" />
                                        </a>
                                    ) : (
                                        <>
                                            <img src={currentCloneItem.main} alt={currentCloneItem.name} className="main-display-img" />
                                            <div className="hover-hint">HOVER TO VIEW REAL SITE</div>
                                        </>
                                    )}
                                </div>

                                <div className="frame-rotate-controls">
                                    <button
                                        type="button"
                                        className="frame-rotate-btn is-left"
                                        aria-label="Rotate thumbnails counterclockwise"
                                        onClick={() => rotateToIndex(selectedIndex - 1)}
                                    />
                                    <button
                                        type="button"
                                        className="frame-rotate-btn is-right"
                                        aria-label="Rotate thumbnails clockwise"
                                        onClick={() => rotateToIndex(selectedIndex + 1)}
                                    />
                                </div>

                                {/* Circular Thumbnail Carousel - Right Side (Step rotation) */}
                                <div className="clone-circular-window">
                                    <div className="clone-circular-carousel">
                                        <div className="clone-circular-rotator">
                                            {cloneData.map((item, idx) => {
                                                const total = cloneData.length;
                                                const angleStep = 360 / total;
                                                const activeAngle = 180; // 9 o'clock
                                                const baseAngle = (idx - selectedIndex) * angleStep + activeAngle;
                                                const radians = (baseAngle * Math.PI) / 180;
                                                const radius = 200;
                                                const isActive = selectedIndex === idx;
                                                const x = Math.cos(radians) * radius;
                                                const y = Math.sin(radians) * radius;
                                                const isLeftSide = Math.cos(radians) <= 0;

                                                return (
                                                    <button
                                                        key={item.id}
                                                        type="button"
                                                        className={`circular-thumb-item ${isActive ? 'is-active' : ''}`}
                                                        style={{
                                                            transform: `translate(${x}px, ${y}px)`,
                                                            opacity: isLeftSide ? 1 : 0,
                                                            pointerEvents: isLeftSide ? 'auto' : 'none'
                                                        }}
                                                        onClick={() => rotateToIndex(idx)}
                                                        aria-label={`Select ${item.name}`}
                                                    >
                                                        <img src={item.mini} alt={item.name} className="m-img" />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Title Reveal Component - repeatable animation on scroll
const TitleReveal = ({ title, className, titleRef, disabled = false }) => {
    const ref = useRef(null);
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Toggle reveal state based on visibility
                setIsRevealed(entry.isIntersecting && !disabled);
            },
            { threshold: 0.2, rootMargin: '0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [disabled]);

    useEffect(() => {
        if (disabled) {
            setIsRevealed(false);
        }
    }, [disabled]);

    const setRefs = (node) => {
        ref.current = node;
        if (titleRef) titleRef.current = node;
    };

    return <h2 ref={setRefs} className={`${className} ${isRevealed ? 'reveal' : ''}`}>{title}</h2>;
};

export default Projects;
