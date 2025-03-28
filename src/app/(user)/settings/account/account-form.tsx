"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdatePassword } from "./components/update-password";
import { TwoFactory } from "./components/two-factory";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";


export function AccountForm() {
  const linkAccount = async () => {
    const res = await authClient.signIn.social({
      provider: "linkedin"
    });
  };
  return (
    <div className="pt-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>密码</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdatePassword />
         </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>绑定第三方账号</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>绑定 Github</Button>
          <Button>绑定 Google</Button>
         </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>两步验证（2FA）</CardTitle>
        </CardHeader>
        <CardContent>
          <TwoFactory />
         </CardContent>
      </Card>
    </div>
  );
}
