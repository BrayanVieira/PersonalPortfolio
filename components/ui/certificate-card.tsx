"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CertificateCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
}

export function CertificateCard({
  children,
  className,
  containerClassName,
  onClick
}: CertificateCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = (x / rect.width - 0.5) * 2;
    const centerY = (y / rect.height - 0.5) * 2;
    
    const rotateY = centerX * 15; // max 15 degrees
    const rotateX = -centerY * 15;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotation({ x: rotateX, y: rotateY });
    setGlarePosition({ x: glareX, y: glareY });
    setScale(1.05);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
    setScale(1);
  };

  return (
    <div
      className={cn("relative perspective-2000", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className={cn(
          "relative w-full rounded-xl overflow-hidden transition-shadow duration-200",
          "hover:shadow-xl dark:hover:shadow-2xl",
          className
        )}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.5,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}

        {/* Glare Effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgb(255 255 255 / 0.15), transparent 80%)`,
          }}
        />
      </motion.div>
    </div>
  );
}
