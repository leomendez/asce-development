import { education, formatRoleDates, roles, skills } from "@/_data";

export default function Page() {
  return (
    <main className="h-full">
      <div className="p-8 md:p-36 flex flex-col gap-12 h-full items-start">
        <h1 className="text-4xl font-bold">About</h1>

        <div className="flex flex-col gap-12 max-w-4xl">
          <p className="text-slate-400 leading-8">
            Senior Software Engineer with 7+ years building scalable web
            applications and leading technical initiatives. Currently at Cognite,
            working on AI for industry.
          </p>

          <div id="technical-focus" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold mb-4">Technical Focus</h2>
            <div className="text-slate-400 leading-7">
              {skills.map((group) => (
                <p key={group.label}>
                  <strong className="text-white">{group.label}:</strong>{" "}
                  {group.items.join(", ")}
                </p>
              ))}
            </div>
          </div>

          <div id="experience" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            <div className="flex flex-col gap-8">
              {roles.map((role) => (
                <div key={role.company}>
                  <h3 className="text-lg font-bold">
                    {role.title} ·{" "}
                    <span className="text-teal-600">{role.company}</span>
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    {formatRoleDates(role)}
                  </p>
                  <p className="text-slate-400 leading-7 mt-2">{role.summary}</p>
                  <ul className="text-slate-400 leading-7 space-y-2 mt-3">
                    {role.highlights.map((highlight) => (
                      <li key={highlight}>• {highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div id="education" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            {education.map((entry) => (
              <p key={entry.institution} className="text-slate-400 leading-7">
                {entry.credentials.join(" & ")} from {entry.institution}.
              </p>
            ))}
          </div>

          <p className="text-slate-400 italic">
            Full resume available upon request.
          </p>
        </div>
      </div>
    </main>
  );
}
