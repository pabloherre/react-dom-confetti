import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function Confetti({ elementId, element,  speed = 1, particles = 40, repeat = 'infinite', size = 1, glow = true, delay=0 }) {
  const [target, setTarget] = useState(null);
  const [confettiStyle, setConfettiStyle] = useState(null);

  useEffect(() => {
    if (!elementId && !element) {
      return undefined;
    }

    const targetElement = element || document.getElementById(elementId);
    if (!targetElement) {
      return undefined;
    }

    const elementHeight = targetElement.getBoundingClientRect().height;
    const frame = requestAnimationFrame(() => {
      setTarget(targetElement);
      setConfettiStyle({
        '--confetti-size-25': `${elementHeight / 4}px`,
        '--confetti-size-50': `${elementHeight / 2}px`,
        '--confetti-size-75': `${elementHeight - elementHeight / 3}px`,
        '--confetti-size-100': `${elementHeight}px`,
        '--confetti-duration': 1 / speed,
        '--confetti-repeat': repeat,
        '--confetti-size': 1.5 * size,
        '--confetti-glow': glow ? '0 0 0.3rem currentColor' : 'none',
        '--confetti-delay': `${delay < 2300 ? (delay) : delay+2300}ms`,
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      setTarget(null);
      setConfettiStyle(null);
    };
  }, [element, elementId, speed, particles, repeat, size, glow, delay]);

  if (!target) return null;

  return createPortal(
    <div className="confettiField" style={confettiStyle} aria-hidden="true">
      {Array.from({ length: particles }, (_, index) => (
        <i
          key={`confetti_${index}`}
          className="piece"
          style={{
            '--confetti-animation': Math.random()>=0.5 ? 'confetti-fall' : 'confetti-fall-inverse'
          }}
        />
      ))}
    </div>,
    target,
  );
}

export default Confetti;
