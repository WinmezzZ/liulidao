import { createAuthClient } from "better-auth/react";
import {
	organizationClient,
	twoFactorClient,
	adminClient,
	multiSessionClient,
	oidcClient,
	genericOAuthClient,
	magicLinkClient,
	emailOTPClient,
	usernameClient,
	oneTapClient,
} from "better-auth/client/plugins";
import { toast } from "sonner";

export const authClient = createAuthClient({
	plugins: [
		organizationClient(),
		twoFactorClient({
			onTwoFactorRedirect() {
				window.location.href = "/two-factor";
			},
		}),
		adminClient(),
		multiSessionClient(),
		magicLinkClient(),
		emailOTPClient(),
		usernameClient(),
		oidcClient(),
		genericOAuthClient(),
		oneTapClient({
				clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
		})
	],
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				toast.error("Too many requests. Please try again later.");
			}
		},
	},
});

export const {
	signUp,
	signIn,
	signOut,
	useSession,
	organization,
	useListOrganizations,
	useActiveOrganization,
} = authClient;

authClient.$store.listen("$sessionSignal", async () => {});