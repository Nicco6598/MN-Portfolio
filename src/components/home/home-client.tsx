"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink, Github, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { featuredProjects, projects } from "@/data/projects";
import SkillTree from "./skill-tree";
import profilePortrait from "../../../public/images/profile.webp";

const getExperienceYears = (startDate: Date) => {
    const diff = Date.now() - startDate.getTime();
    const years = diff / (1000 * 60 * 60 * 24 * 365.25);
    if (years < 1) return "<1";
    return years % 1 === 0 ? years.toFixed(0) : years.toFixed(1);
};

const experienceYears = getExperienceYears(new Date("2023-08-01"));
const trackedProjects = projects.length + 1; // include Capgemini NFT dApp

const heroStats = [
    { label: "Progetti shipppati", value: `${trackedProjects}` },
    { label: "Smart contract auditi", value: "7" },
    { label: "Anni di esperienza", value: `${experienceYears}` },
];

const profileOverview = {} as const;

const getProgressPercentage = (project: typeof projects[0]) => {
    if (!project.todo) return 0;
    // Deterministic calculation based on project ID to avoid hydration errors
    // This ensures server and client render the same value
    const baseProgress = (project.id * 13) % 60; // 0-59
    return baseProgress + 20; // 20-79%
};

const LazySection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current || isVisible) return;
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: "200px 0px" },
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [isVisible]);

    return (
        <div ref={ref} className={className}>
            {isVisible ? children : <div className="h-[320px] w-full animate-pulse rounded-[32px] bg-surface/60" />}
        </div>
    );
};

