import { clsx } from 'clsx';
import { Archivo_Narrow, Pacifico } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/shared/NavBar';
import GlobalWrapper from '@/components/GlobalWrapper';
import Footer from '@/components/shared/Footer';

const interRoboto = Archivo_Narrow({
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
        <NavBar />
        <main className="container flex flex-col flex-grow mx-auto bg-gray-300">
          <GlobalWrapper>{children}</GlobalWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
