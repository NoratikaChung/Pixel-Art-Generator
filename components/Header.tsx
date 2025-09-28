
import React from 'react';

const TerminalIcon: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="h-10 w-10 text-green-400"
    >
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <TerminalIcon />
        <h1 className="text-5xl sm:text-6xl font-bold text-green-400 tracking-wider" style={{ textShadow: '0 0 10px rgba(52, 211, 153, 0.5)' }}>
            Pixel Art Gen
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-300">
        Generate stunning 16-bit sprites with the power of Imagen AI
      </p>
    </header>
  );
};
