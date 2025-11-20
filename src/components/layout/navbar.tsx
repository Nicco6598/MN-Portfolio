"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X, Github, Download } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const basePillClasses =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400/60";
  const activePillClasses =
    "bg-ember-500 text-base shadow-[0_0_25px_rgba(255,122,41,0.35)]";
  const inactivePillClasses = "bg-white/12 text-ash/80 hover:bg-white/20 hover:text-frost";

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.button
            type="button"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-base/70 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Chiudi menu mobile"
          />
        )}
      </AnimatePresence>
      <div className="relative z-50 mx-auto mt-6 flex w-full max-w-[64rem] flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-base/80 px-6 py-3 backdrop-blur-xl">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.4em] text-ash">
          MN
        </Link>
        <nav className="hidden items-center gap-2 text-sm lg:flex">
          {links.map(link => {
            const isActive = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`${basePillClasses} ${isActive ? activePillClasses : inactivePillClasses}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/Nicco6598"
            target="_blank"
            className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-frost transition hover:border-ember-500 hover:bg-white/5 lg:inline-flex"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setIsCvMenuOpen(true)}
            onMouseLeave={() => setIsCvMenuOpen(false)}
            onFocus={() => setIsCvMenuOpen(true)}
            onBlur={() => setIsCvMenuOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-sm text-frost transition hover:border-ember-500"
              aria-haspopup="menu"
              aria-expanded={isCvMenuOpen}
            >
              <Download className="h-4 w-4" />
              CV
            </button>
            <div
              className={`absolute -right-6 top-full w-48 pt-4 ${isCvMenuOpen ? "block" : "hidden"
                }`}
            >
              <div className="rounded-2xl border border-white/10 bg-base/95 p-2 backdrop-blur-xl">
                <Link
                  href="/assets/cv/CV_Marco_Niccolini(IT).pdf"
                  target="_blank"
                  download
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-frost transition hover:bg-white/10"
                >
                  <Download className="h-4 w-4" />
                  CV (IT)
                </Link>
                <Link
                  href="/assets/cv/CV_Marco_Niccolini(EN).pdf"
                  target="_blank"
                  download
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-frost transition hover:bg-white/10"
                >
                  <Download className="h-4 w-4" />
                  CV (EN)
                </Link>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-frost lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="relative z-50 mt-2 w-full px-3 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto w-full max-w-[64rem] rounded-3xl border border-white/10 bg-base/95 backdrop-blur-xl">
              <nav className="flex flex-col gap-6 p-5">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ash/70">Pagine</p>
                  <div className="flex flex-col gap-2">
                    {links.map(link => {
                      const isActive = isLinkActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={`${basePillClasses} w-full justify-start px-5 ${isActive ? activePillClasses : inactivePillClasses}`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="grid gap-3 rounded-2xl border border-white/10 p-4 sm:grid-cols-[1.2fr_1fr]">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ash/70">Community</p>
                    <Link
                      href="https://github.com/Nicco6598"
                      target="_blank"
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium text-frost transition hover:bg-white/10"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ash/70">Download</p>
                    <Link
                      href="/assets/cv/CV_Marco_Niccolini(IT).pdf"
                      target="_blank"
                      download
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-frost transition hover:border-ember-500 hover:bg-white/5"
                    >
                      <Download className="h-4 w-4" />
                      CV (IT)
                    </Link>
                    <Link
                      href="/assets/cv/CV_Marco_Niccolini(EN).pdf"
                      target="_blank"
                      download
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-frost transition hover:border-ember-500 hover:bg-white/5"
                    >
                      <Download className="h-4 w-4" />
                      CV (EN)
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