const Hero = () => {
    const t = useTranslations('HomePage');

    return (
        <section className="container flex flex-col justify-center pb-14 lg:pt-2 lg:pb-2">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
                <div className="space-y-8">
                    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-ash">
                        <span className="h-px w-10 bg-ash/40" />
                        {t('available_for')}
                    </div>
                    <motion.h1
                        className="font-display text-4xl leading-tight text-frost sm:text-5xl lg:text-6xl"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        {t('title')}
                    </motion.h1>
                    <p className="max-w-2xl text-lg text-ash">
                        {t('subtitle')}
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/projects"
                            className="inline-flex items-center justify-center gap-3 rounded-full bg-ember-500 px-8 py-3 text-base font-medium text-base shadow-glow transition-transform hover:translate-y-0.5"
                        >
                            {t('cta_projects')}
                            <ArrowUpRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full border border-ash/30 px-8 py-3 text-base font-medium text-frost transition hover:border-ember-500 hover:text-ember-300"
                        >
                            {t('cta_contact')}
                        </Link>
                    </div>
                    <dl className="grid gap-4 sm:grid-cols-3">
                        {heroStats.map(stat => (
                            <div key={stat.label} className="rounded-2xl border border-white/10 bg-surface px-4 py-5">
                                <dt className="text-sm text-ash">{stat.label}</dt>
                                <dd className="text-3xl font-semibold text-frost">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <motion.div className="relative" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-surface via-highlight to-base p-6 shadow-2xl">
                        <div className="mb-8 flex items-center justify-between text-sm uppercase tracking-[0.35em] text-ash">
                            {t('dossier_title')}
                            <span className="flex items-center gap-1 text-ember-300">
                                2025 <ArrowUpRight className="h-4 w-4" />
                            </span>
                        </div>
                        <div className="space-y-6">
                            <Image
                                src={profilePortrait}
                                alt="Marco Niccolini"
                                width={560}
                                height={640}
                                quality={85}
                                priority
                                placeholder="blur"
                                sizes="(min-width: 1024px) 480px, 80vw"
                                className="h-[360px] w-full rounded-3xl object-cover object-bottom sm:h-[400px] lg:h-[540px]"
                            />
                            <div className="space-y-4 text-sm text-ash">
                                <p>{t('profile.description')}</p>
                                <div className="flex flex-wrap gap-3">
                                    {["Solidity", "React", "Node.js", "Hardhat"].map(chip => (
                                        <span key={chip} className="rounded-full bg-white/5 px-4 py-1 text-xs uppercase tracking-wide text-frost">
                                            {chip}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const ProfileSummary = () => {
    const t = useTranslations('HomePage');

    const highlights = [
        t('profile.highlights.0'),
        t('profile.highlights.1'),
        t('profile.highlights.2'),
    ];

    const softSkills = [
        t('profile.soft_skills_list.0'),
        t('profile.soft_skills_list.1'),
        t('profile.soft_skills_list.2'),
    ];

    const languages = [
        t('profile.languages_list.0'),
        t('profile.languages_list.1'),
    ];
    return (
        <section className="container grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-6 rounded-[32px] border border-white/10 bg-surface/80 p-8">
                <div className="flex items-center gap-4 text-sm uppercase tracking-[0.3em] text-ash">
                    <span className="h-px w-10 bg-ash/40" /> {t('profile_title')}
                </div>
                <p className="text-lg text-ash">{t('profile.description')}</p>
                <ul className="grid gap-3 text-sm text-frost">
                    {highlights.map(item => (
                        <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-ember-500" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid gap-6 rounded-[32px] border border-white/10 bg-surface/60 p-8">
                <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-ash/70">{t('soft_skills')}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {softSkills.map(skill => (
                            <span key={skill} className="rounded-full border border-white/15 px-4 py-1 text-sm text-frost">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-ash/70">{t('languages')}</p>
                    <ul className="mt-3 space-y-2 text-sm text-ash">
                        {languages.map(language => (
                            <li key={language} className="rounded-2xl border border-white/10 px-4 py-3 text-frost">
                                {language}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

const ExperienceSection = () => {
    const t = useTranslations('HomePage');
    return (
        <section className="container space-y-8">
            <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.4em] text-ash">{t('experience_label')}</p>
                <h2 className="font-display text-4xl text-frost">{t('experience_title')}</h2>
                <p className="max-w-2xl text-ash">
                    {t('experience_desc')}
                </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[28px] border border-white/10 bg-surface/80 p-6">
                    <div className="flex flex-col gap-2 text-sm text-ash/80 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-base font-semibold text-frost">{t('experience_items.capgemini.title')}</p>
                            <p>{t('experience_items.capgemini.company')}</p>
                        </div>
                        <span className="rounded-full bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-ash">
                            {t('experience_items.capgemini.period')}
                        </span>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-ash">
                        <li className="flex items-start gap-3 text-frost">
                            <span className="mt-1 h-2 w-2 rounded-full bg-ember-500" />
                            <span>{t('experience_items.capgemini.description.0')}</span>
                        </li>
                        <li className="flex items-start gap-3 text-frost">
                            <span className="mt-1 h-2 w-2 rounded-full bg-ember-500" />
                            <span>{t('experience_items.capgemini.description.1')}</span>
                        </li>
                        <li className="flex items-start gap-3 text-frost">
                            <span className="mt-1 h-2 w-2 rounded-full bg-ember-500" />
                            <span>{t('experience_items.capgemini.description.2')}</span>
                        </li>
                    </ul>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-surface/80 p-6">
                    <div className="flex flex-col gap-2 text-sm text-ash/80 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-base font-semibold text-frost">{t('experience_items.freelance.title')}</p>
                            <p>{t('experience_items.freelance.company')}</p>
                        </div>
                        <span className="rounded-full bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-ash">
                            {t('experience_items.freelance.period')}
                        </span>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-ash">
                        <li className="flex items-start gap-3 text-frost">
                            <span className="mt-1 h-2 w-2 rounded-full bg-ember-500" />
                            <span>{t('experience_items.freelance.description.0')}</span>
                        </li>
                        <li className="flex items-start gap-3 text-frost">
                            <span className="mt-1 h-2 w-2 rounded-full bg-ember-500" />
                            <span>{t('experience_items.freelance.description.1')}</span>
                        </li>
                        <li className="flex items-start gap-3 text-frost">
                            <span className="mt-1 h-2 w-2 rounded-full bg-ember-500" />
                            <span>{t('experience_items.freelance.description.2')}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

const EducationSection = () => {
    const t = useTranslations('HomePage');
    return (
        <section className="container space-y-8">
            <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.4em] text-ash">{t('education_label')}</p>
                <h2 className="font-display text-4xl text-frost">{t('education_title')}</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-[28px] border border-white/10 bg-surface/80 p-6">
                    <h3 className="text-2xl font-semibold text-frost">{t('education_items.master.title')}</h3>
                    <p className="mt-1 text-ash">{t('education_items.master.school')}</p>
                    <p className="mt-1 text-sm text-ash/70">{t('education_items.master.period')}</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-surface/80 p-6">
                    <h3 className="text-2xl font-semibold text-frost">{t('education_items.diploma.title')}</h3>
                    <p className="mt-1 text-ash">{t('education_items.diploma.school')}</p>
                    <p className="mt-1 text-sm text-ash/70">{t('education_items.diploma.period')}</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-surface/80 p-6">
                    <h3 className="text-2xl font-semibold text-frost">{t('education_items.university.title')}</h3>
                    <p className="mt-1 text-ash">{t('education_items.university.school')}</p>
                    <p className="mt-1 text-sm text-ash/70">{t('education_items.university.period')}</p>
                </div>
            </div>
        </section>
    );
};

const Projects = () => {
    const t = useTranslations('HomePage');
    const tProjects = useTranslations('Projects');
    const locale = useLocale();
    return (
        <section id="projects" className="container space-y-12">
            <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.4em] text-ash">{t('projects_label')}</p>
                <h2 className="font-display text-4xl text-frost">{t('projects_title')}</h2>
                <p className="max-w-2xl text-ash">
                    {t('projects_desc')}
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project, index) => (
                    <motion.article
                        key={project.id}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface/50 transition hover:border-ember-500/50 hover:bg-surface/80"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Status Badge */}
                        {project.status && (
                            <div className="absolute top-4 right-4 z-10">
                                <div className="flex items-center gap-1.5 rounded-full border border-ember-500/30 bg-ember-500/20 px-3 py-1.5 text-xs font-medium text-ember-400 backdrop-blur-md">
                                    <Sparkles className="h-3 w-3 animate-pulse" />
                                    {project.status === "In Sviluppo"
                                        ? tProjects("status_dev")
                                        : project.status === "Aggiornato a NextJS"
                                            ? tProjects("status_updated_next")
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
                                            <span className="text-ash/60">{tProjects("progress")}</span>
                                            <span className="text-ember-400 font-medium">{getProgressPercentage(project)}%</span>
                                        </div>
                                        <div className="h-1.5 w-full rounded-full bg-black/30 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${getProgressPercentage(project)}%` }}
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
                                            <span
                                                key={tag}
                                                className="text-[10px] uppercase tracking-wider text-ash/60"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                        {project.languages.length > 3 && (
                                            <span className="text-[10px] text-ash/60">
                                                +{project.languages.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <Link
                                        href={`/projects/${project.id}`}
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
        </section>
    );
};

const ContactCTA = () => {
    const t = useTranslations('HomePage');
    return (
        <section id="contact" className="container">
            <div className="rounded-[32px] border border-ember-500/30 bg-gradient-to-br from-ember-600/30 via-surface to-base p-10">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.4em] text-ash">{t('contact_label')}</p>
                        <h2 className="font-display text-4xl text-frost">{t('contact_title')}</h2>
                        <p className="text-ash">
                            {t('contact_desc')}
                        </p>
                    </div>
                    <div className="space-y-4 text-sm text-ash">
                        <div className="rounded-3xl border border-white/15 bg-black/20 p-6">
                            <p className="text-xs uppercase tracking-[0.4em] text-ash/70">{t('contact_box_title')}</p>
                            <p className="mt-3 text-lg text-frost">
                                {t('contact_box_desc')}
                            </p>
                            <div className="mt-4 rounded-2xl border border-white/10 bg-surface/80 p-4 text-ash">
                                <p className="text-sm">
                                    {t('contact_box_note')}
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/contact"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-frost/95 px-6 py-3 font-medium text-base text-base transition hover:bg-white"
                        >
                            {t('contact_cta')}
                            <ArrowUpRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function HomeClient() {
    return (
        <div className="space-y-32 pb-32">
            <Hero />
            <LazySection>
                <ProfileSummary />
            </LazySection>
            <LazySection>
                <SkillTree />
            </LazySection>
            <LazySection>
                <ExperienceSection />
            </LazySection>
            <LazySection>
                <EducationSection />
            </LazySection>
            <LazySection>
                <Projects />
            </LazySection>
            <LazySection>
                <ContactCTA />
            </LazySection>
        </div>
    );
}
