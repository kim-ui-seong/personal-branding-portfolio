import React, { useEffect, useRef, useState } from 'react';
import './Running.css';

const Running = () => {
    const titleRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (titleRef.current) observer.observe(titleRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="running-section">
            <div className="running-frame">
                <h2 ref={titleRef} className={`running-title ${isVisible ? 'reveal' : ''}`}>
                    STILL LEARNING.
                </h2>
            </div>
        </section>
    );
};

export default Running;
