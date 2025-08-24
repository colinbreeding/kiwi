<script lang="ts" module>
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import BotIcon from '@lucide/svelte/icons/bot';
	import ChartPieIcon from '@lucide/svelte/icons/chart-pie';
	import FrameIcon from '@lucide/svelte/icons/frame';
	import LifeBuoyIcon from '@lucide/svelte/icons/life-buoy';
	import MapIcon from '@lucide/svelte/icons/map';
	import SendIcon from '@lucide/svelte/icons/send';
	import Settings2Icon from '@lucide/svelte/icons/settings-2';
	import SquareTerminalIcon from '@lucide/svelte/icons/square-terminal';
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg'
		},
		navMain: [
			{
				title: 'Playground',
				url: '#',
				icon: SquareTerminalIcon,
				isActive: true,
				items: [
					{
						title: 'History',
						url: '#'
					},
					{
						title: 'Starred',
						url: '#'
					},
					{
						title: 'Settings',
						url: '#'
					}
				]
			},
			{
				title: 'Models',
				url: '#',
				icon: BotIcon,
				items: [
					{
						title: 'Genesis',
						url: '#'
					},
					{
						title: 'Explorer',
						url: '#'
					},
					{
						title: 'Quantum',
						url: '#'
					}
				]
			},
			{
				title: 'Documentation',
				url: '#',
				icon: BookOpenIcon,
				items: [
					{
						title: 'Introduction',
						url: '#'
					},
					{
						title: 'Get Started',
						url: '#'
					},
					{
						title: 'Tutorials',
						url: '#'
					},
					{
						title: 'Changelog',
						url: '#'
					}
				]
			},
			{
				title: 'Settings',
				url: '#',
				icon: Settings2Icon,
				items: [
					{
						title: 'General',
						url: '#'
					},
					{
						title: 'Team',
						url: '#'
					},
					{
						title: 'Billing',
						url: '#'
					},
					{
						title: 'Limits',
						url: '#'
					}
				]
			}
		],
		navSecondary: [
			{
				title: 'Support',
				url: '#',
				icon: LifeBuoyIcon
			},
			{
				title: 'Feedback',
				url: '#',
				icon: SendIcon
			}
		],
		projects: [
			{
				name: 'Design Engineering',
				url: '#',
				icon: FrameIcon
			},
			{
				name: 'Sales & Marketing',
				url: '#',
				icon: ChartPieIcon
			},
			{
				name: 'Travel',
				url: '#',
				icon: MapIcon
			}
		]
	};
</script>

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

<Sidebar.Root bind:ref variant="inset" {...restProps} class="bg-background p-4 pt-0 pr-0">
	<Sidebar.Header class="bg-background p-4 md:px-0 md:py-3">
		<Sidebar.Menu class="bg-background">
			<Sidebar.MenuItem class="bg-background">
				<div class="flex w-full items-center justify-between">
					<div>
						<h2 class="text-lg font-semibold">Notes</h2>
					</div>
					<Button variant="ghost" class="size-7 cursor-pointer hover:!bg-muted">
						<SquarePen />
					</Button>
				</div>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content class="flex flex-col gap-2 bg-background px-4 pb-4 md:p-0">
		{#each testNotes as note}
			<div class="flex cursor-pointer flex-col gap-1 rounded-lg bg-muted/50 p-4 hover:bg-muted">
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
	<Sidebar.Footer class="bg-background">
		<!-- TODO: Add sidebar footer here -->
	</Sidebar.Footer>
</Sidebar.Root>
