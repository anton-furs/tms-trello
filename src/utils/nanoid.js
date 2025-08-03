import { customAlphabet } from 'nanoid';

// Custom ID format generation
const nanoid8 = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);

// Generate a unique 8-character ID
export const generateUniqueId = () => nanoid8();
