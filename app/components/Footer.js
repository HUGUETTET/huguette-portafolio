// components/Footer.jsx
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4">
        {/* Social links */}
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/huguette-torres/" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/HUGUETTET"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaGithub size={24} />
          </a>
        </div>

        {/* Main copyright */}
        <p className="text-sm text-center md:text-right">
          © 2025 Huguette's Portafolio.
        </p>
      </div>

      {/* Extra message */}
      <div className="mt-6 text-center text-xs text-neutral-400 leading-relaxed">
        <p>
          Coded in <span className="font-semibold">
          <a
            href='https://code.visualstudio.com/'
            target="_blank"
            rel="noopener noreferrer">
            Visual Studio Code
          </a>
          </span> by yours truly. <br/>
          Built with <span className="font-semibold">
          <a
            href='https://nextjs.org/'
            target="_blank"
            rel="noopener noreferrer">
            Next.js
          </a></span> and <span className="font-semibold">
          <a
            href='https://tailwindcss.com/'
            target="_blank"
            rel="noopener noreferrer">
            Tailwind CSS 
          </a></span>, deployed with <span className="font-semibold">
          <a
            href='https://vercel.com/'
            target="_blank"
            rel="noopener noreferrer">
            Vercel
          </a></span>. <br />
          {/* All text is set in the <span className="font-semibold">Inter</span> typeface. */}
        </p>
      </div>
    </footer>
  );
}
