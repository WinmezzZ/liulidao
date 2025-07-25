import { cookies } from 'next/headers';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getSpace } from './actions/get-space';
import { SpaceSidebar } from './components/space-sidebar';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ spaceId: string }>;
}) {
  const cookieStore = await cookies();
  const defaultCollapsed = cookieStore.get('sidebar_state')?.value !== 'true';
  const { spaceId } = await params;
  const space = await getSpace(spaceId);

  if (!space) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground text-sm">空间不存在</p>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={!defaultCollapsed}>
      <SpaceSidebar spaceId={space!.id} />
      <main className="flex flex-1 flex-col overflow-hidden">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
