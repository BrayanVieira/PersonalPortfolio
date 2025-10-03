"use client";
import { useEffect, useRef, useState } from "react";
import SkillsGrid from "@/components/SkillsGrid";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/mobile-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { ContactForm } from "@/components/contact-form";
import { CareerTimeline } from "@/components/career-timeline";
import CertificationsGallery from "@/components/certifications-gallery";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Database,
  Globe,
  PiIcon as Python,
  ChevronDown,
  Rocket,
} from "lucide-react";
import CardSwap, { Card as CardSwapItem } from "@/components/CardSwap";

// Componente Snake Game Background - VERSÃO ÉPICA!
function SnakeGameBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Estado removido pois não é mais necessário

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w: number, h: number;
    const gridSize = 20;
    // Variáveis de jogo simplificadas
    let gameLevel = 1;

    // Partículas para efeitos especiais
    const particles: any[] = [];

    // Power-ups especiais
    const powerUps: any[] = [];
    const powerUpTypes = [
      {
        type: "speed",
        color: "gold",
        effect: "Velocidade 2x",
        duration: 5000,
        emoji: "⚡",
      },
      {
        type: "mega",
        color: "rainbow",
        effect: "Mega Crescimento",
        duration: 3000,
        emoji: "💎",
      },
      {
        type: "shield",
        color: "cyan",
        effect: "Escudo Protetor",
        duration: 8000,
        emoji: "🛡️",
      },
      {
        type: "magnet",
        color: "purple",
        effect: "Ímã de Comida",
        duration: 6000,
        emoji: "🧲",
      },
    ];

    // Múltiplas cobras com poderes especiais
    const snakes = [
      {
        body: [{ x: 10, y: 10 }],
        direction: { x: 1, y: 0 },
        colors: {
          head: [
            "rgba(34, 211, 238, 1)",
            "rgba(14, 165, 233, 0.9)",
            "rgba(59, 130, 246, 0.8)",
          ],
          body: [
            "rgba(34, 211, 238, 0.9)",
            "rgba(14, 165, 233, 0.8)",
            "rgba(59, 130, 246, 0.7)",
            "rgba(99, 102, 241, 0.5)",
          ],
        },
        powerUps: new Map(),
        alive: true,
        trail: [],
        id: "cyan",
      },
      {
        body: [{ x: 30, y: 15 }],
        direction: { x: -1, y: 0 },
        colors: {
          head: [
            "rgba(34, 197, 94, 1)",
            "rgba(22, 163, 74, 0.9)",
            "rgba(21, 128, 61, 0.8)",
          ],
          body: [
            "rgba(34, 197, 94, 0.9)",
            "rgba(22, 163, 74, 0.8)",
            "rgba(21, 128, 61, 0.7)",
            "rgba(22, 101, 52, 0.5)",
          ],
        },
        powerUps: new Map(),
        alive: true,
        trail: [],
        id: "green",
      },
      {
        body: [{ x: 20, y: 25 }],
        direction: { x: 0, y: -1 },
        colors: {
          head: [
            "rgba(168, 85, 247, 1)",
            "rgba(147, 51, 234, 0.9)",
            "rgba(126, 34, 206, 0.8)",
          ],
          body: [
            "rgba(168, 85, 247, 0.9)",
            "rgba(147, 51, 234, 0.8)",
            "rgba(126, 34, 206, 0.7)",
            "rgba(107, 33, 168, 0.5)",
          ],
        },
        powerUps: new Map(),
        score: 0,
        alive: true,
        trail: [],
        id: "purple",
      },
      {
        body: [{ x: 45, y: 35 }],
        direction: { x: 0, y: 1 },
        colors: {
          head: [
            "rgba(239, 68, 68, 1)",
            "rgba(220, 38, 38, 0.9)",
            "rgba(185, 28, 28, 0.8)",
          ],
          body: [
            "rgba(239, 68, 68, 0.9)",
            "rgba(220, 38, 38, 0.8)",
            "rgba(185, 28, 28, 0.7)",
            "rgba(153, 27, 27, 0.5)",
          ],
        },
        powerUps: new Map(),
        alive: true,
        trail: [],
        id: "red",
      },
      {
        body: [{ x: 15, y: 40 }],
        direction: { x: 1, y: 0 },
        colors: {
          head: [
            "rgba(250, 204, 21, 1)",
            "rgba(234, 179, 8, 0.9)",
            "rgba(202, 138, 4, 0.8)",
          ],
          body: [
            "rgba(250, 204, 21, 0.9)",
            "rgba(234, 179, 8, 0.8)",
            "rgba(202, 138, 4, 0.7)",
            "rgba(161, 98, 7, 0.5)",
          ],
        },
        powerUps: new Map(),
        alive: true,
        trail: [],
        id: "yellow",
      },
    ];

    // Comidas para as cobras
    const foods = [
      { x: 15, y: 15, color: "red", special: false },
      { x: 25, y: 20, color: "green", special: false },
      { x: 35, y: 10, color: "purple", value: 20, special: false },
      { x: 5, y: 30, color: "orange", value: 25, special: false },
      { x: 40, y: 25, color: "pink", value: 30, special: false },
    ];

    function resizeCanvas() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function getRandomPosition() {
      const maxX = Math.floor(w / gridSize) - 1;
      const maxY = Math.floor(h / gridSize) - 1;
      return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
      };
    }

    function createParticle(
      x: number,
      y: number,
      color: string,
      type = "explosion"
    ) {
      const particleCount = type === "explosion" ? 8 : 3;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: x * gridSize + gridSize / 2,
          y: y * gridSize + gridSize / 2,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 1,
          decay: 0.02,
          color: color,
          size: Math.random() * 4 + 2,
          type: type,
        });
      }
    }

    function createPowerUp() {
      if (powerUps.length < 2 && Math.random() < 0.003) {
        const pos = getRandomPosition();
        const powerUpType =
          powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        powerUps.push({
          ...pos,
          ...powerUpType,
          pulse: 0,
          lifetime: 15000, // 15 segundos
          created: Date.now(),
        });
      }
    }

    function applyPowerUp(snake: any, powerUp: any) {
      snake.powerUps.set(powerUp.type, {
        ...powerUp,
        startTime: Date.now(),
      });

      // Efeitos visuais
      createParticle(powerUp.x, powerUp.y, powerUp.color, "powerup");

      // Efeitos especiais imediatos
      switch (powerUp.type) {
        case "mega":
          // Crescimento instantâneo
          for (let i = 0; i < 5; i++) {
            const tail = snake.body[snake.body.length - 1];
            snake.body.push({ ...tail });
          }
          break;
        case "shield":
          // Efeito visual de escudo
          snake.shielded = true;
          break;
      }
    }

    function updatePowerUps(snake: any) {
      const now = Date.now();
      const expiredPowerUps: string[] = [];

      snake.powerUps.forEach((powerUp: any, type: string) => {
        if (now - powerUp.startTime > powerUp.duration) {
          expiredPowerUps.push(type);
          if (type === "shield") {
            snake.shielded = false;
          }
        }
      });

      expiredPowerUps.forEach((type) => {
        snake.powerUps.delete(type);
      });
    }

    function getSnakeSpeed(snake: any) {
      const baseSpeed = 180 - gameLevel * 10; // Velocidade aumenta com o nível
      return snake.powerUps.has("speed") ? baseSpeed / 2 : baseSpeed;
    }

    function findNearestFood(snake: any) {
      let nearestFood = foods[0];
      let minDistance = Number.MAX_VALUE;

      foods.forEach((food) => {
        let distance =
          Math.abs(snake.body[0].x - food.x) +
          Math.abs(snake.body[0].y - food.y);

        // Ímã de comida reduz distância percebida
        if (snake.powerUps.has("magnet")) {
          distance *= 0.3;
        }

        if (distance < minDistance) {
          minDistance = distance;
          nearestFood = food;
        }
      });

      return nearestFood;
    }

    function changeDirection(snake: any) {
      if (!snake.alive) return;

      const head = snake.body[0];
      const targetFood = findNearestFood(snake);
      const dx = targetFood.x - head.x;
      const dy = targetFood.y - head.y;

      let newDirection = { ...snake.direction };

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          newDirection = { x: 1, y: 0 };
        } else if (dx < 0) {
          newDirection = { x: -1, y: 0 };
        }
      } else {
        if (dy > 0) {
          newDirection = { x: 0, y: 1 };
        } else if (dy < 0) {
          newDirection = { x: 0, y: -1 };
        }
      }

      const nextHead = {
        x: head.x + newDirection.x,
        y: head.y + newDirection.y,
      };

      // Verificar colisão com próprio corpo
      const bodyToCheck = snake.body.length > 1 ? snake.body.slice(0, -1) : [];
      const wouldCollideWithSelf = bodyToCheck.some(
        (segment: any) => segment.x === nextHead.x && segment.y === nextHead.y
      );

      // Verificar colisão com outras cobras
      const collidingSnake = snakes.find((otherSnake: any) => {
        if (otherSnake === snake || !otherSnake.alive) return false;
        return otherSnake.body.some(
          (segment: any) => segment.x === nextHead.x && segment.y === nextHead.y
        );
      });

      if (collidingSnake && !snake.powerUps.has("shield")) {
        // COBRA MORRE! (a menos que tenha escudo)
        snake.alive = false;
        createParticle(head.x, head.y, "red", "death");

        // Respawn após 3 segundos
        setTimeout(() => {
          const newPos = getRandomPosition();
          snake.body = [newPos];
          snake.direction = { x: 1, y: 0 };
          snake.alive = true;
          snake.powerUps.clear();
        }, 3000);
        return;
      }

      if (!wouldCollideWithSelf) {
        snake.direction = newDirection;
      } else {
        // Tentar direções alternativas
        const alternatives = [
          { x: 1, y: 0 },
          { x: -1, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: -1 },
        ].filter((dir) => {
          const testHead = {
            x: head.x + dir.x,
            y: head.y + dir.y,
          };
          const selfCollision = bodyToCheck.some(
            (segment: any) =>
              segment.x === testHead.x && segment.y === testHead.y
          );
          const otherCollision = snakes.some((otherSnake: any) => {
            if (otherSnake === snake || !otherSnake.alive) return false;
            return otherSnake.body.some(
              (segment: any) =>
                segment.x === testHead.x && segment.y === testHead.y
            );
          });
          return !selfCollision && !otherCollision;
        });

        if (alternatives.length > 0) {
          snake.direction = alternatives.reduce((best: any, current: any) => {
            const bestDistance =
              Math.abs(head.x + best.x - targetFood.x) +
              Math.abs(head.y + best.y - targetFood.y);
            const currentDistance =
              Math.abs(head.x + current.x - targetFood.x) +
              Math.abs(head.y + current.y - targetFood.y);
            return currentDistance < bestDistance ? current : best;
          });
        }
      }
    }

    function moveSnake(snake: any) {
      if (!snake.alive) return;

      const head = { ...snake.body[0] };
      head.x += snake.direction.x;
      head.y += snake.direction.y;

      const maxX = Math.floor(w / gridSize) - 1;
      const maxY = Math.floor(h / gridSize) - 1;

      // Verificar limites
      if (head.x < 0 || head.x > maxX || head.y < 0 || head.y > maxY) {
        head.x = snake.body[0].x;
        head.y = snake.body[0].y;

        if (snake.body[0].x <= 2) {
          snake.direction = { x: 1, y: 0 };
        } else if (snake.body[0].x >= maxX - 2) {
          snake.direction = { x: -1, y: 0 };
        } else if (snake.body[0].y <= 2) {
          snake.direction = { x: 0, y: 1 };
        } else if (snake.body[0].y >= maxY - 2) {
          snake.direction = { x: 0, y: -1 };
        }

        head.x = snake.body[0].x + snake.direction.x;
        head.y = snake.body[0].y + snake.direction.y;

        if (head.x < 0 || head.x > maxX || head.y < 0 || head.y > maxY) {
          return;
        }
      }

      // Adicionar à trilha para efeitos visuais
      snake.trail.push({ x: head.x, y: head.y, life: 1 });
      if (snake.trail.length > 10) {
        snake.trail.shift();
      }

      snake.body.unshift(head);

      // Verificar colisão com comida
      const eatenFoodIndex = foods.findIndex(
        (food) => food.x === head.x && food.y === head.y
      );
      if (eatenFoodIndex !== -1) {
        const eatenFood = foods[eatenFoodIndex];

        // Efeitos visuais quando come a comida
        createParticle(eatenFood.x, eatenFood.y, eatenFood.color, "food");

        foods.splice(eatenFoodIndex, 1);
        const newFood = getRandomPosition();
        const foodColors = [
          "red",
          "green",
          "purple",
          "orange",
          "pink",
          "blue",
          "yellow",
        ];
        const color = foodColors[Math.floor(Math.random() * foodColors.length)];
        const value = Math.floor(Math.random() * 20) + 10;
        foods.push({ ...newFood, color, value, special: Math.random() < 0.1 });
      } else {
        snake.body.pop();
      }

      // Verificar colisão com power-ups
      const eatenPowerUpIndex = powerUps.findIndex(
        (powerUp) => powerUp.x === head.x && powerUp.y === head.y
      );
      if (eatenPowerUpIndex !== -1) {
        const powerUp = powerUps[eatenPowerUpIndex];
        applyPowerUp(snake, powerUp);
        powerUps.splice(eatenPowerUpIndex, 1);
      }

      // Atualizar power-ups
      updatePowerUps(snake);
    }

    function drawParticles() {
      particles.forEach((particle, index) => {
        if (particle.life <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = particle.life;

        if (particle.type === "explosion") {
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === "powerup") {
          ctx.fillStyle = "gold";
          ctx.font = `${particle.size * 4}px Arial`;
          ctx.textAlign = "center";
          ctx.fillText("✨", particle.x, particle.y);
        } else if (particle.type === "death") {
          ctx.fillStyle = "red";
          ctx.font = `${particle.size * 6}px Arial`;
          ctx.textAlign = "center";
          ctx.fillText("💥", particle.x, particle.y);
        } else if (particle.type === "levelup") {
          ctx.fillStyle = "gold";
          ctx.font = `${particle.size * 8}px Arial`;
          ctx.textAlign = "center";
          ctx.fillText("🎉", particle.x, particle.y);
        }

        ctx.restore();

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
      });
    }

    function drawPowerUps() {
      const now = Date.now();

      powerUps.forEach((powerUp, index) => {
        if (now - powerUp.created > powerUp.lifetime) {
          powerUps.splice(index, 1);
          return;
        }

        const x = powerUp.x * gridSize + gridSize / 2;
        const y = powerUp.y * gridSize + gridSize / 2;

        powerUp.pulse += 0.1;
        const pulseSize = 1 + Math.sin(powerUp.pulse) * 0.3;

        // Sombra
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.beginPath();
        ctx.arc(x + 2, y + 2, 12 * pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Power-up principal
        if (powerUp.color === "rainbow") {
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
          gradient.addColorStop(0, "rgba(255, 0, 255, 0.9)");
          gradient.addColorStop(0.5, "rgba(0, 255, 255, 0.9)");
          gradient.addColorStop(1, "rgba(255, 255, 0, 0.9)");
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = powerUp.color;
        }

        ctx.beginPath();
        ctx.arc(x, y, 12 * pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Emoji
        ctx.font = `${20 * pulseSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(powerUp.emoji, x, y);

        // Brilho
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(x - 3, y - 3, 3 * pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawSnake(snake: any) {
      if (!snake.alive || snake.body.length === 0) return;

      const maxX = Math.floor(w / gridSize);
      const maxY = Math.floor(h / gridSize);

      const validBody = snake.body.filter(
        (segment: any) =>
          segment.x >= 0 &&
          segment.x < maxX &&
          segment.y >= 0 &&
          segment.y < maxY
      );

      if (validBody.length === 0) return;

      // Desenhar trilha
      snake.trail.forEach((trailPoint: any, index: number) => {
        if (trailPoint.life > 0) {
          ctx.save();
          ctx.globalAlpha = trailPoint.life * 0.3;
          ctx.fillStyle = snake.colors.body[0];
          ctx.beginPath();
          ctx.arc(
            trailPoint.x * gridSize + gridSize / 2,
            trailPoint.y * gridSize + gridSize / 2,
            3,
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.restore();
          trailPoint.life -= 0.1;
        }
      });

      const points = validBody.map((segment: any) => ({
        x: segment.x * gridSize + gridSize / 2,
        y: segment.y * gridSize + gridSize / 2,
      }));

      if (points.length < 2) {
        const head = points[0];
        drawSnakeHead(head.x, head.y, snake.colors.head, snake);
        return;
      }

      // Efeito de escudo
      if (snake.powerUps.has("shield")) {
        ctx.strokeStyle = "rgba(0, 255, 255, 0.5)";
        ctx.lineWidth = 20;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }

      // Sombra do corpo
      ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(points[0].x + 1, points[0].y + 1);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x + 1, points[i].y + 1);
      }
      ctx.stroke();

      // Corpo principal
      const gradient = ctx.createLinearGradient(
        points[0].x,
        points[0].y,
        points[points.length - 1].x,
        points[points.length - 1].y
      );
      snake.colors.body.forEach((color: string, index: number) => {
        gradient.addColorStop(index / (snake.colors.body.length - 1), color);
      });

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      // Borda interna
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      // Cabeça especial
      const head = points[0];
      drawSnakeHead(head.x, head.y, snake.colors.head, snake);
    }

    function drawSnakeHead(
      headX: number,
      headY: number,
      colors: string[],
      snake: any
    ) {
      // Sombra da cabeça
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.beginPath();
      ctx.arc(headX + 1, headY + 1, 8, 0, Math.PI * 2);
      ctx.fill();

      // Cabeça principal
      const headGradient = ctx.createRadialGradient(
        headX - 2,
        headY - 2,
        0,
        headX,
        headY,
        8
      );
      colors.forEach((color, index) => {
        headGradient.addColorStop(index / (colors.length - 1), color);
      });

      ctx.fillStyle = headGradient;
      ctx.beginPath();
      ctx.arc(headX, headY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Efeito power-up na cabeça
      if (snake.powerUps.has("speed")) {
        ctx.strokeStyle = "gold";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Borda da cabeça
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Olhos
      const eyeOffset = 3;
      const eyeSize = 2;

      // Olho esquerdo
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.beginPath();
      ctx.arc(headX - eyeOffset, headY - 2, eyeSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.beginPath();
      ctx.arc(headX - eyeOffset, headY - 2, eyeSize - 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Olho direito
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.beginPath();
      ctx.arc(headX + eyeOffset, headY - 2, eyeSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.beginPath();
      ctx.arc(headX + eyeOffset, headY - 2, eyeSize - 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Brilho nos olhos
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(headX - eyeOffset - 0.5, headY - 2.5, 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(headX + eyeOffset - 0.5, headY - 2.5, 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawFood(food: any) {
      const appleX = food.x * gridSize + gridSize / 2;
      const appleY = food.y * gridSize + gridSize / 2;
      const appleRadius = gridSize / 3;

      if (
        food.x < 0 ||
        food.x >= Math.floor(w / gridSize) ||
        food.y < 0 ||
        food.y >= Math.floor(h / gridSize)
      ) {
        return;
      }

      // Comida especial tem brilho
      if (food.special) {
        ctx.save();
        ctx.shadowColor = food.color;
        ctx.shadowBlur = 10;
      }

      const colorMap: any = {
        red: [
          "rgba(248, 113, 113, 0.9)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(185, 28, 28, 0.7)",
        ],
        green: [
          "rgba(134, 239, 172, 0.9)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(21, 128, 61, 0.7)",
        ],
        purple: [
          "rgba(196, 181, 253, 0.9)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(126, 34, 206, 0.7)",
        ],
        orange: [
          "rgba(251, 146, 60, 0.9)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(194, 65, 12, 0.7)",
        ],
        pink: [
          "rgba(244, 114, 182, 0.9)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(190, 24, 93, 0.7)",
        ],
        blue: [
          "rgba(147, 197, 253, 0.9)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(29, 78, 216, 0.7)",
        ],
        yellow: [
          "rgba(254, 240, 138, 0.9)",
          "rgba(250, 204, 21, 0.8)",
          "rgba(161, 98, 7, 0.7)",
        ],
      };

      const colors = colorMap[food.color] || colorMap.red;

      // Sombra da maçã
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.beginPath();
      ctx.arc(appleX + 1, appleY + 2, appleRadius, 0, Math.PI * 2);
      ctx.fill();

      // Corpo da maçã
      const appleGradient = ctx.createRadialGradient(
        appleX - 2,
        appleY - 2,
        0,
        appleX,
        appleY,
        appleRadius
      );
      colors.forEach((color: string, index: number) => {
        appleGradient.addColorStop(index / (colors.length - 1), color);
      });

      ctx.fillStyle = appleGradient;
      ctx.beginPath();
      ctx.arc(appleX, appleY, appleRadius, 0, Math.PI * 2);
      ctx.fill();

      // Valor da comida
      if (food.value > 15) {
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(food.value.toString(), appleX, appleY + 3);
      }

      if (food.special) {
        ctx.restore();
      }

      // Folha
      ctx.fillStyle = "rgba(34, 197, 94, 0.8)";
      ctx.beginPath();
      ctx.ellipse(
        appleX + 1,
        appleY - appleRadius + 1,
        2,
        4,
        Math.PI / 4,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Brilho da maçã
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.beginPath();
      ctx.arc(appleX - 2, appleY - 2, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    function draw() {
      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark
        ? "rgba(15, 23, 42, 0.03)"
        : "rgba(15, 23, 42, 0.02)";
      ctx.fillRect(0, 0, w, h);

      // Desenhar elementos do jogo
      snakes.forEach((snake) => {
        drawSnake(snake);
      });

      foods.forEach((food) => {
        drawFood(food);
      });

      drawPowerUps();
      drawParticles();
    }

    let gameLoop: number;
    let lastTime = 0;
    let lastPowerUpCheck = 0;

    function animate(currentTime: number) {
      // Criar power-ups periodicamente
      if (currentTime - lastPowerUpCheck >= 1000) {
        createPowerUp();
        lastPowerUpCheck = currentTime;
      }

      // Mover cobras com velocidades diferentes
      snakes.forEach((snake) => {
        const speed = getSnakeSpeed(snake);
        if (currentTime - lastTime >= speed) {
          changeDirection(snake);
          moveSnake(snake);
        }
      });

      if (currentTime - lastTime >= 180) {
        lastTime = currentTime;
      }

      resizeCanvas();
      draw();
      gameLoop = requestAnimationFrame(animate);
    }

    // Inicialização
    resizeCanvas();
    snakes.forEach((snake) => {
      const pos = getRandomPosition();
      snake.body = [pos];
    });

    foods.forEach((food) => {
      const pos = getRandomPosition();
      food.x = pos.x;
      food.y = pos.y;
    });

    gameLoop = requestAnimationFrame(animate);

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(gameLoop);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          width: "100vw",
          height: "100vh",
          background: "transparent",
        }}
      />
    </>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const skills = [
    {
      name: "Python",
      icon: Python,
      description: "Automação, Web, IA, Python Impressionador",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      borderColor: "border-emerald-300 dark:border-emerald-600",
    },
    {
      name: "Web Development",
      icon: Globe,
      description: "HTML, CSS, JavaScript, React, Next.js",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
      borderColor: "border-blue-300 dark:border-blue-600",
    },
    {
      name: "Banco de Dados",
      icon: Database,
      description: "SQL, PostgreSQL, MongoDB",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-gradient-to-br from-purple-400 to-purple-600",
      borderColor: "border-purple-300 dark:border-purple-600",
    },
    {
      name: "Infraestrutura & Suporte",
      icon: Rocket,
      description: "Gestão de TI, Redes, Suporte Técnico, ISO 9001",
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-gradient-to-br from-pink-400 to-pink-600",
      borderColor: "border-pink-300 dark:border-pink-600",
    },
  ];

  const projects = [
    {
      title: "Seu Projeto Principal",
      description:
        "Descrição detalhada do seu projeto mais importante e impactante.",
      tech: ["Python", "React", "PostgreSQL", "Docker"],
      image: "/placeholder.svg?height=200&width=350",
      github: "https://github.com/seuusuario/projeto1",
      demo: "https://seuprojeto1.com",
      gradient: "from-emerald-400 to-blue-500",
    },
    {
      title: "Segundo Projeto",
      description:
        "Outro projeto relevante que demonstra suas habilidades técnicas.",
      tech: ["Node.js", "MongoDB", "Express", "React"],
      image: "/placeholder.svg?height=200&width=350",
      github: "https://github.com/seuusuario/projeto2",
      demo: "https://seuprojeto2.com",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      title: "Terceiro Projeto",
      description:
        "Projeto que mostra sua versatilidade e conhecimento em diferentes tecnologias.",
      tech: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
      image: "/placeholder.svg?height=200&width=350",
      github: "https://github.com/seuusuario/projeto3",
      demo: "https://seuprojeto3.com",
      gradient: "from-orange-400 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-800 dark:text-slate-100 relative transition-colors duration-500">
      {/* Snake Game Background */}
      <SnakeGameBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-teal-200/50 dark:border-slate-700/50 transition-colors duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent"
            >
              Portfolio 🐍🐍🐍
            </motion.div>
            <div className="hidden md:flex space-x-8 items-center">
              {[
                "Início",
                "Sobre",
                "Skills",
                "Carreira",
                "Certificações",
                "Projetos",
                "Contato",
              ].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item
                    .toLowerCase()
                    .replace("ício", "ome")
                    .replace("carreira", "carreira")
                    .replace("certificações", "certificacoes")}`}
                  className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
              <ThemeToggle />
            </div>
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative z-20"
      >
        <motion.div
          style={{ y }}
          className="text-center max-w-4xl mx-auto px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 text-sm text-teal-600 dark:text-teal-400 font-medium">
              🐍💥 Desenvolvedor Full Stack | Python & Web Development
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 dark:from-teal-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                Brayan Gonçalves Vieira
              </span>
              <span className="block text-3xl md:text-4xl bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mt-2">
                Python • React • Node.js
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Desenvolvedor apaixonado por criar soluções inovadoras e
              experiências digitais excepcionais
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("projetos")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver Projetos
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-teal-300 dark:border-teal-600 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
              onClick={() =>
                document
                  .getElementById("contato")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Mail className="mr-2 h-4 w-4" />
              Contato
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <ChevronDown className="h-6 w-6 text-teal-400" />
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="sobre"
        className="py-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm relative z-20 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row-reverse items-center md:items-center gap-10 max-w-5xl mx-auto text-center md:text-left"
          >
            <img
              src="/profile.jpg"
              alt="Foto de perfil"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-lg border-4 border-white object-cover mt-6 md:mt-0 md:ml-auto"
            />
            <div>
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Sobre Mim
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Profissional de Tecnologia da Informação com mais de 3 anos de
                experiência em desenvolvimento full-stack, integração de
                sistemas e infraestrutura corporativa. Possuo uma sólida base em
                suporte técnico e gestão de TI, com foco em performance,
                automação e entrega de valor para o negócio.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Minha trajetória é marcada pelo aprimoramento contínuo de
                habilidades técnicas, visando oferecer soluções inovadoras e
                eficientes. Com experiência em desenvolvimento de APIs RESTful,
                automação de processos, criação de dashboards e gestão de
                infraestrutura, busco integrar equipes multidisciplinares e
                contribuir com soluções tecnológicas que atendam às necessidades
                de negócios dinâmicos e desafiadores.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-20">
        <div className="container mx-auto px-6">
          {/* Título da Seção */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Habilidades
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Minhas principais competências técnicas e profissionais.
            </p>
          </motion.div>

          {/* Grid de Habilidades com Efeito 3D */}
          <div className="mb-16">
            <SkillsGrid />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <Card
                  className={`bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 ${skill.borderColor} hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-teal-500/10 transition-all duration-300 h-full overflow-hidden`}
                >
                  <div className={`h-2 ${skill.bgColor}`} />
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 ${skill.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <skill.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-slate-800 dark:text-slate-100 text-lg font-bold">
                      {skill.name}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                      {skill.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Timeline Section */}
      <section
        id="carreira"
        className="py-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm relative z-20 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
          <CareerTimeline />
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certificacoes" className="py-20 relative z-20">
        <div className="container mx-auto px-6">
          <CertificationsGallery />
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projetos"
        className="py-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm relative z-20 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Projetos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-white/50 dark:border-slate-700/50 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden h-full">
                  <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20`}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-slate-800 dark:text-slate-100 font-bold">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900/50 dark:to-cyan-900/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-teal-300 dark:border-teal-600 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 flex-1 bg-transparent"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Código
                      </Button>
                      <Button
                        size="sm"
                        className={`bg-gradient-to-r ${project.gradient} text-white flex-1 hover:shadow-lg`}
                        onClick={() => window.open(project.demo, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 relative z-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
              Vamos Conversar?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
              Interessado em trabalhar juntos? Preencha o formulário abaixo ou
              entre em contato diretamente.
              <br />
            </p>
          </motion.div>

          {/* Formulário de Contato */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>

          {/* Links de contato direto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <motion.a
              href="https://www.linkedin.com/in/brayan-vieira-1037362b7/"
              whileHover={{ scale: 1.05 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-teal-300 dark:border-teal-600 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </motion.a>

            <motion.a
              href="https://github.com/BrayanVieira"
              whileHover={{ scale: 1.05 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-cyan-300 dark:border-cyan-600 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-teal-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm relative z-20 transition-colors duration-300">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            © 2024 Portfolio. Desenvolvido com muito café e madrugadas em claro.
          </p>
        </div>
      </footer>
    </div>
  );
}
