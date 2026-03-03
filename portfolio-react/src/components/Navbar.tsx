import { useState, useEffect } from 'react';

export default function Navbar({ isDark, onToggleTheme, onOpenMobileMenu }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <nav
                className={`navbar ${!scrolled ? 'relative isolate border-none bg-transparent shadow-none' : ''}`}
                style={!scrolled ? { background: 'transparent', boxShadow: 'none' } : {}}
            >
                {!scrolled && (
                    <>
                        <div className="absolute top-0 left-0 z-[-2] h-full w-full rounded-[0.9375rem] 
                    shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] 
                transition-all 
                dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
                        <div
                            className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden rounded-[0.9375rem]"
                            style={{ backdropFilter: 'url("#navbar-glass")' }}
                        />
                    </>
                )}

                <div className="logo cursor-pointer z-10" onClick={() => scrollTo('home')}>Adish Ram</div>
                <ul className="z-10">
                    <li><a onClick={() => scrollTo('home')}>Home</a></li>
                    <li><a onClick={() => scrollTo('about')}>About</a></li>
                    <li><a onClick={() => scrollTo('skills')}>Skills</a></li>
                    <li><a onClick={() => scrollTo('experience')}>Experience</a></li>
                    <li><a onClick={() => scrollTo('projects')}>Projects</a></li>
                    <li><a onClick={() => scrollTo('contact')}>Contact</a></li>
                </ul>
                <button className="theme-toggle z-10" id="theme-toggle" onClick={onToggleTheme}>
                    {isDark ? '☀️' : '🌙'}
                </button>
                <button className="mobile-menu-btn z-10" id="mobile-menu-btn" onClick={onOpenMobileMenu}>
                    ☰
                </button>
            </nav>

            <svg className="hidden">
                <defs>
                    <filter
                        id="navbar-glass"
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.05 0.05"
                            numOctaves="1"
                            seed="1"
                            result="turbulence"
                        />
                        <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="blurredNoise"
                            scale="70"
                            xChannelSelector="R"
                            yChannelSelector="B"
                            result="displaced"
                        />
                        <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
                        <feComposite in="finalBlur" in2="finalBlur" operator="over" />
                    </filter>
                </defs>
            </svg>
        </>
    );
}
