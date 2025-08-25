<script lang="ts">
	import { SidebarInset } from '$lib/components/ui/sidebar';
	import { NoteManager } from './note-manager';
	import Editor from './editor/Editor.svelte';
</script>

<SidebarInset class="!m-4 !mt-0 overflow-y-auto !rounded-md border border-border/50 bg-muted/50">
	<NoteManager />
	<div class="h-[85vh] overflow-y-auto">
		<Editor />
	</div>
</SidebarInset>
