<script lang="ts">
	import { cn } from '$lib/utils';

	export let open = false;
	export let items: NoteEditor.SlashMenuItem[] = [];
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
	<div class="fixed z-50" style={`top:${top}px;left:${left}px`}>
		<div
			class={cn('w-72 rounded-md border bg-popover p-2 text-popover-foreground shadow-md')}
			role="menu"
		>
			<div class="max-h-80 overflow-auto">
				{#each items as item, i}
					<button
						type="button"
						class={cn(
							'flex w-full items-start gap-3 rounded-md px-3 py-2 text-left hover:bg-accent',
							i === selectedIndex ? 'bg-accent' : ''
						)}
						on:mouseenter={() => (selectedIndex = i)}
						on:click={() => item.action()}
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
