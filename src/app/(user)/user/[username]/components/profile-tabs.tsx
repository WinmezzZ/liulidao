'use client';

import {
  FileText,
  MessageCircle,
  Settings,
  Star,
  UserPlus,
  Users,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ProfileTabsProps {
  activeTab: string;
}

export function ProfileTabs({ activeTab }: ProfileTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === 'posts') {
      params.delete('tab');
    } else {
      params.set('tab', tab);
    }
    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : '';
    router.push(url);
  };

  const tabs = [
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'activity', label: 'Activity', icon: Users },
    { id: 'stars', label: 'Stars', icon: Star },
    { id: 'following', label: 'Following', icon: UserPlus },
    { id: 'comments', label: 'Comments', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-card grid grid-cols-6 gap-2 rounded-lg p-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <Button
            key={tab.id}
            variant={isActive ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 ${
              isActive
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-accent/50'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
