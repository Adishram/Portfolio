import MacOSDock from './ui/mac-os-dock';
import { TypingAnimation } from './ui/typing-animation';

const dockApps = [
    {
        id: 'finder',
        name: 'Finder',
        icon: 'https://cdn.jim-nielsen.com/macos/1024/finder-2021-09-10.png?rf=1024',
    },
    {
        id: 'safari',
        name: 'Safari',
        icon: 'https://cdn.jim-nielsen.com/macos/1024/safari-2021-06-02.png?rf=1024',
    },
    {
        id: 'mail',
        name: 'Mail',
        icon: 'https://cdn.jim-nielsen.com/macos/1024/mail-2021-05-25.png?rf=1024',
    },
    {
        id: 'photos',
        name: 'Photos',
        icon: 'https://cdn.jim-nielsen.com/macos/1024/photos-2021-05-28.png?rf=1024',
    },
    {
        id: 'music',
        name: 'Music',
        icon: 'https://cdn.jim-nielsen.com/macos/1024/music-2021-05-25.png?rf=1024',
    },
    {
        id: 'notes',
        name: 'Notes',
        icon: 'https://cdn.jim-nielsen.com/macos/1024/notes-2021-05-25.png?rf=1024',
    },
    {
        id: 'terminal',
        name: 'Terminal',
        icon: 'https://cdn.jim-nielsen.com/macos/1024/terminal-2021-06-03.png?rf=1024',
    },
    {
        id: 'calculator',
        name: 'Calculator',
        icon: 'https://cdn.jim-nielsen.com/macos/1024/calculator-2021-04-29.png?rf=1024',
    },
    {
        id: 'calendar',
        name: 'Calendar',
        icon: 'https://cdn.jim-nielsen.com/macos/1024/calendar-2021-04-29.png?rf=1024',
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg',
    },
    {
        id: 'github',
        name: 'GitHub',
        icon: '/github-color.svg',
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: '/whatsapp-color.svg',
    },
];

const socialLinks: Record<string, string> = {
    linkedin: 'https://linkedin.com/in/adish-ram-377a2722a',
    github: 'https://github.com/Adishram',
    whatsapp: 'https://wa.me/916374350955/',
};

export default function HomeSection() {
    const handleAppClick = (appId: string) => {
        const url = socialLinks[appId];
        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <section id="home">
            <div className="marquee-container">
                <div className="marquee">
                    • full stack developer • ai &amp; ml engineer •
                </div>
            </div>
            <div className="portrait-container">
                <img src="/prof.pic.png" alt="Adish Ram" className="portrait" />
            </div>
            <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                marginBottom: '10px',
            }}>
                <MacOSDock
                    apps={dockApps}
                    onAppClick={handleAppClick}
                    openApps={['finder', 'safari']}
                />
            </div>
            <div className="scroll-indicator">
                <span>Scroll Down</span>
                <div className="scroll-arrow"></div>
            </div>
        </section>
    );
}
