import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import type { Plugin } from '@tiptap/pm/state';

export interface SlashOptions {
	items: (query: string) => NoteEditor.SlashCommandItem[];
	onOpen?: () => void;
	onClose?: () => void;
	onUpdate?: (props: {
		items: NoteEditor.SlashCommandItem[];
		clientRect: (() => DOMRect | null) | null;
		query: string;
		range: { from: number; to: number };
	}) => void;
}

export const SlashExtension = Extension.create<SlashOptions>({
	name: 'slash-command',

	addOptions() {
		return {
			items: () => [],
			onOpen: () => {},
			onClose: () => {},
			onUpdate: () => {}
		};
	},

	addProseMirrorPlugins() {
		const editor = this.editor;

		return [
			Suggestion({
				editor,
				char: '/',
				startOfLine: false,
				allowSpaces: true,
				items: ({ query }) => this.options.items(query),
				render: () => ({
					onStart: (props) => {
						const items = this.options.items(props.query);
						this.options.onOpen?.();
						this.options.onUpdate?.({
							items,
							clientRect: props.clientRect ?? null,
							query: props.query,
							range: props.range
						});
					},
					onUpdate: (props) => {
						const items = this.options.items(props.query);
						this.options.onUpdate?.({
							items,
							clientRect: props.clientRect ?? null,
							query: props.query,
							range: props.range
						});
					},
					onKeyDown: (props) => {
						if (props.event.key === 'Escape') {
							this.options.onClose?.();
							return true;
						}
						if (
							props.event.key === 'ArrowUp' ||
							props.event.key === 'ArrowDown' ||
							props.event.key === 'Enter'
						) {
							// Prevent default suggestion list from handling navigation/selection;
							// we control this from Svelte.
							return true;
						}
						return false;
					},
					onExit: () => {
						this.options.onClose?.();
					}
				}),
				command: ({ editor, range, props }) => {
					const item = props?.item as NoteEditor.SlashCommandItem | undefined;
					if (!item) return;
					item.command({ editor, range });
				}
			}) as unknown as Plugin
		];
	}
});
