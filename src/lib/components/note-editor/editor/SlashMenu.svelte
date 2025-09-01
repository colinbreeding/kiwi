<script lang="ts">
	import type { SlashMenuItem } from '$lib/types/noteEditor/slashMenu';
	import { cn } from '$lib/utils/shadcn';

	export let open = false;
	export let items: SlashMenuItem[] = [];
	export let selectedIndex = 0;
	export let top = 0;
	export let left = 0;

	function onKeyDown(event: KeyboardEvent) {
		if (!open) return;
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = (selectedIndex + 1) % items.length;
		}
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = (selectedIndex - 1 + items.length) % items.length;
		}
		if (event.key === 'Enter') {
			event.preventDefault();
			items[selectedIndex]?.action();
		}
		if (event.key === 'Escape') {
			open = false;
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

{#if open}
	<div
		class="fixed z-50"
		style={`top:${top}px;left:${left}px`}
		role="menu"
		tabindex="-1"
		on:mousedown|preventDefault
	>
		<div
			class={cn('w-72 rounded-md border bg-popover p-2 text-popover-foreground shadow-md')}
			role="menu"
		>
			<div class="max-h-80 overflow-auto">
				{#each items as item, i (item.id)}
					<button
						type="button"
						role="menuitem"
						class={cn(
							'flex w-full items-start gap-3 rounded-md px-3 py-2 text-left hover:bg-accent',
							i === selectedIndex ? 'bg-accent' : ''
						)}
						on:mouseenter={() => (selectedIndex = i)}
						on:mousedown={() => item.action()}
					>
						{#if item.icon}
							<svelte:component this={item.icon} class="mt-0.5 size-5 min-w-5 opacity-70" />
						{:else}
							<span
								class="mt-0.5 inline-flex size-5 min-w-5 items-center justify-center rounded border text-xs"
								>/</span
							>
						{/if}
						<div class="min-w-0">
							<div class="truncate font-medium">{item.label}</div>
							{#if item.description}
								<div class="truncate text-sm text-muted-foreground">{item.description}</div>
							{/if}
						</div>
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}
