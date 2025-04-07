import { CreateSpaceDrawer } from "./components/create-space-drawer";
import { VerifyTip } from "./components/verify-tip";
 
export default async function Page() {
  return (
    <div>
      <VerifyTip />
      <CreateSpaceDrawer />
    </div>
  );
}