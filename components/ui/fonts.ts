// Import the font from 'next/font/google'
import { Young_Serif } from 'next/font/google';

// Use the font and specify the subsets
export const Young = Young_Serif({
  weight: ['400'], // Specify the desired weight or weights
  subsets: ['latin', 'latin-ext'], // Specify the subsets
});