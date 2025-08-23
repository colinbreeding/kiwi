<script>
	import Header from '$lib/components/header/+page.svelte';
	import { NodeEditor } from '$lib/components/note-editor';
	import { Sidebar } from '$lib/components/sidebar';
	import { Provider as SidebarProvider } from '$lib/components/ui/sidebar';
</script>

<div class="flex min-h-svh flex-col">
	<!-- Fixed app header at the top -->
	<Header />
	<!-- Sidebar area fills the remaining space and respects header offset -->
	<SidebarProvider class="with-header-offset min-h-0 flex-1" style="--header-offset: 3rem;">
		<Sidebar />
		<NodeEditor />
	</SidebarProvider>
</div>
