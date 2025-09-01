<script lang="ts">
	import kiwiLogo from '$lib/assets/kiwi_logo.png';
	import { authDialog, closeAuthDialog } from '$lib/hooks/auth-dialog.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import GoogleIcon from '$lib/assets/icons/GoogleIcon.svelte';
	import { Github } from '@lucide/svelte';
	import supabase from '../../../server/supabase';

	let email = $state('');
	let open = $state(false);

	function handleSendMagicLink() {
		supabase.signIn(email);
	}

	function handleSignInWithGithub() {
		supabase.signInWithGithub();
	}

	function handleSignInWithGoogle() {
		supabase.signInWithGoogle();
	}

	function handleOpenChange(next: boolean) {
		if (!next) closeAuthDialog();
	}

	$effect(() => {
		const state = $authDialog as { open: boolean; mode: AuthDialog.AuthDialogMode };
		open = state?.open ?? false;
	});
</script>

<Dialog.Root bind:open onOpenChange={handleOpenChange}>
	<Dialog.Content
		class="top-0 left-0 flex h-screen w-screen max-w-full translate-x-0 translate-y-0 flex-col items-center justify-center bg-transparent backdrop-blur-sm sm:max-w-full"
	>
		<div class="flex w-fit flex-col items-center gap-4">
			<div class="flex w-full flex-col items-center gap-1">
				<div class="-ml-1 flex items-center gap-1">
					<span class="text-xl font-bold"
						><img
							src={kiwiLogo}
							alt="Kiwi Logo"
							class="inline h-7 max-h-7 min-h-7 w-7 max-w-7 min-w-7"
						/>Kiwi</span
					>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">The minimalistic ai note-taking app</p>
				</div>
			</div>
			<Card class="max-w-md space-y-2 p-6">
				<div class="space-y-2">
					<h1 class="text-xl font-semibold">Login to your account</h1>
					<p class="text-sm text-muted-foreground">
						Enter your email to receive a login link or login with one of the following providers.
					</p>
				</div>
				<div class="space-y-2">
					<label for="email" class="text-sm">Email</label>
					<Input bind:value={email} type="email" placeholder="you@example.com" />
				</div>
				<div class="flex flex-col gap-2">
					<Button onclick={handleSendMagicLink} class="w-full cursor-pointer"
						>Send magic link</Button
					>
					<Button
						onclick={handleSignInWithGithub}
						variant="secondary"
						class="w-full cursor-pointer"
					>
						<Github size={16} color="var(--foreground)" /> Login with Github
					</Button>
					<Button
						onclick={handleSignInWithGoogle}
						variant="secondary"
						class="w-full cursor-pointer"
					>
						<GoogleIcon size={16} color="var(--foreground)" />
						Login with Google
					</Button>
				</div>
			</Card>
		</div>
	</Dialog.Content>
</Dialog.Root>
