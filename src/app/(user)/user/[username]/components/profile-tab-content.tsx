import {
  FileText,
  Heart,
  MessageCircle,
  Settings,
  Star,
  UserPlus,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ProfilePageProps {
  activeTab?: string;
}

export function ProfileTabContent({ activeTab = 'posts' }: ProfilePageProps) {
  const activities = [
    {
      type: 'post',
      title: 'Building a Modern Dashboard with Next.js 14',
      description:
        'Just published a comprehensive guide on creating responsive dashboards...',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
    },
    {
      type: 'star',
      title: 'Starred shadcn/ui repository',
      description: 'Amazing component library for React applications',
      timestamp: '1 day ago',
      likes: 0,
      comments: 0,
    },
    {
      type: 'comment',
      title: "Commented on 'React Server Components Best Practices'",
      description: "Great insights! I've been using RSCs in production and...",
      timestamp: '3 days ago',
      likes: 12,
      comments: 3,
    },
    {
      type: 'follow',
      title: 'Started following @vercel',
      description: 'Following for the latest updates on Next.js and deployment',
      timestamp: '1 week ago',
      likes: 0,
      comments: 0,
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <FileText className="h-4 w-4" />;
      case 'star':
        return <Star className="h-4 w-4" />;
      case 'comment':
        return <MessageCircle className="h-4 w-4" />;
      case 'follow':
        return <UserPlus className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Recent Posts
              </CardTitle>
              <CardDescription>Your latest published content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities
                .filter((a) => a.type === 'post')
                .map((activity, index) => (
                  <div
                    key={index}
                    className="border-accent space-y-2 border-l-2 pl-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-card-foreground font-semibold">
                        {activity.title}
                      </h3>
                      <Badge variant="secondary">{activity.timestamp}</Badge>
                    </div>
                    <p className="text-muted-foreground text-pretty">
                      {activity.description}
                    </p>
                    <div className="text-muted-foreground flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {activity.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {activity.comments}
                      </div>
                    </div>
                    {index <
                      activities.filter((a) => a.type === 'post').length -
                        1 && <Separator className="mt-4" />}
                  </div>
                ))}
            </CardContent>
          </Card>
        );

      case 'activity':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground">
                All Activity
              </CardTitle>
              <CardDescription>Your complete activity timeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="bg-accent/10 text-accent flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-card-foreground font-semibold">
                        {activity.title}
                      </h3>
                      <Badge variant="outline">{activity.timestamp}</Badge>
                    </div>
                    <p className="text-muted-foreground text-pretty">
                      {activity.description}
                    </p>
                    {(activity.likes > 0 || activity.comments > 0) && (
                      <div className="text-muted-foreground flex items-center gap-4 text-sm">
                        {activity.likes > 0 && (
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {activity.likes}
                          </div>
                        )}
                        {activity.comments > 0 && (
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {activity.comments}
                          </div>
                        )}
                      </div>
                    )}
                    {index < activities.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case 'stars':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Starred Repositories
              </CardTitle>
              <CardDescription>
                Projects you've starred and found interesting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground py-8 text-center">
                <Star className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>Your starred repositories will appear here</p>
              </div>
            </CardContent>
          </Card>
        );

      case 'following':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground">Following</CardTitle>
              <CardDescription>
                People and organizations you follow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground py-8 text-center">
                <UserPlus className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>Your following list will appear here</p>
              </div>
            </CardContent>
          </Card>
        );

      case 'comments':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground">Comments</CardTitle>
              <CardDescription>
                Your recent comments and discussions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground py-8 text-center">
                <MessageCircle className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>Your comments will appear here</p>
              </div>
            </CardContent>
          </Card>
        );

      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Profile Settings
              </CardTitle>
              <CardDescription>
                Manage your account preferences and privacy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground py-8 text-center">
                <Settings className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>Settings panel will appear here</p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return renderTabContent();
}
