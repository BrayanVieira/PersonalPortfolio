import PersonalizationForm from "@/components/personalization-form";
import Image from "next/image";

export default function PersonalizePage() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center gap-6">
        <img
          src="/profile.jpg"
          alt="Foto de perfil"
          width={120}
          height={120}
          style={{
            borderRadius: "9999px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            border: "4px solid #fff",
            objectFit: "cover",
          }}
        />
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Personalize Seu Portfólio
          </h1>
          <p className="text-slate-600 text-lg">
            Preencha suas informações para criar um portfólio único e
            profissional
          </p>
        </div>
      </div>
      <div className="w-full mt-8">
        <PersonalizationForm />
      </div>
    </div>
  );
}
