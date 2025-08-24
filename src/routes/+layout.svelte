<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { AuthDialog } from '$lib/components/auth';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Kiwi</title>
</svelte:head>

<ModeWatcher />
<AuthDialog />
{@render children?.()}
