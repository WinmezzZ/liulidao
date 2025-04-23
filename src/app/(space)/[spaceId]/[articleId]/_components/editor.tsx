'use client';

import { type Article } from '@prisma/client';
import { useState } from 'react';
import { PlateEditor } from '@/components/editor/plate-editor';
import { SettingsProvider } from '@/components/editor/settings';
import { Input } from '@/components/ui/input';
import { ArticleAction } from './article-action';

export default function Editor(props: Article) {
  const { title, content } = props;
  const [articleTitle, setAticleTitle] = useState(title);
  const [articleContent, setArticleContent] = useState<[]>([]);

  return (
    <div>
      <ArticleAction content={articleContent} />
      <Input
        className="mb-10 h-20! text-4xl! font-bold"
        value={articleTitle}
        onInput={(e) => setAticleTitle(e.currentTarget.value)}
      />
      <div className="min-h-[1/2vh] w-full" data-registry="plate">
        <SettingsProvider>
          <PlateEditor value={content} onChange={setArticleContent} />
        </SettingsProvider>
      </div>
    </div>
  );
}
