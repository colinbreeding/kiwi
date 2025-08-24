import { createClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

const userStore = writable<User | undefined>(undefined);

supabase.auth.getSession().then(({ data }) => {
	userStore.set(data.session?.user);
});

supabase.auth.onAuthStateChange((event, session) => {
	if (event == 'SIGNED_IN' && session) {
		userStore.set(session.user);
	} else if (event == 'SIGNED_OUT') {
		userStore.set(undefined);
	}
});

export default {
	get user() {
		return userStore;
	},
	signIn(email: string) {
		return supabase.auth.signInWithOtp({ email });
	},
	signInWithGithub() {
		return supabase.auth.signInWithOAuth({ provider: 'github' });
	},
	signInWithGoogle() {
		return supabase.auth.signInWithOAuth({ provider: 'google' });
	},
	signOut() {
		return supabase.auth.signOut();
	},
	notes: {
		async all() {
			const { data } = await supabase.from('notes').select('*');

			return data;
		}
	}
};
