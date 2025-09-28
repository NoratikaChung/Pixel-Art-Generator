import React from 'react';
import { HistoryItem } from '../utils/historyStorage';

interface HistoryProps {
  history: HistoryItem[];
  onItemClick: (item: HistoryItem) => void;
  onClearHistory: () => void;
  isLoading: boolean;
}

export const History: React.FC<HistoryProps> = ({ history, onItemClick, onClearHistory, isLoading }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-300">History</h2>
        <button
          onClick={onClearHistory}
          disabled={isLoading}
          className="px-3 py-1 text-xs text-red-400 border border-red-500/50 rounded-md hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            disabled={isLoading}
            className="relative aspect-square group bg-gray-800/50 rounded-lg overflow-hidden border-2 border-transparent hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title={item.prompt}
          >
            <img 
              src={item.imageData} 
              alt={item.prompt}
              className="w-full h-full object-cover pixelated" 
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus:opacity-100 flex items-center justify-center p-2 transition-opacity duration-200">
              <p className="text-white text-xs text-center line-clamp-3">
                {item.prompt}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};