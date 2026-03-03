import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-screen${hidden ? ' hidden' : ''}`} id="loading-screen">
      <div className="loading-container">
        <div className="loading-dot"></div>
        <div className="loading-text">Loading</div>
      </div>
    </div>
  );
}
