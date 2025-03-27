import { Separator } from "@/components/ui/separator";

import SettingsLayout from "../components/settings-layout";
import { AccountForm } from "./account-form";

export default function SettingsAccountPage() {
  return (
    <SettingsLayout className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">账户设置</h3>
        <p className="text-sm text-muted-foreground">
          更新你的账户设置
        </p>
      </div>
      <Separator />
      <AccountForm />
    </SettingsLayout>
  );
}
