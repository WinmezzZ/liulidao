import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ConfirmDialogProvider } from '@/components/confirm-dialog';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { META_THEME_COLORS } from '@/constants/site';
import { ImageCropperProvider } from '@/hooks/use-image-cropper';
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
              defaultTheme={userTheme || DEFAULT_THEME}
              enableSystem={!!userTheme}
              disableTransitionOnChange
            >
              <ImageCropperProvider>
                <Toaster position="top-center" richColors />
                {children}
              </ImageCropperProvider>
            </ThemeProvider>
          </ConfirmDialogProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
