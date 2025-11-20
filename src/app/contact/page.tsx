"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { CalendarClock, ChevronDown, Github, Linkedin, MapPin, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Inserisci almeno 2 caratteri"),
  email: z.string().email("Email non valida"),
  projectType: z.string().optional(),
  message: z.string().min(20, "Raccontami un po' di più"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

const contactMethods = [
  {
    icon: MapPin,
    label: "Base",
    value: "Pioltello (MI), Italia",
    helper: "Operativo su progetti remote-first e onsite a Milano su richiesta",
  },
  {
    icon: CalendarClock,
    label: "Disponibilità",
    value: "CET · Slot tra 9:00 e 19:00",
    helper: "Kickoff entro 2 settimane per team che hanno già scope definito",
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/Nicco6598", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/marconiccolini-/", icon: Linkedin },
];

const projectTypes = [
  "Product Website",
  "Brand Experience",
  "dApp / Web3",
  "Smart Contract",
  "Altro",
];

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = async (values: ContactFormValues) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.table(values);
    setSubmitted(true);
    reset(defaultValues);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactStats = useMemo(
    () => [
      { label: "Tempo medio risposta", value: "< 24h" },
      { label: "Clienti soddisfatti", value: "100%" },
      { label: "Progetti shippati", value: "9" },
    ],
    [],
  );

  return (
    <div className="space-y-20 pb-24">
      <section className="container pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-ash">contact</p>
            <h1 className="font-display text-4xl text-frost sm:text-5xl">
              Parliamo del tuo prossimo prodotto
            </h1>
            <p className="text-lg text-ash">
              Sviluppo interfacce e infrastrutture Web3 con motion design curato. Raccontami la tua idea, ti rispondo con
              una roadmap chiara.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {contactStats.map(stat => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-surface/80 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-ash">{stat.label}</p>
                  <p className="text-2xl font-semibold text-frost">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4 rounded-[28px] border border-white/10 bg-surface/80 p-6">
              {contactMethods.map(method => (
                <div key={method.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <method.icon className="h-5 w-5 text-ember-300" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ash/80">{method.label}</p>
                    <p className="text-base text-frost">{method.value}</p>
                    {method.helper && <p className="text-xs text-ash/70">{method.helper}</p>}
                  </div>
                </div>
              ))}
              <div className="flex gap-3">
                {socials.map(social => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ash transition hover:border-ember-500 hover:text-ember-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-surface/90 p-8 shadow-[0_40px_60px_rgba(0,0,0,0.4)]">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ember-500/20 text-ember-200">
                  ✓
                </div>
                <p className="text-xl text-frost">Messaggio inviato, ti rispondo entro 24 ore.</p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label className="text-sm text-ash">Nome*</label>
                  <input
                    {...register("name")}
                    className="h-12 w-full rounded-full border border-white/10 bg-black/30 px-5 text-sm text-frost outline-none transition focus:border-ember-500"
                    placeholder="Come posso chiamarti?"
                  />
                  {errors.name && <p className="text-xs text-ember-300">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ash">Email*</label>
                  <input
                    {...register("email")}
                    className="h-12 w-full rounded-full border border-white/10 bg-black/30 px-5 text-sm text-frost outline-none transition focus:border-ember-500"
                    placeholder="tuo@email.com"
                  />
                  {errors.email && <p className="text-xs text-ember-300">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ash">Tipo di progetto</label>
                  <div className="relative">
                    <select
                      {...register("projectType")}
                      className="h-12 w-full appearance-none rounded-full border border-white/10 bg-black/30 pl-5 pr-10 text-sm text-frost outline-none transition focus:border-ember-500"
                    >
                      <option value="">Seleziona</option>
                      {projectTypes.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ash" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ash">Messaggio*</label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className="w-full rounded-[24px] border border-white/10 bg-black/30 px-5 py-4 text-sm text-frost outline-none transition focus:border-ember-500"
                    placeholder="Timeline, budget, obiettivi…"
                  />
                  {errors.message && <p className="text-xs text-ember-300">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-ember-500 px-6 py-3 font-medium text-base text-base transition hover:bg-ember-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Invio…" : "Invia il brief"}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
