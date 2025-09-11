'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { setAppearance } from '@/app/(user)/settings/appearance/action';
import { type Session } from '@/lib/auth-types';
import { Button } from './ui/button';

export const ThemeSwitcher = ({ session }: { session: Session }) => {
  const defaultTheme = session?.user.theme;
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    const _theme = theme === 'light' ? 'dark' : 'light';
    setTheme(_theme);
    setAppearance({ theme: _theme });
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="rounded-full"
      onClick={handleToggleTheme}
    >
      {defaultTheme === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};
