import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './App.scss';
import './confetti.css';
import Confetti from './Confetti.jsx';

const defaultSettings = {
  elementId: 'confetti-demo',
  particles: 32,
  speed: 1,
  repeat: 'infinite',
  size: 1,
  glow: true,
};

export function Demo() {
  const [settings, setSettings] = useState(defaultSettings);

  const updateSetting = (key, value) => {
    setSettings(currentSettings => ({ ...currentSettings, [key]: value }));
  };

  return (
    <main className="app">
      <div className="demo-layout">
        <aside className="controls-panel">
          <div>
            <p className="eyebrow">Celebration lab</p>
            <h1>Tune the moment.</h1>
            <p className="panel-intro">Shape the burst, then watch your changes land in the preview.</p>
          </div>

          <form className="controls" onSubmit={event => event.preventDefault()}>
            <label className="control">
              <span className="control-label"><span>Particles</span><output>{settings.particles}</output></span>
              <input type="range" min="1" max="100" step="1" value={settings.particles} aria-label="Number of particles" onChange={event => updateSetting('particles', Number(event.target.value))} />
            </label>
            <label className="control">
              <span className="control-label"><span>Speed</span><output>{settings.speed}×</output></span>
              <input type="range" min="0.25" max="3" step="0.25" value={settings.speed} aria-label="Animation speed" onChange={event => updateSetting('speed', Number(event.target.value))} />
            </label>
            <label className="control">
              <span className="control-label"><span>Size</span><output>{settings.size}×</output></span>
              <input type="range" min="0.25" max="2" step="0.25" value={settings.size} aria-label="Particle size" onChange={event => updateSetting('size', Number(event.target.value))} />
            </label>
            <label className="control control-wide">
              <span className="control-label"><span>Repeat</span><code>animation-iteration-count</code></span>
              <select value={settings.repeat} aria-label="Animation repeat" onChange={event => updateSetting('repeat', event.target.value)}>
                <option value="infinite">Infinite</option>
                <option value="1">Once</option>
                <option value="2">Twice</option>
                <option value="3">Three times</option>
              </select>
            </label>
            <label className="control glow-control control-wide">
              <span className="control-label"><span>Glow</span><output>{settings.glow ? 'On' : 'Off'}</output></span>
              <span className="checkbox-row">
                <input type="checkbox" checked={settings.glow} aria-label="Enable confetti glow" onChange={event => updateSetting('glow', event.target.checked)} />
                <span>Give each piece a soft color-matched glow</span>
              </span>
            </label>
            <button type="button" className="reset-button" onClick={() => setSettings(defaultSettings)}>Reset defaults</button>
          </form>
        </aside>
        <section id={settings.elementId} className="demo-card">
          <p className="eyebrow">React DOM Confetti</p>
          <h2>Make a moment of it.</h2>
          <p>Small celebrations deserve a little movement, color, and a reason to linger.</p>
          <Confetti key={`${settings.elementId}-${settings.repeat}`} elementId={settings.elementId} particles={settings.particles} speed={settings.speed} repeat={settings.repeat} size={settings.size} glow={settings.glow} />
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
);
