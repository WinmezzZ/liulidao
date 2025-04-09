import { Separator } from '@/components/ui/separator';

import { AppearanceForm } from './appearance-form';
import SettingsLayout from '../components/settings-layout';

export default function SettingsAppearancePage() {
  return (
    <SettingsLayout className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-muted-foreground text-sm">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </SettingsLayout>
  );
}
