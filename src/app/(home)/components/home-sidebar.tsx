'use server';

import { type Space } from '@prisma/client';
import {
  AppWindowMac,
  CompassIcon,
  NotebookPenIcon,
  StarIcon,
  TimerIcon,
  TrendingUpIcon,
} from 'lucide-react';
import Image from 'next/image';
import { NavUser } from '@/app/(space)/[spaceId]/components/nav-user';
import { SidebarFooter } from '@/components/ui/home-sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { api } from '@/trpc/server';
import { NavGroup } from '../../(space)/[spaceId]/components/nav-group';

export async function HomeSidebar({
  spaceId,
  spaces,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  spaceId: string;
  spaces: Space[];
}) {
  const user = await api.user.info();
  const navGroups = [
    {
      title: '发现',
      items: [
        {
          title: '所有更新',
          url: '/',
          icon: <CompassIcon />,
        },
        {
          title: '热门',
          url: '/hot',
          icon: <TrendingUpIcon />,
        },
      ],
    },
    {
      title: '我的',
      items: [
        {
          title: '最近处理',
          url: '/recent-worked',
          icon: <NotebookPenIcon />,
        },
        {
          title: '最近访问',
          url: '/recent-visited',
          icon: <TimerIcon />,
        },
        {
          title: '收藏',
          url: '/favorites',
          icon: <StarIcon />,
        },
      ],
    },
    {
      title: '空间',
      items: spaces.map((space) => ({
        title: space.name,
        url: `/${space.id}`,
        icon: <AppWindowMac />,
      })),
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <div className="flex flex-1 flex-col">
        <SidebarHeader className="mt-4 mb-2 items-center justify-center">
          <Image src="/next.svg" alt="logo" height={32} width={100} />
        </SidebarHeader>
        <SidebarContent>
          {navGroups.map((props) => (
            <NavGroup key={props.title} {...props} />
          ))}
        </SidebarContent>
        <SidebarRail />
      </div>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
