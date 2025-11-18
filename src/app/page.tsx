"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { featuredProjects, projects } from "@/data/projects";
import profilePortrait from "../../public/images/profile.webp";

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

const profileOverview = {
  description:
    "Esperto nello sviluppo di dApp e smart contract con React, Solidity e Node.js. Creo soluzioni Web3 su Ethereum e Polygon con un approccio proattivo e orientato ai risultati.",
  highlights: [
    "dApp e smart contract custom su Ethereum & Polygon",
    "Integrazione ML, OpenSea API e infrastrutture cloud native",
    "Delivery end-to-end: design system, frontend e backend Node.js",
  ],
  softSkills: ["Problem Solving", "Lavoro di squadra", "Adattabilità"],
  languages: ["Italiano · Madrelingua/C2", "Inglese · Intermedio/B2"],
};

const skillCategories = [
  {
    title: "Blockchain & Backend",
    stack: ["Solidity", "Node.js", "Express", "Hardhat", "Python", "SQL"],
  },
  {
    title: "Frontend",
    stack: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Tooling",
    stack: ["Git", "Web3.js", "Chainlink VRF"],
  },
];

const experiences = [
  {
    role: "Associate Product Software Engineer",
    company: "Capgemini Engineering",
    period: "2024 · 2025",
    bullets: [
      "Sviluppo di una dApp su Polygon per generare NFT personalizzati con pipeline ML/TensorFlow.",
      "Implementazione di smart contract Solidity, backend Node.js/Express e API interne integrate con OpenSea.",
      "Frontend React + TypeScript + Tailwind con workflow CI/CD e performance budget.",
    ],
  },
  {
    role: "Blockchain Developer",
    company: "Freelance",
    period: "2023 · 2024",
    bullets: [
      "dApp Ethereum & Polygon per mobility, asset digitali e gestione prestiti.",
      "Smart contract Solidity con Hardhat, integrazione Web3.js e Chainlink VRF.",
      "Progettazione frontend React/TypeScript con focus su UX e sicurezza.",
    ],
  },
];

const educationItems = [
  {
    title: "Master in Blockchain Development",
    school: "Start2Impact University",
    period: "Ott 2023 · Giu 2024",
  },
  {
    title: "Diploma in Informatica",
    school: "Istituto Tecnico Industriale",
    period: "Set 2012 · Giu 2017",
  },
  {
    title: "Informatica (Percorso non completato)",
    school: "Università",
    period: "Ott 2020 · Set 2021",
  },
];

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

