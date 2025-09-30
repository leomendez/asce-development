import { AiOutlineMail, AiOutlineLinkedin, AiOutlineGithub } from 'react-icons/ai';

export default function Page() {
  return (
    <main className="h-full">
      <div className="p-8 md:p-64 flex flex-col h-full md:gap-16 gap-8 items-center">
        <h1 className="text-4xl font-bold">Get In Touch</h1>
        
        <div className="text-slate-400 flex gap-12 flex-col items-center">
          <p className="text-xl text-center">Let's connect and discuss opportunities</p>
          
          <div className="flex gap-8 flex-col sm:flex-row items-center">
            <a
              href="mailto:leomenbel93@gmail.com"
              className="text-teal-600 flex items-center gap-2 hover:font-bold transition-all"
            >
              <AiOutlineMail size={20} /> leomenbel93@gmail.com
            </a>
            
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              className="text-teal-600 flex items-center gap-2 hover:font-bold transition-all"
            >
              <AiOutlineLinkedin size={20} /> LinkedIn
            </a>
            
            <a
              href="https://github.com/your-username"
              target="_blank"
              className="text-teal-600 flex items-center gap-2 hover:font-bold transition-all"
            >
              <AiOutlineGithub size={20} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
