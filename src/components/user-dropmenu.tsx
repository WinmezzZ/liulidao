import { BadgeCheck, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Session } from '@/lib/auth-types';
import { SignOutDropMenuItem } from './sign-out-dropmenu-item';

export default async function UserDropMenu({ session }: { session: Session }) {
  const user = session?.user;

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 rounded-full bg-white shadow-md">
          {user.image && <AvatarImage src={user.image} alt={user.name} />}
          <AvatarFallback className="rounded-full">
            {user.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              {user.image && <AvatarImage src={user.image} alt={user.name} />}
              <AvatarFallback className="rounded-lg">
                {user.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings/account">
              <BadgeCheck />
              设置
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/user/${user.name}`}>
              <CreditCard />
              我的首页
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutDropMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
