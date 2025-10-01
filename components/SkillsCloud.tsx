// components/SkillsCloud.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Monitor,
  Database,
  Settings,
  Server,
  Cpu,
  Zap,
  Shield,
  Network,
  Code,
  FileText,
  Users,
  BarChart3,
  Wrench,
  Globe,
  Bot,
  Shuffle, // Icon for the shuffle button
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  weight: number;
  category:
    | "language"
    | "frontend"
    | "backend"
    | "database"
    | "devops"
    | "ai"
    | "soft"
    | "general";
  icon?: React.ReactNode;
  description: string;
  // Adding technologies for the highlight feature
  tech?: string[];
}

const skillsData: Skill[] = [
  // Languages
  {
    id: "s1",
    name: "Python",
    weight: 5,
    category: "language",
    icon: <Terminal className="inline" size={16} />,
    description: "Flask, Django, Pandas, Selenium, Python Impressionador",
    tech: ["Flask", "Django", "Pandas", "Selenium", "Automation"],
  },
  {
    id: "s2",
    name: "JavaScript",
    weight: 5,
    category: "language",
    icon: <Code className="inline" size={16} />,
    description: "JavaScript Impressionador, React, Node.js",
    tech: ["ES6+", "React.js", "Node.js", "Three.js"],
  },
  {
    id: "s3",
    name: "TypeScript",
    weight: 4,
    category: "language",
    icon: <Code className="inline" size={16} />,
    description: "TypeScript with React and Next.js",
    tech: ["React", "Next.js", "Prisma"],
  },
  {
    id: "s4",
    name: "SQL/NoSQL",
    weight: 4,
    category: "database",
    icon: <Database className="inline" size={16} />,
    description: "SQL Impressionador, MongoDB, Firebase",
    tech: ["SQL", "MongoDB", "Firebase", "ETL"],
  },

  // Frontend
  {
    id: "s5",
    name: "React",
    weight: 5,
    category: "frontend",
    icon: <Monitor className="inline" size={16} />,
    description: "Modern web development with React",
    tech: ["Hooks", "Next.js", "UI/UX"],
  },
  {
    id: "s6",
    name: "HTML/CSS",
    weight: 4,
    category: "frontend",
    icon: <Globe className="inline" size={16} />,
    description: "Frontend fundamentals and styling",
    tech: ["SSR", "SSG", "API Routes"],
  },
  {
    id: "s7",
    name: "HTML/CSS",
    weight: 4,
    category: "frontend",
    icon: <FileText className="inline" size={16} />,
    description: "Fundamentals of web development",
    tech: ["Flexbox", "Grid", "SASS/SCSS"],
  },

  // Backend & Automation
  {
    id: "s8",
    name: "Automation",
    weight: 5,
    category: "backend",
    icon: <Server className="inline" size={16} />,
    description: "Process automation and integration",
    tech: ["Selenium", "VBA", "Python", "APIs"],
  },

  // Data Analysis
  {
    id: "s9",
    name: "Power BI",
    weight: 4,
    category: "database",
    icon: <Database className="inline" size={16} />,
    description: "Data visualization and analytics",
    tech: ["DAX", "Power Query", "KPIs"],
  },
  {
    id: "s10",
    name: "Big Data",
    weight: 3,
    category: "database",
    icon: <Database className="inline" size={16} />,
    description: "Big Data and Data Science fundamentals",
    tech: ["Data Science Academy", "ETL", "Analytics"],
  },

  // Infrastructure
  {
    id: "s11",
    name: "MikroTik",
    weight: 4,
    category: "devops",
    icon: <Network className="inline" size={16} />,
    description: "Network management and security",
    tech: ["VPN", "QoS", "Firewall", "MTCNA"],
  },
  {
    id: "s12",
    name: "Windows Server",
    weight: 4,
    category: "devops",
    icon: <Server className="inline" size={16} />,
    description: "Server administration and management",
    tech: ["Active Directory", "GPOs", "Infrastructure"],
  },

  // Tools & Platforms
  {
    id: "s13",
    name: "AI & ML",
    weight: 3,
    category: "ai",
    icon: <Bot className="inline" size={16} />,
    description: "AI and Machine Learning fundamentals",
    tech: ["Hashtag Treinamentos", "Data Science"],
  },
  {
    id: "s14",
    name: "UI/UX Design",
    weight: 3,
    category: "frontend",
    icon: <Monitor className="inline" size={16} />,
    description: "User Interface and Experience Design",
    tech: ["DIO", "CorelDRAW", "Web Design"],
  },

  // Professional Skills
  {
    id: "s15",
    name: "Technical Training",
    weight: 4,
    category: "soft",
    icon: <Users className="inline" size={16} />,
    description: "Training and documentation specialist",
    tech: ["User Training", "Technical Documentation"],
  },
  {
    id: "s16",
    name: "Process Optimization",
    weight: 4,
    category: "soft",
    icon: <Settings className="inline" size={16} />,
    description: "Yellow Belt certified, process improvement",
    tech: [],
  },
  {
    id: "s17",
    name: "ISO 9001",
    weight: 2,
    category: "soft",
    icon: <Shield className="inline" size={16} />,
    description: "Knowledge of quality standards",
    tech: [],
  },
  {
    id: "s18",
    name: "Automation",
    weight: 4,
    category: "general",
    icon: <Wrench className="inline" size={16} />,
    description: "Process and task automation",
    tech: ["Scripts", "CI/CD"],
  },
];

const categoryColors: Record<
  string,
  {
    text: string;
    bg: string;
    border: string;
    hoverBg: string;
    hoverBorder: string;
  }
