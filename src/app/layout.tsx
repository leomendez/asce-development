import './globals.css';
import { Roboto } from 'next/font/google';
import { Footer, Navbar } from '@/components';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Asce Development',
  description: 'Leo Mendez software developer portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className + ' bg-slate-800 text-slate-300 transition-all h-full w-full xl:px-40'}>
        <div className="relative flex flex-col justify-between h-full w-full overflow-x-hidden">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
