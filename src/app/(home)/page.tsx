import Link from 'next/link';
import { api } from '@/trpc/server';

export default async function Page() {
  const allArticle = await api.article.list();
  return (
    <ul>
      {allArticle.list.map((article) => (
        <li key={article.id}>
          <Link href={`/article/${article.id}`}>{article.title}</Link>
        </li>
      ))}
    </ul>
  );
}
