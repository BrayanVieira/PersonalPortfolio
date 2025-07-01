"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Award,
  Calendar,
  ExternalLink,
  Search,
  Star,
  CheckCircle,
  Clock,
  Building,
  Code,
  Database,
  Globe,
  Shield,
  Target,
  Users,
  X,
} from "lucide-react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verificationUrl?: string;
  description: string;
  skills: string[];
  category:
    | "cloud"
    | "programming"
    | "database"
    | "security"
    | "management"
    | "design";
  level: "beginner" | "intermediate" | "advanced" | "expert";
  image: string;
  status: "active" | "expired" | "pending";
  score?: number;
  hours?: number;
  badge?: string;
}

const certificationsData: Certification[] = [
  {
    id: "aws-solutions-architect",
    title: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    issueDate: "2023-08-15",
    expiryDate: "2026-08-15",
    credentialId: "AWS-ASA-2023-001234",
    verificationUrl: "https://aws.amazon.com/verification/AWS-ASA-2023-001234",
    description:
      "Certificação que valida expertise em design e deploy de sistemas escaláveis na AWS.",
    skills: ["AWS", "Cloud Architecture", "EC2", "S3", "RDS", "Lambda"],
    category: "cloud",
    level: "intermediate",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    score: 850,
    hours: 120,
    badge: "🏆",
  },
  {
    id: "react-advanced",
    title: "Advanced React Development",
    issuer: "Meta (Facebook)",
    issueDate: "2023-06-20",
    credentialId: "META-REACT-2023-5678",
    verificationUrl: "https://coursera.org/verify/META-REACT-2023-5678",
    description:
      "Curso avançado cobrindo hooks, context, performance optimization e testing em React.",
    skills: ["React", "Hooks", "Context API", "Testing", "Performance"],
    category: "programming",
    level: "advanced",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    hours: 80,
    badge: "⚛️",
  },
  {
    id: "mongodb-developer",
    title: "MongoDB Certified Developer Associate",
    issuer: "MongoDB University",
    issueDate: "2023-04-10",
    expiryDate: "2026-04-10",
    credentialId: "MONGO-DEV-2023-9012",
    verificationUrl:
      "https://university.mongodb.com/verify/MONGO-DEV-2023-9012",
    description:
      "Certificação em desenvolvimento de aplicações usando MongoDB, agregações e indexação.",
    skills: ["MongoDB", "NoSQL", "Aggregation", "Indexing", "Sharding"],
    category: "database",
    level: "intermediate",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    score: 780,
    hours: 60,
    badge: "🍃",
  },
  {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    issuer: "IBM",
    issueDate: "2023-02-28",
    credentialId: "IBM-CYBER-2023-3456",
    verificationUrl: "https://ibm.com/verify/IBM-CYBER-2023-3456",
    description:
      "Fundamentos de segurança cibernética, incluindo threat analysis e incident response.",
    skills: [
      "Security",
      "Threat Analysis",
      "Incident Response",
      "Risk Management",
    ],
    category: "security",
    level: "beginner",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    hours: 40,
    badge: "🛡️",
  },
  {
    id: "scrum-master",
    title: "Certified ScrumMaster (CSM)",
    issuer: "Scrum Alliance",
    issueDate: "2022-11-15",
    expiryDate: "2024-11-15",
    credentialId: "SA-CSM-2022-7890",
    verificationUrl: "https://scrumalliance.org/verify/SA-CSM-2022-7890",
    description:
      "Certificação em metodologias ágeis e liderança de equipes Scrum.",
    skills: ["Scrum", "Agile", "Team Leadership", "Project Management"],
    category: "management",
    level: "intermediate",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    hours: 16,
    badge: "🎯",
  },
  {
    id: "ux-design",
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    issueDate: "2022-09-30",
    credentialId: "GOOGLE-UX-2022-1122",
    verificationUrl: "https://coursera.org/verify/GOOGLE-UX-2022-1122",
    description:
      "Programa completo de UX Design cobrindo research, wireframing, prototyping e testing.",
    skills: [
      "UX Design",
      "User Research",
      "Prototyping",
      "Figma",
      "Usability Testing",
    ],
    category: "design",
    level: "intermediate",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    hours: 200,
    badge: "🎨",
  },
  {
    id: "python-advanced",
    title: "Python for Data Science",
    issuer: "DataCamp",
    issueDate: "2022-07-12",
    credentialId: "DC-PYTHON-2022-3344",
    description:
      "Curso avançado de Python focado em análise de dados, pandas, numpy e machine learning.",
    skills: ["Python", "Pandas", "NumPy", "Machine Learning", "Data Analysis"],
    category: "programming",
    level: "advanced",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    hours: 100,
    badge: "🐍",
  },
  {
    id: "docker-kubernetes",
    title: "Docker & Kubernetes Certification",
    issuer: "Linux Foundation",
    issueDate: "2022-05-20",
    expiryDate: "2025-05-20",
    credentialId: "LF-DK-2022-5566",
    verificationUrl:
      "https://training.linuxfoundation.org/verify/LF-DK-2022-5566",
    description:
      "Certificação em containerização com Docker e orquestração com Kubernetes.",
    skills: ["Docker", "Kubernetes", "DevOps", "Container Orchestration"],
    category: "cloud",
    level: "advanced",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    score: 920,
    hours: 150,
    badge: "🐳",
  },
  {
    id: "ads-cruzeiro-sul",
    title: "Análise e Desenvolvimento de Sistemas",
    issuer: "Cruzeiro do Sul",
    issueDate: "2022",
    expiryDate: "2025",
    credentialId: "",
    description: "Graduação em Análise e Desenvolvimento de Sistemas.",
    skills: [
      "Desenvolvimento de Software",
      "Banco de Dados",
      "Algoritmos",
      "Projetos de TI",
    ],
    category: "programming",
    level: "advanced",
    image: "/placeholder.svg",
    status: "active",
  },
  {
    id: "python-hashtag",
    title: "Python Impressionador",
    issuer: "HashTag Treinamentos",
    issueDate: "2023",
    credentialId: "",
    description: "Curso de Python Impressionador.",
    skills: ["Python", "Automação", "Web", "IA"],
    category: "programming",
    level: "intermediate",
    image: "/placeholder.svg",
    status: "active",
  },
  {
    id: "htmlcss-hashtag",
    title: "HTML & CSS",
    issuer: "HashTag Treinamentos",
    issueDate: "2023",
    credentialId: "",
    description: "Curso de HTML & CSS.",
    skills: ["HTML", "CSS", "Web"],
    category: "programming",
    level: "beginner",
    image: "/placeholder.svg",
    status: "active",
  },
  {
    id: "vba-hashtag",
    title: "VBA",
    issuer: "HashTag Treinamentos",
    issueDate: "2023",
    credentialId: "",
    description: "Curso de VBA.",
    skills: ["VBA", "Automação"],
    category: "programming",
    level: "beginner",
    image: "/placeholder.svg",
    status: "active",
  },
  {
    id: "ia-hashtag",
    title: "Inteligência Artificial",
    issuer: "HashTag Treinamentos",
    issueDate: "2023",
    credentialId: "",
    description: "Curso de Inteligência Artificial.",
    skills: ["IA", "Python"],
    category: "programming",
    level: "beginner",
    image: "/placeholder.svg",
    status: "active",
  },
  {
    id: "javascript-hashtag",
    title: "JavaScript",
    issuer: "HashTag Treinamentos",
    issueDate: "2024",
    credentialId: "",
    description: "Curso de JavaScript.",
    skills: ["JavaScript", "Web"],
    category: "programming",
    level: "beginner",
    image: "/placeholder.svg",
    status: "active",
  },
  {
    id: "sql-hashtag",
    title: "SQL",
    issuer: "HashTag Treinamentos",
    issueDate: "2024",
    credentialId: "",
    description: "Curso de SQL.",
    skills: ["SQL", "Banco de Dados"],
    category: "database",
    level: "beginner",
    image: "/placeholder.svg",
    status: "active",
  },
  {
    id: "corel-udemy",
    title: "Design Gráfico com Corel Draw",
    issuer: "Udemy",
    issueDate: "2022",
    credentialId: "",
    description: "Curso de Design Gráfico com Corel Draw.",
    skills: ["Design Gráfico", "Corel Draw"],
    category: "design",
    level: "beginner",
    image: "/placeholder.svg",
    status: "active",
  },
  {
    id: "desenho-udemy",
    title: "Leitura e Interpretação de Desenho Mecânico",
    issuer: "Udemy",
    issueDate: "2022",
    credentialId: "",
    description: "Curso de Leitura e Interpretação de Desenho Mecânico.",
    skills: ["Desenho Mecânico"],
    category: "design",
    level: "beginner",
    image: "/placeholder.svg",
    status: "active",
  },
  {
    id: "bigdata-dsa",
    title: "Big Data Fundamentos",
    issuer: "Data Science Academy",
    issueDate: "2022",
    credentialId: "",
    description: "Curso de Big Data Fundamentos.",
    skills: ["Big Data", "Dados"],
    category: "database",
    level: "beginner",
    image: "/placeholder.svg",
    status: "active",
  },
  {
    id: "ciencia-dados-dsa",
    title: "Introdução a Ciência de Dados",
    issuer: "Data Science Academy",
    issueDate: "2022",
    credentialId: "",
    description: "Curso de Introdução a Ciência de Dados.",
    skills: ["Ciência de Dados", "Python"],
    category: "database",
    level: "beginner",
    image: "/placeholder.svg",
    status: "active",
  },
  {
    id: "uiux-dio",
    title: "Introdução UI/UX",
    issuer: "DIO",
    issueDate: "2023",
    credentialId: "",
    description: "Curso de Introdução UI/UX.",
    skills: ["UI/UX", "Design"],
    category: "design",
    level: "beginner",
    image: "/placeholder.svg",
    status: "active",
  },
  {
    id: "ingles-cna",
    title: "Inglês Avançado (Fluente)",
    issuer: "CNA",
    issueDate: "2024",
    credentialId: "",
    description: "Curso de Inglês Avançado (Fluente).",
    skills: ["Inglês", "Comunicação"],
    category: "management",
    level: "advanced",
    image: "/placeholder.svg",
    status: "active",
  },
];

