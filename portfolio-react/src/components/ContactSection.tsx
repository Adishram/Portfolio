import { useState } from 'react';
import { LiquidButton } from './ui/liquid-glass-button';
import { TypingAnimation } from './ui/typing-animation';

export default function ContactSection() {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            setShowSuccess(true);
        }, 1000);
    };

    const handleBack = () => {
        setShowSuccess(false);
    };

    return (
        <section id="contact">
            <div className="decorative-orb orb-1"></div>
            <div className="decorative-orb orb-2"></div>

            <div className="contact-container">
                <div className="contact-header">
                    <h1 style={{ display: 'flex', justifyContent: 'center' }}>
                        <TypingAnimation>Get in Touch</TypingAnimation>
                    </h1>
                    <p>I'd love to hear from you</p>
                </div>

                <form id="contact-form" action="https://formspree.io/f/mvoeydzn" method="POST" onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className="input-group">
                            <input type="text" name="name" placeholder="Name" required />
                        </div>
                        <div className="input-group">
                            <input type="email" name="email" placeholder="Email" required />
                        </div>
                        <div className="input-group">
                            <textarea name="message" placeholder="Message" required></textarea>
                        </div>
                        <LiquidButton type="submit" className="w-full">
                            Send Message
                        </LiquidButton>

                        <div className={`form-success${showSuccess ? ' show' : ''}`} id="form-success">
                            <div className="success-icon">✓</div>
                            <h3 className="success-message">Message Sent!</h3>
                            <p className="success-details">Thank you for reaching out. I'll get back to you soon.</p>
                            <LiquidButton type="button" onClick={handleBack} className="w-full mt-4">
                                Send Another Message
                            </LiquidButton>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
