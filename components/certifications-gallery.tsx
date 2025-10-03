"use client";

import { useState } from "react";
import { CertificateCard } from "@/components/ui/certificate-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Award,
  Calendar,
  ExternalLink,
  Search,
  Code,
  Database,
  Globe,
  Shield,
  Target,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  category: "cloud" | "programming" | "database" | "security" | "management" | "design";
  level: "beginner" | "intermediate" | "advanced" | "expert";
  image: string;
  status: "active" | "expired" | "inProgress";
  badge?: string;
}

const certifications: Certification[] = [
  {
    id: "js-impressionador",
    title: "JavaScript Impressionador",
    issuer: "Hashtag Treinamentos",
    issueDate: "2024",
    credentialId: "JS-HASH-2024",
    description: "Curso completo de JavaScript com foco em aplicações práticas e desenvolvimento web.",
    skills: ["JavaScript", "ES6+", "DOM", "Web Development", "Async Programming"],
    category: "programming",
    level: "intermediate",
    image: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "python-impressionador",
    title: "Python Impressionador",
    issuer: "Hashtag Treinamentos",
    issueDate: "2023",
    credentialId: "PY-HASH-2023",
    description: "Formação completa em Python, abordando automação, análise de dados e desenvolvimento de aplicações.",
    skills: ["Python", "Automação", "Análise de Dados", "APIs", "Bibliotecas Python"],
    category: "programming",
    level: "intermediate",
    image: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "sql-impressionador",
    title: "SQL Impressionador",
    issuer: "Hashtag Treinamentos",
    issueDate: "2024",
    credentialId: "SQL-HASH-2024",
    description: "Curso avançado de SQL focado em manipulação e análise de dados em bancos de dados relacionais.",
    skills: ["SQL", "Database Design", "Query Optimization", "Data Analysis"],
    category: "database",
    level: "intermediate",
    image: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "vba-impressionador",
    title: "VBA Impressionador",
    issuer: "Hashtag Treinamentos",
    issueDate: "2024",
    credentialId: "VBA-HASH-2024",
    description: "Programação VBA para automação de processos no Microsoft Office, com foco em Excel.",
    skills: ["VBA", "Excel", "Automação", "Microsoft Office"],
    category: "programming",
    level: "intermediate",
    image: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "ia-hashtag",
    title: "Inteligência Artificial",
    issuer: "Hashtag Treinamentos",
    issueDate: "2024",
    credentialId: "IA-HASH-2024",
    description: "Fundamentos e aplicações práticas de Inteligência Artificial e Machine Learning.",
    skills: ["AI", "Machine Learning", "Data Analysis", "Python", "Neural Networks"],
    category: "programming",
    level: "advanced",
    image: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "yellow-belt",
    title: "Yellow Belt",
    issuer: "FM2S",
    issueDate: "2023",
    credentialId: "YB-FM2S-2023",
    description: "Certificação Yellow Belt em metodologia Lean Six Sigma.",
    skills: ["Lean Six Sigma", "Process Improvement", "Quality Management", "DMAIC"],
    category: "management",
    level: "intermediate",
    image: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "coreldraw",
    title: "CorelDRAW",
    issuer: "Udemy",
    issueDate: "2023",
    credentialId: "COREL-UDEMY-2023",
    description: "Domínio das ferramentas e técnicas do CorelDRAW para design gráfico profissional.",
    skills: ["CorelDRAW", "Design Gráfico", "Vetorização", "Layout Design"],
    category: "design",
    level: "intermediate",
    image: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "big-data-fundamentals",
    title: "Big Data Fundamentos",
    issuer: "Data Science Academy",
    issueDate: "2023",
    credentialId: "BDF-DSA-2023",
    description: "Fundamentos de Big Data, incluindo conceitos, tecnologias e aplicações práticas.",
    skills: ["Big Data", "Data Analysis", "Hadoop", "Data Processing"],
    category: "database",
    level: "beginner",
    image: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "data-science",
    title: "Ciência de Dados",
    issuer: "Data Science Academy",
    issueDate: "2023",
    credentialId: "DS-DSA-2023",
    description: "Formação completa em Ciência de Dados, incluindo estatística, programação e visualização de dados.",
    skills: ["Data Science", "Python", "Machine Learning", "Statistics", "Data Visualization"],
    category: "programming",
    level: "advanced",
    image: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "uiux",
    title: "UI/UX",
    issuer: "DIO",
    issueDate: "2023",
    credentialId: "UIUX-DIO-2023",
    description: "Design de interfaces e experiência do usuário, incluindo princípios de usabilidade e prototipação.",
    skills: ["UI Design", "UX Design", "Prototyping", "User Research", "Usability"],
    category: "design",
    level: "intermediate",
    image: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "html-css",
    title: "HTML e CSS",
    issuer: "DNC",
    issueDate: "2023",
    credentialId: "HTML-DNC-2023",
    description: "Desenvolvimento web front-end com HTML5 e CSS3, incluindo design responsivo e boas práticas.",
    skills: ["HTML", "CSS", "Responsive Design", "Web Development"],
    category: "programming",
    level: "beginner",
    image: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "cambridge-b1",
    title: "Inglês Avançado (Certificação B1 Cambridge)",
    issuer: "Cambridge",
    issueDate: "2023",
    credentialId: "B1-CAMBRIDGE",
    description: "Certificação internacional de proficiência em inglês, nível B1 do Quadro Europeu Comum de Referência.",
    skills: ["English Language", "Reading", "Writing", "Speaking", "Listening"],
    category: "management",
    level: "intermediate",
    image: "/placeholder.jpg",
    status: "active"
  }
];

