import { writable } from 'svelte/store';

// Store for the chat input value that can be shared between components
export const chatInputValue = writable('');
