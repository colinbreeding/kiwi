<script lang="ts">
	import { SidebarInset } from '$lib/components/ui/sidebar';
	import NoteManager from './note-manager/+page.svelte';
</script>

<SidebarInset class="!m-4 !mt-2 bg-muted/50">
	<NoteManager />
	<div class="flex flex-1 flex-col gap-4 p-4 pt-0"></div>
</SidebarInset>
