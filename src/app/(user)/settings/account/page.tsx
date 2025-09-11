'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DeleteAccount from './components/delete-account';
import { Passkeys } from './components/passkeys';
import ThirdPartyAccounts from './components/third-party-accounts';
import { TwoFactory } from './components/two-factory';
import { UpdatePassword } from './components/update-password';
import SettingsWrapper from '../components/settings-wrapper';

export default function Page() {
  return (
    <SettingsWrapper title="账号设置" description="在这里设置账号相关的设置">
      <Card>
        <CardHeader>
          <CardTitle>密码</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdatePassword />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>绑定第三方账号</CardTitle>
        </CardHeader>
        <CardContent>
          <ThirdPartyAccounts />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>两步验证（2FA）</CardTitle>
        </CardHeader>
        <CardContent>
          <TwoFactory />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>通行证秘钥（Passkey）</CardTitle>
        </CardHeader>
        <CardContent>
          <Passkeys />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>删除账号</CardTitle>
        </CardHeader>
        <CardContent>
          <DeleteAccount />
        </CardContent>
      </Card>
    </SettingsWrapper>
  );
}
