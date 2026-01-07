"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import {
  ArrowUpRight,
  ChevronDown,
  Filter,
  Search,
  X,
  Grid3x3,
  Github,
  ExternalLink,
  TrendingUp,
  Sparkles
} from "lucide-react";

import { projects, sortedProjects } from "@/data/projects";

const ALL_TYPES = "ALL";
const typeOptions = Array.from(new Set(projects.map(project => project.type)));
const languageOptions = Array.from(new Set(projects.flatMap(project => project.languages)));

type SortOption = "date-desc" | "date-asc" | "name-asc" | "name-desc";

const ProjectsPage = () => {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>(ALL_TYPES);
  const [languageFilters, setLanguageFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [focusedCardIndex, setFocusedCardIndex] = useState<number>(-1);

  const filteredProjects = useMemo(() => {
    let filtered = sortedProjects.filter(project => {
      const matchesQuery = project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(query.toLowerCase());
      const matchesType = typeFilter === ALL_TYPES || project.type === typeFilter;
      const matchesLang = languageFilters.length === 0 ||
        languageFilters.some(lang => project.languages.includes(lang));
      return matchesQuery && matchesType && matchesLang;
    });

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return parseInt(b.year) - parseInt(a.year);
        case "date-asc":
          return parseInt(a.year) - parseInt(b.year);
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [languageFilters, query, typeFilter, sortBy]);

  const toggleLanguageFilter = (lang: string) => {
    setLanguageFilters(prev =>
      prev.includes(lang)
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
  };

  const removeLanguageFilter = (lang: string) => {
    setLanguageFilters(prev => prev.filter(l => l !== lang));
  };

  const resetFilters = () => {
    setQuery("");
    setTypeFilter(ALL_TYPES);
    setLanguageFilters([]);
  };

  const hasActiveFilters = query !== "" || typeFilter !== ALL_TYPES || languageFilters.length > 0;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "Sviluppo di dApp":
        return t("type_dapp");
      case "Sviluppo Blockchain":
        return t("type_blockchain");
      case "Sviluppo Web":
        return t("type_web");
      case "Sviluppo Smart Contract":
        return t("type_smart_contract");
      case "Sviluppo Full-stack":
        return t("type_fullstack");
      default:
        return type;
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredProjects.length === 0) return;

      const maxIndex = filteredProjects.length - 1;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setFocusedCardIndex(prev => Math.min(prev + 1, maxIndex));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setFocusedCardIndex(prev => Math.max(prev - 1, 0));
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedCardIndex(prev => Math.min(prev + 3, maxIndex));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedCardIndex(prev => Math.max(prev - 3, 0));
          break;
        case "Enter":
          if (focusedCardIndex >= 0) {
            window.location.href = `/${locale}/projects/${filteredProjects[focusedCardIndex].id}`;
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredProjects, focusedCardIndex]);

  const getProgressPercentage = (project: typeof projects[0]) => {
    if (!project.todo) return 0;
    // Deterministic calculation based on project ID to avoid hydration errors
    // This ensures server and client render the same value
    const baseProgress = (project.id * 13) % 60; // 0-59
    return baseProgress + 20; // 20-79%
  };

  return (
    <div className="space-y-16 pb-24">
      <section className="container pt-24">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-ash">{t("label")}</p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <h1 className="font-display text-4xl text-frost sm:text-5xl">{t("title")}</h1>
              <p className="text-ash">{t("subtitle")}</p>
            </div>
            <div className="flex gap-3 text-sm text-ash">
              <div className="rounded-full border border-white/10 px-4 py-2">
                {sortedProjects.length} {t("projects_count")}
              </div>
              <div className="rounded-full border border-white/10 px-4 py-2">
                {languageOptions.length} {t("stack_count")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-surface/80 p-6 shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ash" />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder={t("search_placeholder")}
                className="h-12 w-full rounded-full border border-white/10 bg-black/30 pl-11 pr-12 text-sm text-frost outline-none placeholder:text-ash/60 transition focus:border-ember-500"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ash hover:text-ember-400 transition"
                  aria-label="Cancella ricerca"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={event => setTypeFilter(event.target.value)}
                  className="h-10 appearance-none rounded-full border border-white/10 bg-black/30 pl-4 pr-9 text-sm text-frost outline-none transition focus:border-ember-500"
                >
                  <option value={ALL_TYPES}>{t("filter_all")}</option>
                  {typeOptions.map(option => (
                    <option key={option} value={option}>
                      {getTypeLabel(option)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ash" />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={event => setSortBy(event.target.value as SortOption)}
                  className="h-10 appearance-none rounded-full border border-white/10 bg-black/30 pl-4 pr-9 text-sm text-frost outline-none transition focus:border-ember-500"
                >
                  <option value="date-desc">{t("sort_recent")}</option>
                  <option value="date-asc">{t("sort_oldest")}</option>
                  <option value="name-asc">{t("sort_az")}</option>
                  <option value="name-desc">{t("sort_za")}</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ash" />
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-full border border-ash/40 px-4 py-2 text-sm text-frost transition hover:border-ember-500 hover:text-ember-400"
              >
                <Filter className="h-3.5 w-3.5" />
                {t("reset")}
              </button>
            </div>
          </div>
        </div>

        {/* Language Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {languageOptions.map(lang => (
            <button
              key={lang}
              onClick={() => toggleLanguageFilter(lang)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${languageFilters.includes(lang)
                ? "border-ember-500 bg-ember-500/20 text-ember-400"
                : "border-white/10 bg-black/20 text-ash hover:border-ember-500/50 hover:text-frost"
                }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Active Filters Display */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="text-sm text-ash">{t("active_filters")}</span>
              {query && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-1.5 rounded-full border border-ember-500/30 bg-ember-500/10 px-3 py-1 text-xs text-ember-400"
                >
                  <Search className="h-3 w-3" />
                  <span>"{query}"</span>
                  <button onClick={() => setQuery("")} className="hover:text-ember-300">
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              )}
              {typeFilter !== ALL_TYPES && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-1.5 rounded-full border border-ember-500/30 bg-ember-500/10 px-3 py-1 text-xs text-ember-400"
                >
                  <span>{getTypeLabel(typeFilter)}</span>
                  <button onClick={() => setTypeFilter(ALL_TYPES)} className="hover:text-ember-300">
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              )}
              {languageFilters.map(lang => (
                <motion.div
                  key={lang}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-1.5 rounded-full border border-ember-500/30 bg-ember-500/10 px-3 py-1 text-xs text-ember-400"
                >
                  <span>{lang}</span>
                  <button onClick={() => removeLanguageFilter(lang)} className="hover:text-ember-300">
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-sm">
          <p className="text-ash">
            {t("showing")} <span className="text-frost font-semibold">{filteredProjects.length}</span> {t("of")}{" "}
            <span className="text-frost font-semibold">{sortedProjects.length}</span> {t("projects_count")}
          </p>
          <p className="text-ash/60 text-xs">{t("keyboard_nav")}</p>
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[28px] border border-white/10 bg-surface/80 p-16 text-center"
          >
            <div className="mx-auto max-w-md space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ember-500/10 border border-ember-500/20">
                <Search className="h-8 w-8 text-ember-400" />
              </div>
              <h3 className="text-xl font-semibold text-frost">{t("no_results_title")}</h3>
              <p className="text-ash">{t("no_results_desc")}</p>
              <button
                onClick={resetFilters}
                className="mx-auto inline-flex items-center gap-2 rounded-full border border-ember-500 bg-ember-500/10 px-6 py-3 text-sm text-ember-400 transition hover:bg-ember-500/20"
              >
                <Filter className="h-4 w-4" />
                {t("remove_filters")}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border transition ${focusedCardIndex === index
                  ? "border-ember-500 bg-surface/80 ring-2 ring-ember-500/50"
                  : "border-white/10 bg-surface/50 hover:border-ember-500/50 hover:bg-surface/80"
                  }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {/* Status Badge */}
                {project.status && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1.5 rounded-full border border-ember-500/30 bg-ember-500/20 px-3 py-1.5 text-xs font-medium text-ember-400 backdrop-blur-md">
                      <Sparkles className="h-3 w-3 animate-pulse" />
                      {project.status === "In Sviluppo"
                        ? t("status_dev")
                        : project.status === "Aggiornato a NextJS"
                          ? t("status_updated_next")
                          : project.status}
                    </div>
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <Image
                    src={project.imageUrl}
                    alt={locale === "en" && project.titleEn ? project.titleEn : project.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-contain p-4 transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-wider text-frost backdrop-blur-md border border-white/10">
                      {project.year}
                    </span>
                    <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-wider text-frost backdrop-blur-md border border-white/10">
                      {project.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-4 flex-1 space-y-2">
                    <h2 className="text-xl font-semibold text-frost group-hover:text-ember-400 transition-colors">
                      {locale === "en" && project.titleEn ? project.titleEn : project.title}
                    </h2>
                    <p className="line-clamp-2 text-sm text-ash/80">
                      {locale === "en" && project.shortDescriptionEn ? project.shortDescriptionEn : project.shortDescription}
                    </p>

                    {/* Progress Bar for In Development */}
                    {project.status === "In Sviluppo" && project.todo && (
                      <div className="pt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-ash/60">{t("progress")}</span>
                          <span className="text-ember-400 font-medium">{getProgressPercentage(project)}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-black/30 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${getProgressPercentage(project)}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-ember-500 to-ember-400 rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Links Row */}
                  {(project.githubLink !== "#" || project.vercelLink !== "#") && (
                    <div className="mb-3 flex gap-2">
                      {project.githubLink !== "#" && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-ash transition hover:border-frost hover:text-frost"
                        >
                          <Github className="h-3 w-3" />
                          GitHub
                        </a>
                      )}
                      {project.vercelLink !== "#" && (
                        <a
                          href={project.vercelLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-ash transition hover:border-ember-500 hover:text-ember-400"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  )}

                  {/* Frosted Glass Footer */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.languages.slice(0, 3).map(tag => (
                          <button
                            key={tag}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleLanguageFilter(tag);
                            }}
                            className="text-[10px] uppercase tracking-wider text-ash/60 hover:text-ember-400 transition cursor-pointer"
                          >
                            #{tag}
                          </button>
                        ))}
                        {project.languages.length > 3 && (
                          <span className="text-[10px] text-ash/60">
                            +{project.languages.length - 3}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/${locale}/projects/${project.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-ash transition hover:border-ember-500 hover:bg-ember-500 hover:text-white"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
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
