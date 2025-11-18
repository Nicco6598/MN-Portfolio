import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Github } from "lucide-react";

import { projects } from "@/data/projects";

export const generateStaticParams = () =>
  projects.map(project => ({ id: String(project.id) }));

const metaFields = [
  { label: "Anno", key: "year" as const },
  { label: "Periodo", key: "month" as const },
  { label: "Tipo", key: "type" as const },
];

type PageProps = {
  params: Promise<{ id: string }>;
};

const ProjectDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const project = projects.find(item => String(item.id) === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-20 pb-24">
      <section className="container pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.4em] text-ash">case study</p>
            <h1 className="font-display text-4xl text-frost sm:text-5xl">{project.title}</h1>
            <p className="text-lg text-ash">{project.shortDescription}</p>
            <div className="space-y-4 text-ash">
              <p className="whitespace-pre-line">{project.fullDescription}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.languages.map(language => (
                <span key={language} className="rounded-full border border-white/15 px-4 py-1 text-xs uppercase tracking-wide text-ash">
                  {language}
                </span>
              ))}
            </div>
            <div className="flex gap-3 text-sm">
              {project.vercelLink !== "#" && (
                <Link
                  href={project.vercelLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-ember-300 transition hover:border-ember-500"
                >
                  Live <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
              {project.githubLink !== "#" && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-frost transition hover:border-ember-500"
                >
                  Repo <Github className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
          <div className="space-y-6 rounded-[32px] border border-white/10 bg-surface/80 p-6">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={960}
                height={720}
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="grid gap-3 text-sm text-ash">
              {metaFields.map(field => (
                <div key={field.key} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
                  <span className="uppercase tracking-[0.3em] text-xs text-ash/70">{field.label}</span>
                  <span className="text-frost">{project[field.key]}</span>
                </div>
              ))}
              {project.status && (
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="uppercase tracking-[0.3em] text-xs text-ash/70">Status</span>
                  <span className="text-ember-300">{project.status}</span>
                </div>
              )}
            </div>
            {project.todo && project.todo.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-ash">Focus attuali</p>
                <ul className="space-y-2 text-ash">
                  {project.todo.map(item => (
                    <li key={item} className="flex gap-2 text-sm">
                      <span className="text-ember-300">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
