import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaCode, 
  FaServer, 
  FaCubes, 
  FaTools,
  FaUsers
} from 'react-icons/fa';

// Definizione dei tipi
interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

const SkillsSection: React.FC = () => {
  // Animazioni
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      } 
    },
    hover: { 
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  // Dati delle competenze
  const skillCategories: SkillCategory[] = [
    {
      title: "Blockchain",
      icon: <FaCubes />,
      color: "#6366F1", // Indigo
      skills: [
        { name: "Solidity", level: 90 },
        { name: "Smart Contracts", level: 88 },
        { name: "Web3.js/Ethers.js", level: 85 },
        { name: "Hardhat/Truffle", level: 75 }
      ]
    },
    {
      title: "Frontend",
      icon: <FaCode />,
      color: "#8B5CF6", // Violet
      skills: [
        { name: "HTML/CSS", level: 90 },
        { name: "React", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "JavaScript", level: 75 }
      ]
    },
    {
      title: "Backend",
      icon: <FaServer />,
      color: "#10B981", // Emerald
      skills: [
        { name: "RESTful API", level: 80 },
        { name: "Python", level: 70 },
        { name: "Node.js", level: 65 }
      ]
    },
    {
      title: "Soft Skills",
      icon: <FaUsers />,
      color: "#F59E0B", // Amber
      skills: [
        { name: "Problem Solving", level: 95 },
        { name: "Teamwork", level: 90 },
        { name: "Comunicazione", level: 85 },
        { name: "Adattabilità", level: 85 }
      ]
    }
  ];

  // Tools e frameworks
  const tools = [
    { name: "VS Code", color: "#1F2937" },
    { name: "TailwindCSS", color: "#0EA5E9" },
    { name: "Git", color: "#F05033" },
    { name: "Docker", color: "#2496ED" },
    { name: "Next.js", color: "#8B5CF6" },
    { name: "Remix IDE", color: "#6366F1" },
    { name: "MetaMask", color: "#F59E0B" },
    { name: "Ganache", color: "#EF4444" },
    { name: "OpenZeppelin", color: "#10B981" },
    { name: "IPFS", color: "#047857" },
    { name: "GitHub", color: "#4B5563" }
  ];

  // Riferimento alla sezione per il trigger dell'animazione
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <motion.section 
      ref={sectionRef}
      className="mb-16 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className="text-center mb-8"
        variants={cardVariants}
      >
        <h2 className="section-title">LE MIE COMPETENZE</h2>
        <div className="accent-bar mx-auto"></div>
        <p className="section-subtitle">
          Le tecnologie che utilizzo per creare soluzioni innovative
        </p>
      </motion.div>
      
      {/* Layout bento più compatto e intuitivo */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Prima riga: categorie principali */}
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={category.title}
            className="md:col-span-3 glassmorphism p-6 relative overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Sfondo decorativo */}
            <div 
              className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full opacity-10 blur-xl z-0" 
              style={{ backgroundColor: category.color }}
            />
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="p-3 rounded-full text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.icon}
              </div>
              <h3 className="text-xl font-bold">{category.title}</h3>
            </div>
            
            {/* Top skills con barre visuali più semplici */}
            <div className="space-y-3">
              {category.skills
                .sort((a, b) => b.level - a.level)
                .slice(0, 3) // Mostra solo le 3 skills principali per una UI più pulita
                .map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span 
                        className="text-xs font-semibold"
                        style={{ color: category.color }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Barra semplificata */}
                    <div className="w-full bg-subtle h-1.5 rounded-full overflow-hidden">
                      {isInView && (
                        <motion.div 
                          className="h-full rounded-full"
                          style={{ backgroundColor: category.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        ))}
        
        {/* Seconda riga: competenze aggiuntive e capacità */}
        <motion.div 
          className="md:col-span-12 glassmorphism p-6 mt-2"
          variants={cardVariants}
        >
          <h3 className="text-xl font-bold mb-6 text-center">
            Tecnologie & Capacità
          </h3>
          
          {/* Cloud di tools con bordi colorati e sfondi sfumati */}
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, idx) => (
              <motion.div
                key={tool.name}
                className="skill-tag"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: idx * 0.03 + 0.1 }
                } : {}}
                whileHover={{ 
                  y: -3,
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <div 
                  className="px-4 py-2 rounded-full inline-flex items-center justify-center relative overflow-hidden border-2 bg-primary bg-opacity-50"
                  style={{ 
                    borderColor: tool.color,
                  }}
                >
                  {/* Sfondo sfumato/sfocato */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-10 blur-sm" 
                    style={{ background: `radial-gradient(circle at center, ${tool.color} 0%, transparent 70%)` }}
                  ></div>
                  
                  <span className="text-sm font-medium relative z-10" style={{ color: tool.color }}>
                    {tool.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Circle skill indicators */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Problem Solving", level: 95, color: "#F59E0B" },
              { name: "Comunicazione", level: 85, color: "#8B5CF6" },
              { name: "Team Work", level: 90, color: "#10B981" },
              { name: "Creatività", level: 88, color: "#6366F1" }
            ].map((skill, idx) => (
              <motion.div 
                key={skill.name}
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { 
                  opacity: 1, 
                  transition: { delay: idx * 0.1 + 0.3 }
                } : {}}
              >
                <div className="relative mb-2 w-16 h-16 md:w-20 md:h-20">
                  {/* Background circle */}
                  <div 
                    className="absolute inset-0 rounded-full bg-subtle"
                  />
                  
                  {/* Progress circle */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={skill.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={isInView ? { 
                        strokeDashoffset: 283 - (283 * skill.level / 100)
                      } : {}}
                      transition={{ duration: 1.5, delay: idx * 0.1 + 0.3 }}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  
                  {/* Percentage text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold" style={{ color: skill.color }}>
                      {skill.level}%
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium text-center">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SkillsSection; 