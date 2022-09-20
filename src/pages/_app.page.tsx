import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Footer, Navbar } from '../components';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <title>Asce Development</title>
        <meta name="description" content="Football stats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed inset-0 flex justify-center">
        <div className="flex w-full max-w-7xl">
          <div className="w-full bg-asce-bg dark:bg-asce-bg-dark ring-1 ring-asce-bg-dark/10 dark:ring-asce-bg/10" />
        </div>
      </div>
      <div className="relative h-full flex flex-col justify-between">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
