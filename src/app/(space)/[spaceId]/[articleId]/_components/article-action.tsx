'use client';

import { Button } from '@/components/ui/button';
import { useSpace } from '../../_lib/useSpace';

interface ArticleActionProps {
  content: string;
}

export function ArticleAction({ content }: ArticleActionProps) {
  const spaceData = useSpace();

  const handlePublish = () => {
    console.log(content);
  };

  return (
    <div className="flex justify-end gap-4 px-4 py-6">
      <Button onClick={handlePublish}>发布</Button>
    </div>
  );
}
