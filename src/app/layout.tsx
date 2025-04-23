import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { ConfirmDialogProvider } from '@/components/confirm-dialog';
import { Toaster } from '@/components/ui/sonner';
import { META_THEME_COLORS } from '@/constants/site';
import { TRPCReactProvider } from '@/trpc/client';

export const metadata: Metadata = {
  title: '琉璃岛',
  description: '琉璃岛',
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
              defaultTheme="system"
              enableSystem
              enableColorScheme
              disableTransitionOnChange
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
