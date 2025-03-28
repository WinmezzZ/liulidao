"use client";
import { Separator } from "@/components/ui/separator";

import SettingsLayout from "./components/settings-layout";
import { ProfileForm } from "./profile-form";
import { authClient } from "@/lib/auth-client";

export default function SettingsProfilePage() {

  const { data: session } =  authClient.useSession();

  console.log(session);

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">个人资料</h3>
          <p className="text-sm text-muted-foreground">其他人都可以看到你的个人资料</p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    </SettingsLayout>
  );
}