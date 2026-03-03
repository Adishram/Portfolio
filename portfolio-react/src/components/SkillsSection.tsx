import { IconCloud } from '@/components/ui/icon-cloud';
import { TypingAnimation } from '@/components/ui/typing-animation';

const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
];

const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
);

export default function SkillsSection() {
    return (
        <section id="skills">
            <h2 className="section-title">
                <TypingAnimation>My Skills</TypingAnimation>
            </h2>
            <div className="flex items-center justify-center w-full" style={{ minHeight: '500px' }}>
                <IconCloud images={images} />
            </div>
        </section>
    );
}
