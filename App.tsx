import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ExamplePrompts } from './components/ExamplePrompts';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { ColorPaletteSelector } from './components/ColorPaletteSelector';
import { StyleSelector } from './components/StyleSelector';
import { PixelArtDisplay } from './components/PixelArtDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { History } from './components/History';
import { generatePixelArt, AspectRatio, ColorPalette, ArtStyle } from './services/geminiService';
import { HistoryItem, getHistory, addToHistory, clearHistory as clearHistoryStorage } from './utils/historyStorage';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [palette, setPalette] = useState<ColorPalette>('Vibrant 8-bit');
  const [style, setStyle] = useState<ArtStyle>('16-bit');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleSubmit = useCallback(async (currentPrompt: string) => {
    if (!currentPrompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setCurrentPrompt(currentPrompt);

    try {
      const imageData = await generatePixelArt(currentPrompt, aspectRatio, palette, style);
      setGeneratedImage(imageData);
      setHistory(addToHistory(currentPrompt, imageData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, aspectRatio, palette, style]);


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(prompt);
  };
  
  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    handleSubmit(examplePrompt);
  };

  const handleHistoryItemClick = (item: HistoryItem) => {
    setPrompt(item.prompt);
    setGeneratedImage(item.imageData);
    setCurrentPrompt(item.prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearHistory = () => {
    clearHistoryStorage();
    setHistory([]);
  };

  const handleClearImage = () => {
    setGeneratedImage(null);
    setCurrentPrompt('');
    setError(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6">
        <Header />

        <PromptForm
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
        />
        
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          <AspectRatioSelector 
            selectedRatio={aspectRatio}
            onRatioChange={setAspectRatio}
            isLoading={isLoading}
          />
          <ColorPaletteSelector
            selectedPalette={palette}
            onPaletteChange={setPalette}
            isLoading={isLoading}
          />
          <StyleSelector
            selectedStyle={style}
            onStyleChange={setStyle}
            isLoading={isLoading}
          />
        </div>

        <ExamplePrompts onExampleClick={handleExampleClick} isLoading={isLoading} />
        
        <div className="w-full mt-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <PixelArtDisplay 
              imageData={generatedImage} 
              prompt={currentPrompt} 
              onClear={handleClearImage}
            />
          )}
        </div>

        <History 
          history={history}
          onItemClick={handleHistoryItemClick}
          onClearHistory={clearHistory}
          isLoading={isLoading}
        />
      </div>
      {/* FIX: Replaced non-standard `style jsx global` with a standard `style` tag to fix a JSX typing error. The `jsx` and `global` attributes are specific to Next.js's styled-jsx, which is not being used in this standard React setup. */}
      {/* FIX: Added keyframes for a fade-in animation used by the PixelArtDisplay component. */}
      <style>{`
        .pixelated {
          image-rendering: -moz-crisp-edges;
          image-rendering: pixelated;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;