"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";

type SkillLevel = "expert" | "advanced" | "intermediate";

interface Skill {
    name: string;
    level: SkillLevel;
    experience: number; // years (real values based on start date)
    projects?: number;
}

interface SkillCategory {
    id: string;
    titleKey: string;
    icon: React.ReactNode;
    color: string;
    skills: Skill[];
}

// Real experience values based on actual timeline:
// - Blockchain/Web3: Started Aug 2023 (~1.5 years)
// - Frontend (React/Next): Started 2022 (~2.5 years)
// - General programming: Started 2021 (~3+ years)
const skillData: SkillCategory[] = [
    {
        id: "blockchain",
        titleKey: "blockchain_backend",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 sm:h-6 sm:w-6">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: "ember",
        skills: [
            { name: "Solidity", level: "expert", experience: 1.5, projects: 8 },
            { name: "Node.js", level: "advanced", experience: 2, projects: 10 },
            { name: "Express", level: "advanced", experience: 2, projects: 8 },
            { name: "Hardhat", level: "expert", experience: 1.5, projects: 7 },
            { name: "Python", level: "intermediate", experience: 1, projects: 3 },
            { name: "SQL", level: "intermediate", experience: 1.5, projects: 5 },
        ],
    },
    {
        id: "frontend",
        titleKey: "frontend",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 sm:h-6 sm:w-6">
                <path d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: "blue",
        skills: [
            { name: "React", level: "expert", experience: 2.5, projects: 12 },
            { name: "Next.js", level: "expert", experience: 2, projects: 8 },
            { name: "TypeScript", level: "expert", experience: 2, projects: 10 },
            { name: "JavaScript", level: "expert", experience: 3, projects: 15 },
            { name: "Tailwind CSS", level: "expert", experience: 2, projects: 12 },
        ],
    },
    {
        id: "tooling",
        titleKey: "tooling",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 sm:h-6 sm:w-6">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: "green",
        skills: [
            { name: "Git", level: "expert", experience: 3, projects: 20 },
            { name: "Web3.js", level: "advanced", experience: 1.5, projects: 7 },
            { name: "Ethers.js", level: "advanced", experience: 1, projects: 5 },
            { name: "Chainlink VRF", level: "intermediate", experience: 1, projects: 2 },
            { name: "Docker", level: "intermediate", experience: 1, projects: 3 },
        ],
    },
];

const levelConfig: Record<SkillLevel, { label: string; percentage: number; color: string }> = {
    expert: { label: "Expert", percentage: 95, color: "bg-ember-500" },
    advanced: { label: "Advanced", percentage: 75, color: "bg-amber-500" },
    intermediate: { label: "Intermediate", percentage: 55, color: "bg-sky-500" },
};

const categoryColors: Record<string, { bg: string; border: string; glow: string; text: string }> = {
    ember: {
        bg: "bg-ember-500/10",
        border: "border-ember-500/30",
        glow: "shadow-[0_0_30px_rgba(255,122,41,0.15)]",
        text: "text-ember-400",
    },
    blue: {
        bg: "bg-sky-500/10",
        border: "border-sky-500/30",
        glow: "shadow-[0_0_30px_rgba(56,189,248,0.15)]",
        text: "text-sky-400",
    },
    green: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        glow: "shadow-[0_0_30px_rgba(52,211,153,0.15)]",
        text: "text-emerald-400",
    },
};

interface SkillNodeProps {
    skill: Skill;
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
    categoryColor: string;
    translations: {
        experience: string;
        years: string;
        projects: string;
        shipped: string;
        levelLabel: string;
    };
}

