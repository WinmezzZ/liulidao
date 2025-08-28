import NotFoundError from '@/app/not-found';
import { api } from '@/trpc/server';
import Editor from './_components/editor';

export default async function Page(props: PageProps<'/[spaceId]/[articleId]'>) {
  const params = await props.params;
  const article = await api.article.findOne(params.articleId);
  if (!article) {
    return <NotFoundError />;
  }
  return (
    <div>
      <Editor {...article} />
    </div>
  );
}
