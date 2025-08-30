import { Separator } from '@/components/ui/separator';

import { NotificationsForm } from './notifications-form';

export default function SettingsNotificationsPage() {
  return (
    <div>
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-muted-foreground text-sm">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  );
}
