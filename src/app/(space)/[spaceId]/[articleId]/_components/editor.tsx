'use client';

import { type Article } from '@prisma/client';
import { type Value } from 'platejs';
import { useState } from 'react';
import { PlateEditor } from '@/components/editor/plate-editor';
import { Input } from '@/components/ui/input';
import { type api } from '@/trpc/server';
import { ArticleAction } from './article-action';

export default function Editor(
  props: NonNullable<Awaited<ReturnType<typeof api.article.findOne>>>
) {
  const { title, content } = props;
  const [articleTitle, setArticleTitle] = useState(title || '');
  const [articleContent, setArticleContent] = useState<Value>([]);

  return (
    <div>
      <ArticleAction content={articleContent as Value} title={articleTitle} />
      <Input
        className="mb-10 h-20! text-4xl! font-bold"
        value={articleTitle}
        onInput={(e) => setArticleTitle(e.currentTarget.value)}
      />
      <div className="min-h-[1/2vh] w-full" data-registry="plate">
        <PlateEditor value={content as Value} onChange={setArticleContent} />
      </div>
    </div>
  );
}
