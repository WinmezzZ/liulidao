'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { setPassword } from '@/app/actions/account';
import github from '@/assets/svg/logo/github.svg';
import google from '@/assets/svg/logo/google.svg';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { authClient, useSession } from '@/lib/auth-client';
import { type Account } from '@prisma-generated/prisma/client';
import { getUserAccounts } from '../action';

const providers = [
  {
    name: 'github',
    icon: github,
  },
  {
    name: 'google',
    icon: google,
  },
] as const;

export default function Page() {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isPending, startTransition] = useTransition();

  const listAccounts = useCallback(async () => {
    if (!session) return;
    const res = await getUserAccounts(session.user.id);
    setAccounts(res);
  }, [session]);

  useEffect(() => {
    listAccounts();
  }, [listAccounts]);

  const linkAccount = async (provider: 'github' | 'google') => {
    startTransition(async () => {
      const res = await authClient.linkSocial({
        provider,
        callbackURL: location.href,
        fetchOptions: {
          timeout: 200000,
        },
      });
      console.log(res);
      if (res.data) {
        listAccounts();
      }
    });
  };

  const confirm = useConfirmDialog();

  const unlinkAccount = async (providerId: string) => {
    const account = accounts.find(
      (account) => account.providerId === providerId
    );
    if (!account) return;
    const submit = async () => {
      const res = await authClient.unlinkAccount({
        providerId: account.providerId,
        accountId: account.id,
      });
      console.log(res);
      if (res.data) {
        listAccounts();
      }
    };
    startTransition(async () => {
      const account = accounts.find(
        (account) => account.providerId === providerId
      );
      if (!account?.password) {
        confirm({
          title: '解除绑定',
          description: `由于该绑定账号未设置密码，解绑 ${providerId} 需要初始化一个登录密码`,
          inputProps: {
            placeholder: '请设置登录密码',
            type: 'password',
          },
          onConfirm: async (close, inputText) => {
            const res = await setPassword(inputText);
            if (res) {
              await submit();
              close();
            }
          },
        });
      } else {
        await submit();
      }
    });
  };

  const hasLinked = (provider: 'github' | 'google') => {
    return accounts.some((account) => account.providerId === provider);
  };

  return (
    <ul className="flex flex-col gap-2">
      {providers.map((provider) => (
        <li key={provider.name} className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm">
            <Image src={provider.icon} alt={provider.name} className="size-5" />{' '}
            {provider.name} {hasLinked(provider.name) && '（已绑定）'}
          </span>
          {hasLinked(provider.name) ? (
            <Button
              className="w-20"
              variant="secondary"
              onClick={() => unlinkAccount(provider.name)}
              loading={isPending}
            >
              解除绑定
            </Button>
          ) : (
            <Button
              className="w-20"
              variant="default"
              onClick={() => linkAccount(provider.name)}
              loading={isPending}
            >
              绑定
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
