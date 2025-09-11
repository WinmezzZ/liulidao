import { getSession } from '@/app/actions/account';
import { ThemeSwitcher } from './theme-switcher';
import { SidebarTrigger } from './ui/sidebar';
import UserDropMenu from './user-dropmenu';

export default async function NavHeader() {
  const session = await getSession();
  return (
    <div className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 dark:border-border sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div
        className="container mx-auto flex items-center justify-between"
        style={{ height: 'var(--nav-header-height)' }}
      >
        <div className="flex items-center gap-4">
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher session={session} />
          <UserDropMenu session={session} />
        </div>
      </div>
    </div>
  );
}
