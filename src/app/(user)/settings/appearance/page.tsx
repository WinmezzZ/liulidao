import { Separator } from '@/components/ui/separator';

import { AppearanceForm } from './appearance-form';

export default function SettingsAppearancePage() {
  return (
    <div>
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-muted-foreground text-sm">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
