'use client';
import { type Space } from '@prisma/client';
import { ChevronsUpDown, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import {
  CreateSpaceDrawer,
  type SpaceDrawerRef,
} from '@/app/components/create-space-drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function TeamSwitcher({ spaces }: { spaces: Space[] }) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = useState(spaces[0]);
  const spaceDrawerRef = useRef<SpaceDrawerRef>(null);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
              </div> */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {spaces.map((space, index) => (
              <DropdownMenuItem
                key={space.id}
                onClick={() => setActiveTeam(space)}
                className="gap-2 p-2"
              >
                {/* <div className='flex size-6 items-center justify-center rounded-sm border'>
                  <team.logo className='size-4 shrink-0' />
                </div> */}
                {space.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onSelect={(event) => {
                spaceDrawerRef.current?.setOpen(true);
              }}
            >
              <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">添加空间</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
          <CreateSpaceDrawer ref={spaceDrawerRef} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
