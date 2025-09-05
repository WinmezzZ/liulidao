import { eachDayOfInterval, endOfYear, formatISO, startOfYear } from 'date-fns';
import { toSvg } from 'jdenticon';
import { Calendar, Mail, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import CoverUpload from '@/components/cover-image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/trpc/server';
import { EditProfileButton } from './components/edit-profile-button';
import { ProfileTabContent } from './components/profile-tab-content';
import { ProfileTabs } from './components/profile-tabs';
import {
  type Activity,
  ContributionGraph,
} from '../../components/contribution-graph';
import { ContributionItem } from '../../components/contribution-item';

const maxCount = 20;
const maxLevel = 4;
const now = new Date();
const days = eachDayOfInterval({
  start: startOfYear(now),
  end: endOfYear(now),
});

const data: Activity[] = days.map((date) => {
  const c = Math.round(
    Math.random() * maxCount - Math.random() * (0.8 * maxCount)
  );
  const count = Math.max(0, c);
  const level = Math.ceil((count / maxCount) * maxLevel);
  return {
    date: formatISO(date, { representation: 'date' }),
    count,
    level,
  };
});

export default async function Page(props: PageProps<'/user/[username]'>) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const activeTab = (searchParams.tab as string) || 'posts';
  const user = await api.user.info({ username: params.username });

  if (!user) {
    notFound();
  }
  return (
    <div className="bg-background min-h-screen">
      <div className="from-primary/20 to-accent/20 relative h-60 bg-gradient-to-r">
        <CoverUpload className="h-full" showUploadTips={false} />
      </div>

      <div className="relative mx-auto -mt-24 max-w-4xl px-4">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="border-background h-32 w-32 border-4 shadow-lg">
                  <AvatarImage
                    src={user.image || toSvg(user.name, 100)}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-balance">
                    {user.name}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {user.username}
                  </p>
                </div>
              </div>

              {/* User Info and Actions */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-end">
                  <EditProfileButton />
                </div>

                <p className="leading-relaxed text-pretty">
                  {user.bio || '这个人很懒，什么都没有写'}
                </p>

                {/* User Details */}
                <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {user.createdAt.toLocaleDateString()}
                  </div>
                </div>

                {/* Stats */}
                {/* <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-card-foreground text-2xl font-bold">
                      {user.stats.posts}
                    </div>
                    <div className="text-muted-foreground text-sm">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-card-foreground text-2xl font-bold">
                      {user.stats.followers}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Followers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-card-foreground text-2xl font-bold">
                      {user.stats.following}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Following
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-card-foreground text-2xl font-bold">
                      {user.stats.stars}
                    </div>
                    <div className="text-muted-foreground text-sm">Stars</div>
                  </div>
                </div> */}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="py-8">
          <h1 className="mb-4 text-xl font-bold">贡献度图</h1>
          <ContributionGraph
            data={data}
            className="rounded-lg border p-4 pt-8!"
            renderItem={(activity, node) => {
              return <ContributionItem activity={activity} node={node} />;
            }}
          />
        </div>

        <ProfileTabs activeTab={activeTab} />
        <ProfileTabContent activeTab={activeTab} />
      </div>
    </div>
  );
}
