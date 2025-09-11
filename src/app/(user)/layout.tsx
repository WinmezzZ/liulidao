import NavHeader from '@/components/nav-header';

export default async function Layout(props: LayoutProps<'/'>) {
  return (
    <div>
      <NavHeader />
      {props.children}
    </div>
  );
}
