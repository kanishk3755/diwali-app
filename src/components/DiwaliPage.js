import React, { useState, useRef } from 'react';
import '../DiwaliHome.css';

const DiwaliPage = () => {
  const [toast, setToast] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleToast = (text) => {
    setToast(text);
    setShowToast(true);
    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => setShowToast(false), 2200);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio || !audio.src) {
      handleToast('No music file found. (You can add diwali-music.mp3)');
      return;
    }
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
      handleToast('Music paused');
    } else {
      audio.play();
      setMusicPlaying(true);
      handleToast('Music playing 🎶');
    }
  };

  return (
    <div className="container" role="main">
      <svg className="firework fw1" viewBox="0 0 100 100" aria-hidden="true">
        <g fill="none" stroke="rgba(255,230,160,0.12)" strokeWidth="1.2">
          <circle cx="50" cy="50" r="28" strokeDasharray="2 3" />
          <g stroke="rgba(255,200,80,0.18)">
            <path d="M50 10 L50 0" />
            <path d="M50 90 L50 100" />
            <path d="M10 50 L0 50" />
            <path d="M90 50 L100 50" />
          </g>
        </g>
      </svg>

      <svg className="firework fw2" viewBox="0 0 100 100" aria-hidden="true">
        <g fill="none" stroke="rgba(255,160,60,0.08)" strokeWidth="1.8">
          <circle cx="50" cy="50" r="40" strokeDasharray="1 5" />
        </g>
      </svg>

      <header>
        <div className="brand">
          <div className="logo" aria-hidden="true">🪔</div>
          <div>
            <h1>
              Happy Diwali <span className="sparkles" aria-hidden="true"></span>
            </h1>
            <p className="lead">
              Light over darkness — celebrate with joy, sweets, and loved ones.
            </p>
          </div>
        </div>
        <nav aria-label="primary">
          <button className="btn" onClick={() => handleToast('Wishing you a joyful Diwali!')}>
            Send Wishes
          </button>
          <button className="btn" onClick={toggleMusic}>
            {musicPlaying ? 'Pause Music' : 'Play Music'}
          </button>
        </nav>
      </header>

      <section className="main">
        <div className="card greeting" aria-labelledby="greetTitle">
          <div>
            <h2 id="greetTitle">May the lights guide you —</h2>
            <p>
              Wishing you and your family a sparkling Diwali filled with happiness and prosperity.
            </p>
          </div>

          <div className="diya-row">
            {[1, 2, 3].map((_, i) => (
              <div className="diya" key={i} aria-hidden="true">
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <ellipse cx="32" cy="48" rx="22" ry="8" fill="rgba(0,0,0,0.2)" />
                    <path d="M12 44c0-8 8-14 20-14s20 6 20 14H12z" fill="#3b2a12" />
                    <path d="M32 20c3 0 6 2 7 5 1 3-1 5-4 6s-6-1-7-4c-1-3 0-7 4-7z" fill="#ffeb9e" />
                    <circle cx="32" cy="26" r="2" fill="#ffb74d" />
                  </g>
                </svg>
              </div>
            ))}
          </div>

          <div className="actions">
            <button className="btn" onClick={() => handleToast('Lights turned on ✨')}>
              Light Diyas
            </button>
            <button className="btn" onClick={() => handleToast('Fireworks ready 🎇')}>
              Launch Fireworks
            </button>
          </div>

          <article className="card" style={{ marginTop: '8px' }}>
            <h3>About Diwali</h3>
            <p>
              Diwali, the festival of lights, celebrates the victory of light over darkness, knowledge over ignorance, and hope over despair. People light lamps, share sweets, and spend time with family.
            </p>
          </article>
        </div>

        <aside className="right">
          <div className="card invite">
            <strong>Invite</strong>
            <p>Join our Diwali get-together — sweets, music, and warmth. Bring family!</p>
            <div className="actions">
              <button className="btn" onClick={() => handleToast('RSVP recorded')}>
                RSVP
              </button>
              <button className="btn" onClick={() => handleToast('Directions opened')}>
                Get Directions
              </button>
            </div>
          </div>

          <div className="card">
            <strong>Gallery</strong>
            <div className="gallery">
              {['Lantern', 'Rangoli', 'Handmade Diyas', 'Family'].map((item) => (
                <div key={item} className="thumb" role="img" aria-label={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <small>
              Want this page as a downloadable HTML file? Save the file as <code>index.html</code> and open it in your browser.
            </small>
          </div>
        </aside>
      </section>

      <footer>
        <small>Made with ❤️ — Happy Diwali!</small>
      </footer>

      {showToast && <div className="toast show">{toast}</div>}

      <audio id="bgMusic" ref={audioRef} loop>
        <source src="diwali-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default DiwaliPage;