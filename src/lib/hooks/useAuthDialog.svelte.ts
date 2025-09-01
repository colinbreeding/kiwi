import type { AuthDialogMode, AuthDialogState } from '$lib/types/auth/authDialog';
import { get, writable, type Readable } from 'svelte/store';

const authDialogStore = writable<AuthDialogState>({ open: false, mode: 'login' });

export const useAuthDialog: Readable<AuthDialogState> = {
	subscribe: authDialogStore.subscribe
};

export function openAuthDialog(mode: AuthDialogMode = 'login', origin?: string): void {
	authDialogStore.update((state) => ({ ...state, open: true, mode, origin }));
}

export function closeAuthDialog(): void {
	authDialogStore.update((state) => ({ ...state, open: false }));
}

export function setAuthDialogMode(mode: AuthDialogMode): void {
	authDialogStore.update((state) => ({ ...state, mode }));
}

/**
 * Call from actions that require auth. Returns true if the user is logged in; otherwise opens the auth dialog and returns false.
 */
export function requireAuth(
	userStore: Readable<unknown>,
	preferMode: AuthDialogMode = 'signup',
	origin?: string
): boolean {
	const currentUser = get(userStore);
	if (!currentUser) {
		openAuthDialog(preferMode, origin);
		return false;
	}
	return true;
}
