import React from 'react';
import { ColorPalette } from '../services/geminiService';

const palettes: { name: ColorPalette; colors: string[] }[] = [
  { name: 'Vibrant 8-bit', colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'] },
  { name: 'Muted NES', colors: ['#7C7C7C', '#0000FC', '#0000BC', '#4428BC', '#940084', '#A80020'] },
  { name: 'Pastel Dreams', colors: ['#f8b195', '#f67280', '#c06c84', '#6c5b7b', '#355c7d', '#99b898'] },
  { name: 'Grayscale', colors: ['#111111', '#555555', '#999999', '#dddddd', '#ffffff'] },
];

interface ColorPaletteSelectorProps {
  selectedPalette: ColorPalette;
  onPaletteChange: (palette: ColorPalette) => void;
  isLoading: boolean;
}

export const ColorPaletteSelector: React.FC<ColorPaletteSelectorProps> = ({ selectedPalette, onPaletteChange, isLoading }) => {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <p className="text-sm text-gray-400">Color Palette:</p>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {palettes.map(({ name, colors }) => (
          <button
            key={name}
            onClick={() => onPaletteChange(name)}
            disabled={isLoading}
            className={`flex flex-col items-center p-2 text-xs font-medium rounded-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${
              selectedPalette === name
                ? 'bg-gray-800 ring-2 ring-green-500 text-green-400'
                : 'border border-gray-600 bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'
            }`}
            title={name}
          >
            <div className="flex space-x-0.5 h-5 w-24 mb-1 rounded-sm overflow-hidden">
              {colors.map(color => (
                <div key={color} className="flex-1" style={{ backgroundColor: color }} />
              ))}
            </div>
            <span className="mt-1">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};