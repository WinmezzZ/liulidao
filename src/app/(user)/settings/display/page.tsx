import { Separator } from '@/components/ui/separator';

import { DisplayForm } from './display-form';
import SettingsLayout from '../components/settings-layout';

export default function SettingsDisplayPage() {
  return (
    <SettingsLayout className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Display</h3>
        <p className="text-muted-foreground text-sm">
          Turn items on or off to control what&apos;s displayed in the app.
        </p>
      </div>
      <Separator />
      <DisplayForm />
    </SettingsLayout>
  );
}
