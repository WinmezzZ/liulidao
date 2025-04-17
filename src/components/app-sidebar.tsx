import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavGroup } from './nav-group';
import { NavUser } from './nav-user';
import { sidebarData, treeData } from './sidebar-data';
import { TeamSwitcher } from './team-switcher';
import { TreeView } from './ui/tree-view';
import { api } from '@/trpc/server';

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const spaces = await api.space.list()
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
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
