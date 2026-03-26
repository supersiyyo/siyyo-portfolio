'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CircleCanvas from './components/CircleCanvas';

const OrbLegend: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const personalityInfo = [
    { color: 'hsl(50, 100%, 60%)', name: 'Playful', description: 'Gently chases after other orbs.' },
    { color: 'hsl(180, 80%, 70%)', name: 'Shy', description: 'Actively avoids other orbs and the mouse cursor.' },
    { color: 'hsl(260, 80%, 40%)', name: 'Loner', description: 'Seeks a single partner to orbit with for life.' },
    { color: 'hsl(140, 80%, 50%)', name: 'Social', description: 'Gravitates towards the center of nearby groups.' },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 m-4 w-full max-w-md text-white shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-wide">Orb Ecosystem</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl leading-none"
            aria-label="Close legend"
          >
            &times;
          </button>
        </div>
        <ul className="space-y-4">
          {personalityInfo.map((p) => (
            <li key={p.name} className="flex items-start">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full mt-1 mr-4"
                style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}` }}
              ></span>
              <div>
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-gray-300">{p.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animate, setAnimate] = useState(false);
  const [isLegendVisible, setIsLegendVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 200);

    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxStyle = (factor: number) => ({
    transform: `translate(${mousePos.x / -factor}px, ${mousePos.y / -factor}px)`,
  });

  const name = 'Christopher Butler';

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden gradient-bg text-white">
      {isLegendVisible && <OrbLegend onClose={() => setIsLegendVisible(false)} />}
      <button
        onClick={() => setIsLegendVisible(true)}
        className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 transform hover:scale-110"
        aria-label="Show orb ecosystem legend"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={parallaxStyle(20)}
      ></div>
      <CircleCanvas />
      <div
        className="text-center z-10 p-4 transition-transform duration-300 ease-out"
        style={parallaxStyle(50)}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider mb-6 flex flex-wrap justify-center">
          {name.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split('').map((char, charIndex) => {
                // Calculate total index for consistent animation delay
                const previousWordsLength = name.split(' ').slice(0, wordIndex).join(' ').length;
                const globalIndex = previousWordsLength + (wordIndex > 0 ? 1 : 0) + charIndex;
                return (
                  <span
                    key={charIndex}
                    className={`inline-block ${animate ? 'animate-slide-in-fade' : 'opacity-0'}`}
                    style={{ animationDelay: `${globalIndex * 0.05}s` }}
                  >
                    {char}
                  </span>
                );
              })}
              {/* Add space between words, but keep it in its own span for animation timing if needed, 
                  or just as a non-breaking space after the word */}
              {wordIndex < name.split(' ').length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
        </h1>
        <p
          className={`text-2xl md:text-4xl text-indigo-100 font-medium tracking-wider drop-shadow-lg ${animate ? 'animate-slide-in-fade' : 'opacity-0'}`}
          style={{ animationDelay: `${name.length * 0.05 + 0.2}s` }}
        >
          Software Engineer
        </p>
        <Link
          href="/projects"
          id="view-my-work-btn"
          className={`inline-block mt-12 px-8 py-3 bg-indigo-500 text-white font-bold rounded-full shadow-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transform hover:scale-105 transition-all duration-300 ${animate ? 'animate-slide-in-fade' : 'opacity-0'}`}
          style={{ animationDelay: `${name.length * 0.05 + 0.4}s` }}
        >
          View My Work
        </Link>
      </div>
    </div>
  );
}
