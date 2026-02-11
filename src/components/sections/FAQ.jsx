import React, { useEffect, useRef, useState } from 'react';
import './FAQ.css';
import arrowIcon from '../../assets/arrow.png';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(-1);
    const [isTitleVisible, setIsTitleVisible] = useState(false);
    const titleRef = useRef(null);

    const faqs = [
        {
            question: 'UXUI 디자이너를 선택한 이유',
            keyword: 'WHY UXUI',
            answer: '결과물을 예쁘게 만드는 일보다, 의도가 잘 전달되도록 흐름을 설계하고 정리하는 과정에 더 큰 매력을 느꼈습니다.\n사용자의 행동을 기준으로 구조를 설계할 때 디자인이 가장 강력해진다고 믿으며, \n그 역할을 가장 잘 수행할 수 있는 직무가 UX/UI 디자이너라고 생각했습니다.'
        },
        {
            question: '코드 협업 경험',
            keyword: 'COLLAB',
            answer: '세번의 프로젝트를 통해 디자인이 구현 단계까지 이어질 때 비로소 완성된다는 사실을 배웠습니다. \nHTML·CSS를 직접 다뤄보며 개발 관점을 이해하려 노력했고, 의도를 명확히 전달하며 함께 해결하는 디자이너로 협업하고자 합니다.'},
        {
            question: '본인이 생각하는 좋은 팀문화',
            keyword: 'TEAMWORK',
            answer: '좋은 팀은 각자의 결과물을 지키기보다 더 나은 방향을 위해 언제든 수정할 수 있는 팀이라고 생각합니다. \n문제를 함께 정의하고 기준을 맞춰가는 과정 속에서 사용자 경험도 자연스럽게 좋아진다고 믿습니다.'
        },
        {
            question: '본인의 강약점 / 보완 루틴',
            keyword: 'ROUTINE',
            answer: '완성도를 높이기 위해 구조를 깊게 고민하며, 사용자가 자연스럽게 이해할 수 있는 흐름을 만드는 데 강점이 있습니다. \n다만 고민의 시간이 길어질 수 있어, 현재는 핵심을 빠르게 정리한 뒤 반복적으로 검증하고 개선하는 방식으로 일하고 있습니다.'
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsTitleVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (titleRef.current) observer.observe(titleRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="faq-section">
            <div className="faq-frame">
                <div id="qna" ref={titleRef} className={`faq-title-block ${isTitleVisible ? 'reveal' : ''}`}>
                    <h2 className="faq-title">QUICK ANSWERS!</h2>
                    <p className="faq-subtitle">Recreating Trendy Websites with Modern Code</p>
                    <p className="faq-subnote">HTML / CSS / JS / REACT / FIGMA</p>
                </div>

                <div className="faq-list">
                    {faqs.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <button
                                key={item.question}
                                type="button"
                                className={`faq-item ${isOpen ? 'is-open' : ''}`}
                                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                            >
                                <span className="question">{item.question}</span>
                                <span className="caret" aria-hidden="true">
                                    <img src={arrowIcon} alt="" className="caret-icon" />
                                </span>
                                <span className={`answer ${isOpen ? 'is-open' : ''}`}>
                                    <span className="keyword-pill">{item.keyword} -</span>
                                    <span className="answer-text">{item.answer}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
