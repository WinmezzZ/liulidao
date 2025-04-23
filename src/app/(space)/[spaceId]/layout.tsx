import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { api } from '@/trpc/server';
import { SpaceProvider } from './_components/space-provider';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ spaceId: string }>;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  const space = await api.space.findOne((await params).spaceId);

  return (
    <SpaceProvider value={{ space }}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="flex flex-1 flex-col overflow-hidden">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </SpaceProvider>
  );
}
