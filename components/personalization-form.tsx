"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Save, User, Briefcase, Mail } from "lucide-react";

interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio1: string;
  bio2: string;
  email: string;
  linkedin: string;
  github: string;
  website?: string;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  gradient: string;
}

interface Skill {
  name: string;
  description: string;
  color: string;
}

export default function PersonalizationForm() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    title: "",
    subtitle: "",
    bio1: "",
    bio2: "Possuo conhecimento e experiência em Selenium e automatizações de processos complexos utilizando Python.",
    email: "",
    linkedin: "",
    github: "",
    website: "",
  });

  const [projects, setProjects] = useState<Project[]>([
    {
      title: "",
      description: "",
      tech: [],
      github: "",
      demo: "",
      gradient: "from-emerald-400 to-blue-500",
    },
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { name: "Python", description: "Django, Flask, FastAPI", color: "emerald" },
    {
      name: "JavaScript",
      description: "React, Node.js, TypeScript",
      color: "blue",
    },
    {
      name: "Database",
      description: "PostgreSQL, MongoDB, Redis",
      color: "purple",
    },
    { name: "DevOps", description: "Docker, AWS, CI/CD", color: "pink" },
  ]);

  const [newTech, setNewTech] = useState("");
  const [activeProject, setActiveProject] = useState(0);

  const gradientOptions = [
    "from-emerald-400 to-blue-500",
    "from-purple-400 to-pink-500",
    "from-orange-400 to-red-500",
    "from-blue-400 to-cyan-500",
    "from-pink-400 to-rose-500",
    "from-indigo-400 to-purple-500",
  ];

  const addProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        tech: [],
        github: "",
        demo: "",
        gradient: gradientOptions[projects.length % gradientOptions.length],
      },
    ]);
  };

  const removeProject = (index: number) => {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
      if (activeProject >= projects.length - 1) {
        setActiveProject(Math.max(0, activeProject - 1));
      }
    }
  };

  const addTechToProject = (projectIndex: number) => {
    if (newTech.trim()) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].tech.push(newTech.trim());
      setProjects(updatedProjects);
      setNewTech("");
    }
  };

  const removeTechFromProject = (projectIndex: number, techIndex: number) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].tech.splice(techIndex, 1);
    setProjects(updatedProjects);
  };

  const updateProject = (
    index: number,
    field: keyof Project,
    value: string
  ) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjects(updatedProjects);
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
  };

  const generatePortfolioCode = () => {
    const portfolioData = {
      personalInfo,
      projects,
      skills,
    };

    // Aqui você pode implementar a lógica para aplicar as mudanças
    console.log("Portfolio Data:", portfolioData);
    alert(
      "Dados salvos! Em breve implementaremos a aplicação automática das mudanças."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            🎨 Personalize Seu Portfólio
          </h1>
          <p className="text-slate-600">
            Preencha suas informações para criar um portfólio único e
            profissional
          </p>
        </div>

        {/* Informações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações Pessoais
            </CardTitle>
            <CardDescription>
              Dados básicos que aparecerão no seu portfólio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="João Silva"
                  value={personalInfo.name}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="title">Título Principal</Label>
                <Input
                  id="title"
                  placeholder="Desenvolvedor Full Stack"
                  value={personalInfo.title}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, title: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subtitle">Subtítulo/Especialidades</Label>
              <Input
                id="subtitle"
                placeholder="Python • React • Node.js"
                value={personalInfo.subtitle}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, subtitle: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="bio1">Biografia - Parágrafo 1</Label>
              <Textarea
                id="bio1"
                placeholder="Conte sobre sua experiência, paixões e objetivos profissionais..."
                value={personalInfo.bio1}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, bio1: e.target.value })
                }
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="bio2">Biografia - Parágrafo 2</Label>
              <Textarea
                id="bio2"
                placeholder="Adicione mais detalhes sobre sua abordagem de trabalho e especialidades..."
                value={personalInfo.bio2}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, bio2: e.target.value })
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contatos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Informações de Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao@exemplo.com"
                  value={personalInfo.email}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/joaosilva"
                  value={personalInfo.linkedin}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      linkedin: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  placeholder="https://github.com/joaosilva"
                  value={personalInfo.github}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, github: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="website">Website (Opcional)</Label>
                <Input
                  id="website"
                  placeholder="https://joaosilva.dev"
                  value={personalInfo.website}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      website: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projetos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Projetos ({projects.length})
            </CardTitle>
            <CardDescription>
              Adicione seus projetos mais importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {projects.map((_, index) => (
                <Button
                  key={index}
                  variant={activeProject === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveProject(index)}
                  className="whitespace-nowrap"
                >
                  Projeto {index + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addProject}
                className="whitespace-nowrap bg-transparent"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>

            {projects[activeProject] && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Projeto {activeProject + 1}
                  </h3>
                  {projects.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeProject(activeProject)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Título do Projeto</Label>
                    <Input
                      value={projects[activeProject].title}
                      onChange={(e) =>
                        updateProject(activeProject, "title", e.target.value)
                      }
                      placeholder="Meu Projeto Incrível"
                    />
                  </div>
                  <div>
                    <Label>Gradiente</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={projects[activeProject].gradient}
                      onChange={(e) =>
                        updateProject(activeProject, "gradient", e.target.value)
                      }
                    >
                      {gradientOptions.map((gradient, index) => (
                        <option key={index} value={gradient}>
                          Gradiente {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label>Descrição</Label>
                  <Textarea
                    value={projects[activeProject].description}
                    onChange={(e) =>
                      updateProject(
                        activeProject,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Descrição detalhada do projeto, suas funcionalidades e impacto..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Link GitHub</Label>
                    <Input
                      value={projects[activeProject].github}
                      onChange={(e) =>
                        updateProject(activeProject, "github", e.target.value)
                      }
                      placeholder="https://github.com/usuario/projeto"
                    />
                  </div>
                  <div>
                    <Label>Link Demo</Label>
                    <Input
                      value={projects[activeProject].demo}
                      onChange={(e) =>
                        updateProject(activeProject, "demo", e.target.value)
                      }
                      placeholder="https://meuprojeto.com"
                    />
                  </div>
                </div>

                <div>
                  <Label>Tecnologias</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder="React"
                      onKeyPress={(e) =>
                        e.key === "Enter" && addTechToProject(activeProject)
                      }
                    />
                    <Button
                      type="button"
                      onClick={() => addTechToProject(activeProject)}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projects[activeProject].tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="cursor-pointer hover:bg-red-100"
                        onClick={() =>
                          removeTechFromProject(activeProject, techIndex)
                        }
                      >
                        {tech} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Botão Salvar */}
        <div className="text-center">
          <Button
            onClick={generatePortfolioCode}
            size="lg"
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 px-8 py-3"
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar e Aplicar Mudanças
          </Button>
        </div>
      </div>
    </div>
  );
}

