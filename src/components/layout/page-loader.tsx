"use client";

import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";

interface PageLoaderProps {
  subtitleKey?: "home_subtitle" | "projects_subtitle" | "contact_subtitle";
}

const PageLoader = ({ subtitleKey }: PageLoaderProps) => {
  const t = useTranslations("Loading");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center bg-base/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-surface/90 px-8 py-6 shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.25 }}
        >
          <div className="text-[11px] uppercase tracking-[0.35em] text-ash/80">
            MARCO NICCOLINI
          </div>
          <div className="space-y-2 text-center">
            <p className="text-sm font-medium text-frost">{t("title")}</p>
            {subtitleKey && (
              <p className="text-xs text-ash/80 max-w-xs">
                {t(subtitleKey)}
              </p>
            )}
          </div>
          <div className="mt-2 h-1.5 w-36 overflow-hidden rounded-full bg-black/40">
            <motion.div
              className="h-full w-1/3 rounded-full bg-gradient-to-r from-ember-500 via-ember-300 to-ember-500 shadow-[0_0_20px_rgba(255,122,41,0.6)]"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoader;
