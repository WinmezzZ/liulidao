import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { type Session } from '@/lib/auth-types';

export default function LogoutDropMenuItem({ session }: { session: Session }) {
  if (!session) {
    return null;
  }
  const user = session.user;
  return (
    <Avatar className="h-8 w-8 rounded-full bg-white shadow-md">
      {user.image && <AvatarImage src={user.image} alt={user.name} />}
      <AvatarFallback className="rounded-full">
        {user.name.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
}
