
import React from 'react';

const examples = [
  'A cute, chubby cat sleeping',
  'A futuristic cyberpunk city',
  'A majestic dragon over mountains',
  'A tranquil forest with a river',
];

interface ExamplePromptsProps {
  onExampleClick: (prompt: string) => void;
  isLoading: boolean;
}

export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onExampleClick, isLoading }) => {
  return (
    <div className="w-full flex flex-col items-center gap-3">
        <p className="text-sm text-gray-400">Or try an example:</p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {examples.map((example) => (
            <button
            key={example}
            onClick={() => onExampleClick(example)}
            disabled={isLoading}
            className="px-3 py-1.5 text-sm border border-gray-600 bg-gray-700/50 text-gray-300 rounded-full hover:bg-gray-600/70 hover:text-green-400 hover:border-green-500/50 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
            {example}
            </button>
        ))}
        </div>
    </div>
  );
};
