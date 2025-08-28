import { api } from '@/trpc/server';
import CreateArticle from './components/create-article';

export default async function Page({ params }: PageProps<'/[spaceId]'>) {
  const { spaceId } = await params;
  await api.space.findOne.prefetch(spaceId);
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
