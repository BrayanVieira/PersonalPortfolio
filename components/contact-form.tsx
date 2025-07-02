"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Phone,
  Building,
} from "lucide-react";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nome
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validar assunto
    if (!formData.subject.trim()) {
      newErrors.subject = "Assunto é obrigatório";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Assunto deve ter pelo menos 5 caracteres";
    }

    // Validar mensagem
    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mensagem deve ter pelo menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("loading");

    try {
      // Envio real via EmailJS
      const serviceId = "seu_service_id"; // Substitua pelo seu Service ID do EmailJS
      const templateId = "template_hweci8o"; // Substitua pelo seu Template ID do EmailJS
      const userId = "seu_user_id"; // Substitua pelo seu User ID do EmailJS

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_email: "vieirabrayan158@gmail.com",
      };

      await emailjs.send(serviceId, templateId, templateParams, userId);

      setStatus("success");
      setSubmitMessage("Mensagem enviada com sucesso! Retornarei em breve.");

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          subject: "",
          message: "",
        });
        setStatus("idle");
      }, 3000);
    } catch (error) {
      setStatus("error");
      setSubmitMessage(
        "Erro ao enviar mensagem. Tente novamente ou use o email direto."
      );

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  const subjectOptions = [
    "Proposta de Trabalho",
    "Freelance/Consultoria",
    "Parceria",
    "Dúvidas Técnicas",
    "Outros",
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-teal-200 dark:border-teal-700 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Mail className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          Entre em Contato
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-300">
          Vamos conversar sobre seu próximo projeto! Preencha o formulário
          abaixo.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome e Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-slate-700 dark:text-slate-300 font-medium"
              >
                Nome *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`pl-10 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 dark:border-slate-600"
                  } bg-white dark:bg-slate-700`}
                />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-slate-700 dark:text-slate-300 font-medium"
              >
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-10 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 dark:border-slate-600"
                  } bg-white dark:bg-slate-700`}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Empresa e Telefone (Opcionais) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="company"
                className="text-slate-700 dark:text-slate-300 font-medium"
              >
                Empresa (Opcional)
              </Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="company"
                  type="text"
                  placeholder="Nome da empresa"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="pl-10 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-slate-700 dark:text-slate-300 font-medium"
              >
                Telefone (Opcional)
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Assunto */}
          <div className="space-y-2">
            <Label
              htmlFor="subject"
              className="text-slate-700 dark:text-slate-300 font-medium"
            >
              Assunto *
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder="Sobre o que você gostaria de conversar?"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              className={`${
                errors.subject
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-300 dark:border-slate-600"
              } bg-white dark:bg-slate-700`}
            />

            {/* Sugestões de assunto */}
            <div className="flex flex-wrap gap-2 mt-2">
              {subjectOptions.map((option) => (
                <Badge
                  key={option}
                  variant="outline"
                  className="cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/20 border-teal-300 dark:border-teal-600 text-teal-700 dark:text-teal-300"
                  onClick={() => handleInputChange("subject", option)}
                >
                  {option}
                </Badge>
              ))}
            </div>

            <AnimatePresence>
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm flex items-center gap-1"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.subject}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Mensagem */}
          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-slate-700 dark:text-slate-300 font-medium"
            >
              Mensagem *
            </Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Textarea
                id="message"
                placeholder="Conte-me mais sobre seu projeto, necessidades ou dúvidas..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={5}
                className={`pl-10 resize-none ${
                  errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-300 dark:border-slate-600"
                } bg-white dark:bg-slate-700`}
              />
            </div>
            <div className="flex justify-between items-center">
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {formData.message.length}/500
              </span>
            </div>
          </div>

          {/* Status Messages */}
          <AnimatePresence>
            {status !== "idle" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-lg flex items-center gap-3 ${
                  status === "success"
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : status === "error"
                    ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    : "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                }`}
              >
                {status === "loading" && (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400" />
                )}
                {status === "success" && (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                )}
                {status === "error" && (
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}

                <p
                  className={`font-medium ${
                    status === "success"
                      ? "text-green-800 dark:text-green-200"
                      : status === "error"
                      ? "text-red-800 dark:text-red-200"
                      : "text-blue-800 dark:text-blue-200"
                  }`}
                >
                  {status === "loading"
                    ? "Enviando mensagem..."
                    : submitMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão Submit */}
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Enviar Mensagem
              </>
            )}
          </Button>

          {/* Informações adicionais */}
          <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Ou entre em contato diretamente:
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              <a
                href="mailto:seuemail@exemplo.com"
                className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <Mail className="h-4 w-4" />
                seuemail@exemplo.com
              </a>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Respondo em até 24h
              </span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
