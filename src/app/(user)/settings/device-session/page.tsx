import { format } from 'date-fns';
import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { qqwry } from '@/lib/qqwry';
import { Laptop, Smartphone } from 'lucide-react';
import RevokeButton from './revoke-button';
import { getSession } from '@/app/actions/account';

export default async function SessionDevice() {
  const list = await auth.api.listSessions({
    headers: await headers(),
  });
  const currentSession = await getSession()

  const getAddressInfo = (ipAddress?: string | null) => {
    if (ipAddress) {
      const info = qqwry.searchIP(ipAddress);
      return info.Area + ' ' + info.Country;
    }
    return '本地开发环境';
  };

  const getDeviceInfo = (userAgent: string) => {
    return UAParser(userAgent);
  };  

  return (
    <div className="space-y-8 pt-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">登录设备管理</h2>
        <p className="text-muted-foreground">
          在这里查看所有正在登录的  设备
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>WEB 端登录</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 text-sm">
            {list.map((session) => (
              <li
                key={session.id}
                className="flex items-center justify-between border-b border-b-gray-200 pb-4"
              >
                <div className="flex flex-1 items-center gap-8">
                  {session.userAgent &&
                  getDeviceInfo(session.userAgent).device.type === 'mobile' ? (
                    <Smartphone />
                  ) : (
                    <Laptop />
                  )}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <span>{session.ipAddress}</span>
                      <span>
                        {getAddressInfo(session.ipAddress)}
                      </span>
                      {session.id === currentSession?.session.id && <span className="ml-2  text-xs text-green-500">（当前登录设备）</span>}
                    </div>
                    {session.userAgent && (
                      <div className="flex items-center gap-1">
                        <span>
                          {getDeviceInfo(session.userAgent)?.os?.name}
                        </span>
                        <span>
                          {getDeviceInfo(session.userAgent)?.browser.name}
                        </span>
                      </div>
                    )}
                    <span className='text-sm'>
                      最近登录时间：
                      {format(session.updatedAt, 'yyyy-MM-dd HH:mm:ss')}
                    </span>
                  </div>
                </div>
                <RevokeButton token={session.token} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
