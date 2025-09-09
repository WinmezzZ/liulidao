'use client';

import { Separator } from '@/components/ui/separator';

interface SettingsWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function SettingsWrapper({
  title,
  description,
  children,
}: SettingsWrapperProps) {
  return (
    <div className="space-y-8 pt-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <Separator />
      {children}
    </div>
  );
}
