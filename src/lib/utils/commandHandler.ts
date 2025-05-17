/**
 * Command handler for terminal slash commands
 */

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
		response: `<span class="text-yellow-500">Terminal Chat LLM</span>
<div class="flex flex-col text-xs text-gray-500 mb-2">
    <span>by <a href="https://taha.gg" class="text-zinc-500">Taha aka noiseRandom</a></span>
    <span>Version: 1.0.0</span> 
    <span>Commands:</span>
</div>
        <div class="command-list">
  <div class="command-item flex gap-2">
    <span class="text-green-400 font-bold">/help</span>
    <div>-- displays help message</div>
  </div>
  
  <div class="command-item  flex gap-2">
    <span class="text-green-400 font-bold">/clear</span>
    <div>-- clears chat history</div>
  </div>
  
  <div class="command-item  flex gap-2">
    <span class="text-green-400 font-bold">/export</span>
    <div>-- exports full conversation as markdown file</div>
  </div>
</div>`
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
