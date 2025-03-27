"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updatePasswordSchema } from "./schema";
import * as z from "zod";
import { authClient, getErrorMessage } from "@/lib/auth-client";
import { toast } from "sonner";

export function UpdatePassword() {
  const handleSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    const res = await authClient.changePassword(data);
    console.log(res);

    if (res.error) {
      toast.error(getErrorMessage(res.error.code));
    } else {
      toast.success("密码修改成功");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">修改密码</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>修改密码</DialogTitle>
          <DialogDescription>
            修改密码
          </DialogDescription>
        </DialogHeader>
        <AutoForm formSchema={updatePasswordSchema} fieldConfig={{
          currentPassword: {
            inputProps: {
              type: "password",
            },
          },
          newPassword: {
            inputProps: { type: "password" },
          },
        }} onSubmit={handleSubmit}>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">取消</Button>
            </DialogClose>
            <AutoFormSubmit>保存</AutoFormSubmit>
          </DialogFooter>
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
}
