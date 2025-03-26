import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Check your email</h1>
        <p className="text-muted-foreground">
          你的邮箱验证成功
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input id="code" type="text" placeholder="Enter code" required />
        </div>
        <Button type="submit" className="w-full">
          开始使用
        </Button>
        <Button variant="outline" className="w-full">
          Resend Code
        </Button>
      </div>
    </div>
  );
}