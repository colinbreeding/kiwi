<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import SquarePen from '@lucide/svelte/icons/square-pen';
	import type { ComponentProps } from 'svelte';
	import Button from '../ui/button/button.svelte';
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	// Create some test notes
	type Note = {
		name: string;
		description: string;
		date: string;
	};

	const testNotes: Note[] = [
		{
			name: 'First Note',
			description: 'This is the first test note.',
			date: 'Today'
		},
		{
			name: 'Second Note',
			description: 'Another note for testing.',
			date: 'Yesterday'
		},
		{
			name: 'Meeting Notes',
			description: 'Notes from the project meeting.',
			date: '2 days ago'
		}
	];
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps} class="bg-sidebar p-3 pt-0 pr-0">
	<Sidebar.Header class="h-12 bg-sidebar px-4 md:px-0">
		<Sidebar.Menu class="flex h-full justify-center bg-sidebar">
			<Sidebar.MenuItem class="bg-sidebar">
				<div class="flex w-full items-center justify-between">
					<div>
						<h2 class="text-lg font-semibold">Notes</h2>
					</div>
					<Button variant="ghost" class="size-7 cursor-pointer !rounded-sm hover:!bg-muted">
						<SquarePen />
					</Button>
				</div>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content class="flex flex-col gap-2 bg-sidebar px-4 pb-4 md:p-0">
		{#each testNotes as note (note.name)}
			<div
				class="flex cursor-pointer flex-col gap-1 rounded-lg bg-muted-foreground/10 p-4 hover:bg-muted-foreground/20 dark:bg-muted hover:dark:bg-muted-foreground/20"
			>
				<div class="flex items-center justify-between">
					<h2 class="text-sm leading-tight font-normal">{note.name}</h2>
					<p class="text-[10px] leading-tight text-muted-foreground">{note.date}</p>
				</div>
				<p class="line-clamp-1 text-xs leading-tight text-muted-foreground">
					{note.description}
				</p>
			</div>
		{/each}
	</Sidebar.Content>
	<Sidebar.Footer class="bg-sidebar">
		<!-- TODO: Add sidebar footer here -->
	</Sidebar.Footer>
</Sidebar.Root>
