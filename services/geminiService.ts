import { GoogleGenAI } from "@google/genai";

// As per guidelines, get API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// Define the aspect ratio type based on supported values.
export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
export type ColorPalette = 'Vibrant 8-bit' | 'Muted NES' | 'Pastel Dreams' | 'Grayscale';
export type ArtStyle = '8-bit' | '16-bit' | 'Detailed' | 'Simple' | 'Retro';

const palettePrompts: Record<ColorPalette, string> = {
  'Vibrant 8-bit': 'using a vibrant, high-contrast 8-bit color palette',
  'Muted NES': 'using a muted, limited color palette reminiscent of classic NES games',
  'Pastel Dreams': 'using a soft, dreamy pastel color palette',
  'Grayscale': 'using a grayscale color palette, like a classic Game Boy game'
};

const stylePrompts: Record<ArtStyle, string> = {
  '8-bit': 'classic 8-bit pixel art',
  '16-bit': 'detailed 16-bit pixel art',
  'Detailed': 'highly detailed modern pixel art',
  'Simple': 'simple, minimalist pixel art',
  'Retro': 'retro-style pixel art, inspired by 90s games',
};

export const generatePixelArt = async (prompt: string, aspectRatio: AspectRatio, palette: ColorPalette, style: ArtStyle): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  try {
    const paletteDescription = palettePrompts[palette];
    const styleDescription = stylePrompts[style];
    
    // A prompt tailored for generating a full pixel art scene with a specific style and palette.
    const fullPrompt = `${styleDescription} of ${prompt}, ${paletteDescription}, full scene`;

    const response = await ai.models.generateImages({
      // FIX: Use 'imagen-4.0-generate-001' for image generation.
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png', // Using PNG as it's better for pixel art
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated. The response might have been blocked.");
    }
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image generation.");
  }
};