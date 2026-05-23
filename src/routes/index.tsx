import { motion } from "framer-motion";
import { Check, BookOpen, Puzzle, Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const [date, setDate] = useState("");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const today = new Date();
    setDate(today.toLocaleDateString("pt-BR"));
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Top Bar */}
      <div className="bg-[#D4AF37] text-white py-2 text-center text-sm font-bold uppercase tracking-wider">
        ⚠️ OFERTA VÁLIDA SOMENTE HOJE - {date}
      </div>

      {/* Hero Section */}
      <section className="py-20 px-6 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm mb-6 uppercase tracking-widest">
          O FIM DA GUERRA NA HORA DA TAREFA
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl leading-tight mb-8">
          A Única Intervenção Fônica Capaz de Fazer Seu Filho Ler em <span className="text-[#D4AF37]">30 Dias</span>, Gastando Apenas <span className="text-[#D4AF37]">10 Minutos</span> por Dia.
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mb-12">
          Chega de promessas escolares vazias. Assuma o controle com o passo a passo domiciliar que destrava a leitura e devolve a autoestima da criança — mesmo que você não seja professora.
        </p>

        <div className="w-full max-w-sm aspect-[9/16] bg-slate-100 rounded-3xl mb-12 shadow-[0_0_30px_rgba(212,175,55,0.1)]" />

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-[#D4AF37] hover:bg-[#B8860B] text-white font-black text-lg py-6 px-10 rounded-2xl shadow-lg uppercase tracking-tight"
        >
          QUERO DESTRAVAR A LEITURA DO MEU FILHO
        </motion.button>
      </section>

      {/* Grid Features */}
      <section className="py-20 px-6 bg-slate-50">
        <h2 className="text-3xl font-bold text-center mb-16">O que você desbloqueia agora mesmo</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: BookOpen, title: "Nível 1: O Despertar Fonético", text: "O fim das adivinhações. Um processo detalhado onde a criança entende o som real de cada letra." },
            { icon: Puzzle, title: "Nível 2: Conexão e Aceleração", text: "A mágica acontece. O cérebro da criança começa a juntar as peças e formar as primeiras palavras reais." },
            { icon: Trophy, title: "Nível 3: Domínio e Confiança", text: "Leitura autônoma e escrita firme. O momento em que você respira aliviada ao ver seu filho lendo sozinho." }
          ].map((card, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#D4AF37] transition-all shadow-sm">
              <card.icon className="text-[#D4AF37] w-12 h-12 mb-6" />
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <p className="text-slate-600">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Logic */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Por que nosso método funciona quando a escola falha?</h2>
        <ul className="space-y-6">
          {[
            "Abordagem Clínica Simplificada: Traduzimos táticas avançadas para uma linguagem que qualquer mãe consegue aplicar.",
            "Retenção Acelerada: O cérebro aprende por associação de sons, não por memorização forçada do alfabeto.",
            "Foco na Autonomia: Resgatamos a confiança da criança, transformando o aprendizado em um desafio lógico."
          ].map((item, i) => (
            <li key={i} className="flex gap-4 items-start">
              <Check className="text-[#D4AF37] flex-shrink-0" />
              <span className="text-lg text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-slate-50">
        <h2 className="text-3xl font-bold text-center mb-4">Resultados que Devolvem o Alívio</h2>
        <p className="text-slate-600 text-center mb-12">Veja como a rotina de estudos dessas famílias foi transformada.</p>
        
        <div className="relative max-w-lg mx-auto px-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-[0_0_100%] aspect-square bg-slate-200 rounded-2xl" />
              ))}
            </div>
          </div>
          <button onClick={() => emblaApi?.scrollPrev()} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white shadow-md border border-slate-200 rounded-full text-slate-600 hover:text-slate-900 transition-colors"><ChevronLeft /></button>
          <button onClick={() => emblaApi?.scrollNext()} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white shadow-md border border-slate-200 rounded-full text-slate-600 hover:text-slate-900 transition-colors"><ChevronRight /></button>
        </div>
      </section>
    </div>
  );
}
