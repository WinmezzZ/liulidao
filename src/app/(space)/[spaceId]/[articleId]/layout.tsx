import { api } from '@/trpc/server';
import { SpaceProvider } from '../_components/space-provider';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ articleId: string }>;
}) {
  const article = await api.article.findOne((await params).articleId);

  return <SpaceProvider value={{ article }}>{children}</SpaceProvider>;
}
