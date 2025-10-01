"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    "Início",
    "Sobre",
    "Skills",
    "Carreira",
    "Certificações",
    "Projetos",
    "Contato",
  ];

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-2">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-teal-200/50 dark:border-slate-700/50"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {menuItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item
                  .toLowerCase()
                  .replace("ício", "ome")
                  .replace("carreira", "carreira")
                  .replace("certificações", "certificacoes")}`}
                className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer font-medium"
                whileHover={{ scale: 1.05 }}
                onClick={toggleMenu}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
