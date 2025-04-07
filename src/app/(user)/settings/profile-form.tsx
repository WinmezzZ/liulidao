import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { type ChangeEvent, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { authClient } from "@/lib/auth-client";

const profileFormSchema = z.object({
  nickname: z
    .string()
    .min(2, {
      message: "昵称最少2个字符",
    })
    .max(30, {
      message: "昵称最多20个字符",
    }),
  email: z
    .string({
      required_error: "请输入邮箱地址",
    })
    .email({ message: "请输入有效的邮箱" }),
  bio: z.string().optional(),
  avatar: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach(image => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export function ProfileForm() {
  const { data: session } =  authClient.useSession();
  const user = session?.user;
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      ...user,
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(user);
  }, [user]);

  async function onSubmit(data: ProfileFormValues) {
    // const res = await apiUpDateSelfInfo(data);

    // toast[res.ok ? 'success' : 'error'](res.message);

    // if (res.ok) {
    //   useUserInfoStore.setState(res.result);
    // }
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
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
          name="avatar"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>头像</FormLabel>
              <FormControl>
                <div>
                  <Avatar
                    className="cursor-pointer w-[100px] h-[100px] rounded-full"
                    onClick={() => avatarRef.current?.click()}
                  >
                    <AvatarImage src={value} />
                    <AvatarFallback>{user.username}</AvatarFallback>
                  </Avatar>
                  <Input
                    className="hidden"
                    type="file"
                    {...rest}
                    ref={avatarRef}
                    onChange={async event => {
                      // const { files } = getImageData(event);
                      // const formData = new FormData();

                      // formData.append("file", files[0]);

                      // const imageData = await apiUploadFile(formData);

                      // if (imageData.ok) {
                      //   onChange(imageData.result);
                      // }
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>点击图片重新上传</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                你可以管理验证的邮箱 <Link href="/examples/forms">邮箱设置</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <Button type="submit">提交信息</Button>
      </form>
    </Form>
  );
}
