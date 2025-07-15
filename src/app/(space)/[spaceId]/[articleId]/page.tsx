import NotFoundError from '@/app/not-found';
import { Input } from '@/components/ui/input';
import { api } from '@/trpc/server';
import Editor from './_components/editor';

export default async function Page({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const articleId = (await params).articleId;

  const article = await api.article.findOne(articleId);
  if (!article) {
    return <NotFoundError />;
  }
  return (
    <div>
      <Editor {...article} />
    </div>
  );
}
