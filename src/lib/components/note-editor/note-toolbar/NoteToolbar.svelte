<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { WandSparkles } from '@lucide/svelte/icons';
	import { Separator } from '$lib/components/ui/separator';
</script>

<div class="flex flex-1 flex-col gap-4 bg-muted/50 pt-0">
	<div
		class="-ml-1 flex items-center gap-2 border-b border-border/50 bg-transparent px-4 py-2 text-muted-foreground"
	>
		<Button variant="ghost" class="size-7 cursor-pointer text-foreground hover:!bg-muted">
			<WandSparkles size={16} />
		</Button>
		<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
		<Button variant="ghost" class="size-7 cursor-pointer hover:!bg-muted">H1</Button>
		<Button variant="ghost" class="size-7 cursor-pointer hover:!bg-muted">H2</Button>
		<Button variant="ghost" class="size-7 cursor-pointer hover:!bg-muted">H3</Button>
		<Button variant="ghost" class="size-7 cursor-pointer hover:!bg-muted">B</Button>
		<Button variant="ghost" class="size-7 cursor-pointer hover:!bg-muted">I</Button>
	</div>
</div>
