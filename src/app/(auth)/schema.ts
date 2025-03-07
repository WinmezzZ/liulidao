import { z } from "zod";

export const signInSchema = z.object({
  email: z.string({ required_error: "邮箱不能为空" }).email("请输入正确的邮箱"),
  password: z.string({ required_error: "密码不能为空" }).min(6, "密码最少为6位数").max(32, "密码最多为32位数"),
});

export const signUpSchema = signInSchema;
