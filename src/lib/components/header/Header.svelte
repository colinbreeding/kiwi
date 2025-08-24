<script lang="ts">
	import kiwiLogo from '$lib/assets/kiwi_logo.png';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import supabase from '../../../server/supabase';
	import { openAuthDialog } from '$lib/hooks/auth-dialog.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	let user = supabase.user;
	let userProfile = $derived($user?.user_metadata);

	async function handleSignIn() {
		openAuthDialog('login', 'header');
	}

	async function handleSignOut() {
		await supabase.signOut();
	}
</script>

<div class="flex h-12 w-full items-center justify-between p-4">
	<div class="-ml-1 flex items-center gap-1">
		<img src={kiwiLogo} alt="Kiwi Logo" class="h-7 max-h-7 min-h-7 w-7 max-w-7 min-w-7" />
		<span class="text-xl font-bold">Kiwi</span>
	</div>
	<div class="flex items-center gap-2">
		<Button onclick={toggleMode} variant="outline" size="icon">
			<SunIcon
				class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
			/>
			<MoonIcon
				class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
		{#if $user}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="cursor-pointer"
					><Avatar>
						<AvatarImage src={userProfile?.avatar_url} />
						<AvatarFallback>{userProfile?.name?.charAt(0)}</AvatarFallback>
					</Avatar></DropdownMenu.Trigger
				>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={handleSignOut}>Sign out</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<Button onclick={handleSignIn} class="cursor-pointer">Sign in</Button>
		{/if}
	</div>
</div>
