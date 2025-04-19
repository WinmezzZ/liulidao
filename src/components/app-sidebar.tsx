import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { api } from '@/trpc/server';
import { NavGroup } from './nav-group';
import { NavUser } from './nav-user';
import { sidebarData, treeData } from './sidebar-data';
import { TeamSwitcher } from './team-switcher';
import { TreeView } from './ui/tree-view';

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const spaces = await api.space.list();
  const user = await api.user.info();

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher spaces={spaces} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarContent>
        <TreeView data={treeData} expandAll />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
