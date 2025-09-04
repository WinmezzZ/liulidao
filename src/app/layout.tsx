import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { boolean } from 'zod';
import { ConfirmDialogProvider } from '@/components/confirm-dialog';
import { Toaster } from '@/components/ui/sonner';
import { META_THEME_COLORS } from '@/constants/site';
import { DEFAULT_FONT, fonts, type FontType } from '@/lib/fonts';
import { DEFAULT_THEME } from '@/lib/theme';
import { TRPCReactProvider } from '@/trpc/client';
import { getSession } from './actions/account';

export const metadata: Metadata = {
  title: '琉璃岛',
  description: '琉璃岛',
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const userFont = (session?.user.font || DEFAULT_FONT) as FontType;
  const userTheme = session?.user.theme;
  const font = fonts[userFont];
  console.log('userTheme', userTheme);

  return (
    <html lang="en" suppressHydrationWarning className={font.className}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if ('${userTheme}') {
              localStorage.theme = '${userTheme}';
            }
            try {
              if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
              }
            } catch (_) {}
             
          `,
          }}
        />
      </head>
      <body>
        <TRPCReactProvider>
          <ConfirmDialogProvider>
            <ThemeProvider
              attribute="class"
              forcedTheme={userTheme || undefined}
              defaultTheme={userTheme || DEFAULT_THEME}
            >
              <Toaster position="top-center" richColors />
              {children}
            </ThemeProvider>
          </ConfirmDialogProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
