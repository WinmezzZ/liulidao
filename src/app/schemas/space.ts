import { z } from 'zod';

export const createSpaceSchema = z.object({
  name: z
    .string({
      required_error: '空间名称不能为空',
    })
    .describe('名称'),
  slug: z.string().optional().describe('路径'),
  description: z.string().optional().describe('描述'),
});
