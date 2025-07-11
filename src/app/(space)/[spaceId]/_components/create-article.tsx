'use client';

import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useUserId } from '@/hooks/use-user-id';
import { api } from '@/trpc/client';

export default function CreateArticle() {
  const router = useRouter();
  const userId = useUserId();
  const spaceFlag = useParams().spaceId as string;
  const createArticle = api.article.create.useMutation({
    onSuccess(data) {
      router.push(`/${spaceFlag}/${data.id}`);
    },
  });
  const handleCreate = () => {
    if (!userId) return;
    if (!spaceFlag) {
      toast.error('空间ID不存在');
      return;
    }
    createArticle.mutate({
      title: '无标题',
      authorId: userId,
      spaceId: spaceFlag,
      content: '',
    });
  };
  return <Button onClick={handleCreate}>写文章</Button>;
}
