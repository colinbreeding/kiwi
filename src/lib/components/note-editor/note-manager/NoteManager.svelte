<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Separator } from '$lib/components/ui/separator';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Save, Trash } from '@lucide/svelte/icons';
</script>

<div class="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border/50 px-4">
	<div class="flex items-center gap-2">
		<Sidebar.Trigger class="-ml-1 cursor-pointer hover:!bg-muted" />
		<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
		<h1 class="text-md">Test Note</h1>
	</div>
	<div class="flex items-center gap-2">
		<p class="mr-2 text-xs text-muted-foreground">Last updated 10 minutes ago</p>
		<Button
			variant="ghost"
			class="size-7 cursor-pointer hover:!bg-destructive/10 hover:!text-destructive"
		>
			<Trash />
		</Button>
		<Button variant="ghost" class="size-7 cursor-pointer hover:!bg-muted">
			<Save />
		</Button>
	</div>
</div>
