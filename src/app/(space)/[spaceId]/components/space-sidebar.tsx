import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { api } from '@/trpc/server';
import { NavGroup } from './nav-group';
import { sidebarData } from './space-data';
import { SpacePageTree } from './space-page-tree';
import { SpaceSwitcher } from './space-switcher';

export async function SpaceSidebar({
  spaceId,
  ...props
}: React.ComponentProps<typeof Sidebar> & { spaceId: string }) {
  const spaces = await api.space.list();

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SpaceSwitcher spaces={spaces} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarContent>
        <SpacePageTree />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
