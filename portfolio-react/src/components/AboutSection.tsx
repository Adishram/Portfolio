import { PixelImage } from '@/components/ui/pixel-image';
import { TextEffect } from '@/components/ui/text-effect';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Highlighter } from '@/components/ui/highlighter';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
    const [isVisible, setIsVisible] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.2 }
        );

        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }

        return () => observer.disconnect();
    }, []);
    return (
        <section id="about">
            <h2 className="section-title">
                <TypingAnimation>About Me</TypingAnimation>
            </h2>

            <div className="about-container">
                <div className="img_cont" style={{ overflow: 'visible', boxShadow: 'none', background: 'transparent' }}>
                    <PixelImage
                        src="/aboutbw.jpeg"
                        customGrid={{ rows: 4, cols: 6 }}
                        grayscaleAnimation
                    />
                </div>
                <div className="about_txt">
                    <h1 className="txt_1">
                        <TextEffect per="char" preset="fade">
                            I am Adish, An aspiring Full Stack developer doing his undergrad currently from Chennai, Tamilnadu.
                        </TextEffect>
                    </h1>
                    <p className="txt_2">
                        I am Adish Ram, an aspiring <Highlighter color="#87CEFA">Full Stack Developer and AI/ML Engineer</Highlighter> currently pursuing my undergraduate degree in Computer Science and Engineering at VIT Chennai, with a specialization in AI &amp; ML. I am passionate about building innovative and user-friendly applications that leverage the power of technology to solve real-world problems.
                    </p>
                    <p className="txt_2">
                        As a Full Stack Developer, I have a strong foundation in <Highlighter color="#FF9800" action="underline">front-end and back-end technologies</Highlighter>, allowing me to design and develop comprehensive web applications. I am proficient in various programming languages and frameworks, and I am always eager to learn and adapt to the ever-evolving tech landscape.
                    </p>
                    <p className="txt_2">
                        In addition to my academic pursuits, I serve as a Teaching Professional at VITeach, where I share my knowledge and experience with fellow underprivileged students. Furthermore, I contribute to iSpace VITC as an iOS Developer, working on exciting projects that enhance the digital experience. I am always seeking new challenges and opportunities to learn and grow, and I am eager to connect with other tech enthusiasts.
                    </p>
                </div>
            </div>

            <div className={`wrapper ${isVisible ? 'visible' : ''}`} ref={wrapperRef}>
                <div className="monitor">
                    <h1 id="adish-ram-text">Adish Ram</h1>

                    <div className="glass-rectangle">
                        I'm Adish — a frontend dev crafting clean, expressive UIs with React and Next.js. I blend precise design with smooth interactions, drawing from Apple-inspired aesthetics and modern minimalism. Every detail matters — from layout to motion to feel.
                        <br /><br />
                        My work is rooted in clarity, elegance, and consistency — whether it's a single page or a polished product experience. I don't just build interfaces, I shape how they feel.
                    </div>

                    <div className="glass-pill glass-adi"></div>
                    <div className="glass-pill glass-ram"></div>

                    <div className="label-container label-web">
                        <div className="web-circle"></div>
                        <span>WEB DEV</span>
                    </div>
                    <div className="label-container label-aiml">
                        <div className="aiml-circle"></div>
                        <span>AI&amp;ML</span>
                    </div>

                    <div className="image-inside-monitor">
                        <img src="/aboutbw1.jpeg" alt="Adish Ram" />
                    </div>

                    <div className="monitor-footer">
                        <span>Adish</span>
                        <div className="dotted-line-wrapper">
                            <div className="base-line"></div>
                            <div className="dotted-line">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div className="dot" key={i}></div>
                                ))}
                            </div>
                        </div>
                        <span>2025</span>
                    </div>
                </div>

                <div className="gradient-rectangle"></div>
            </div>
        </section>
    );
}
