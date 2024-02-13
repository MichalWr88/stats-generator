import { clsx } from 'clsx';
import { Oswald, Pacifico } from 'next/font/google';
import './globals.css';
import GlobalWrapper from '@/components/GlobalWrapper';

const interRoboto = Oswald({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
  display: 'swap',
  adjustFontFallback: false,
});
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const interPacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-nanum',
  display: 'swap',
  adjustFontFallback: false,
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={clsx(interRoboto.className)}>
      <body className="flex flex-col items-center content-center w-screen h-screen overflow-hidden text-brand-font-color">
        <GlobalWrapper>{children}</GlobalWrapper>
      </body>
    </html>
  );
}
