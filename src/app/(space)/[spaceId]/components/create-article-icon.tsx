'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSpaceId } from '@/hooks/use-space';
import { api } from '@/trpc/client';
import {
  ArticleStatusType,
  ArticleType,
} from '@prisma-generated/prisma/client';

interface CreateArticleIconProps {
  parentId: string | null;
  type?: ArticleType;
}

export function CreateArticleIcon({ parentId, type }: CreateArticleIconProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const spaceId = useSpaceId();
  const { mutate: createArticle } = api.article.create.useMutation({
    onSuccess: (res) => {
      utils.article.list.invalidate();
      router.push(`/${spaceId}/${res.id}`);
    },
  });

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
        <Plus onClick={handleCreateArticle} className="size-4" />
      </TooltipTrigger>
      <TooltipContent>
        {parentId ? '在内部创建文章' : '创建文章'}
      </TooltipContent>
    </Tooltip>
  );
}
