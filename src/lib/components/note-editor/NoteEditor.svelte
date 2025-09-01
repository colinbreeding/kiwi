<script lang="ts">
	import { SidebarInset } from '$lib/components/ui/sidebar';
	import { NoteManager } from './note-manager';
	import Editor from './editor/Editor.svelte';
</script>

<SidebarInset class="!m-4 !mt-2 overflow-y-auto !rounded-lg bg-background">
	<NoteManager />
	<div class="h-[85vh] overflow-y-auto">
		<Editor />
	</div>
</SidebarInset>
