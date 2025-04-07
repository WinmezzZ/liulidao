
import { VerifyTip } from "@/app/components/verify-tip";

export default  function Layout({ children }: { children: React.ReactNode }) {
   
  return <div>
    <VerifyTip />
    {children}
    </div>;
}
