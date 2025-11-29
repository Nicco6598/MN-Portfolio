import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Github } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

import { projects } from "@/data/projects";
import { generateProjectStructuredData, generateBreadcrumbStructuredData } from "@/lib/structured-data";

export const generateStaticParams = () => {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      id: String(project.id),
    }))
  );
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocale();
  const project = projects.find(item => String(item.id) === id);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  const isEn = locale === "en";
  const baseTitle = isEn && project.titleEn ? project.titleEn : project.title;
  const baseDescription = isEn && project.shortDescriptionEn ? project.shortDescriptionEn : project.shortDescription;
  const title = `${baseTitle} — Case Study`;
  const description = baseDescription;
  const url = `https://marco-niccolini.dev/projects/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: project.imageUrl,
          width: 1200,
          height: 630,
          alt: isEn && project.titleEn ? project.titleEn : project.title,
        },
      ],
      publishedTime: `${project.year}-${String(project.month).padStart(2, '0')}-01`,
      tags: project.languages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.imageUrl],
      creator: "@nicco6598",
    },
    alternates: {
      canonical: url,
      languages: {
        'it-IT': url,
        'en-US': url.replace('/projects/', '/en/projects/'),
      },
    },
    keywords: [
      ...project.languages,
      project.type,
      'Web3',
      'Blockchain',
      'Full Stack Development',
      'Marco Niccolini',
      'Portfolio',
    ],
  };
}

const metaFields = [
  { label: "Year", key: "year" as const },
  { label: "Period", key: "month" as const },
  { label: "Type", key: "type" as const },
];

const ProjectDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const locale = await getLocale();
  const project = projects.find(item => String(item.id) === id);

  if (!project) {
    notFound();
  }

  const isEn = locale === "en";
  const structuredData = generateProjectStructuredData(project, `https://mn-portfolio-orpin.vercel.app/projects/${id}`);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: isEn ? 'Home' : 'Home', url: 'https://mn-portfolio-orpin.vercel.app' },
    { name: isEn ? 'Projects' : 'Progetti', url: 'https://mn-portfolio-orpin.vercel.app/projects' },
    { name: isEn && project.titleEn ? project.titleEn : project.title, url: `https://mn-portfolio-orpin.vercel.app/projects/${id}` }
  ]);

  return (
    <div className="space-y-20 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <section className="container pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.4em] text-ash">case study</p>
            <h1 className="font-display text-4xl text-frost sm:text-5xl">{isEn && project.titleEn ? project.titleEn : project.title}</h1>
            <p className="text-lg text-ash">{isEn && project.shortDescriptionEn ? project.shortDescriptionEn : project.shortDescription}</p>
            <div className="space-y-4 text-ash">
              <p className="whitespace-pre-line">{isEn && project.fullDescriptionEn ? project.fullDescriptionEn : project.fullDescription}</p>
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
            {(isEn && project.todoEn && project.todoEn.length > 0) || (project.todo && project.todo.length > 0) ? (
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-ash">{isEn ? "Current focus" : "Focus attuali"}</p>
                <ul className="space-y-2 text-ash">
                  {(isEn && project.todoEn ? project.todoEn : project.todo ?? []).map(item => (
                    <li key={item} className="flex gap-2 text-sm">
                      <span className="text-ember-300">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
