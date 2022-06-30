import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-asce-honeydew dark:bg-asce-oxfordBlue text-asce-oxfordBlue dark:text-asce-honeydew transition-all">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
