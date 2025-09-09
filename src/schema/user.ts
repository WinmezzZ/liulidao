import * as z from 'zod';
import { Theme } from '@prisma-generated/prisma/enums';

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  email: z.email({ error: '请输入正确的邮箱' }).optional(),
  image: z.string().optional(),
  location: z.string().optional(),
  font: z.string().optional(),
  theme: z.enum(Theme).optional(),
  nickname: z
    .string()
    .min(2, {
      error: '昵称最少2个字符',
    })
    .max(30, {
      error: '昵称最多20个字符',
    })
    .optional(),
  bio: z.string().optional(),
});
