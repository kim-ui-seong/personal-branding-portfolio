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
const ProjectCard = ({ project, idx }) => {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className={`project-card-item ${idx % 2 === 1 ? 'is-reverse' : ''} ${isVisible ? 'is-visible' : ''}`}
        >
            <div className="project-text-box">
                {/* Category & Duration */}
                <div className="p-header-row">
                    <span className="p-category">{project.tags}</span>
                    <span className="p-duration">{project.duration}</span>
                </div>

                {/* Title */}
                <h3 className="p-title">{project.title}</h3>

                {/* Description (Intro) */}
                <div className="p-section p-intro">
                    <h4 className="p-label">소개</h4>
                    <p className="p-desc-text">{project.description}</p>
                </div>

                {/* Takeaway */}
                <div className="p-section p-takeaway">
                    <h4 className="p-label">느낀 점 및 배운 점</h4>
                    <p className="p-desc-text">{project.takeaway}</p>
                </div>

                {/* Contribution */}
                <div className="p-section p-contribution">
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
                </div>

                {/* Links */}
                <div className="project-cta-group">
                    {project.ctas.map((cta, ctaIdx) => (
                        <a
                            key={ctaIdx}
                            href={cta.href}
                            className="project-cta-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {cta.label}
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



    const projectsData = [
        {
            title: "MONAMI SITE RENEWAL",
            description: "기존의 노후된 모나미 사이트를 현대적인 감각으로 재해석하여 리디자인했습니다. 사용자의 편의성을 고려한 UI와 브랜드 아이덴티티를 강화하는 UX를 목표로 했습니다.",
            duration: "2025.11 ~ 2025.12",
            takeaway: "웹 접근성을 고려한 컬러 조합과 타이포그래피의 중요성을 배웠습니다. 팀원들과의 협업을 통해 디자인 시스템을 구축하는 경험을 쌓았습니다.",
            contribution: "디자인 78%, 퍼블리싱 52%, 기획 80%를 담당하여 프로젝트 전반을 주도했습니다.",
            tags: "MONAMI WEB SITE DESIGN PROJECT",
            img: monamiImg,
            metrics: [
                { label: '디자인', value: 78 },
                { label: '코딩', value: 52 },
                { label: '기획서', value: 80 }
            ],
            ctas: [
                { label: '기획서 바로가기', href: 'https://www.figma.com/proto/qynwlfwUAFyqPuzetAsTgD/%EB%AA%A8%EB%82%98%EB%AF%B8-%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=1-459&viewport=352%2C337%2C0.09&t=pgRcUtGoxl8dmwQ7-1&scaling=scale-down-width&content-scaling=fixed' },
                { label: 'SITE 바로가기', href: 'https://meongpunch.github.io/monamifinal/' }
            ]
        },
        {
            title: "K-PANDOM APP 'DUGOUT'",
            description: "K-POP 팬덤을 위한 덕질 필수 앱 '덕아웃'을 기획하고 디자인했습니다. 팬들이 소통하고 굿즈를 거래할 수 있는 올인원 플랫폼을 지향합니다.",
            duration: "2025.01 ~ 2025.01",
            takeaway: "앱 서비스의 흐름을 설계하며 User Flow의 중요성을 이해했습니다. 프로토타이핑 툴을 활용하여 실제 앱과 유사한 인터랙션을 구현해보았습니다.",
            contribution: "기획부터 디자인, 프로토타이핑까지 1인 프로젝트로 진행하며 앱 서비스 구축의 전 과정을 경험했습니다.",
            tags: "PANDOM SERVICE APP DESIGN PROJECT",
            img: dugoutImg,
            metrics: [
                { label: '디자인', value: 84 },
                { label: '코딩', value: 60 },
                { label: '기획서', value: 72 }
            ],
            ctas: [
                { label: '기획서 바로가기', href: 'https://www.figma.com/proto/n3hqv2ylXq3DTAa4P5lmxZ/%EB%8D%95%EC%95%84%EC%9B%83-%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=1-376&viewport=100%2C83%2C0.25&t=90RI3YffneAxMiKQ-1&scaling=scale-down-width&content-scaling=fixed' },
                { label: 'APP 바로가기', href: 'https://dugout-ruby.vercel.app/' }
            ]
        },
        {
            title: "RECYCLING APP UXUI",
            description: "환경 보호를 위한 재활용 습관 형성 앱 '클링'의 UX/UI 프로젝트입니다. 게이미피케이션 요소를 도입하여 사용자의 지속적인 참여를 유도했습니다.",
            duration: "2025.10 ~ 2025.11",
            takeaway: "사용자 조사를 통해 페르소나를 설정하고, 그에 맞는 서비스를 기획하는 과정을 익혔습니다. 친환경적인 이미지를 시각화하는 방법에 대해 고민했습니다.",
            contribution: "UX 리서치와 UI 디자인을 전담하였으며, 그래픽 에셋 제작에도 크게 기여했습니다.",
            tags: "PERSONAL PROJECT / RECYCLE GREEN PLAN",
            img: clingImg,
            metrics: [
                { label: '디자인', value: 90 },
                { label: '기획서', value: 90 }
            ],
            ctas: [
                { label: '기획서 바로가기', href: 'https://www.figma.com/proto/HZdZgV61BUvdMTdLtCk5zI/%ED%81%B4%EB%A7%81-%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=1-1873&viewport=525%2C9614%2C0.24&t=byqnwBBnkgjzQgAu-1&scaling=min-zoom&content-scaling=fixed' },
                { label: 'PROTOTYPE 바로가기', href: 'https://www.figma.com/proto/Spg9aQhesLnbynyPgXXFGu/4.%EA%B9%80%EC%9D%98%EC%84%B1?page-id=1015%3A122&node-id=1015-4302&viewport=1194%2C4276%2C0.17&t=BXfsBEjHdBvmkvjj-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1015%3A4302' }
            ]
        }
    ];

    const cloneData = [
        { id: '01', name: 'CREW A LA MODE', mini: mini1, main: main1, hover: hover1, url: 'https://clone-coding4.vercel.app/' },
        { id: '02', name: 'MUSIGN', mini: mini2, main: main2, hover: hover2, url: 'https://clone-coding-five.vercel.app/' },
        { id: '03', name: 'DAEBANG', mini: mini3, main: main3, hover: hover3, url: 'https://clone-coding4-ohfg.vercel.app/' },
        { id: '04', name: 'YSTUDIO', mini: mini4, main: main4, hover: hover4, url: 'https://clone-coding2.vercel.app/' },
        { id: '05', name: 'PHOMEIN', mini: mini5, main: main5, hover: hover5, url: 'https://clone-coding6.vercel.app/' },
        { id: '06', name: 'CONCIERGE', mini: mini6, main: main6, hover: hover6, url: 'https://clone-coding2-km7v.vercel.app/' },
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
