import { Separator } from '@/components/ui/separator';

import { ProfileForm } from './profile-form';

export default async function SettingsProfilePage() {
  return (
    <div>
      <div >
        <div>
          <h3 className="text-lg font-medium">个人资料</h3>
          <p className="text-muted-foreground text-sm">
            其他人都可以看到你的个人资料
          </p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    </div>
  );
}
