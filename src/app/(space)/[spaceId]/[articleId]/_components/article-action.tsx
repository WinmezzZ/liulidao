'use client';

import { ArticleStatusType, ArticleType } from '@prisma/client';
import { useParams } from 'next/navigation';
import { type Value } from 'platejs';
import { Button } from '@/components/ui/button';
import { api, useTRPC } from '@/trpc/client';
import { useSpace } from '../../lib/useSpace';

interface ArticleActionProps {
  content: Value;
  title: string;
}

export function ArticleAction({ content, title }: ArticleActionProps) {
  const params = useParams();
  const spaceId = params.spaceId as string;
  const articleId = params.articleId as string;
  const trpc = useTRPC();
  const { mutate: updateArticle, isPending } = api.article.update.useMutation({
    onSuccess: () => {
      void trpc.article.list.invalidate();
    },
  });

  const handlePublish = () => {
    updateArticle({
      id: articleId,
      spaceId,
      title,
      content: content as any,
      type: ArticleType.PAGE,
      status: ArticleStatusType.PUBLISHED,
    });
  };

  return (
    <div className="flex justify-end gap-4 px-4 py-6">
      <Button onClick={handlePublish} loading={isPending}>
        发布
      </Button>
    </div>
  );
}
