"use client";

import { useState } from "react";
import { motion, AnimatePresence, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SkillModal } from "./SkillModal";
import { PinContainer } from '@/components/ui/3d-pin';
import {
  Code,
  Database,
  Server,
  Globe,
  Wrench,
  Brain,
  Layout,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: any;
  description: string;
  technologies: string[];
  gradient?: string;
}

const skills: Skill[] = [
  // Frontend Development
  {
    id: "1",
    name: "Frontend Development",
    category: "Development",
    level: 90,
    icon: Layout,
    description:
      "Criação de interfaces modernas e responsivas com foco em experiência do usuário",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "HTML5/CSS3",
    ],
    gradient: "from-blue-400 via-cyan-500 to-teal-500 hover:from-teal-400 hover:via-cyan-500 hover:to-blue-500",
  },
  // Backend Development
  {
    id: "2",
    name: "Backend Development",
    category: "Development",
    level: 85,
    icon: Server,
    description: "Desenvolvimento de APIs e sistemas com Python e Node.js",
    technologies: ["Python", "Flask", "Node.js", "RESTful APIs", "GraphQL"],
    gradient: "from-emerald-400 via-green-500 to-teal-500 hover:from-teal-400 hover:via-green-500 hover:to-emerald-500",
  },
  // Database
  {
    id: "3",
    name: "Database & Analytics",
    category: "Data",
    level: 80,
    icon: Database,
    description: "Gestão de dados e análise com diferentes tecnologias",
    technologies: ["SQL", "MongoDB", "Power BI", "Data Analysis", "ETL"],
    gradient: "from-violet-400 via-purple-500 to-fuchsia-500 hover:from-fuchsia-400 hover:via-purple-500 hover:to-violet-500",
  },
  // Automation
  {
    id: "4",
    name: "Automation",
    category: "Tools",
    level: 95,
    icon: Wrench,
    description: "Automação de processos e tarefas repetitivas",
    technologies: ["Selenium", "Python Scripts", "VBA", "Process Automation"],
    gradient: "from-rose-400 via-red-500 to-orange-500 hover:from-orange-400 hover:via-red-500 hover:to-rose-500",
  },
  // Network & Infrastructure
  {
    id: "5",
    name: "Infrastructure",
    category: "Systems",
    level: 75,
    icon: Globe,
    description: "Gestão de infraestrutura e redes",
    technologies: [
      "MikroTik",
      "Windows Server",
      "Network Management",
      "Security",
    ],
    gradient: "from-pink-400 via-rose-500 to-red-500 hover:from-red-400 hover:via-rose-500 hover:to-pink-500",
  },
  // Development Tools
  {
    id: "6",
    name: "Development Tools",
    category: "Tools",
    level: 85,
    icon: Code,
    description: "Ferramentas e práticas de desenvolvimento moderno",
    technologies: ["Git", "Docker", "VS Code", "CI/CD", "Testing"],
    gradient: "from-indigo-400 via-blue-500 to-violet-500 hover:from-violet-400 hover:via-blue-500 hover:to-indigo-500",
  },
  // AI & Machine Learning
  {
    id: "7",
    name: "AI & Data Science",
    category: "Data",
    level: 70,
    icon: Bot,
    description: "Fundamentos de IA e Ciência de Dados",
    technologies: [
      "Pandas",
      "Numpy",
      "Scikit-learn",
      "Jupyter",
      "Data Analysis",
    ],
    gradient: "from-cyan-400 via-sky-500 to-blue-500 hover:from-blue-400 hover:via-sky-500 hover:to-cyan-500",
  },
  // Soft Skills
  {
    id: "8",
    name: "Professional Skills",
    category: "Soft Skills",
    level: 90,
    icon: Brain,
    description: "Habilidades profissionais e interpessoais",
    technologies: [
      "Leadership",
      "Technical Training",
      "Process Optimization",
      "Documentation",
    ],
    gradient: "from-amber-400 via-yellow-500 to-orange-500 hover:from-orange-400 hover:via-yellow-500 hover:to-amber-500",
  },
];

const categories = [
  "All",
  "Development",
  "Data",
  "Tools",
  "Systems",
  "Soft Skills",
];

const SkillsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);
      
  const handleCardClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSkill(null), 300);
  };

  return (
    <div className="w-full max-w-[90rem] mx-auto px-4 py-20 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
        Minhas Habilidades
      </h2>

      {/* Filtros de Categoria */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-6 py-2.5 rounded-full transition-all duration-500",
              "text-sm font-medium hover:scale-105",
              selectedCategory === category
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 dark:shadow-cyan-500/25 scale-105"
                : "bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 backdrop-blur-sm"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid de Habilidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-32 gap-x-16 place-items-center justify-items-center content-center max-w-7xl mx-auto p-8 w-full">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="w-full flex justify-center items-center perspective-1000 mx-auto"
            >
              <PinContainer 
                title={skill.name}
                onClick={() => handleCardClick(skill)}
                className="cursor-pointer"
              >
                <div className="flex flex-col p-6 tracking-tight text-slate-100/50 w-[20rem] h-[24rem] overflow-hidden">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      "bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10"
                    )}>
                      <skill.icon className="w-6 h-6 text-slate-100" />
                    </div>
                    <div>
                      <h3 className="!m-0 font-bold text-lg text-slate-100 tracking-tight">
                        {skill.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={cn(
                              "h-full rounded-full",
                              "bg-gradient-to-r",
                              skill.gradient
                            )}
                          />
                        </div>
                        <p className="text-sm text-slate-400 font-medium">
                          {skill.level}%
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-base !m-0 !p-0 font-normal mb-4 h-20 overflow-hidden">
                    <span className="text-slate-300 leading-relaxed line-clamp-3">
                      {skill.description}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 h-16 overflow-hidden">
                    {skill.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={cn(
                          "px-2.5 py-1 text-xs font-medium rounded-full",
                          "bg-white/10 text-slate-200",
                          "ring-1 ring-white/20 backdrop-blur-sm"
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.div 
                    className={cn(
                      "flex w-full rounded-xl mt-auto bg-gradient-to-br transition-all duration-500",
                      skill.gradient
                    )} 
                    style={{ height: "120px" }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <SkillModal 
        skill={selectedSkill}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default SkillsGrid;
