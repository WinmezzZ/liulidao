'use client';

import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { setAppearance } from '@/app/(user)/settings/appearance/action';
import { themes } from '@/lib/theme';
import { cn } from '@/lib/utils';

export type ThemeSwitcherProps = {
  value?: 'light' | 'dark' | 'system';
  onChange?: (theme: 'light' | 'dark' | 'system') => void;
  defaultValue?: 'light' | 'dark' | 'system';
  className?: string;
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeClick = useCallback(
    (themeKey: 'light' | 'dark' | 'system') => {
      setTheme(themeKey);
      setAppearance({ theme: themeKey });
    },
    [setTheme]
  );

  return (
    <div
      className={cn(
        'bg-background ring-border relative isolate flex h-8 w-fit rounded-full p-1 ring-1',
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className="relative h-6 w-6 rounded-full"
            key={key}
            onClick={() => handleThemeClick(key as 'light' | 'dark' | 'system')}
            type="button"
          >
            {mounted && isActive && (
              <motion.div
                className="bg-secondary absolute inset-0 rounded-full"
                layoutId="activeTheme"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                'relative z-10 m-auto h-4 w-4',
                mounted && isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
