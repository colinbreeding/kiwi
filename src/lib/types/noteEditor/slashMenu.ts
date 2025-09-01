import type { Component } from 'svelte';

export type SlashCommandItem = {
	title: string;
	description?: string;
	icon?: Component;
	command: (props: {
		editor: import('@tiptap/core').Editor;
		range: { from: number; to: number };
	}) => void;
};

export type SlashMenuItem = {
	id: string;
	label: string;
	description?: string;
	icon?: Component;
	action: () => void;
};

export interface SlashOptions {
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
