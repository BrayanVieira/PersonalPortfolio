"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Skill } from "./SkillsGrid";

interface SkillModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SkillModal({ skill, isOpen, onClose }: SkillModalProps) {
  if (!skill) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateX: 0,
              transition: {
                type: "spring",
                duration: 0.5,
                bounce: 0.3
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              rotateX: -30,
              transition: {
                duration: 0.3
              }
            }}
            style={{
              perspective: "1200px"
            }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-gradient-to-br w-[90vw] max-w-[32rem] min-h-[24rem] rounded-xl shadow-xl transform-gpu"
                 style={{
                   backgroundImage: `linear-gradient(to bottom right, ${skill.gradient?.split(' ')[1]}, ${skill.gradient?.split(' ')[3]})`
                 }}>
              <div className="relative w-full h-full p-8">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white/10">
                    <skill.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{skill.name}</h2>
                </div>

                <div className="space-y-6 text-white/90">
                  <p className="text-lg">{skill.description}</p>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tecnologias</h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-white/10 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