// Função utilitária para retornar o ícone SVG da linguagem
function getLanguageIcon(name: string) {
  if (name.toLowerCase().includes("python")) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
        alt="Python"
        width={50}
        height={50}
        style={{ minWidth: 50 }}
      />
    );
  }
  const icons: Record<string, string> = {
    JavaScript: "https://techstack-generator.vercel.app/js-icon.svg",
    TypeScript: "https://techstack-generator.vercel.app/ts-icon.svg",
    React: "https://techstack-generator.vercel.app/react-icon.svg",
    Node: "https://techstack-generator.vercel.app/node-icon.svg",
    Nodejs: "https://techstack-generator.vercel.app/node-icon.svg",
    NodeJS: "https://techstack-generator.vercel.app/node-icon.svg",
    Database: "https://techstack-generator.vercel.app/database-icon.svg",
    Docker: "https://techstack-generator.vercel.app/docker-icon.svg",
    AWS: "https://techstack-generator.vercel.app/aws-icon.svg",
    // Adicione mais conforme necessário
  };
  const key = Object.keys(icons).find((k) =>
    name.toLowerCase().includes(k.toLowerCase())
  );
  const iconUrl = key
    ? icons[key]
    : "https://techstack-generator.vercel.app/react-icon.svg";
  return (
    <img
      src={iconUrl}
      alt={key || "React"}
      width={50}
      height={50}
      style={{ minWidth: 50 }}
    />
  );
}
