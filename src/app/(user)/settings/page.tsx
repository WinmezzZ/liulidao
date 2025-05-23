import { Separator } from '@/components/ui/separator';

import SettingsLayout from './components/settings-layout';
import { ProfileForm } from './profile-form';

export default async function SettingsProfilePage() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">个人资料</h3>
          <p className="text-muted-foreground text-sm">
            其他人都可以看到你的个人资料
          </p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    </SettingsLayout>
  );
}
