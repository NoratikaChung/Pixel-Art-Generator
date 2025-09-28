
import React from 'react';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., a knight in shining armor..."
          className="w-full p-4 pr-36 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500/80 focus:outline-none focus:border-green-500/80 transition-all duration-300 text-gray-200 resize-none shadow-inner"
          rows={3}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 px-6 py-2 bg-green-500 text-gray-900 font-bold rounded-md hover:bg-green-400 hover:scale-105 hover:shadow-lg hover:shadow-green-500/40 active:scale-100 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 disabled:scale-100 disabled:shadow-none"
        >
          {isLoading ? '...' : 'Generate'}
        </button>
      </div>
    </form>
  );
};
