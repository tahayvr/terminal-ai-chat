/**
 * Command handler for terminal slash commands
 */

import { helpText } from './helpText';

// Define command type
export interface CommandResult {
	isCommand: boolean;
	response?: string;
	showInChat?: boolean;
	success?: boolean;
	action?: 'clear' | 'export';
}

// Command handlers
const commandHandlers: Record<string, () => CommandResult> = {
	help: () => ({
		isCommand: true,
		showInChat: true,
		success: true,
		response: helpText
	}),

	clear: () => ({
		isCommand: true,
		showInChat: false,
		success: true,
		action: 'clear'
	}),

	export: () => ({
		isCommand: true,
		showInChat: false,
		success: true,
		action: 'export'
	})
};

/**
 * Process a possible terminal command
 * @param input The user input to process
 * @returns CommandResult with processing details
 */
export function processCommand(input: string): CommandResult {
	// Check if the input starts with a slash
	if (!input.startsWith('/')) {
		return { isCommand: false };
	}

	// Extract command
	const command = input.slice(1).split(/\s+/)[0].toLowerCase();

	// Process the command if a handler exists
	if (command && command in commandHandlers) {
		return commandHandlers[command]();
	}

	// Unknown command
	return {
		isCommand: true,
		showInChat: true,
		success: false,
		response: `<span class="text-red-500">Error: Unknown command "/${command}". Type /help for available commands.</span>`
	};
}
