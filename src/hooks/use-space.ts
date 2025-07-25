'use client';

import { useParams } from 'next/navigation';

export const useSpaceId = () => {
  const params = useParams();
  return params.spaceId as string;
};

export const useArticleId = () => {
  const params = useParams();
  return params.articleId as string;
};
