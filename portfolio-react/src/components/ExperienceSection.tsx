import { useEffect, useRef } from 'react';
import { ThreeDPhotoCarousel } from './ui/3d-carousel';
import { LiquidButton } from './ui/liquid-glass-button';
import { TypingAnimation } from './ui/typing-animation';
import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/ui/scroll-based-velocity';

const certificateImages = [
    '/mern.jpeg',
    '/nextjs.PNG',
    '/quantum.png',
    '/introtodl.png',
    '/x-code.png',
    '/azureai.png',
    '/hackathon.jpeg',
];

const skillsList = [
    'HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Next.js', 'TypeScript', 'Tailwind CSS'
];

export default function ExperienceSection() {
    return (
        <section id="experience" style={{ overflow: 'hidden' }}>
            <h2 className="section-title">
                <TypingAnimation>Experience &amp; Certifications</TypingAnimation>
            </h2>

            <div className="w-full relative flex justify-center items-center overflow-visible">
                <div className="w-full max-w-[100vw] flex justify-center mt-12 mb-12">
                    <div className="p-2 w-full flex justify-center">
                        <ThreeDPhotoCarousel images={certificateImages} />
                    </div>
                </div>
            </div>

            {/* Extra massive spacing above button */}
            <div className="h-36 w-full"></div>

            <div className="flex justify-center py-12">
                <LiquidButton
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    className="text-lg px-12 py-4 h-16 w-64 max-w-[90vw]"
                    onClick={() => window.open('/AdishRam_Resume copy.pdf', '_blank')}
                >
                    Download Resume
                </LiquidButton>
            </div>

            {/* Extra massive spacing below button */}
            <div className="h-36 w-full"></div>

            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-16">
                <ScrollVelocityContainer className="text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem] text-primary dark:text-white">
                    <ScrollVelocityRow baseVelocity={20} direction={1}>
                        {skillsList.join(' • ')} •
                    </ScrollVelocityRow>
                    <ScrollVelocityRow baseVelocity={20} direction={-1}>
                        {skillsList.reverse().join(' • ')} •
                    </ScrollVelocityRow>
                </ScrollVelocityContainer>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background dark:from-black to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background dark:from-black to-transparent"></div>
            </div>
        </section>
    );
}
