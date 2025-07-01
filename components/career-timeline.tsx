"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Building,
  Trophy,
  Code,
  Users,
  Rocket,
  Star,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Award,
  Target,
  Zap,
  Shield,
} from "lucide-react";

interface Achievement {
  title: string;
  description: string;
  icon: any;
  color: string;
}

interface CareerItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: "work" | "education" | "project" | "achievement";
  description: string;
  responsibilities?: string[];
  achievements?: Achievement[];
  technologies?: string[];
  highlights?: string[];
  link?: string;
  logo?: string;
  color: string;
  gradient: string;
}

const timelineData: CareerItem[] = [
  {
    id: "current",
    title: "Desenvolvedor Full Stack Sênior",
    company: "TechCorp Solutions",
    location: "São Paulo, SP",
    period: "2023 - Presente",
    type: "work",
    description:
      "Liderando o desenvolvimento de aplicações web escaláveis e mentorando desenvolvedores júnior.",
    responsibilities: [
      "Arquitetura e desenvolvimento de sistemas complexos",
      "Mentoria de equipe de 5 desenvolvedores",
      "Implementação de práticas DevOps e CI/CD",
      "Code review e garantia de qualidade",
    ],
    achievements: [
      {
        title: "Redução de 40% no tempo de deploy",
        description: "Implementação de pipeline automatizado",
        icon: Rocket,
        color: "text-green-600",
      },
      {
        title: "Aumento de 60% na performance",
        description: "Otimização de queries e cache",
        icon: Zap,
        color: "text-yellow-600",
      },
      {
        title: "Equipe de alto desempenho",
        description: "Mentoria resultou em 3 promoções",
        icon: Users,
        color: "text-blue-600",
      },
    ],
    technologies: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "AWS",
      "TypeScript",
    ],
    color: "border-emerald-500",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: "prev-job",
    title: "Desenvolvedor Full Stack",
    company: "StartupXYZ",
    location: "Remote",
    period: "2021 - 2023",
    type: "work",
    description:
      "Desenvolvimento de MVP e crescimento da plataforma de 0 a 10k usuários ativos.",
    responsibilities: [
      "Desenvolvimento full-stack da plataforma principal",
      "Integração com APIs de terceiros",
      "Otimização de performance e SEO",
      "Colaboração direta com founders",
    ],
    achievements: [
      {
        title: "MVP em 3 meses",
        description: "Entrega rápida do produto mínimo viável",
        icon: Target,
        color: "text-purple-600",
      },
      {
        title: "10k usuários ativos",
        description: "Crescimento orgânico da base de usuários",
        icon: Users,
        color: "text-blue-600",
      },
    ],
    technologies: [
      "Python",
      "Django",
      "React",
      "PostgreSQL",
      "Redis",
      "Heroku",
    ],
    highlights: [
      "Primeira contratação técnica",
      "Equity de 0.5%",
      "Ambiente startup dinâmico",
    ],
    color: "border-purple-500",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    id: "education",
    title: "Bacharelado em Ciência da Computação",
    company: "Universidade Federal de São Paulo",
    location: "São Paulo, SP",
    period: "2017 - 2021",
    type: "education",
    description:
      "Formação sólida em fundamentos da computação, algoritmos e estruturas de dados.",
    achievements: [
      {
        title: "Magna Cum Laude",
        description: "Formatura com honras acadêmicas",
        icon: Award,
        color: "text-yellow-600",
      },
      {
        title: "Projeto de TCC premiado",
        description: "Melhor projeto de IA da turma",
        icon: Trophy,
        color: "text-orange-600",
      },
    ],
    technologies: [
      "Java",
      "Python",
      "C++",
      "Machine Learning",
      "Algoritmos",
      "Banco de Dados",
    ],
    highlights: [
      "Monitor de Algoritmos",
      "Iniciação Científica",
      "Hackathon Winner",
    ],
    color: "border-blue-500",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    id: "first-job",
    title: "Desenvolvedor Júnior",
    company: "WebAgency Pro",
    location: "São Paulo, SP",
    period: "2020 - 2021",
    type: "work",
    description:
      "Primeiro emprego na área, desenvolvimento de sites e sistemas web para clientes diversos.",
    responsibilities: [
      "Desenvolvimento de websites responsivos",
      "Manutenção de sistemas legados",
      "Suporte técnico a clientes",
      "Aprendizado contínuo de novas tecnologias",
    ],
    achievements: [
      {
        title: "15+ projetos entregues",
        description: "Websites e sistemas para diversos clientes",
        icon: Code,
        color: "text-green-600",
      },
      {
        title: "Cliente satisfação 98%",
        description: "Feedback positivo consistente",
        icon: Star,
        color: "text-yellow-600",
      },
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "WordPress"],
    highlights: [
      "Primeiro emprego tech",
      "Aprendizado acelerado",
      "Base sólida",
    ],
    color: "border-orange-500",
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: "project",
    title: "Projeto Open Source - DevTools",
    company: "Contribuição Independente",
    location: "GitHub",
    period: "2019 - Presente",
    type: "project",
    description:
      "Criação e manutenção de ferramentas para desenvolvedores com 2k+ stars no GitHub.",
    achievements: [
      {
        title: "2k+ GitHub Stars",
        description: "Reconhecimento da comunidade",
        icon: Star,
        color: "text-yellow-600",
      },
      {
        title: "50+ Contributors",
        description: "Comunidade ativa de colaboradores",
        icon: Users,
        color: "text-blue-600",
      },
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "CLI Tools",
      "Testing",
      "Documentation",
    ],
    highlights: [
      "Featured no GitHub",
      "Usado por 500+ devs",
      "Documentação completa",
    ],
    link: "https://github.com/seuusuario/devtools",
    color: "border-cyan-500",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: "progt-ti",
    title: "Assistente de T.I.",
    company: "PROGT LTDA",
    location: "Cosmópolis, SP",
    period: "2022 - Atual",
    type: "work",
    description:
      "Atuação em suporte técnico, administração de infraestrutura de TI e participação em projetos de software, com foco em melhoria contínua, ISO 9001 e atendimento ao usuário.",
    responsibilities: [
      "Assistência técnica e suporte ao usuário",
      "Administração de backups e monitoramento de redes",
      "Apoio à aplicação de padrões de qualidade (ISO 9001)",
      "Solução de problemas e aprimoramento de processos",
      "Colaboração em projetos de software e evolução de procedimentos",
    ],
    achievements: [
      {
        title: "Eficácia operacional",
        description:
          "Contribuição para melhoria de processos e suporte eficiente",
        icon: Users,
        color: "text-blue-600",
      },
      {
        title: "Gestão de infraestrutura",
        description: "Administração de redes e backups com foco em segurança",
        icon: Shield,
        color: "text-emerald-600",
      },
    ],
    technologies: [
      "Windows Server",
      "Redes",
      "Backup",
      "Python",
      "SQL",
      "ISO 9001",
    ],
    color: "border-cyan-500",
    gradient: "from-cyan-400 to-blue-500",
  },
];

