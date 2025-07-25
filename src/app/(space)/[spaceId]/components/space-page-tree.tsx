'use client';

import { ArticleType } from '@prisma/client';
import { type TreeDataItem, TreeView } from '@/components/tree-view';
import { Skeleton } from '@/components/ui/skeleton';
import { useSpaceId } from '@/hooks/use-space';
import { api } from '@/trpc/client';
import { CreateArticleIcon } from './create-article-icon';

export function SpacePageTree() {
  const spaceId = useSpaceId();
  const { data, isPending } = api.article.list.useQuery({
    spaceId,
    type: ArticleType.PAGE,
  });

  if (isPending) return <Skeleton />;

  if (!data) return null;

  const treeData: TreeDataItem[] = data.list.map((item) => ({
    id: item.id,
    name: item.title!,
    actions: (
      <>
        <CreateArticleIcon parentId={item.parentId} />
      </>
    ),
  }));

  return <TreeView data={treeData} />;
}
