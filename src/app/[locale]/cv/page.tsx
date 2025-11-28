import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { projects } from "@/data/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mn-portfolio-orpin.vercel.app";

export const metadata: Metadata = {
  title: "CV · Marco Niccolini",
  description:
    "Curriculum Vitae di Marco Niccolini, Web & Blockchain Engineer a Milano. Esperienza in dApp, smart contract e sviluppo full-stack.",
  openGraph: {
    title: "CV · Marco Niccolini",
    description:
      "Profilo professionale, esperienze, formazione e progetti selezionati di Marco Niccolini, Web & Blockchain Engineer.",
    url: `${SITE_URL}/it/cv`,
    type: "profile",
    images: [
      {
        url: "/og-cv.png",
        width: 1200,
        height: 630,
        alt: "CV di Marco Niccolini",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV · Marco Niccolini",
    description: "Curriculum Vitae · Web & Blockchain Engineer.",
    creator: "@nicco6598",
  },
  alternates: {
    canonical: `${SITE_URL}/it/cv`,
    languages: {
      "it-IT": `${SITE_URL}/it/cv`,
      "en-US": `${SITE_URL}/en/cv`,
    },
  },
};

interface CvPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CvPage({ params }: CvPageProps) {
  const { locale } = await params;
  const tHome = await getTranslations({ locale, namespace: "HomePage" });
  const tCv = await getTranslations({ locale, namespace: "Cv" });

  const cvUrl = `${SITE_URL}/${locale}/cv`;
  const featuredProjects = [...projects]
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    .slice(0, 4);

  return (
    <div className="container pb-24 pt-28 space-y-10">
      {/* Header */}
      <header className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-ash">{tCv("label")}</p>
          <h1 className="font-display text-3xl md:text-4xl text-frost">Marco Niccolini</h1>
          <p className="text-sm text-ash/80">{tCv("header_role")}</p>
        </div>
        <div className="flex flex-col items-start gap-3 text-xs text-ash md:items-end">
          <div className="flex flex-wrap gap-2">
            <a
              href="mailto:marco.niccolini.dev@gmail.com"
              className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-ember-200 hover:border-ember-500 hover:text-ember-300 transition"
            >
              marco.niccolini.dev@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/marconiccolini-/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 bg-black/30 px-3 py-1 hover:border-ember-500 hover:text-ember-300 transition"
            >
              linkedin.com/in/marconiccolini-/
            </a>
            <a
              href="https://github.com/Nicco6598"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 bg-black/30 px-3 py-1 hover:border-ember-500 hover:text-ember-300 transition"
            >
              github.com/Nicco6598
            </a>
          </div>
          <p className="text-[11px] text-ash/70">
            {tCv("generated_version_prefix")} {locale.toUpperCase()}
          </p>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[2fr_1.1fr]">
        {/* Main column */}
        <div className="space-y-6">
          {/* Profile */}
          <section className="rounded-2xl border border-white/10 bg-surface/80 p-5">
            <h2 className="text-sm uppercase tracking-[0.3em] text-ash mb-3">{tCv("section_profile")}</h2>
            <p className="text-sm text-ash leading-relaxed">{tHome("profile.description")}</p>
          </section>

          {/* Experience */}
          <section className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.3em] text-ash">{tCv("section_experience")}</h2>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-surface/80 p-4">
                <div className="flex flex-col justify-between gap-1 text-sm text-ash md:flex-row md:items-center">
                  <div>
                    <p className="font-semibold text-frost">
                      {tHome("experience_items.capgemini.title")}
                    </p>
                    <p>{tHome("experience_items.capgemini.company")}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ash/70">
                    {tHome("experience_items.capgemini.period")}
                  </p>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-ash">
                  <li>{tHome("experience_items.capgemini.description.0")}</li>
                  <li>{tHome("experience_items.capgemini.description.1")}</li>
                  <li>{tHome("experience_items.capgemini.description.2")}</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-surface/80 p-4">
                <div className="flex flex-col justify-between gap-1 text-sm text-ash md:flex-row md:items-center">
                  <div>
                    <p className="font-semibold text-frost">
                      {tHome("experience_items.freelance.title")}
                    </p>
                    <p>{tHome("experience_items.freelance.company")}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ash/70">
                    {tHome("experience_items.freelance.period")}
                  </p>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-ash">
                  <li>{tHome("experience_items.freelance.description.0")}</li>
                  <li>{tHome("experience_items.freelance.description.1")}</li>
                  <li>{tHome("experience_items.freelance.description.2")}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Selected projects recap */}
          <section className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.3em] text-ash">{tCv("section_projects")}</h2>
            <div className="space-y-3">
              {featuredProjects.map(project => (
                <div
                  key={project.id}
                  className="rounded-2xl border border-white/10 bg-surface/80 p-4 text-sm text-ash/90"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-frost">
                      {project.title}
                    </p>
                    <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-ash/70">
                      {project.year} · {project.type}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-ash/80">
                    {project.shortDescription}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.languages.slice(0, 4).map(lang => (
                      <span
                        key={lang}
                        className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-ash/70"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.3em] text-ash">{tCv("section_education")}</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-surface/80 p-4 text-sm text-ash">
                <p className="font-semibold text-frost">
                  {tHome("education_items.master.title")}
                </p>
                <p>{tHome("education_items.master.school")}</p>
                <p className="text-xs text-ash/70 mt-1">
                  {tHome("education_items.master.period")}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-surface/80 p-4 text-sm text-ash">
                <p className="font-semibold text-frost">
                  {tHome("education_items.diploma.title")}
                </p>
                <p>{tHome("education_items.diploma.school")}</p>
                <p className="text-xs text-ash/70 mt-1">
                  {tHome("education_items.diploma.period")}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-surface/80 p-4 text-sm text-ash">
                <p className="font-semibold text-frost">
                  {tHome("education_items.university.title")}
                </p>
                <p>{tHome("education_items.university.school")}</p>
                <p className="text-xs text-ash/70 mt-1">
                  {tHome("education_items.university.period")}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Side column */}
        <aside className="space-y-6">
          {/* Skills summary */}
          <section className="rounded-2xl border border-white/10 bg-surface/80 p-5 space-y-3">
            <h2 className="text-sm uppercase tracking-[0.3em] text-ash">{tCv("section_stack")}</h2>
            <div className="space-y-2 text-xs text-ash">
              <p className="font-semibold text-frost">{tCv("stack_blockchain_title")}</p>
              <p>{tCv("stack_blockchain_desc")}</p>
            </div>
            <div className="space-y-2 text-xs text-ash">
              <p className="font-semibold text-frost">{tCv("stack_frontend_title")}</p>
              <p>{tCv("stack_frontend_desc")}</p>
            </div>
            <div className="space-y-2 text-xs text-ash">
              <p className="font-semibold text-frost">{tCv("stack_tooling_title")}</p>
              <p>{tCv("stack_tooling_desc")}</p>
            </div>
          </section>

          {/* Languages & soft skills */}
          <section className="rounded-2xl border border-white/10 bg-surface/80 p-5 space-y-3 text-xs text-ash">
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-ash">{tCv("section_languages")}</h2>
              <ul className="mt-2 space-y-1">
                <li>{tHome("profile.languages_list.0")}</li>
                <li>{tHome("profile.languages_list.1")}</li>
              </ul>
            </div>
            <div>
              <h2 className="mt-4 text-sm uppercase tracking-[0.3em] text-ash">{tCv("section_soft_skills")}</h2>
              <ul className="mt-2 space-y-1">
                <li>{tHome("profile.soft_skills_list.0")}</li>
                <li>{tHome("profile.soft_skills_list.1")}</li>
                <li>{tHome("profile.soft_skills_list.2")}</li>
              </ul>
            </div>
          </section>

          {/* QR code */}
          <section className="rounded-2xl border border-white/10 bg-surface/80 p-5 space-y-3 text-xs text-ash">
            <h2 className="text-sm uppercase tracking-[0.3em] text-ash">{tCv("section_share")}</h2>
            <p className="text-ash/80">{tCv("share_description")}</p>
            <div className="flex justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(cvUrl)}`}
                alt="QR code CV Marco Niccolini"
                className="h-40 w-40 rounded-2xl border border-white/10 bg-base p-2"
                loading="lazy"
              />
            </div>
            <p className="text-[11px] text-ash/60 break-all">{cvUrl}</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
