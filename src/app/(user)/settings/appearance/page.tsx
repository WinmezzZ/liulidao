import { Separator } from '@/components/ui/separator';

import { AppearanceForm } from './appearance-form';

export default function SettingsAppearancePage() {
  return (
    <div>
      <div>
        <h3 className="text-lg font-medium">外观设置</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          自定义应用外观，自动切换日间和夜间主题色。
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
