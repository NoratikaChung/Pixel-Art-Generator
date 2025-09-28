export interface HistoryItem {
  id: number;
  prompt: string;
  imageData: string;
}

const HISTORY_KEY = 'pixelArtHistory';
const MAX_HISTORY_ITEMS = 12;

export const getHistory = (): HistoryItem[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    if (!historyJson) return [];
    const history = JSON.parse(historyJson) as HistoryItem[];
    if (Array.isArray(history)) {
      return history;
    }
  } catch (error) {
    console.error("Failed to parse history from localStorage", error);
  }
  return [];
};

export const addToHistory = (prompt: string, imageData: string): HistoryItem[] => {
  const currentHistory = getHistory();
  const newItem: HistoryItem = {
    id: Date.now(),
    prompt,
    imageData,
  };

  const newHistory = [newItem, ...currentHistory];

  const slicedHistory = newHistory.slice(0, MAX_HISTORY_ITEMS);
  
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(slicedHistory));
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
  }
  
  return slicedHistory;
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear history from localStorage", error);
  }
};