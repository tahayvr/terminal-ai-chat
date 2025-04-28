import { writable } from 'svelte/store';

// Create a writable store for the chat input
export const chatInputValue = writable('');
