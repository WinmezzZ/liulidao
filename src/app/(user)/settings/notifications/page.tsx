import { Separator } from '@/components/ui/separator';

import { NotificationsForm } from './notifications-form';
import SettingsLayout from '../components/settings-layout';

export default function SettingsNotificationsPage() {
  return (
    <SettingsLayout className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-muted-foreground text-sm">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </SettingsLayout>
  );
}
