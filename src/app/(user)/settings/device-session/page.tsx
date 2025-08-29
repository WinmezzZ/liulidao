import { type Session } from 'better-auth';
import { format } from 'date-fns';
import { Loader } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import { useEffect, useState, useTransition } from 'react';
import { UAParser } from 'ua-parser-js';
import { setPassword } from '@/app/actions/account';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { qqwry } from '@/lib/qqwry';

export default async function SessionDevice() {
  const list = await auth.api.listDeviceSessions({
    headers: await headers(),
  });

  console.log(list);

  // const getData = async () => {
  //   startTransition(async () => {
  //     const res = await authClient.multiSession.listDeviceSessions();
  //     if (res.data) {
  //       setList(res.data.map((item) => item.session));
  //     }
  //   });
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  // const confirm = useConfirmDialog();

  // const handleOffline = async (token: string) => {
  //   const res = await authClient.multiSession.revoke({
  //     sessionToken: token,
  //   });
  //   if (!res.error) {
  //     getData();
  //   }
  // };

  const getAddressInfo = (ipAddress?: string | null) => {
    if (ipAddress) {
      const info = qqwry.searchIP(ipAddress);
      return info.Area + ' ' + info.Country;
    }
    return '本地开发环境';
  };

  return (
    <div className="space-y-8 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>登录设备管理</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2">
            {list.map(({ session }) => (
              <li
                key={session.id}
                className="flex items-center justify-between"
              >
                <div className="flex flex-1 gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">{session.ipAddress}</span>
                    <span className="text-sm">
                      {getAddressInfo(session.ipAddress)}
                    </span>
                  </div>
                  {session.userAgent && (
                    <div className="flex items-center gap-1">
                      <span className="text-sm">
                        {UAParser(session.userAgent)?.os?.name}
                      </span>
                      <span className="text-sm">
                        {UAParser(session.userAgent)?.browser.name}
                      </span>
                    </div>
                  )}
                  <span>
                    最近登录时间：
                    {format(session.updatedAt, 'yyyy-MM-dd HH:mm:ss')}
                  </span>
                </div>
                {/* <Button
                  className="w-20"
                  variant="secondary"
                  // onClick={() => handleOffline(session.token)}
                >
                  下线
                </Button> */}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
