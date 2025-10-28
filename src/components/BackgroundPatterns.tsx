import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundPatternsProps {
  variant?: 'hero' | 'section' | 'minimal' | 'complex';
  className?: string;
}

const BackgroundPatterns: React.FC<BackgroundPatternsProps> = ({
  variant = 'section',
  className = ''
}) => {
  const patterns = {
    hero: (
      <>
        {/* Large geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 opacity-5"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-violet)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="var(--color-pink)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <polygon
              points="200,20 350,120 350,280 200,380 50,280 50,120"
              fill="url(#heroGradient1)"
              stroke="var(--color-accent-primary)"
              strokeWidth="1"
              opacity="0.1"
            />
          </svg>
        </motion.div>

        {/* Floating triangles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`triangle-${i}`}
            className="absolute w-16 h-16 opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,10 90,90 10,90"
                fill={`var(--color-${['violet', 'pink', 'cyan', 'emerald'][i % 4]})`}
                opacity="0.3"
              />
            </svg>
          </motion.div>
        ))}

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="heroGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGrid)" />
          </svg>
        </div>
      </>
    ),

    section: (
      <>
        {/* Organic blob shapes */}
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 opacity-8"
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%"
            ],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.05))',
          }}
        />

        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 opacity-6"
          animate={{
            borderRadius: [
              "40% 60% 70% 30% / 40% 40% 60% 50%",
              "70% 30% 40% 60% / 60% 70% 30% 40%",
              "40% 60% 70% 30% / 40% 40% 60% 50%"
            ],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(16, 185, 129, 0.06))',
          }}
        />

        {/* Hexagonal pattern */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="hexPattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <polygon
                  points="30,2 58,16 58,36 30,50 2,36 2,16"
                  fill="none"
                  stroke="var(--color-accent-primary)"
                  strokeWidth="0.5"
                  opacity="0.4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPattern)" />
          </svg>
        </div>

        {/* Floating dots */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `var(--color-${['violet', 'pink', 'cyan', 'emerald', 'amber'][i % 5]})`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </>
    ),

    minimal: (
      <>
        {/* Simple geometric accent */}
        <motion.div
          className="absolute top-1/2 right-10 w-32 h-32 opacity-5"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--color-accent-primary)"
              strokeWidth="2"
              strokeDasharray="10 5"
            />
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="var(--color-violet)"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        </motion.div>
      </>
    ),

    complex: (
      <>
        {/* Complex geometric composition */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)
            `,
            backgroundSize: '100% 100%',
          }}
        />

        {/* Animated geometric shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`complex-${i}`}
            className="absolute opacity-8"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              width: `${40 + i * 10}px`,
              height: `${40 + i * 10}px`,
              background: `linear-gradient(45deg, var(--color-${['violet', 'pink', 'cyan', 'emerald', 'amber', 'rose'][i]}), transparent)`,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              borderRadius: [
                "0%",
                "50% 0% 50% 0%",
                "0% 50% 0% 50%",
                "50%",
                "0%"
              ],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Wave pattern overlay */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="wavePattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M0,10 Q25,0 50,10 T100,10"
                  fill="none"
                  stroke="var(--color-accent-primary)"
                  strokeWidth="0.5"
                  opacity="0.4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wavePattern)" />
          </svg>
        </div>
      </>
    ),
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {patterns[variant]}
    </div>
  );
};

export default BackgroundPatterns;
