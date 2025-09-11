import {
  adminClient,
  customSessionClient,
  emailOTPClient,
  genericOAuthClient,
  inferAdditionalFields,
  magicLinkClient,
  multiSessionClient,
  oidcClient,
  oneTapClient,
  organizationClient,
  passkeyClient,
  twoFactorClient,
  usernameClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { toast } from 'sonner';
import { env } from '@/env';
import { type auth } from './auth';

export const authClient = createAuthClient({
  plugins: [
    organizationClient(),
    twoFactorClient(),
    adminClient(),
    multiSessionClient(),
    magicLinkClient(),
    emailOTPClient(),
    usernameClient(),
    passkeyClient(),
    oidcClient(),
    genericOAuthClient(),
    oneTapClient({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    }),
    customSessionClient<typeof auth>(),
    inferAdditionalFields<typeof auth>(),
  ],
  fetchOptions: {
    async onError(e) {
      console.log('Better Auth Error:', e);
      if (e.error.message) {
        toast.error(e.error.message, {
          duration: 100000,
        });
      } else if ('responseText' in e && e.responseText) {
        toast.error(e.responseText as string);
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

authClient.$store.listen('$sessionSignal', async () => {});
