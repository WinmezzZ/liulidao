import { api } from '@/trpc/server';
import CreateArticle from './_components/create-article';

export default async function Page({
  params,
}: {
  params: Promise<{ spaceId: string }>;
}) {
  const { spaceId } = await params;
  const articles = await api.article.spaceArticleList({ spaceId });
  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
        <li>
          <CreateArticle />
        </li>
      </ul>
    </div>
  );
}