const categories = [
  { label: "Todos", value: null, icon: null },
  { label: "Cloud", value: "cloud", icon: <Globe className="h-4 w-4" /> },
  { label: "Programação", value: "programming", icon: <Code className="h-4 w-4" /> },
  { label: "Database", value: "database", icon: <Database className="h-4 w-4" /> },
  { label: "Segurança", value: "security", icon: <Shield className="h-4 w-4" /> },
  { label: "Gestão", value: "management", icon: <Users className="h-4 w-4" /> },
  { label: "Design", value: "design", icon: <Target className="h-4 w-4" /> },
];

function getCategoryIcon(category: string) {
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
}

function getCategoryGradient(category: string) {
  switch (category) {
    case "cloud":
      return "from-blue-500 to-cyan-500";
    case "programming":
      return "from-purple-500 to-pink-500";
    case "database":
      return "from-green-500 to-emerald-500";
    case "security":
      return "from-red-500 to-orange-500";
    case "management":
      return "from-yellow-500 to-orange-500";
    case "design":
      return "from-indigo-500 to-purple-500";
    default:
      return "from-gray-500 to-slate-500";
  }
}

function getLevelColor(level: string) {
  switch (level) {
    case "beginner":
      return "text-green-600 dark:text-green-400";
    case "intermediate":
      return "text-blue-600 dark:text-blue-400";
    case "advanced":
      return "text-purple-600 dark:text-purple-400";
    case "expert":
      return "text-orange-600 dark:text-orange-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
}

export function CertificationsGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const filteredCertifications = certifications.filter((cert) => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = !selectedCategory || cert.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          Certificações
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Qualificações e certificados profissionais
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Buscar certificações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value ?? "all"}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.value ? null : category.value
                )
              }
              className="flex items-center gap-2"
            >
              {category.icon}
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de Certificações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCertifications.map((cert) => {
          const CategoryIcon = getCategoryIcon(cert.category);

          return (
            <div key={cert.id}>
              <CertificateCard
                className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700"
                containerClassName="aspect-[4/3]"
                onClick={() => setSelectedCert(cert)}
              >
                <div className="flex flex-col h-full">
                  {/* Header colorido */}
                  <div
                    className={cn(
                      "h-2 bg-gradient-to-r",
                      getCategoryGradient(cert.category)
                    )}
                  />

                  {/* Conteúdo */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          "bg-gradient-to-br from-white/10 to-white/5"
                        )}
                      >
                        <CategoryIcon className="h-6 w-6 text-slate-600 dark:text-slate-200" />
                      </div>
                      <Badge variant="outline" className={getLevelColor(cert.level)}>
                        {cert.level}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {cert.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {cert.issuer}
                    </p>

                    <div className="flex items-center gap-2 mt-auto">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {cert.issueDate}
                      </span>
                    </div>
                  </div>
                </div>
              </CertificateCard>
            </div>
          );
        })}
      </div>

      {/* Modal de detalhes */}
      {selectedCert && (
        <>
          <div
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <CertificateCard className="bg-white dark:bg-slate-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedCert.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedCert.issuer}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedCert(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Descrição</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedCert.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Competências</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="font-semibold mb-1">Emitido em</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedCert.issueDate}
                      </p>
                    </div>
                    {selectedCert.expiryDate && (
                      <div>
                        <h4 className="font-semibold mb-1">Expira em</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {selectedCert.expiryDate}
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedCert.verificationUrl && (
                    <Button
                      className="w-full"
                      onClick={() =>
                        window.open(selectedCert.verificationUrl, "_blank")
                      }
                    >
                      Verificar Credencial
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CertificateCard>
          </div>
        </>
      )}
    </div>
  );
}

export default CertificationsGallery;
