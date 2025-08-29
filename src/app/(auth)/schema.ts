import { z } from 'zod';

export const signInSchema = z.object({
  // username: z.string({ error: "用户名不能为空" }),
  email: z.string({ error: '邮箱不能为空' }).email('请输入正确的邮箱'),
  password: z
    .string({ error: '密码不能为空' })
    .min(6, '密码最少为6位数')
    .max(32, '密码最多为32位数'),
});

export const signUpSchema = signInSchema
  .extend({
    username: z.string({ error: '用户名不能为空' }),
    confirmPassword: z.string({ error: '确认密码不能为空' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });
