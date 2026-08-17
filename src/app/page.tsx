import React from 'react';
import { Chat } from '@/components/Chat';

/**
 * Height is pinned on desktop (viewport minus the ~13rem of navbar and footer
 * chrome) so the conversation scrolls inside itself and the input never leaves
 * the viewport. Below `md` it falls back to auto height and the page scrolls
 * normally, which is the better behaviour on a phone.
 */
export default function Home() {
  return (
    <main className="flex flex-col px-8 md:px-36 py-10 md:h-[calc(100dvh-13rem)]">
      <Chat />
    </main>
  );
}
