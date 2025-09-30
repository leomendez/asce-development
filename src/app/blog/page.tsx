export default function Page() {
  return (
    <main className="h-full">
      <div className="p-8 md:p-36 flex flex-col h-full items-start overflow-x-hidden">
        <h1 className="text-4xl font-bold">Blog</h1>
        <div className="text-slate-400 flex gap-16 flex-col items-center md:mt-20 mt-8 w-full">
          <p className="text-xl text-center">
            Technical insights and thoughts on software engineering coming soon.
          </p>
          <p className="text-center text-sm">
            In the meantime, feel free to check out my projects or get in touch.
          </p>
        </div>
      </div>
    </main>
  );
}
