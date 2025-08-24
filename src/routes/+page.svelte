<script>
	import Header from '$lib/components/header/Header.svelte';
	import { NodeEditor } from '$lib/components/note-editor';
	import { Sidebar } from '$lib/components/sidebar';
	import { Provider as SidebarProvider } from '$lib/components/ui/sidebar';
</script>

<section class="flex min-h-svh flex-col">
	<Header />
	<SidebarProvider class="with-header-offset min-h-0 flex-1" style="--header-offset: 3rem;">
		<Sidebar />
		<NodeEditor />
	</SidebarProvider>
</section>
