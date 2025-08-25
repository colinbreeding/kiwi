// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace AuthDialog {
		type AuthDialogMode = 'login' | 'signup';
		type AuthDialogState = {
			open: boolean;
			mode: AuthDialogMode;
			origin?: string;
		};
	}
	namespace NoteEditor {
		type SlashCommandItem = {
			title: string;
			description?: string;
			icon?: Component;
			command: (props: {
				editor: import('@tiptap/core').Editor;
				range: { from: number; to: number };
			}) => void;
		};
		type SlashMenuItem = {
			id: string;
			label: string;
			description?: string;
			icon?: Component;
			action: () => void;
		};
		interface SlashOptions {
			items: (query: string) => SlashCommandItem[];
			onOpen?: () => void;
			onClose?: () => void;
			onUpdate?: (props: {
				items: SlashCommandItem[];
				clientRect: (() => DOMRect | null) | null;
				query: string;
				range: { from: number; to: number };
			}) => void;
		}
	}
}

export {};
