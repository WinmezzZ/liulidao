'use client';

import { Edit } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import type * as z from 'zod';
import { useConfirmDialog } from '@/components/confirm-dialog';
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
import { setPassword } from '../action';
import { updatePasswordSchema } from '../schema';

const passwordConfig: FieldConfigItem = {
  inputProps: {
    type: 'password',
  },
};

export function UpdatePassword() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [hasPassword, setHasPassword] = useState(false);
  const confirm = useConfirmDialog();

  const handleSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    startTransition(async () => {
      const res = await authClient.changePassword(data);
      if (res.data) {
        toast.success('密码修改成功');
      }
    });
  };

  const handleSetPassword = async () => {
    confirm({
      title: '设置密码',
      description: '设置一个密码以让你能够直接使用密码登录',
      label: '密码',
      inputProps: {
        type: 'password',
      },
      validator: (value) => {
        if (!value) return false;
        if (value.length < 6) {
          return '密码长度不能小于6位';
        }
      },
      onConfirm: async (close, inputText) => {
        const res = await setPassword(inputText);
        if (res.status) {
          setHasPassword(true);
          close();
        }
      },
    });
  };

  useEffect(() => {
    (async () => {
      const res = await authClient.listAccounts();
      if (res.data) {
        setHasPassword(res.data.some((item) => item.provider === 'credential'));
      }
    })();
  }, []);
  return (
    <div className="flex items-center justify-between">
      <p className="text-mute text-sm">
        {hasPassword ? '已设置密码' : '您使用第三方登录的账号，暂未设置密码'}
      </p>
      {hasPassword ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">
              <Edit /> 修改密码
            </Button>
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
      ) : (
        <Button variant="default" onClick={handleSetPassword}>
          设置密码
        </Button>
      )}
    </div>
  );
}
