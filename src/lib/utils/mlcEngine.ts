import { writable } from 'svelte/store'; // Import writable
import { MLCEngine, type InitProgressReport } from '@mlc-ai/web-llm';

// Use writable stores instead of runes
const engineInstanceStore = writable<MLCEngine | null>(null);
const progressTextStore = writable('Initializing...');
const isLoadingStore = writable(false);
const isReadyStore = writable(false);

// Getter for engine instance (read-only access if needed outside store)
let currentEngineInstance: MLCEngine | null = null;
engineInstanceStore.subscribe((value) => {
	currentEngineInstance = value;
});

// Initialization function
async function initializeEngine() {
	// Use .set() to update store values
	if (currentEngineInstance || (await import('svelte/store').then((m) => m.get(isLoadingStore)))) {
		console.log('Engine already initializing or initialized.');
		return;
	}

	console.log('Initializing MLC Engine...');
	isLoadingStore.set(true);
	progressTextStore.set('Creating engine instance...');

	try {
		const initProgressCallback = (report: InitProgressReport) => {
			progressTextStore.set(report.text);
			console.log('Model loading progress:', report);
		};

		const engine = new MLCEngine({ initProgressCallback });
		engineInstanceStore.set(engine); // Update store

		console.log('Reloading engine model...');
		progressTextStore.set('Loading model...');
		await engine.reload('Llama-3.2-1B-Instruct-q0f16-MLC');

		console.log('Engine initialization complete.');
		progressTextStore.set('Model loaded successfully!');
		isReadyStore.set(true);
	} catch (error) {
		console.error('Error initializing MLC Engine:', error);
		progressTextStore.set(
			`Error loading model: ${error instanceof Error ? error.message : String(error)}`
		);
	} finally {
		isLoadingStore.set(false);
	}
}

// Export the stores and the initialization function
export const mlcEngine = {
	engine: engineInstanceStore, // Export the store itself
	progress: progressTextStore, // Export the store itself
	loading: isLoadingStore, // Export the store itself
	ready: isReadyStore, // Export the store itself
	initialize: initializeEngine
};
