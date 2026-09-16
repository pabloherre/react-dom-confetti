import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function Confetti({ elementId, element,  speed = 2, particles = 32, repeat = 'infinite', size = 1 }) {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (!elementId && !element) return undefined;

    const targetElement = element || document.getElementById(elementId);
    if (!targetElement) return undefined;

    const elementHeight = targetElement.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--confetti-size-25', `${elementHeight / 4}px`);
    document.documentElement.style.setProperty('--confetti-size-50', `${elementHeight / 2}px`);
    document.documentElement.style.setProperty('--confetti-size-75', `${elementHeight - elementHeight / 3}px`);
    document.documentElement.style.setProperty('--confetti-size-100', `${elementHeight}px`);
    document.documentElement.style.setProperty('--confetti-duration', 1 / speed);
    document.documentElement.style.setProperty('--confetti-repeat', repeat);
    document.documentElement.style.setProperty('--confetti-size', size);
    const frame = requestAnimationFrame(() => setTarget(targetElement));

    return () => cancelAnimationFrame(frame);
  }, [element, elementId, speed, repeat, size]);

  if (!target) return null;

  return createPortal(
    <div className="confettiField" aria-hidden="true">
      {Array.from({ length: particles }, (_, index) => (
        <i key={`confetti_${index}`} className="piece" />
      ))}
    </div>,
    target,
  );
}

export default Confetti;
