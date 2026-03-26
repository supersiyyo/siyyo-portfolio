'use client';

import Link from 'next/link';

const projects = [
  {
    title: 'Long Live Santa',
    description: 'A Roblox multiplayer game featuring weapon systems, care package drops, and dynamic map generation.',
    tags: ['Roblox', 'Luau', 'Game Dev'],
    status: 'In Progress',
  },
  {
    title: 'Siyyo Portfolio',
    description: 'This portfolio site — built with Next.js, Tailwind CSS, and deployed to SiteGround via GitHub Actions.',
    tags: ['Next.js', 'Tailwind', 'TypeScript'],
    status: 'Live',
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a16] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a16]/80 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 hover:opacity-80 transition-opacity"
          >
            Siyyo
          </Link>
          <Link
            href="/"
            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
          >
            ← Back Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <header className="mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Projects
          </h1>
          <p className="text-lg text-white/50 max-w-2xl">
            A collection of things I&apos;ve been building — from games to web apps.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6
                         hover:border-cyan-400/30 hover:bg-white/[0.06]
                         transition-all duration-300 ease-out
                         hover:shadow-[0_0_40px_rgba(56,189,248,0.08)]"
            >
              {/* Status badge */}
              <span
                className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-4
                  ${project.status === 'Live'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                  }`}
              >
                {project.status}
              </span>

              <h2 className="text-xl font-semibold mb-2 group-hover:text-cyan-300 transition-colors duration-200">
                {project.title}
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-white/50 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
