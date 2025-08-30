import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Layout(props: LayoutProps<'/'>) {
  const _headers = await headers();
  const session = await auth.api.getSession({ headers: _headers })

  if (!session) {
    const redirectTo = _headers.get('referer') || ''
    redirect(
      `/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`
    );
  } 

  return (
    props.children  
  );
}
