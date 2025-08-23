<script lang="ts">
	import { SidebarInset } from '$lib/components/ui/sidebar';
	import { NoteManager } from './note-manager';
	import { NoteToolbar } from './note-toolbar';
</script>

<SidebarInset class="!m-4 !mt-2 overflow-hidden rounded-lg border border-border/50 bg-muted/50">
	<NoteManager />
	<NoteToolbar />
</SidebarInset>
