import { get, writable, type Readable } from 'svelte/store';

const authStore = writable<AuthDialog.AuthDialogState>({ open: false, mode: 'login' });

export const authDialog: Readable<AuthDialog.AuthDialogState> = {
	subscribe: authStore.subscribe
};

export function openAuthDialog(mode: AuthDialog.AuthDialogMode = 'login', origin?: string): void {
	authStore.update((state) => ({ ...state, open: true, mode, origin }));
}

export function closeAuthDialog(): void {
	authStore.update((state) => ({ ...state, open: false }));
}

export function setAuthDialogMode(mode: AuthDialog.AuthDialogMode): void {
	authStore.update((state) => ({ ...state, mode }));
}

/**
 * Call from actions that require auth. Returns true if the user is logged in; otherwise opens the auth dialog and returns false.
 */
export function requireAuth(
	userStore: Readable<unknown>,
	preferMode: AuthDialog.AuthDialogMode = 'signup',
	origin?: string
): boolean {
	const currentUser = get(userStore);
	if (!currentUser) {
		openAuthDialog(preferMode, origin);
		return false;
	}
	return true;
}
