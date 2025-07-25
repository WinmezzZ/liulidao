import { cookies } from 'next/headers';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { api } from '@/trpc/server';
import { HomeSidebar } from './components/home-sidebar';
import { VerifyTip } from './components/verify-tip';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ spaceId: string }>;
}) {
  const { spaceId } = await params;
  const spaces = await api.space.list();

  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get('home_sidebar_state')?.value === 'true' || true;

  return (
    <>
      <VerifyTip />
      <SidebarProvider defaultOpen={defaultOpen}>
        <HomeSidebar spaceId={spaceId} spaces={spaces} />
        <main className="flex flex-1 flex-col overflow-hidden">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
