import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Gallery.css';

import hobby01 from '../../assets/hobby-01.png';
import hobby02 from '../../assets/hobby-02.png';
import hobby03 from '../../assets/hobby-03.png';
import hobby04 from '../../assets/hobby-04.png';
import hobby05 from '../../assets/hobby-05.png';
import hobby06 from '../../assets/hobby-06.png';
import hobby07 from '../../assets/hobby-07.png';
import hobby08 from '../../assets/hobby-08.png';
import hobby09 from '../../assets/hobby-09.png';
import hobby10 from '../../assets/hobby-10.png';
import hobby11 from '../../assets/hobby-11.png';

const basePhotos = [
    { src: hobby01, className: 'hobby-01', alt: 'Hobby 01' },
    { src: hobby02, className: 'hobby-02', alt: 'Hobby 02' },
    { src: hobby03, className: 'hobby-03', alt: 'Hobby 03' },
    { src: hobby04, className: 'hobby-04', alt: 'Hobby 04' },
    { src: hobby05, className: 'hobby-05', alt: 'Hobby 05' },
    { src: hobby06, className: 'hobby-06', alt: 'Hobby 06' },
    { src: hobby07, className: 'hobby-07', alt: 'Hobby 07' },
    { src: hobby08, className: 'hobby-08', alt: 'Hobby 08' },
    { src: hobby09, className: 'hobby-09', alt: 'Hobby 09' },
    { src: hobby10, className: 'hobby-10', alt: 'Hobby 10' },
    { src: hobby11, className: 'hobby-11', alt: 'Hobby 11' },
];

const shuffleArray = (items) => {
    const array = [...items];
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Gallery = () => {
    const [viewportHeight, setViewportHeight] = useState(1080);
    const [parallax, setParallax] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [canRender, setCanRender] = useState(true);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth || 1920;
            const height = window.innerHeight || 1080;
            setViewportHeight(height);
            const scale = Math.min(width / 1920, 1);
            document.documentElement.style.setProperty('--gallery-scale', scale.toString());
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const photos = useMemo(() => shuffleArray(basePhotos), []);

    useEffect(() => {
        const root = document.documentElement;
        const updateCanRender = () => {
            setCanRender(root.getAttribute('data-projects-mask') !== 'on');
        };
        updateCanRender();
        const observer = new MutationObserver(updateCanRender);
        observer.observe(root, { attributes: true, attributeFilter: ['data-projects-mask'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!canRender) return () => {};
        let rafId = 0;
        const handleMove = (event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const relX = (event.clientX - rect.left) / rect.width - 0.5;
            const relY = (event.clientY - rect.top) / rect.height - 0.5;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                setParallax({
                    x: relX * 24,
                    y: relY * 24
                });
            });
        };

        const handleLeave = () => {
            if (rafId) cancelAnimationFrame(rafId);
            setParallax({ x: 0, y: 0 });
        };

        const section = sectionRef.current;
        if (!section) return () => {};
        section.addEventListener('mousemove', handleMove);
        section.addEventListener('mouseleave', handleLeave);

        return () => {
            section.removeEventListener('mousemove', handleMove);
            section.removeEventListener('mouseleave', handleLeave);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [canRender]);

    useEffect(() => {
        if (!canRender) return () => {};
        let rafId = 0;

        const updateVisibility = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const viewport = window.innerHeight || 0;
            const visibleTop = Math.max(rect.top, 0);
            const visibleBottom = Math.min(rect.bottom, viewport);
            const visibleHeight = Math.max(visibleBottom - visibleTop, 0);
            const ratio = viewport ? visibleHeight / viewport : 0;
            setIsVisible(ratio >= 0.8);
        };

        const handleScroll = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updateVisibility);
        };

        updateVisibility();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateVisibility);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateVisibility);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [canRender]);

    if (!canRender) {
        return <section className="gallery-section gallery-placeholder" aria-hidden="true" />;
    }

    return (
        <section ref={sectionRef} className={`gallery-section ${isVisible ? 'is-visible' : ''}`}>
            <div
                className="gallery-scale-wrapper"
                style={{
                    transform: 'translateX(-50%)',
                    height: `${viewportHeight}px`
                }}
            >
                <div
                    className="gallery-scale-content"
                    style={{
                        transform: 'scale(var(--gallery-scale, 1))'
                    }}
                >
                    <div className="gallery-frame">
                        <h2 className="gallery-title">YEAH, THAT&apos;S ME!</h2>
                    <div
                        className="gallery-photos"
                        style={{
                            transform: `translate(${parallax.x}px, ${parallax.y}px)`
                        }}
                    >
                        {photos.map((photo, index) => (
                            <img
                                key={photo.className}
                                src={photo.src}
                                alt={photo.alt}
                                className={`gallery-photo ${photo.className}`}
                                style={{ '--reveal-delay': `${index * 80}ms` }}
                            />
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
