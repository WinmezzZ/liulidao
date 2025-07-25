'use client';
import { type Space } from '@prisma/client';

import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuButtonServer,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface SpaceListProps {
  spaces: Space[];
  spaceId: string;
}

export async function SpaceList(props: SpaceListProps) {
  return (
    <div className="flex flex-col gap-4">
      <SidebarMenu>
        {props.spaces.map((space) => (
          <SidebarMenuItem key={space.id}>
            <SidebarMenuButtonServer
              asChild
              isActive={props.spaceId === space.id}
              tooltip={space.name}
            >
              <Link href={`/${space.id}`}>
                <span>{space.name}</span>
              </Link>
            </SidebarMenuButtonServer>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
