
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="animate-spin w-16 h-16" style={{ animationDuration: '2s' }}>
        <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full">
            <div className="bg-green-500 rounded animate-pulse [animation-duration:1.5s]"></div>
            <div className="bg-green-500/50 rounded animate-pulse [animation-duration:1.5s] [animation-delay:-0.5s]"></div>
            <div className="bg-green-500/50 rounded animate-pulse [animation-duration:1.5s] [animation-delay:-1.0s]"></div>
            <div className="bg-green-500 rounded animate-pulse [animation-duration:1.5s] [animation-delay:-0.25s]"></div>
        </div>
      </div>
      <p className="text-green-400 font-bold animate-pulse [animation-duration:1.5s]">Generating Pixels...</p>
    </div>
  );
};
