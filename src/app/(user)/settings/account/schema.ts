import { z } from "zod";

export const updatePasswordSchema = z.object({
  currentPassword: z.string({
    required_error: "旧密码不能为空",
  }).min(6, {
    message: "旧密码最少6个字符",
  }).describe("旧密码"),
  newPassword: z.string({
    required_error: "新密码不能为空",
  }).min(6, {
    message: "新密码最少6个字符",
  }).describe("新密码"),
  confirmNewPassword: z.string({
    required_error: "确认密码不能为空",
  }).min(6, {
    message: "确认密码最少6个字符",
  }).describe("确认密码"),
  revokeOtherSessions: z.boolean().optional().describe("同时退出其他设备"),
}).refine((val) => {
  return val.newPassword === val.confirmNewPassword;
}, {
  message: "确认密码不一致",
  path: ["confirmPassword"],
});
