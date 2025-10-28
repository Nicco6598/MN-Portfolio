import React, { useRef, useContext } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';
import { 
  FaCode, 
  FaServer, 
  FaCubes, 
  FaUsers,
  FaReact,
  FaNodeJs,
  FaPython,
  FaEthereum,
  FaGitAlt,
  FaDocker,
  FaGithub,
  FaNpm,
  FaYarn
} from 'react-icons/fa';
import { 
  SiSolidity, 
  SiOpenzeppelin, 
  SiIpfs, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript, 
  SiJavascript,
  SiVercel,
  SiFigma,
  SiPostman
} from 'react-icons/si';

// Definizione dei tipi
interface Skill {
  name: string;
  level: number;
  icon?: React.ReactNode;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  skills: Skill[];
}

interface TechTool {
  name: string;
  icon: React.ReactNode;
  color: string;
  category: string;
}

const SkillsSection: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Enhanced container animations with creative stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Creative bento-box card variants with 3D effects
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      rotateX: 15,
      rotateY: 15
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: i * 0.1,
        duration: 0.8
      }
    }),
    hover: {
      y: -12,
      scale: 1.02,
      rotateX: -5,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3
      }
    }
  };

  // Floating particle animations
  const particleVariants = {
    animate: {
      y: [0, -30, 0],
      x: [0, 20, -10, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2
      }
    }
  };

  // Skill progress bar animation
  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        delay: 0.5,
        ease: "easeOut"
      }
    })
  };

  const skillCategories: SkillCategory[] = [
    {
      title: "Blockchain",
      icon: <FaCubes className="w-6 h-6" />,
      color: "#6366F1",
      gradient: "from-indigo-500 to-purple-600",
      skills: [
        { name: "Solidity", level: 92, icon: <SiSolidity /> },
        { name: "Smart Contracts", level: 90, icon: <FaEthereum /> },
        { name: "Web3.js/Ethers.js", level: 88, icon: <FaEthereum /> },
        { name: "DeFi Protocols", level: 85, icon: <FaEthereum /> }
      ]
    },
    {
      title: "Frontend",
      icon: <FaCode className="w-6 h-6" />,
      color: "#8B5CF6",
      gradient: "from-violet-500 to-pink-500",
      skills: [
        { name: "React/Next.js", level: 95, icon: <FaReact /> },
        { name: "TypeScript", level: 93, icon: <SiTypescript /> },
        { name: "Tailwind CSS", level: 90, icon: <SiTailwindcss /> },
        { name: "Framer Motion", level: 88, icon: <FaReact /> }
      ]
    },
    {
      title: "Backend",
      icon: <FaServer className="w-6 h-6" />,
      color: "#10B981",
      gradient: "from-emerald-500 to-teal-600",
      skills: [
        { name: "Node.js", level: 85, icon: <FaNodeJs /> },
        { name: "Python", level: 82, icon: <FaPython /> },
        { name: "REST APIs", level: 90, icon: <FaServer /> },
        { name: "GraphQL", level: 78, icon: <FaServer /> }
      ]
    },
    {
      title: "DevOps & Tools",
      icon: <FaGithub className="w-6 h-6" />,
      color: "#F59E0B",
      gradient: "from-amber-500 to-orange-600",
      skills: [
        { name: "Docker", level: 85, icon: <FaDocker /> },
        { name: "Git/GitHub", level: 92, icon: <FaGitAlt /> },
        { name: "CI/CD", level: 80, icon: <FaGithub /> },
        { name: "Vercel", level: 88, icon: <SiVercel /> }
      ]
    }
  ];

  const techStack: TechTool[] = [
    { name: "Solidity", icon: <SiSolidity className="w-5 h-5" />, color: "#363636", category: "blockchain" },
    { name: "Hardhat", icon: <FaGithub className="w-5 h-5" />, color: "#FF8C00", category: "blockchain" },
    { name: "OpenZeppelin", icon: <SiOpenzeppelin className="w-5 h-5" />, color: "#4E5EE4", category: "blockchain" },
    { name: "IPFS", icon: <SiIpfs className="w-5 h-5" />, color: "#65C2CB", category: "blockchain" },
    { name: "React", icon: <FaReact className="w-5 h-5" />, color: "#61DAFB", category: "frontend" },
    { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5" />, color: "#000000", category: "frontend" },
    { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" />, color: "#3178C6", category: "frontend" },
    { name: "Tailwind", icon: <SiTailwindcss className="w-5 h-5" />, color: "#06B6D4", category: "frontend" },
    { name: "Node.js", icon: <FaNodeJs className="w-5 h-5" />, color: "#339933", category: "backend" },
    { name: "Python", icon: <FaPython className="w-5 h-5" />, color: "#3776AB", category: "backend" },
    { name: "Docker", icon: <FaDocker className="w-5 h-5" />, color: "#2496ED", category: "devops" },
    { name: "Git", icon: <FaGitAlt className="w-5 h-5" />, color: "#F05032", category: "devops" },
    { name: "GitHub", icon: <FaGithub className="w-5 h-5" />, color: "#181717", category: "devops" },
    { name: "Figma", icon: <SiFigma className="w-5 h-5" />, color: "#F24E1E", category: "design" },
    { name: "Postman", icon: <SiPostman className="w-5 h-5" />, color: "#FF6C37", category: "tools" },
    { name: "Vercel", icon: <SiVercel className="w-5 h-5" />, color: "#000000", category: "tools" }
  ];

  const softSkills = [
    { name: "Problem Solving", level: 96, color: "#8B5CF6" },
    { name: "Team Leadership", level: 90, color: "#10B981" },
    { name: "Communication", level: 94, color: "#F59E0B" },
    { name: "Innovation", level: 92, color: "#6366F1" }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Header Section */}
      <motion.div 
        className="text-center mb-12"
        variants={cardVariants}
      >
        <motion.h2 
          className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Tech Stack
          </span>
        </motion.h2>
        <motion.div 
          className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.p 
          className={`mt-4 text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
          variants={cardVariants}
        >
          Le tecnologie e competenze che uso per creare soluzioni innovative
        </motion.p>
      </motion.div>

      {/* Creative Bento Grid Layout */}
      <div className="relative">
        {/* Floating Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${
                i % 4 === 0 ? 'from-violet-500 to-pink-500' :
                i % 4 === 1 ? 'from-cyan-500 to-blue-500' :
                i % 4 === 2 ? 'from-emerald-500 to-teal-500' :
                'from-amber-500 to-orange-500'
              } opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              variants={particleVariants}
              animate="animate"
              custom={i}
            />
          ))}
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 relative z-10">

          {/* Large Hero Card - Blockchain (spans 8 columns on desktop) */}
          <motion.div
            className="md:col-span-8 lg:col-span-8 group relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl border transition-all duration-500 shadow-modern-xl"
            style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)',
              border: theme === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(0, 0, 0, 0.1)'
            }}
            variants={cardVariants}
            custom={0}
            whileHover="hover"
          >
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-violet-500/20 to-pink-500/20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.2, 0.4],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="p-4 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-2xl"
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <FaCubes className="w-8 h-8" />
                </motion.div>
                <div>
                  <h3 className="text-3xl font-bold text-gradient mb-1">
                    Blockchain Development
                  </h3>
                  <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Smart Contracts & DeFi Solutions
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillCategories[0].skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="group/skill"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: skillIndex * 0.1 + 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-violet-500">
                          {skill.icon}
                        </div>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-violet-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`w-full h-3 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-200/50'
                    }`}>
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
                        variants={progressVariants}
                        custom={skill.level}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Medium Card - Frontend (spans 4 columns) */}
          <motion.div
            className="md:col-span-4 lg:col-span-4 group relative overflow-hidden rounded-3xl p-6 backdrop-blur-xl border transition-all duration-500 shadow-modern-lg"
            style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)',
              border: theme === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(0, 0, 0, 0.1)'
            }}
            variants={cardVariants}
            custom={1}
            whileHover="hover"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaCode className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold text-gradient">
                  Frontend
                </h3>
              </div>

              <div className="space-y-3 flex-grow">
                {skillCategories[1].skills.slice(0, 3).map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: skillIndex * 0.1 + 0.8 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-500 text-sm">
                          {skill.icon}
                        </span>
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-cyan-500">
                        {skill.level}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Small Square Cards Row */}
          <motion.div
            className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-3xl p-6 backdrop-blur-xl border transition-all duration-500 shadow-modern"
            variants={cardVariants}
            custom={2}
            whileHover="hover"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaServer className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold text-gradient">
                  Backend
                </h3>
              </div>

              <div className="space-y-2 flex-grow">
                {skillCategories[2].skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: skillIndex * 0.1 + 1.0 }}
                  >
                    <span className="text-emerald-500 text-sm">
                      {skill.icon}
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-3xl p-6 backdrop-blur-xl border transition-all duration-500 shadow-modern"
            variants={cardVariants}
            custom={3}
            whileHover="hover"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg"
                  whileHover={{
                    rotate: [0, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <FaGithub className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold text-gradient">
                  DevOps & Tools
                </h3>
              </div>

              <div className="space-y-2 flex-grow">
                {skillCategories[3].skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: skillIndex * 0.1 + 1.2 }}
                  >
                    <span className="text-amber-500 text-sm">
                      {skill.icon}
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-3xl p-6 backdrop-blur-xl border transition-all duration-500 shadow-modern"
            variants={cardVariants}
            custom={4}
            whileHover="hover"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg"
                  whileHover={{ scale: [1, 1.2, 1], rotate: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaUsers className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold text-gradient">
                  Soft Skills
                </h3>
              </div>

              <div className="space-y-3 flex-grow">
                {softSkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: skillIndex * 0.1 + 1.4 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {skill.name}
                      </span>
                      <span className="text-xs font-bold" style={{ color: skill.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-200/50'
                    }`}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1.2,
                          delay: skillIndex * 0.1 + 1.6,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Grid - Large spanning card */}
          <motion.div
            className="md:col-span-12 lg:col-span-8 group relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl border transition-all duration-500 shadow-modern-xl"
            variants={cardVariants}
            custom={5}
            whileHover="hover"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-2xl"
                  whileHover={{
                    rotate: [0, 360],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <SiTypescript className="w-8 h-8" />
                </motion.div>
                <div>
                  <h3 className="text-3xl font-bold text-gradient mb-1">
                    Tech Stack Completo
                  </h3>
                  <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Tutte le tecnologie che utilizzo quotidianamente
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className={`group/tech p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/50'
                        : 'bg-white/30 border-gray-200/50 hover:bg-gray-100/50'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.05 + 2.0 }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="text-2xl transition-transform duration-300 group-hover/tech:scale-110"
                        style={{ color: tech.color }}
                      >
                        {tech.icon}
                      </div>
                      <span className={`text-xs font-medium text-center ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {tech.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SkillsSection;