const SkillNode = ({ skill, index, isExpanded, onToggle, categoryColor, translations }: SkillNodeProps) => {
    const config = levelConfig[skill.level];
    const colors = categoryColors[categoryColor];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03, duration: 0.25 }}
            className="relative"
        >
            <motion.button
                onClick={onToggle}
                className={`group relative w-full rounded-xl sm:rounded-2xl border ${colors.border} ${colors.bg} p-3 sm:p-4 text-left transition-all duration-300 active:scale-[0.98] sm:hover:scale-[1.02] ${isExpanded ? colors.glow : ""}`}
                whileTap={{ scale: 0.98 }}
            >
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl ${colors.bg} border ${colors.border}`}>
                            <span className={`text-xs sm:text-sm font-bold ${colors.text}`}>
                                {skill.name.slice(0, 2).toUpperCase()}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <h4 className="font-medium !text-white text-sm sm:text-base truncate">{skill.name}</h4>
                            <p className="text-[10px] sm:text-xs text-frost/80">{translations.levelLabel}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        <div className="hidden xs:block sm:block">
                            <div className="h-1.5 sm:h-2 w-12 sm:w-20 overflow-hidden rounded-full bg-white/10">
                                <motion.div
                                    className={config.color}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${config.percentage}%` }}
                                    transition={{ delay: index * 0.03 + 0.15, duration: 0.6, ease: "easeOut" }}
                                    style={{ height: "100%" }}
                                />
                            </div>
                        </div>
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-ash"
                        >
                            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </motion.div>
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3 border-t border-white/10 pt-3 sm:pt-4">
                                <div className="rounded-lg sm:rounded-xl bg-white/5 p-2 sm:p-3">
                                    <p className="text-[10px] sm:text-xs text-ash">{translations.experience}</p>
                                    <p className="text-base sm:text-lg font-semibold text-frost">
                                        {skill.experience}+ <span className="text-xs sm:text-sm font-normal text-ash">{translations.years}</span>
                                    </p>
                                </div>
                                {skill.projects && (
                                    <div className="rounded-lg sm:rounded-xl bg-white/5 p-2 sm:p-3">
                                        <p className="text-[10px] sm:text-xs text-ash">{translations.projects}</p>
                                        <p className="text-base sm:text-lg font-semibold text-frost">
                                            {skill.projects} <span className="text-xs sm:text-sm font-normal text-ash">{translations.shipped}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 sm:mt-3 flex items-center gap-2">
                                <div className="h-1.5 sm:h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                                    <motion.div
                                        className={config.color}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${config.percentage}%` }}
                                        transition={{ duration: 0.5 }}
                                        style={{ height: "100%" }}
                                    />
                                </div>
                                <span className="text-[10px] sm:text-xs text-ash">{config.percentage}%</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </motion.div>
    );
};

interface CategoryCardProps {
    category: SkillCategory;
    isActive: boolean;
    onClick: () => void;
    translations: {
        title: string;
        skillsCount: string;
        expAbbr: string;
    };
    showArrow?: boolean;
    isOpen?: boolean;
}

const CategoryCard = ({ category, isActive, onClick, translations, showArrow = false, isOpen = false }: CategoryCardProps) => {
    const colors = categoryColors[category.color];
    // Weighted average experience: expert > advanced > intermediate
    const levelWeights: Record<SkillLevel, number> = {
        expert: 1.3,
        advanced: 1.0,
        intermediate: 0.7,
    };

    const { weightedExp, totalWeight } = category.skills.reduce(
        (acc, skill) => {
            const weight = levelWeights[skill.level];
            return {
                weightedExp: acc.weightedExp + skill.experience * weight,
                totalWeight: acc.totalWeight + weight,
            };
        },
        { weightedExp: 0, totalWeight: 0 },
    );

    const effectiveExperience = totalWeight === 0 ? 0 : weightedExp / totalWeight;

    const avgLevel = Math.round(
        category.skills.reduce((acc, s) => acc + levelConfig[s.level].percentage, 0) / category.skills.length
    );

    return (
        <motion.button
            onClick={onClick}
            className={`relative w-full rounded-xl sm:rounded-2xl border p-3 sm:p-5 text-left transition-all duration-300 ${isActive
                ? `${colors.border} ${colors.bg} ${colors.glow}`
                : "border-white/10 bg-surface/60 hover:border-white/20 hover:bg-surface/80"
                }`}
            whileTap={{ scale: 0.98 }}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                    <div className={`rounded-lg sm:rounded-xl p-2 sm:p-2.5 ${isActive ? colors.bg : "bg-white/5"} border ${isActive ? colors.border : "border-white/10"}`}>
                        <span className={isActive ? colors.text : "text-ash"}>{category.icon}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {isActive && (
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                            className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${category.color === "ember" ? "bg-ember-500" : category.color === "blue" ? "bg-sky-500" : "bg-emerald-500"}`}
                        />
                    )}
                    {showArrow && (
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-ash/80"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                    )}
                </div>
            </div>
            <h3 className={`mt-3 sm:mt-4 text-sm sm:text-lg font-semibold ${isActive ? "text-frost" : "text-ash"}`}>
                {translations.title}
            </h3>
            <div className="mt-1.5 sm:mt-2 flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-ash">
                <span>{category.skills.length} {translations.skillsCount}</span>
                <span className="hidden sm:inline">~{effectiveExperience.toFixed(1)}y {translations.expAbbr}</span>
            </div>
            <div className="mt-2 sm:mt-3 h-1 sm:h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                    className={category.color === "ember" ? "bg-ember-500" : category.color === "blue" ? "bg-sky-500" : "bg-emerald-500"}
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? `${avgLevel}%` : "0%" }}
                    transition={{ duration: 0.5 }}
                    style={{ height: "100%" }}
                />
            </div>
        </motion.button>
    );
};

