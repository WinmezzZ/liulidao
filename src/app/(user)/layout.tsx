import { ThemeSwitcher } from '@/components/theme-switcher';

export default async function Layout(props: LayoutProps<'/'>) {
  return (
    <div>
      <div>
        <ThemeSwitcher />
      </div>
      {props.children}
    </div>
  );
}
