import { Separator } from '@/components/ui/separator';
import { AccountForm } from './account-form';
import SettingsLayout from '../components/settings-layout';

export default async function SettingsAccountPage() {
  // const session = await authClient.getSession();
  // console.log("session", session);
  // if (!session?.data) {
  //   return redirect("/sign-in");
  // }
  return (
    <SettingsLayout className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">账户设置</h3>
        <p className="text-muted-foreground mb-4 text-sm">更新你的账户设置</p>
      </div>
      <Separator />
      <AccountForm />
    </SettingsLayout>
  );
}
