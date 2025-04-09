'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import type * as z from 'zod';
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import { type FieldConfigItem } from '@/components/ui/auto-form/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { authClient } from '@/lib/auth-client';
import { updatePasswordSchema } from '../schema';

const passwordConfig: FieldConfigItem = {
  inputProps: {
    type: 'password',
  },
};

export function UpdatePassword() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    startTransition(async () => {
      const res = await authClient.changePassword(data);
      if (res.data) {
        toast.success('密码修改成功');
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
          <DialogDescription>修改密码</DialogDescription>
        </DialogHeader>
        <AutoForm
          formSchema={updatePasswordSchema}
          fieldConfig={{
            currentPassword: passwordConfig,
            newPassword: passwordConfig,
            confirmNewPassword: passwordConfig,
          }}
          onSubmit={handleSubmit}
        >
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
