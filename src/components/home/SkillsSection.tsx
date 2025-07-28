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

  // Animazioni container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 120,
        damping: 20,
        duration: 0.6
      } 
    },
    hover: { 
      y: -8,
      scale: 1.02,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }
    }
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

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Skill Categories - 4 cards in 3 columns each */}
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            className={`md:col-span-6 lg:col-span-3 group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600/50' 
                : 'bg-white/50 border-gray-200/50 hover:border-gray-300/50'
            }`}
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Background Gradient */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />
            
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {category.icon}
                </motion.div>
                <h3 className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {category.title}
                </h3>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {skill.icon && (
                          <span className="text-xs" style={{ color: category.color }}>
                            {skill.icon}
                          </span>
                        )}
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold" style={{ color: category.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-200/50'
                    }`}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ 
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}dd)` 
                        }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ 
                          duration: 1.2, 
                          delay: index * 0.1 + skillIndex * 0.1,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Tech Stack Grid */}
        <motion.div 
          className="md:col-span-12 lg:col-span-8"
          variants={cardVariants}
        >
          <div className={`rounded-2xl p-6 backdrop-blur-sm border ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/50 border-gray-200/50'
          }`}>
            <h3 className={`text-2xl font-bold mb-6 text-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Tech Stack
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {techStack.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-gray-700/30 border-gray-600/30 hover:border-gray-500/50' 
                      : 'bg-gray-50/50 border-gray-200/50 hover:border-gray-300/50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.05,
                    boxShadow: `0 10px 25px -5px ${tool.color}30`
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <motion.div
                      style={{ color: tool.color }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {tool.icon}
                    </motion.div>
                    <span className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {tool.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Soft Skills with Circular Progress */}
        <motion.div 
          className="md:col-span-12 lg:col-span-4"
          variants={cardVariants}
        >
          <div className={`rounded-2xl p-6 backdrop-blur-sm border ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/50 border-gray-200/50'
          }`}>
            <h3 className={`text-xl font-bold mb-6 text-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Soft Skills
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={skill.color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - skill.level / 100)}`}
                        transform="rotate(-90 50 50)"
                        initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                        animate={isInView ? { 
                          strokeDashoffset: 2 * Math.PI * 40 * (1 - skill.level / 100)
                        } : {}}
                        transition={{ 
                          duration: 1.5, 
                          delay: 0.8 + index * 0.1,
                          ease: "easeOut"
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold" style={{ color: skill.color }}>
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-medium mt-2 text-center ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 30, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default SkillsSection;