import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-asce-bg dark:bg-asce-bg-dark text-asce-font dark:text-asce-font-dark transition-all">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