> = {
  language: {
    text: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-50/80 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800/50",
    hoverBg: "hover:bg-blue-100/90 dark:hover:bg-blue-800/30",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
  },
  frontend: {
    text: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-50/80 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800/50",
    hoverBg: "hover:bg-emerald-100/90 dark:hover:bg-emerald-800/30",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-700",
  },
  backend: {
    text: "text-purple-700 dark:text-purple-300",
    bg: "bg-purple-50/80 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-800/50",
    hoverBg: "hover:bg-purple-100/90 dark:hover:bg-purple-800/30",
    hoverBorder: "hover:border-purple-300 dark:hover:border-purple-700",
  },
  database: {
    text: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-50/80 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800/50",
    hoverBg: "hover:bg-amber-100/90 dark:hover:bg-amber-800/30",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
  },
  devops: {
    text: "text-rose-700 dark:text-rose-300",
    bg: "bg-rose-50/80 dark:bg-rose-900/20",
    border: "border-rose-200 dark:border-rose-800/50",
    hoverBg: "hover:bg-rose-100/90 dark:hover:bg-rose-800/30",
    hoverBorder: "hover:border-rose-300 dark:hover:border-rose-700",
  },
  ai: {
    text: "text-violet-700 dark:text-violet-300",
    bg: "bg-violet-50/80 dark:bg-violet-900/20",
    border: "border-violet-200 dark:border-violet-800/50",
    hoverBg: "hover:bg-violet-100/90 dark:hover:bg-violet-800/30",
    hoverBorder: "hover:border-violet-300 dark:hover:border-violet-700",
  },
  soft: {
    text: "text-cyan-700 dark:text-cyan-300",
    bg: "bg-cyan-50/80 dark:bg-cyan-900/20",
    border: "border-cyan-200 dark:border-cyan-800/50",
    hoverBg: "hover:bg-cyan-100/90 dark:hover:bg-cyan-800/30",
    hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-700",
  },
  general: {
    text: "text-teal-700 dark:text-teal-300",
    bg: "bg-teal-50/80 dark:bg-teal-900/20",
    border: "border-teal-200 dark:border-teal-800/50",
    hoverBg: "hover:bg-teal-100/90 dark:hover:bg-teal-800/30",
    hoverBorder: "hover:border-teal-300 dark:hover:border-teal-700",
  },
};

const SkillsCloud = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  // Function to shuffle the array
  const shuffleArray = useCallback((array: Skill[]): Skill[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }, []);

  // Initialize skills with shuffled data
  useEffect(() => {
    setSkills(shuffleArray(skillsData));
    // Stop the initial animation after a delay
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, [shuffleArray]);

  const getSizeClass = (weight: number): string => {
    switch (weight) {
      case 5:
        return "text-xl md:text-2xl";
      case 4:
        return "text-lg md:text-xl";
      case 3:
        return "text-base md:text-lg";
      case 2:
        return "text-sm md:text-base";
      case 1:
      default:
        return "text-xs md:text-sm";
    }
  };

  // Function to reorder skills (simulate "shake")
  const handleShuffle = () => {
    setIsAnimating(true);
    setSkills(shuffleArray(skillsData));
    setHoveredSkill(null); // Clear highlight on reorder
    // Stop the animation after a delay
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white/70 to-gray-100/40 dark:from-gray-800/50 dark:to-gray-900/30 shadow-lg backdrop-blur-xs">
      {/* Shuffle Button */}
      <div className="absolute top-4 right-4 z-30">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShuffle}
          className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Reorganize skills"
        >
          <Shuffle className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Skills Cloud Container */}
      <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-4 gap-y-4 p-4 md:p-8">
        <AnimatePresence>
          {skills.map((skill, index) => {
            const colors =
              categoryColors[skill.category] || categoryColors.general;
            return (
              <motion.span
                key={`${skill.id}-${index}`} // Unique key to force re-render on shuffle
                className={`inline-flex items-center px-4 py-2 rounded-2xl font-medium transition-all duration-300 ease-out cursor-pointer border shadow-sm ${getSizeClass(
                  skill.weight
                )} ${colors.text} ${colors.bg} ${colors.border} ${
                  colors.hoverBg
                } ${colors.hoverBorder} ${
                  hoveredSkill?.id === skill.id
                    ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400 z-20 scale-110"
                    : ""
                }`}
                initial={
                  isAnimating ? { opacity: 0, scale: 0.7, y: 20 } : false
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  // Use tween for multi-step animations to avoid framer-motion error
                  x: isAnimating ? [0, (Math.random() - 0.5) * 100, 0] : 0,
                  rotate: isAnimating ? [0, Math.random() * 10 - 5, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{
                  // Use 'tween' type for animations with more than 2 keyframes
                  type: "tween",
                  duration: isAnimating ? 0.5 : 0.3,
                  // stiffness, damping, mass are not used with 'tween'
                }}
                whileHover={{
                  scale: 1.15,
                  y: -8,
                  zIndex: 20,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                }}
                onHoverStart={() => setHoveredSkill(skill)}
                onHoverEnd={() => setHoveredSkill(null)}
                onClick={() => setHoveredSkill(skill)} // Also highlight on click
                layout
              >
                {skill.icon &&
                  React.cloneElement(skill.icon, {
                    className: "inline mr-2 flex-shrink-0",
                  })}
                <span className="leading-tight">{skill.name}</span>
              </motion.span>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Detailed Skill Panel */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-xl shadow-xl z-30 pointer-events-auto border border-gray-200 dark:border-gray-700 w-[90%] max-w-md overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">{hoveredSkill.icon}</div>
                <div className="ml-3 flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                    {hoveredSkill.name}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {hoveredSkill.description}
                  </p>

                  {hoveredSkill.tech && hoveredSkill.tech.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mt-3 mb-1">
                        Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {hoveredSkill.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsCloud;
