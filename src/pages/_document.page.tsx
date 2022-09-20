import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="h-full">
      <Head />
      <body
        className="bg-asce-bg dark:bg-asce-bg-dark text-asce-font dark:text-asce-font-dark transition-all
        h-full m-auto max-w-7xl"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