export function CareerTimeline() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["current"]);
  const [filter, setFilter] = useState<
    "all" | "work" | "education" | "project"
  >("all");

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredData = timelineData.filter(
    (item) => filter === "all" || item.type === filter
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "work":
        return Building;
      case "education":
        return Award;
      case "project":
        return Code;
      case "achievement":
        return Trophy;
      default:
        return Building;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-emerald-500";
      case "education":
        return "bg-blue-500";
      case "project":
        return "bg-purple-500";
      case "achievement":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
          🚀 Jornada Profissional
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          Uma linha do tempo interativa da minha evolução como desenvolvedor
        </p>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { key: "all", label: "Todos", icon: Star },
            { key: "work", label: "Trabalho", icon: Building },
            { key: "education", label: "Educação", icon: Award },
            { key: "project", label: "Projetos", icon: Code },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={filter === key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(key as any)}
              className={`${
                filter === key
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                  : "border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              } transition-all duration-300`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Linha central */}
        <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-emerald-400 via-teal-400 to-cyan-400 dark:from-emerald-500 dark:via-teal-500 dark:to-cyan-500 h-full rounded-full shadow-lg" />

        <AnimatePresence>
          {filteredData.map((item, index) => {
            const isExpanded = expandedItems.includes(item.id);
            const TypeIcon = getTypeIcon(item.type);
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:flex-row`}
              >
                {/* Ícone central */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-1/2 z-10">
                  <div
                    className={`w-16 h-16 ${getTypeColor(
                      item.type
                    )} rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-900`}
                  >
                    <TypeIcon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`w-full md:w-5/12 ${
                    isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  } ml-20 md:ml-0`}
                >
                  <Card
                    className={`bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 ${item.color} hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                  >
                    {/* Header do Card */}
                    <div className={`h-2 bg-gradient-to-r ${item.gradient}`} />

                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge
                          variant="outline"
                          className={`${item.color.replace("border", "text")} ${
                            item.color
                          } bg-transparent`}
                        >
                          {item.period}
                        </Badge>
                        {item.link && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(item.link, "_blank")}
                            className="p-1 h-auto"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <CardTitle className="text-slate-800 dark:text-slate-100 text-xl font-bold mb-2">
                        {item.title}
                      </CardTitle>

                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 mb-2">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">{item.company}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-4">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>

                      <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {/* Tecnologias */}
                      {item.technologies && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Botão Expandir */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(item.id)}
                        className="w-full justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-2" />
                            Ver Menos
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </>
                        )}
                      </Button>

                      {/* Conteúdo Expandido */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 space-y-4"
                          >
                            {/* Responsabilidades */}
                            {item.responsibilities && (
                              <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  Responsabilidades
                                </h4>
                                <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                                  {item.responsibilities.map((resp, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="text-emerald-500 mt-1">
                                        •
                                      </span>
                                      <span className="text-sm">{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Conquistas */}
                            {item.achievements && (
                              <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                                  <Trophy className="h-4 w-4" />
                                  Principais Conquistas
                                </h4>
                                <div className="space-y-3">
                                  {item.achievements.map((achievement, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                                    >
                                      <div
                                        className={`${achievement.color} mt-0.5`}
                                      >
                                        <achievement.icon className="h-5 w-5" />
                                      </div>
                                      <div>
                                        <h5 className="font-medium text-slate-800 dark:text-slate-100">
                                          {achievement.title}
                                        </h5>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">
                                          {achievement.description}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Highlights */}
                            {item.highlights && (
                              <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
                                  <Star className="h-4 w-4" />
                                  Destaques
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.highlights.map((highlight, idx) => (
                                    <Badge
                                      key={idx}
                                      className={`bg-gradient-to-r ${item.gradient} text-white border-0`}
                                    >
                                      {highlight}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Estatísticas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          {
            label: "Anos de Experiência",
            value: "4+",
            icon: Calendar,
            color: "text-emerald-600",
          },
          {
            label: "Projetos Entregues",
            value: "50+",
            icon: Code,
            color: "text-blue-600",
          },
          {
            label: "Tecnologias",
            value: "15+",
            icon: Zap,
            color: "text-purple-600",
          },
          {
            label: "Equipes Lideradas",
            value: "3",
            icon: Users,
            color: "text-orange-600",
          },
        ].map((stat, index) => (
          <Card
            key={stat.label}
            className="text-center bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className={`${stat.color} mb-2`}>
                <stat.icon className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
