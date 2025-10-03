"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  glare?: boolean;
}

export function Card3D({ 
  children, 
  className,
  containerClassName,
  glare = true 
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate relative position
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation (max 10 degrees)
    const rotateY = (mouseX / (rect.width / 2)) * 10;
    const rotateX = -(mouseY / (rect.height / 2)) * 10;
    
    // Update glare position
    const glareX = (mouseX / rect.width) * 100 + 50;
    const glareY = (mouseY / rect.height) * 100 + 50;

    setRotateX(rotateX);
    setRotateY(rotateY);
    setScale(1.05);
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  };

  return (
    <div 
      className={cn("relative", containerClassName)}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={cn(
          "relative rounded-xl overflow-hidden bg-gradient-to-br",
          className
        )}
        animate={{
          rotateX,
          rotateY,
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
          transformOrigin: "center center",
        }}
      >
        {children}
        
        {/* Glare Effect */}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgb(255 255 255 / 0.15), transparent 25%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
