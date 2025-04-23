import { VerifyTip } from '@/app/_components/verify-tip';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <VerifyTip />
      {children}
    </div>
  );
}
