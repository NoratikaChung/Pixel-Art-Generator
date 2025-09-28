import React from 'react';

interface PixelArtDisplayProps {
  imageData: string | null;
  prompt: string;
  onClear: () => void;
}

const DownloadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const PixelArtDisplay: React.FC<PixelArtDisplayProps> = ({ imageData, prompt, onClear }) => {
  if (!imageData) {
    return null;
  }

  const downloadFilename = prompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '_').substring(0, 30) + '.png';

  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-4 animate-fade-in">
      <div className="relative group">
        <img
          src={imageData}
          alt={prompt}
          className="w-full h-auto object-contain rounded-md pixelated"
        />
        <div className="absolute top-2 right-2 flex items-center gap-2">
            <a
                href={imageData}
                download={downloadFilename}
                className="p-2 bg-gray-900/60 text-white rounded-full hover:bg-green-500/80 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Download"
            >
                <DownloadIcon />
            </a>
            <button
                onClick={onClear}
                className="p-2 bg-gray-900/60 text-white rounded-full hover:bg-red-500/80 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Clear Image"
            >
                <CloseIcon />
            </button>
        </div>
      </div>
      <p className="mt-3 text-sm text-center text-gray-400 italic">
        {prompt}
      </p>
    </div>
  );
};