export default function HomePage() {
  return (
    <div className="space-y-32 pb-32">
      <Hero />
      <LazySection>
        <ProfileSummary />
      </LazySection>
      <LazySection>
        <SkillsSection />
      </LazySection>
      <LazySection>
        <ExperienceSection />
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

const Hero = () => (
  <section className="container flex min-h-[calc(100vh-5rem)] flex-col justify-center pt-28 pb-16 lg:pt-36">
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-ash">
          <span className="h-px w-10 bg-ash/40" />
          available for milan, italy
        </div>
        <motion.h1
          className="font-display text-4xl leading-tight text-frost sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Disegno e sviluppo esperienze <span className="text-ember-500">audaci</span> per brand tech e progetti Web3.
        </motion.h1>
        <p className="max-w-2xl text-lg text-ash">
          Sono Marco Niccolini, Blockchain Engineer focalizzato su dApp, smart contract e prodotti Web3 enterprise.
          Combino React, Solidity e Node.js per portare in produzione MVP resilienti e scalabili.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="#projects"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-ember-500 px-8 py-3 text-base font-medium text-base shadow-glow transition-transform hover:translate-y-0.5"
          >
            Esplora progetti
            <ArrowUpRight className="h-5 w-5" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-ash/30 px-8 py-3 text-base font-medium text-frost transition hover:border-ember-500 hover:text-ember-300"
          >
            Prenota una call
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
            Dossier
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
              className="h-[420px] w-full rounded-3xl object-cover object-bottom lg:h-[560px]"
            />
            <div className="space-y-4 text-sm text-ash">
              <p>{profileOverview.description}</p>
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

const ProfileSummary = () => (
  <section className="container grid gap-10 lg:grid-cols-[1fr_0.9fr]">
    <div className="space-y-6 rounded-[32px] border border-white/10 bg-surface/80 p-8">
      <div className="flex items-center gap-4 text-sm uppercase tracking-[0.3em] text-ash">
        <span className="h-px w-10 bg-ash/40" /> Profilo Professionale
      </div>
      <p className="text-lg text-ash">{profileOverview.description}</p>
      <ul className="grid gap-3 text-sm text-frost">
        {profileOverview.highlights.map(item => (
          <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-ember-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="grid gap-6 rounded-[32px] border border-white/10 bg-surface/60 p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-ash/70">Soft skills</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {profileOverview.softSkills.map(skill => (
            <span key={skill} className="rounded-full border border-white/15 px-4 py-1 text-sm text-frost">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-ash/70">Lingue</p>
        <ul className="mt-3 space-y-2 text-sm text-ash">
          {profileOverview.languages.map(language => (
            <li key={language} className="rounded-2xl border border-white/10 px-4 py-3 text-frost">
              {language}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const SkillsSection = () => (
  <section className="container space-y-8">
    <div className="space-y-3">
      <p className="text-sm uppercase tracking-[0.4em] text-ash">tech stack</p>
      <h2 className="font-display text-4xl text-frost">Competenze tecnologiche chiave</h2>
      <p className="max-w-2xl text-ash">
        Copro l'intero stack Web3: smart contract Solidity, backend Node.js/Express e frontend React/Next.js con pipeline
        di delivery continue.
      </p>
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      {skillCategories.map(category => (
        <div key={category.title} className="rounded-[28px] border border-white/10 bg-surface/80 p-6">
          <h3 className="text-2xl font-semibold text-frost">{category.title}</h3>
          <ul className="mt-4 space-y-2 text-sm text-ash">
            {category.stack.map(tool => (
              <li key={tool} className="flex items-center gap-2 text-frost">
                <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
                {tool}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

const ExperienceSection = () => (
  <section className="container space-y-8">
    <div className="space-y-3">
      <p className="text-sm uppercase tracking-[0.4em] text-ash">experience</p>
      <h2 className="font-display text-4xl text-frost">Esperienze professionali</h2>
      <p className="max-w-2xl text-ash">
        Collaboro con team enterprise e startup per progettare e shippare dApp con focus su sicurezza, scalabilità e
        time-to-market.
      </p>
    </div>
    <div className="space-y-6">
      {experiences.map(exp => (
        <div key={exp.role} className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <div className="flex flex-col gap-2 text-sm text-ash/80 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-base font-semibold text-frost">{exp.role}</p>
              <p>{exp.company}</p>
            </div>
            <span className="rounded-full bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-ash">{exp.period}</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-ash">
            {exp.bullets.map(point => (
              <li key={point} className="flex gap-3 text-frost">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ember-500" />
                <span className="text-ash">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

const EducationSection = () => (
  <section className="container space-y-6">
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-[0.4em] text-ash">education</p>
      <h2 className="font-display text-4xl text-frost">Formazione</h2>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {educationItems.map(item => (
        <div key={item.title} className="rounded-2xl border border-white/10 bg-surface/70 p-5">
          <p className="text-base font-semibold text-frost">{item.title}</p>
          <p className="text-sm text-ash">{item.school}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-ash/70">{item.period}</p>
        </div>
      ))}
    </div>
  </section>
);

const Projects = () => (
  <section id="projects" className="container space-y-12">
    <div className="space-y-3">
      <p className="text-sm uppercase tracking-[0.4em] text-ash">projects</p>
      <h2 className="font-display text-4xl text-frost">Release recenti</h2>
      <p className="max-w-2xl text-ash">
        Dalla UX storytelling per brand lifestyle alla costruzione di protocolli decentralizzati, selezione di lavori che
        raccontano il mio approccio end-to-end.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {featuredProjects.map(project => (
        <motion.article
          key={project.id}
          className="overflow-hidden rounded-[28px] border border-white/10 bg-surface/80 transition hover:border-ember-500/60"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={640}
              height={420}
              className="h-[280px] w-full object-contain bg-surface/50 transition duration-500 hover:scale-105"
            />
          </div>
          <div className="space-y-4 p-6">
            <div className="flex items-center gap-3 text-xs text-ash">
              <span>{project.year}</span>
              <span className="h-px flex-1 bg-white/10" />
              <span>{project.type}</span>
            </div>
            <h3 className="text-xl font-semibold text-frost">{project.title}</h3>
            <p className="line-clamp-2 text-sm text-ash">{project.shortDescription}</p>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-ash">
              {project.languages.slice(0, 3).map(tag => (
                <span key={tag} className="rounded-full border border-white/15 px-3 py-1">
                  {tag}
                </span>
              ))}
              {project.languages.length > 3 && (
                <span className="rounded-full border border-white/15 px-3 py-1">+{project.languages.length - 3}</span>
              )}
            </div>
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 text-sm text-ember-300 transition hover:text-ember-500"
            >
              Scopri di più <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

const ContactCTA = () => (
  <section id="contact" className="container">
    <div className="rounded-[32px] border border-ember-500/30 bg-gradient-to-br from-ember-600/30 via-surface to-base p-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-ash">let's work</p>
          <h2 className="font-display text-4xl text-frost">Parliamo del tuo prossimo lancio</h2>
          <p className="text-ash">
            Lavoro con founder e team che vogliono shipping rapido: dApp, dashboard Web3, motion UI. Porta la tua idea o
            il tuo roadmap: rientro in 24h con un piano sintetico e prossimi step.
          </p>
        </div>
        <div className="space-y-4 text-sm text-ash">
          <div className="rounded-3xl border border-white/15 bg-black/20 p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-ash/70">Contatti</p>
            <p className="mt-3 text-lg text-frost">
              Vuoi collaborare su un progetto Web3, un design system o un MVP con smart contract? Usa la sezione contatti
              qui sotto: modulo + calendly ti permettono di fissare una call in pochi minuti.
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-surface/80 p-4 text-ash">
              <p className="text-sm">
                Preferisci una risposta veloce? Compila il form: condividi obiettivi, stack e deadline e ti rispondo in 24 h
                con budget e roadmap preliminare.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-frost/95 px-6 py-3 font-medium text-base text-base transition hover:bg-white"
          >
            Contattami ora
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);
