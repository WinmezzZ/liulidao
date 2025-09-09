'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type * as z from 'zod';
import AvatarUpload from '@/components/ui/avatar-upload';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { authClient } from '@/lib/auth-client';
import { UpdateUserSchema } from '@/schema/user';
import { api } from '@/trpc/client';
import SettingsWrapper from './components/settings-wrapper';

export default function Page() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { mutate: updateUser, isPending } = api.user.update.useMutation({
    onSuccess: () => {
      toast.success('更新成功');
    },
  });

  const form = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: user,
    mode: 'onChange',
  });

  const onSubmit = (data: z.infer<typeof UpdateUserSchema>) => {
    updateUser(data);
  };

  useEffect(() => {
    form.reset(user);
  }, [user, form]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <SettingsWrapper
      title="个人资料"
      description="其他人都可以看到你的个人资料"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormItem>
            <FormLabel>用户名</FormLabel>
            <FormControl>
              <Input value={user.name} disabled />
            </FormControl>
            <FormDescription>用户名不可修改</FormDescription>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>昵称</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>用户展示给其他人的名称</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>头像</FormLabel>
                <FormControl>
                  <AvatarUpload
                    className="w-30"
                    defaultAvatar={value}
                    onFileChange={(file) => onChange(file)}
                    {...rest}
                  />
                </FormControl>
                <FormDescription>点击图片重新上传</FormDescription>
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>邮箱</FormLabel>
            <FormControl>
              <Input value={user.email} disabled />
            </FormControl>
            <FormDescription>邮箱不可更改</FormDescription>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>介绍</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormDescription>用一句话介绍你自己吧</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>地区</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" loading={isPending}>
            提交
          </Button>
        </form>
      </Form>
    </SettingsWrapper>
  );
}
