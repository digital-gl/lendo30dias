import { motion } from "framer-motion";
import { Check, ShieldCheck, Star, Clock, Gift, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ofertasecreta")({
  component: OfertaSecretaPage,
});

const CHECKOUT_URL = "https://pay.kirvano.com/a06e7ea1-ecef-4f82-a02d-14adcd5fe27f";

function Countdown() {
  const [time, setTime] = useState({ m: 14, s: 59 });

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        if (t.m === 0 && t.s === 0) return { m: 14, s: 59 };
        if (t.s === 0) return { m: t.m - 1, s: 59 };
        return { m: t.m, s: t.s - 1 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4">
      {[
        { label: "MIN", value: pad(time.m) },
        { label: "SEG", value: pad(time.s) },
      ].map((b) => (
        <div key={b.label} className="flex flex-col items-center">
          <div className="bg-black text-[#D4AF37] font-black text-4xl md:text-6xl rounded-2xl px-5 md:px-7 py-3 md:py-4 shadow-2xl border-2 border-[#D4AF37]/40 tabular-nums">
            {b.value}
          </div>
          <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mt-2">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

function OfertaSecretaPage() {
  const testimonials = [
    { name: "Mariana Silva", text: "Meu filho tinha muita dificuldade e hoje lê livrinhos sozinho. Mudou nossa vida!", image: "https://i.imgur.com/PHQ6tpy.png" },
    { name: "Carla Oliveira", text: "A hora da tarefa era um choro só. Agora ele se sente capaz e motivado.", image: "https://i.imgur.com/gpEBlEG.png" },
    { name: "Patrícia Mendes", text: "O método é muito simples de aplicar, mesmo eu não sendo pedagoga.", image: "https://i.imgur.com/CSHkF2d.png" },
  ];

  const proofs = [
    "https://i.imgur.com/X0ZwkvB.jpeg",
    "https://i.imgur.com/GcM5DRs.jpeg",
    "https://i.imgur.com/AVTtPHm.jpeg",
    "https://i.imgur.com/keJhWpy.jpeg",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#D4AF37]/30">
      {/* Top alert bar */}
      <div className="bg-red-600 text-white py-2.5 text-center text-xs md:text-sm font-black uppercase tracking-wider sticky top-0 z-50 flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4 animate-pulse" />
        OFERTA SECRETA LIBERADA — VÁLIDA SÓ NESTA TELA
      </div>

      {/* HERO */}
      <section className="py-10 md:py-16 px-6 flex flex-col items-center text-center bg-gradient-to-b from-[#FFFBEB] to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-1.5 rounded-full bg-black text-[#D4AF37] text-xs md:text-sm mb-6 uppercase tracking-widest font-black border border-[#D4AF37]/40"
        >
          🔐 Página privada — Não compartilhe
        </motion.div>

        <h1 className="text-3xl md:text-6xl font-extrabold max-w-4xl leading-tight mb-6 tracking-tight">
          Espera, mãe... Antes de você ir, abrimos <span className="text-[#D4AF37]">uma única condição secreta</span> só pra você.
        </h1>

        <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mb-8 leading-relaxed">
          Como você chegou até o checkout, liberamos o <strong>Plano Premium completo</strong> + os <strong>6 bônus exclusivos</strong> por um preço que <strong className="text-red-600">não aparece em nenhum outro lugar do site</strong>.
        </p>

        {/* Countdown */}
        <div className="mb-8">
          <p className="text-xs md:text-sm font-black text-red-600 uppercase tracking-widest mb-3">
            ⏳ Essa página expira em:
          </p>
          <Countdown />
          <p className="text-xs text-slate-500 font-medium mt-3 max-w-sm mx-auto">
            Após o tempo expirar, o link some e o preço volta automaticamente para R$ 59,90.
          </p>
        </div>

        {/* Price card */}
        <div className="relative max-w-md w-full mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-[2.5rem] blur opacity-50 animate-pulse" />
          <div className="relative bg-white p-8 rounded-[2.5rem] border-4 border-[#D4AF37] shadow-[0_30px_60px_rgba(212,175,55,0.25)]">
            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
              Desconto exclusivo back-redirect
            </div>
            <p className="text-slate-500 line-through text-xl font-bold">De R$ 59,90</p>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-black mb-2">Hoje, só nesta tela:</p>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-3xl font-bold text-slate-900">R$</span>
              <motion.span
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 1.1 }}
                className="text-7xl md:text-8xl font-black text-[#D4AF37] inline-block tabular-nums"
                style={{ textShadow: "0 8px 30px rgba(212,175,55,0.5)" }}
              >
                19,90
              </motion.span>
            </div>
            <p className="text-emerald-600 font-black text-sm uppercase tracking-tighter mb-6">
              Você economiza R$ 40,00 agora
            </p>

            <motion.a
              href={CHECKOUT_URL}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="block w-full py-5 md:py-6 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white font-black text-base md:text-xl shadow-[0_15px_40px_rgba(34,197,94,0.45)] uppercase tracking-tight mb-3 text-center"
            >
              SIM! QUERO POR R$ 19,90 AGORA
            </motion.a>

            <div className="mt-6 flex flex-col items-center gap-5">
              <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-slate-100 flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <img src="https://i.imgur.com/sDHjn2m.png" alt="Criança 1" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  <img src="https://i.imgur.com/PHQ6tpy.png" alt="Criança 2" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  <img src="https://i.imgur.com/GcM5DRs.jpeg" alt="Criança 3" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                </div>
                <span className="text-slate-600 font-black text-[10px] uppercase tracking-tighter">
                  +300 crianças transformadas
                </span>
              </div>

              <div className="flex flex-col items-center gap-1.5 text-slate-500 font-bold text-[11px] md:text-xs">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Método Comprovado</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-emerald-600" />
                  <span>7 Dias Garantia</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1 mt-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Pagamento 100% seguro · Acesso imediato
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            ))}
          </div>
          <span>+2.157 mães já estão usando o método</span>
        </div>
      </section>

      {/* SOCIAL PROOF IMAGES - DEPOIMENTOS ABAIXO DA OFERTA */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-8 tracking-tight">
            Escolha o Plano que mais combina com seu você...
          </h2>


          <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-12">
            {proofs.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-white">
                <img src={src} alt={`Prova social ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#FFFBEB] p-6 rounded-3xl shadow-md border border-[#D4AF37]/20 flex flex-col items-center text-center">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-5 flex-1 text-sm leading-relaxed">"{t.text}"</p>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-[#D4AF37]/30 overflow-hidden">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-black text-slate-900 text-xs uppercase tracking-tight">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}

      <section className="py-14 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#D4AF37] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
              Tudo isso por R$ 19,90
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Veja o que entra no seu acesso premium hoje
            </h2>
            <p className="text-slate-600 font-medium">
              O mesmo material que sai por R$ 297,00 fora desta página.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 md:p-10 space-y-5">
            {[
              { t: "Caderno Nível 1 — O Despertar Fonético", d: "Em Letra Bastão e Cursiva. Acaba com o vício de chutar palavras." },
              { t: "Caderno Nível 2 — Conexão e Aceleração", d: "Junção rápida de sílabas e formação das primeiras palavras reais." },
              { t: "Caderno Nível 3 — Domínio e Confiança", d: "Leitura fluente e escrita firme de frases inteiras." },
              { t: "Bônus 1 — Acelerador de Consciência Silábica", d: "De R$ 47,90 · GRÁTIS hoje" },
              { t: "Bônus 2 — Jogo de Retenção Acelerada", d: "De R$ 37,90 · GRÁTIS hoje" },
              { t: "Bônus 3 — Protocolo de Fluência Leitora", d: "De R$ 57,90 · GRÁTIS hoje" },
              { t: "Bônus 4 — Tiras de Leitura Dinâmica", d: "De R$ 27,90 · GRÁTIS hoje" },
              { t: "Bônus 5 — Desafio dos 50 Textos Fatiados", d: "De R$ 67,90 · GRÁTIS hoje" },
              { t: "Bônus 6 — Fundação da Leitura Rápida", d: "De R$ 37,90 · GRÁTIS hoje" },
              { t: "Suporte exclusivo para dúvidas", d: "Tire dúvidas direto com nossa equipe." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="bg-emerald-500 rounded-full p-1 shrink-0 mt-1">
                  <Check className="text-white w-3.5 h-3.5" strokeWidth={4} />
                </div>
                <div>
                  <p className="font-black text-slate-900 leading-tight">{item.t}</p>
                  <p className="text-sm text-slate-500 font-medium">{item.d}</p>
                </div>
              </div>
            ))}

            <div className="border-t border-dashed border-slate-200 pt-5 mt-5 text-center">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Valor real do pacote</p>
              <p className="text-2xl font-black text-red-600 line-through">R$ 574,30</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Você leva tudo por</p>
              <p className="text-5xl font-black text-[#D4AF37]">R$ 19,90</p>
            </div>
          </div>
        </div>
      </section>


      {/* GUARANTEE */}
      <section className="py-14 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto bg-[#D4AF37] p-8 md:p-10 rounded-[2.5rem] shadow-2xl border-4 border-white/20 flex flex-col items-center text-center text-white">
          <ShieldCheck className="w-14 h-14 md:w-16 md:h-16 text-white mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight uppercase">Risco Zero — 7 Dias de Garantia</h2>
          <p className="text-sm md:text-base leading-relaxed max-w-2xl font-medium">
            Baixe o material, aplique nosso método e veja o resultado com os próprios olhos. Se em <strong>7 dias</strong> você sentir que não é para o seu filho, devolvemos <strong>100% do valor</strong>. Sem perguntas, sem burocracia.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-[#FFFBEB] text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <Clock className="w-4 h-4 animate-pulse" />
            Última chance — não volta a aparecer
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight leading-tight">
            Por R$ 19,90 você muda a história escolar do seu filho.
          </h2>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            Menos de <strong>R$ 0,67 por dia</strong> durante um mês para ele finalmente <strong>ler sozinho</strong>, ganhar autoestima e parar de sofrer na hora da tarefa.
          </p>

          <div className="mb-8">
            <Countdown />
          </div>

          <motion.a
            href={CHECKOUT_URL}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 1.3 }}
            className="block w-full max-w-md mx-auto py-6 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white font-black text-lg md:text-xl shadow-[0_15px_40px_rgba(34,197,94,0.45)] uppercase tracking-tight mb-4 text-center"
          >
            <span className="flex items-center justify-center gap-2">
              <Gift className="w-5 h-5" />
              GARANTIR AGORA POR R$ 19,90
            </span>
          </motion.a>

          <p className="text-xs text-slate-500 font-bold flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Compra segura · Acesso imediato após pagamento
          </p>
        </div>
      </section>

      <footer className="bg-slate-900 py-10 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-[#D4AF37] font-black text-2xl mb-6">RESGATE EDUCACIONAL</div>
          <p className="text-slate-500 text-xs leading-relaxed max-w-2xl mx-auto mb-6">
            Aviso Legal: Os resultados podem variar de acordo com o empenho e a dedicação de cada família. Este produto não substitui o acompanhamento de profissionais quando necessário.
          </p>
          <div className="text-slate-600 text-xs">© 2026 Resgate Educacional · Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  );
}