import React from 'react';
import { ArtStyle } from '../services/geminiService';

const styles: ArtStyle[] = ['8-bit', '16-bit', 'Detailed', 'Simple', 'Retro'];

interface StyleSelectorProps {
  selectedStyle: ArtStyle;
  onStyleChange: (style: ArtStyle) => void;
  isLoading: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange, isLoading }) => {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <p className="text-sm text-gray-400">Art Style:</p>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => onStyleChange(style)}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${
              selectedStyle === style
                ? 'bg-green-500 text-gray-900 shadow-md shadow-green-500/30'
                : 'border border-gray-600 bg-gray-700/50 text-gray-300 hover:bg-gray-600/70 hover:text-green-400 hover:border-green-500/50'
            }`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};