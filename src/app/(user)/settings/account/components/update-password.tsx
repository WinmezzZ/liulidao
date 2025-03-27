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
import { updatePasswordSchema } from "../schema";
import * as z from "zod";
import { authClient, getErrorMessage } from "@/lib/auth-client";
import { toast } from "sonner";
import {  useTransition } from "react";
import { FieldConfigItem } from "@/components/ui/auto-form/types";
import { useState } from "react";

const passwordConfig: FieldConfigItem  = {
  inputProps: {
    type: "password",
  },
};

export function UpdatePassword() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    startTransition(async () => {
      const res = await authClient.changePassword(data);
      if (res.error) {
        toast.error(getErrorMessage(res.error.code));
      } else {
        toast.success("密码修改成功");
        setOpen(false);
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">修改密码</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>修改密码</DialogTitle>
          <DialogDescription>
            修改密码
          </DialogDescription>
        </DialogHeader>
        <AutoForm formSchema={updatePasswordSchema} fieldConfig={{
          currentPassword:passwordConfig,
          newPassword: passwordConfig,
          confirmNewPassword: passwordConfig,
        }} onSubmit={handleSubmit}>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">取消</Button>
            </DialogClose>
            <AutoFormSubmit loading={isPending}>保存</AutoFormSubmit>
          </DialogFooter>
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
}
