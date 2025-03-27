import { Separator } from "@/components/ui/separator";

import SettingsLayout from "../components/settings-layout";
import { AppearanceForm } from "./appearance-form";

export default function SettingsAppearancePage() {
  return (
    <SettingsLayout className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </SettingsLayout>
  );
}
