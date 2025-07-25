'use client';

import { ArticleStatusType, ArticleType } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useSpaceId } from '@/hooks/use-space';
import { api } from '@/trpc/client';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface CreateArticleIconProps {
  parentId?: string;
  type?: ArticleType;
}

export function CreateArticleIcon({ parentId, type }: CreateArticleIconProps) {
  const { mutate: createArticle } = api.article.create.useMutation();
  const spaceId = useSpaceId();

  const handleCreateArticle = () => {
    createArticle({
      parentId,
      title: '未命名',
      status: ArticleStatusType.DRAFT,
      type: type || ArticleType.PAGE,
      spaceId,
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <Plus onClick={handleCreateArticle} />
      </TooltipTrigger>
      <TooltipContent>
        {parentId ? '在内部创建文章' : '创建文章'}
      </TooltipContent>
    </Tooltip>
  );
}
