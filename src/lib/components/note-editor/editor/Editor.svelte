<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { SlashExtension } from './slashExtension';
	import SlashMenu from './SlashMenu.svelte';
	import {
		Type,
		Heading1,
		Heading2,
		Heading3,
		List,
		ListOrdered,
		TextQuote,
		Code,
		ListChecks
	} from '@lucide/svelte';
	import type { Component } from 'svelte';
	import Placeholder from '@tiptap/extension-placeholder';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';

	let element: HTMLElement;
	let editor: Editor;
	let slashOpen = false;
	let slashItems: NoteEditor.SlashMenuItem[] = [];
	let slashIndex = 0;
	let slashTop = 0;
	let slashLeft = 0;

	function updateMenuPosition(clientRect: (() => DOMRect | null) | null) {
		if (!clientRect) return;
		const rect = clientRect();
		if (!rect) return;
		slashTop = rect.bottom + window.scrollY + 8;
		slashLeft = rect.left + window.scrollX;
	}

	function handleContainerClick(event: MouseEvent) {
		if (!editor) return;
		if (event.target === element) {
			editor.chain().focus('end').run();
		}
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({
					heading: {
						levels: [1, 2, 3]
					}
				}),
				TaskList,
				TaskItem.configure({ nested: true }),
				Placeholder.configure({
					placeholder: "Write, type '/' for commands...",
					includeChildren: true
				}),
				SlashExtension.configure({
					items: (query: string) => {
						const all: NoteEditor.SlashCommandItem[] = [
							{
								title: 'Text',
								description: 'Just start typing with plain text.',
								icon: Type,
								command: ({ editor, range }) => {
									editor.chain().focus().deleteRange(range).setParagraph().run();
								}
							},
							{
								title: 'Heading 1',
								description: 'Big section heading.',
								icon: Heading1,
								command: ({ editor, range }) => {
									editor.chain().focus().deleteRange(range).toggleHeading({ level: 1 }).run();
								}
							},
							{
								title: 'Heading 2',
								description: 'Medium section heading.',
								command: ({ editor, range }) => {
									editor.chain().focus().deleteRange(range).toggleHeading({ level: 2 }).run();
								},
								icon: Heading2
							},
							{
								title: 'Heading 3',
								description: 'Small section heading.',
								command: ({ editor, range }) => {
									editor.chain().focus().deleteRange(range).toggleHeading({ level: 3 }).run();
								},
								icon: Heading3
							},
							{
								title: 'Bullet List',
								description: 'Create a bulleted list.',
								command: ({ editor, range }) => {
									editor.chain().focus().deleteRange(range).toggleBulletList().run();
								},
								icon: List
							},
							{
								title: 'Numbered List',
								description: 'Create a numbered list.',
								command: ({ editor, range }) => {
									editor.chain().focus().deleteRange(range).toggleOrderedList().run();
								},
								icon: ListOrdered
							},
							{
								title: 'Task List',
								description: 'Create a task list with checkboxes.',
								command: ({ editor, range }) => {
									editor.chain().focus().deleteRange(range).toggleTaskList().run();
								},
								icon: ListChecks
							},
							{
								title: 'Blockquote',
								description: 'Create a blockquote.',
								command: ({ editor, range }) => {
									editor.chain().focus().deleteRange(range).toggleBlockquote().run();
								},
								icon: TextQuote
							},
							{
								title: 'Code Block',
								description: 'Create a code block.',
								command: ({ editor, range }) => {
									editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
								},
								icon: Code
							}
						];
						return all.filter((i) => i.title.toLowerCase().includes(query.toLowerCase()));
					},
					onOpen: () => {
						slashOpen = true;
					},
					onClose: () => {
						slashOpen = false;
					},
					onUpdate: ({ items, clientRect, range }) => {
						slashItems = items.map((i) => ({
							id: i.title,
							label: i.title,
							description: i.description,
							icon: i.icon as Component,
							action: () => {
								i.command({ editor, range });
								slashOpen = false;
							}
						}));
						slashIndex = 0;
						updateMenuPosition(clientRect);
					}
				})
			],
			content: '',
			editorProps: {
				attributes: {
					class: 'prose dark:prose-invert min-h-[280px] p-4 outline-none focus:outline-none'
				}
			},
			onTransaction: () => {
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<SlashMenu
	open={slashOpen}
	items={slashItems}
	selectedIndex={slashIndex}
	top={slashTop}
	left={slashLeft}
/>

<div
	class="h-full w-full cursor-text bg-transparent"
	bind:this={element}
	role="textbox"
	tabindex="0"
	on:click={handleContainerClick}
	on:keydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			// mimic click focus on keyboard activation
			handleContainerClick(e as unknown as MouseEvent);
		}
	}}
></div>
