import React from 'react';
import { AspectRatio } from '../services/geminiService';

// Re-ordered to group by orientation: Square, Landscape, Portrait
const orderedRatios: AspectRatio[] = ["1:1", "16:9", "4:3", "9:16", "3:4"];

const SquareIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
    </svg>
);

const LandscapeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="14" x="2" y="2" rx="2"></rect>
    </svg>
);

const PortraitIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 18 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="14" height="20" x="2" y="2" rx="2"></rect>
    </svg>
);

const ratioIcons: Record<AspectRatio, React.ReactNode> = {
  '1:1': <SquareIcon className="mr-2" />,
  '16:9': <LandscapeIcon className="mr-2" />,
  '4:3': <LandscapeIcon className="mr-2" />,
  '9:16': <PortraitIcon className="mr-2" />,
  '3:4': <PortraitIcon className="mr-2" />,
};


interface AspectRatioSelectorProps {
  selectedRatio: AspectRatio;
  onRatioChange: (ratio: AspectRatio) => void;
  isLoading: boolean;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedRatio, onRatioChange, isLoading }) => {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <p className="text-sm text-gray-400">Aspect Ratio:</p>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {orderedRatios.map((ratio) => (
          <button
            key={ratio}
            onClick={() => onRatioChange(ratio)}
            disabled={isLoading}
            className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${
              selectedRatio === ratio
                ? 'bg-green-500 text-gray-900 shadow-md shadow-green-500/30'
                : 'border border-gray-600 bg-gray-700/50 text-gray-300 hover:bg-gray-600/70 hover:text-green-400 hover:border-green-500/50'
            }`}
          >
            {ratioIcons[ratio]}
            <span>{ratio}</span>
          </button>
        ))}
      </div>
    </div>
  );
};