export function CertificationsGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const categories = [
    {
      key: "all",
      label: "Todas",
      icon: Star,
      count: certificationsData.length,
    },
    {
      key: "cloud",
      label: "Cloud",
      icon: Globe,
      count: certificationsData.filter((c) => c.category === "cloud").length,
    },
    {
      key: "programming",
      label: "Programação",
      icon: Code,
      count: certificationsData.filter((c) => c.category === "programming")
        .length,
    },
    {
      key: "database",
      label: "Database",
      icon: Database,
      count: certificationsData.filter((c) => c.category === "database").length,
    },
    {
      key: "security",
      label: "Segurança",
      icon: Shield,
      count: certificationsData.filter((c) => c.category === "security").length,
    },
    {
      key: "management",
      label: "Gestão",
      icon: Users,
      count: certificationsData.filter((c) => c.category === "management")
        .length,
    },
    {
      key: "design",
      label: "Design",
      icon: Target,
      count: certificationsData.filter((c) => c.category === "design").length,
    },
  ];

  const levels = [
    { key: "all", label: "Todos os Níveis" },
    { key: "beginner", label: "Iniciante" },
    { key: "intermediate", label: "Intermediário" },
    { key: "advanced", label: "Avançado" },
    { key: "expert", label: "Expert" },
  ];

  const filteredCertifications = certificationsData.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || cert.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || cert.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cloud":
        return Globe;
      case "programming":
        return Code;
      case "database":
        return Database;
      case "security":
        return Shield;
      case "management":
        return Users;
      case "design":
        return Target;
      default:
        return Award;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "cloud":
        return "from-blue-400 to-cyan-500";
      case "programming":
        return "from-green-400 to-emerald-500";
      case "database":
        return "from-purple-400 to-violet-500";
      case "security":
        return "from-red-400 to-rose-500";
      case "management":
        return "from-orange-400 to-amber-500";
      case "design":
        return "from-pink-400 to-rose-500";
      default:
        return "from-gray-400 to-slate-500";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "intermediate":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20";
      case "advanced":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900/20";
      case "expert":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "expired":
        return <Clock className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const totalHours = certificationsData.reduce(
    (sum, cert) => sum + (cert.hours || 0),
    0
  );
  const activeCerts = certificationsData.filter(
    (cert) => cert.status === "active"
  ).length;

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          🏆 Certificações & Conquistas
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          Minha jornada de aprendizado contínuo e desenvolvimento profissional
        </p>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Certificações Ativas",
              value: activeCerts,
              icon: Award,
              color: "text-green-600",
            },
            {
              label: "Horas de Estudo",
              value: `${totalHours}h`,
              icon: Clock,
              color: "text-blue-600",
            },
            {
              label: "Áreas de Expertise",
              value: categories.length - 1,
              icon: Target,
              color: "text-purple-600",
            },
            {
              label: "Fornecedores",
              value: new Set(certificationsData.map((c) => c.issuer)).size,
              icon: Building,
              color: "text-orange-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className={`${stat.color} mb-2`}>
                    <stat.icon className="h-6 w-6 mx-auto" />
                  </div>
                  <div className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="mb-8 space-y-4">
        {/* Busca */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar certificações, tecnologias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
          />
        </div>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(({ key, label, icon: Icon, count }) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(key)}
              className={`${
                selectedCategory === key
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              } transition-all duration-300`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label} ({count})
            </Button>
          ))}
        </div>

        {/* Filtros de Nível */}
        <div className="flex flex-wrap justify-center gap-2">
          {levels.map(({ key, label }) => (
            <Button
              key={key}
              variant={selectedLevel === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel(key)}
              className={`${
                selectedLevel === key
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                  : "border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              } transition-all duration-300`}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de Certificações */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <AnimatePresence>
          {filteredCertifications.map((cert, index) => {
            const CategoryIcon = getCategoryIcon(cert.category);

            return (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setSelectedCert(cert)}
                className="cursor-pointer"
              >
                <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                  {/* Header colorido */}
                  <div
                    className={`h-2 bg-gradient-to-r ${getCategoryColor(
                      cert.category
                    )}`}
                  />

                  {/* Imagem/Badge */}
                  <div className="relative p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(
                          cert.category
                        )} rounded-full flex items-center justify-center text-2xl`}
                      >
                        {cert.badge || (
                          <CategoryIcon className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(cert.status)}
                        <Badge className={getLevelColor(cert.level)}>
                          {cert.level}
                        </Badge>
                      </div>
                    </div>

                    <CardTitle className="text-slate-800 dark:text-slate-100 text-lg font-bold mb-2 line-clamp-2">
                      {cert.title}
                    </CardTitle>

                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 mb-3">
                      <Building className="h-4 w-4" />
                      <span className="font-medium text-sm">{cert.issuer}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(cert.issueDate).getFullYear()}</span>
                      </div>
                      {cert.hours && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{cert.hours}h</span>
                        </div>
                      )}
                      {cert.score && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>{cert.score}</span>
                        </div>
                      )}
                    </div>

                    <CardDescription className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4">
                      {cert.description}
                    </CardDescription>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {cert.skills.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-slate-50 dark:bg-slate-700"
                        >
                          +{cert.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Mensagem quando não há resultados */}
      {filteredCertifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Nenhuma certificação encontrada
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Tente ajustar os filtros ou termo de busca
          </p>
        </motion.div>
      )}

      {/* Modal de Detalhes */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header do Modal */}
              <div
                className={`h-2 bg-gradient-to-r ${getCategoryColor(
                  selectedCert.category
                )}`}
              />

              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${getCategoryColor(
                        selectedCert.category
                      )} rounded-full flex items-center justify-center text-3xl`}
                    >
                      {selectedCert.badge}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                        {selectedCert.title}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 mb-2">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">
                          {selectedCert.issuer}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedCert.status)}
                        <Badge className={getLevelColor(selectedCert.level)}>
                          {selectedCert.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCert(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Informações Detalhadas */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                      Descrição
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedCert.description}
                    </p>
                  </div>

                  {/* Detalhes da Certificação */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                        Detalhes
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Data de Emissão:
                          </span>
                          <span className="text-slate-800 dark:text-slate-100">
                            {new Date(
                              selectedCert.issueDate
                            ).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        {selectedCert.expiryDate && (
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">
                              Validade:
                            </span>
                            <span className="text-slate-800 dark:text-slate-100">
                              {new Date(
                                selectedCert.expiryDate
                              ).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            ID da Credencial:
                          </span>
                          <span className="text-slate-800 dark:text-slate-100 font-mono text-xs">
                            {selectedCert.credentialId}
                          </span>
                        </div>
                        {selectedCert.hours && (
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">
                              Horas de Estudo:
                            </span>
                            <span className="text-slate-800 dark:text-slate-100">
                              {selectedCert.hours}h
                            </span>
                          </div>
                        )}
                        {selectedCert.score && (
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">
                              Pontuação:
                            </span>
                            <span className="text-slate-800 dark:text-slate-100">
                              {selectedCert.score}/1000
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                        Habilidades
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCert.skills.map((skill) => (
                          <Badge
                            key={skill}
                            className={`bg-gradient-to-r ${getCategoryColor(
                              selectedCert.category
                            )} text-white border-0`}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Botão de Verificação */}
                  {selectedCert.verificationUrl && (
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <Button
                        onClick={() =>
                          window.open(selectedCert.verificationUrl, "_blank")
                        }
                        className={`w-full bg-gradient-to-r ${getCategoryColor(
                          selectedCert.category
                        )} text-white hover:shadow-lg`}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Verificar Certificação
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
