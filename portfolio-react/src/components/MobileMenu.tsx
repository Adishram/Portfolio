export default function MobileMenu({ isOpen, onClose }) {
    const scrollTo = (id) => {
        onClose();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={`mobile-menu${isOpen ? ' active' : ''}`} id="mobile-menu">
            <span className="close-menu" id="close-menu" onClick={onClose}>✕</span>
            <ul>
                <li><a className="mobile-link" onClick={() => scrollTo('home')}>Home</a></li>
                <li><a className="mobile-link" onClick={() => scrollTo('about')}>About</a></li>
                <li><a className="mobile-link" onClick={() => scrollTo('skills')}>Skills</a></li>
                <li><a className="mobile-link" onClick={() => scrollTo('experience')}>Experience</a></li>
                <li><a className="mobile-link" onClick={() => scrollTo('projects')}>Projects</a></li>
                <li><a className="mobile-link" onClick={() => scrollTo('contact')}>Contact</a></li>
            </ul>
        </div>
    );
}