export default function SkillTree() {
    const t = useTranslations('HomePage');
    const tSkills = useTranslations('HomePage.skills');
    const [activeCategory, setActiveCategory] = useState<string>("blockchain");
    const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

    const currentCategory = skillData.find((c) => c.id === activeCategory) || skillData[0];

    const handleSkillToggle = useCallback((skillName: string) => {
        setExpandedSkill((prev) => (prev === skillName ? null : skillName));
    }, []);

    const totalSkills = skillData.reduce((acc, c) => acc + c.skills.length, 0);
    const expertSkills = skillData.reduce(
        (acc, c) => acc + c.skills.filter((s) => s.level === "expert").length,
        0
    );

    // Get translated level labels
    const getLevelLabel = (level: SkillLevel) => {
        const labels: Record<SkillLevel, string> = {
            expert: tSkills('expert'),
            advanced: tSkills('advanced'),
            intermediate: tSkills('intermediate'),
        };
        return labels[level];
    };

    return (
        <section className="container space-y-6 sm:space-y-8">
            <div className="space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white">{t('tech_stack_label')}</p>
                <h2 className="font-display text-2xl sm:text-4xl !text-white">{t('tech_stack_title')}</h2>
                <p className="max-w-2xl text-sm sm:text-base !text-white">{t('tech_stack_desc')}</p>
            </div>

            {/* Stats bar - scrollable on mobile */}
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
                <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-surface/60 px-3 sm:px-4 py-1.5 sm:py-2 shrink-0">
                    <span className="text-lg sm:text-2xl font-bold text-ember-400">{totalSkills}</span>
                    <span className="text-xs sm:text-sm text-ash whitespace-nowrap">{tSkills('total_skills')}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-surface/60 px-3 sm:px-4 py-1.5 sm:py-2 shrink-0">
                    <span className="text-lg sm:text-2xl font-bold text-emerald-400">{expertSkills}</span>
                    <span className="text-xs sm:text-sm text-ash whitespace-nowrap">{tSkills('expert_level')}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-surface/60 px-3 sm:px-4 py-1.5 sm:py-2 shrink-0">
                    <span className="text-lg sm:text-2xl font-bold text-sky-400">{skillData.length}</span>
                    <span className="text-xs sm:text-sm text-ash whitespace-nowrap">{tSkills('categories')}</span>
                </div>
            </div>

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-[260px_1fr]">
                {/* Category selector */}
                <div className="space-y-3">
                    {/* Mobile: single expandable card */}
                    <div className="lg:hidden space-y-2">
                        <CategoryCard
                            category={currentCategory}
                            isActive={true}
                            onClick={() => setIsCategoryMenuOpen(prev => !prev)}
                            translations={{
                                title: tSkills(currentCategory.titleKey),
                                skillsCount: tSkills('skills_count'),
                                expAbbr: tSkills('exp_abbr'),
                            }}
                            showArrow
                            isOpen={isCategoryMenuOpen}
                        />
                        <div className="flex items-center gap-1 pl-1 text-[10px] text-ash/70">
                            <motion.span
                                animate={{ opacity: isCategoryMenuOpen ? [0.6, 1, 0.6] : 0.6 }}
                                transition={{ duration: 1.2, repeat: isCategoryMenuOpen ? Infinity : 0 }}
                                className="h-1.5 w-1.5 rounded-full bg-ember-400"
                            />
                            <span>{tSkills('tap_to_change')}</span>
                        </div>
                        <AnimatePresence initial={false}>
                            {isCategoryMenuOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-1 flex flex-col gap-2">
                                        {skillData
                                            .filter(c => c.id !== currentCategory.id)
                                            .map(category => (
                                                <CategoryCard
                                                    key={category.id}
                                                    category={category}
                                                    isActive={activeCategory === category.id}
                                                    onClick={() => {
                                                        setActiveCategory(category.id);
                                                        setExpandedSkill(null);
                                                        setIsCategoryMenuOpen(false);
                                                    }}
                                                    translations={{
                                                        title: tSkills(category.titleKey),
                                                        skillsCount: tSkills('skills_count'),
                                                        expAbbr: tSkills('exp_abbr'),
                                                    }}
                                                />
                                            ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Desktop: full vertical list */}
                    <div className="hidden lg:flex lg:flex-col gap-2 sm:gap-3">
                        {skillData.map(category => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                isActive={activeCategory === category.id}
                                onClick={() => {
                                    setActiveCategory(category.id);
                                    setExpandedSkill(null);
                                }}
                                translations={{
                                    title: tSkills(category.titleKey),
                                    skillsCount: tSkills('skills_count'),
                                    expAbbr: tSkills('exp_abbr'),
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Skills grid */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl sm:rounded-[28px] border border-white/10 bg-surface/40 p-4 sm:p-6"
                >
                    <div className="mb-4 sm:mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className={`rounded-lg sm:rounded-xl p-1.5 sm:p-2 ${categoryColors[currentCategory.color].bg} border ${categoryColors[currentCategory.color].border}`}>
                                <span className={categoryColors[currentCategory.color].text}>
                                    {currentCategory.icon}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-base sm:text-xl font-semibold text-frost">
                                    {tSkills(currentCategory.titleKey)}
                                </h3>
                                <p className="text-xs sm:text-sm text-ash">{currentCategory.skills.length} {tSkills('technologies')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
                        {currentCategory.skills.map((skill, index) => (
                            <SkillNode
                                key={skill.name}
                                skill={skill}
                                index={index}
                                isExpanded={expandedSkill === skill.name}
                                onToggle={() => handleSkillToggle(skill.name)}
                                categoryColor={currentCategory.color}
                                translations={{
                                    experience: tSkills('experience'),
                                    years: tSkills('years'),
                                    projects: tSkills('projects'),
                                    shipped: tSkills('shipped'),
                                    levelLabel: getLevelLabel(skill.level),
                                }}
                            />
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4 border-t border-white/10 pt-3 sm:pt-4">
                        <span className="text-[10px] sm:text-xs text-ash">{tSkills('proficiency')}</span>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-ember-500" />
                            <span className="text-[10px] sm:text-xs text-ash">{tSkills('expert')}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-amber-500" />
                            <span className="text-[10px] sm:text-xs text-ash">{tSkills('advanced')}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-sky-500" />
                            <span className="text-[10px] sm:text-xs text-ash">{tSkills('intermediate')}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
