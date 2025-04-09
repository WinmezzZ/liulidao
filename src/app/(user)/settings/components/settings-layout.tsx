import Image from 'next/image';

import { Separator } from '@/components/ui/separator';

import { SidebarNav } from './sidebar-nav';

const sidebarNavItems = [
  {
    title: '个人资料',
    href: '/settings',
  },
  {
    title: '账户设置',
    href: '/settings/account',
  },
  {
    title: '通用设置',
    href: '/settings/appearance',
  },
  {
    title: '通知设置',
    href: '/settings/notifications',
  },
  {
    title: '外观设置',
    href: '/settings/display',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function SettingsLayout({
  children,
  className,
}: SettingsLayoutProps) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/settings-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/settings-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">设置</h2>
          <p className="text-muted-foreground">管理你的账号设置</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
