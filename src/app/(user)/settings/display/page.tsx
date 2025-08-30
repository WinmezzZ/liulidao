import { Separator } from '@/components/ui/separator';

import { DisplayForm } from './display-form';

export default function SettingsDisplayPage() {
  return (
    <div>
      <div>
        <h3 className="text-lg font-medium">Display</h3>
        <p className="text-muted-foreground text-sm">
          Turn items on or off to control what&apos;s displayed in the app.
        </p>
      </div>
      <Separator />
      <DisplayForm />
    </div>
  );
}
