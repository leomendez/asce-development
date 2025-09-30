export default function Page() {
  return (
    <main className="h-full">
      <div className="p-8 md:p-36 flex flex-col gap-12 h-full items-start">
        <h1 className="text-4xl font-bold">About</h1>
        
        <div className="flex flex-col gap-8 max-w-4xl">
          <p className="text-slate-400 leading-8">
            Senior Software Engineer with 7+ years building scalable web applications and leading technical initiatives at Parchment/Instructure.
          </p>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Technical Focus</h2>
            <div className="text-slate-400 leading-7">
              <p><strong className="text-white">Frontend:</strong> TypeScript, React, Next.js, modern testing frameworks</p>
              <p><strong className="text-white">Backend:</strong> Node.js, Java Spring Boot, GraphQL</p>
              <p><strong className="text-white">DevOps:</strong> Docker, automated testing (Playwright, Selenium)</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Key Achievements</h2>
            <ul className="text-slate-400 leading-7 space-y-2">
              <li>• Architected GraphQL code generation improving type safety across frontend apps</li>
              <li>• Led Next.js adoption and major framework upgrades organization-wide</li>
              <li>• Increased product conversion rates from 20% to 80%+ through technical optimization</li>
              <li>• Built CLI tools and testing infrastructure used by multiple engineering teams</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            <p className="text-slate-400 leading-7">
              Currently at Parchment (Instructure) since 2018, progressing from Integration Engineer → Sr. Software Engineer → Engineering Manager → back to Senior IC role.
            </p>
            <p className="text-slate-400 leading-7 mt-2">
              MBA & BS Computer Science from Kansas Wesleyan University.
            </p>
          </div>

          <p className="text-slate-400 italic">
            Full resume available upon request.
          </p>
        </div>
      </div>
    </main>
  );
}