import { z } from "zod";

export const signInSchema = z.object({
  email: z.string({ required_error: "邮箱不能为空" }).email("请输入正确的邮箱"),
  password: z.string({ required_error: "密码不能为空" }).min(6, "密码最少为6位数").max(32, "密码最多为32位数"),
});

export const signUpSchema = signInSchema.extend({
  confirmPassword: z.string({ required_error: "确认密码不能为空" }),
  code: z.string({ required_error: "验证码不能为空" }).length(6, "验证码长度为6位数"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});;
