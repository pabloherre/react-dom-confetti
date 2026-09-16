import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.scss';
import './confetti.css';
import Confetti from './Confetti.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className="app">
      <section id="confetti-demo" className="demo-card">
        <p className="eyebrow">React DOM Confetti</p>
        <h1>Make a moment of it.</h1>
        <p>Small celebrations deserve a little movement, color, and a reason to linger.</p>
        <Confetti elementId="confetti-demo" particles={42} speed={2} />
      </section>
    </main>
  </StrictMode>,
);
