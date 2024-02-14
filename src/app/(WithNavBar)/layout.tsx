import Footer from '@/components/shared/Footer';
import NavBar from '@/components/shared/NavBar';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavBar />
      <main className="container flex flex-col flex-grow mx-auto overflow-auto bg-gray-300">{children}</main>
      <Footer />
    </>
  );
}
