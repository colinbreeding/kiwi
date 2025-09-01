export type AuthDialogMode = 'login' | 'signup';

export type AuthDialogState = {
	open: boolean;
	mode: AuthDialogMode;
	origin?: string;
};
