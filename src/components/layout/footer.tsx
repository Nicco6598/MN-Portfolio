import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/Nicco6598" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/marconiccolini-/" },
  { label: "Instagram", href: "https://www.instagram.com" },
];

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="container grid gap-10 py-12 text-ash lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em]">Marco Niccolini</p>
          <h3 className="font-display text-3xl text-frost">Costruiamo esperienze audaci.</h3>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-frost transition hover:border-ember-500"
          >
            Prenota una call <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3 text-sm text-ash">
            {socials.map(social => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:border-ember-500 hover:text-ember-300"
              >
                {social.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-ash/70">© {new Date().getFullYear()} · Crafted in Milan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
