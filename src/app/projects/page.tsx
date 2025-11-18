"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Filter, Search, X } from "lucide-react";

import { projects, sortedProjects } from "@/data/projects";

const typeOptions = Array.from(new Set(projects.map(project => project.type)));
const languageOptions = Array.from(new Set(projects.flatMap(project => project.languages)));

const ProjectsPage = () => {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tutti");
  const [languageFilter, setLanguageFilter] = useState("Tutti");

  const filteredProjects = useMemo(() => {
    return sortedProjects.filter(project => {
      const matchesQuery = project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(query.toLowerCase());
      const matchesType = typeFilter === "Tutti" || project.type === typeFilter;
      const matchesLang =
        languageFilter === "Tutti" || project.languages.some(lang => lang === languageFilter);
      return matchesQuery && matchesType && matchesLang;
    });
  }, [languageFilter, query, typeFilter]);

  const resetFilters = () => {
    setQuery("");
    setTypeFilter("Tutti");
    setLanguageFilter("Tutti");
  };

  return (
    <div className="space-y-16 pb-24">
      <section className="container pt-24">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-ash">projects</p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <h1 className="font-display text-4xl text-frost sm:text-5xl">Case studies modulari</h1>
              <p className="text-ash">
                Product storytelling, motion UI e infrastrutture Web3. Filtra per stack o parole chiave
                per trovare il progetto più vicino alle tue esigenze.
              </p>
            </div>
            <div className="flex gap-3 text-sm text-ash">
              <div className="rounded-full border border-white/10 px-4 py-2">
                {sortedProjects.length} progetti
              </div>
              <div className="rounded-full border border-white/10 px-4 py-2">
                {languageOptions.length} stack
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container space-y-10">
        <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-surface/80 p-6 shadow-[0_40px_80px_rgba(0,0,0,0.35)] lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ash" />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Cerca per titolo o descrizione"
              className="h-12 w-full rounded-full border border-white/10 bg-black/30 pl-11 pr-12 text-sm text-frost outline-none placeholder:text-ash/60"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ash"
                aria-label="Cancella ricerca"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <select
              value={typeFilter}
              onChange={event => setTypeFilter(event.target.value)}
              className="h-12 rounded-full border border-white/10 bg-black/30 px-5 text-sm text-frost outline-none"
            >
              <option value="Tutti">Tutti i tipi</option>
              {typeOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={languageFilter}
              onChange={event => setLanguageFilter(event.target.value)}
              className="h-12 rounded-full border border-white/10 bg-black/30 px-5 text-sm text-frost outline-none"
            >
              <option value="Tutti">Tutti i linguaggi</option>
              {languageOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-full border border-ash/40 px-5 py-3 text-sm text-frost transition hover:border-ember-500"
            >
              <Filter className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-surface/80 p-16 text-center text-ash">
            Nessun progetto corrisponde alla ricerca. Prova a rimuovere qualche filtro.
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {filteredProjects.map(project => (
              <motion.article
                key={project.id}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-surface/80"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="relative">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={920}
                    height={520}
                    className="h-[280px] w-full object-contain bg-surface/50 transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 flex gap-3 text-xs uppercase">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-frost">{project.year}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-frost">{project.type}</span>
                  </div>
                </div>
                <div className="space-y-5 p-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-semibold text-frost">{project.title}</h2>
                    <p className="text-ash">{project.shortDescription}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-ash">
                    {project.languages.map(tag => (
                      <span key={tag} className="rounded-full border border-white/15 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2 text-sm">
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-frost transition hover:border-ember-500"
                    >
                      Case study <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    {project.vercelLink !== "#" && (
                      <Link
                        href={project.vercelLink}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-ember-300 transition hover:border-ember-500"
                      >
                        Live <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectsPage;
