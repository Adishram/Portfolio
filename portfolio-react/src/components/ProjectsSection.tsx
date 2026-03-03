import { WebcamPixelGrid } from './ui/webcam-pixel-grid';
import { TypingAnimation } from './ui/typing-animation';

export default function ProjectsSection() {
    return (
        <section id="projects" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Webcam pixel grid background */}
            <div className="absolute inset-0" style={{ zIndex: 0 }}>
                <WebcamPixelGrid
                    gridCols={60}
                    gridRows={40}
                    maxElevation={50}
                    motionSensitivity={0.25}
                    elevationSmoothing={0.2}
                    colorMode="webcam"
                    backgroundColor="#030303"
                    mirror={true}
                    gapRatio={0.05}
                    invertColors={false}
                    darken={0.6}
                    borderColor="#ffffff"
                    borderOpacity={0.06}
                    className="w-full h-full"
                    onWebcamReady={() => console.log('Webcam ready!')}
                    onWebcamError={(err) => console.error('Webcam error:', err)}
                />
            </div>

            {/* Gradient overlay for readability */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent, rgba(0,0,0,0.6))',
                    zIndex: 1,
                }}
            />

            {/* Content on top */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 className="section-title-proj" style={{ color: 'white' }}>
                    <TypingAnimation>My Projects</TypingAnimation>
                </h2>
                <div className="projects-container">
                    <div className="file-img">
                        <img
                            id="hoverImage"
                            src="/folder-icon-macos.png"
                            alt="Projects folder"
                            onClick={() => (window.location.href = '/prod.html')}
                        />
                        <div className="project-preview">
                            <h3>Project Portfolio</h3>
                            <p>Click to view all my projects including web applications, AI models, and mobile apps</p>
                        </div>
                    </div>
                    <div className="project-text-behind">
                        <span style={{ color: 'white' }}>Portfolio</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
