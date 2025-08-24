// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace AuthDialog {
		type AuthDialogMode = 'login' | 'signup';
		type AuthDialogState = {
			open: boolean;
			mode: AuthDialogMode;
			origin?: string;
		};
	}
}

export {};
