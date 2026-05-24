import { motion } from "framer-motion";
import { Check, BookOpen, Puzzle, Trophy, ChevronLeft, ChevronRight, Star, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const [date, setDate] = useState("");
  const [tomorrow, setTomorrow] = useState("");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date();
    setDate(today.toLocaleDateString("pt-BR"));
    
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + 1);
    setTomorrow(nextDay.toLocaleDateString("pt-BR"));
  }, []);

  const bonuses = [
    { title: "Acelerador de Consciência Silábica", oldPrice: "47,90", desc: "Exercícios práticos para acelerar a percepção sonora." },
    { title: "Jogo de Retenção Acelerada - Fichas Silábicas", oldPrice: "37,90", desc: "Material lúdico para fixar o conteúdo brincando." },
    { title: "Protocolo de Fluência Leitora", oldPrice: "57,90", desc: "Guia passo a passo para aumentar a velocidade da leitura." },
    { title: "Tiras de Leitura Dinâmica", oldPrice: "27,90", desc: "Ferramenta visual para focar nas palavras-chave." },
    { title: "Desafio dos 50 Textos Fatiados", oldPrice: "67,90", desc: "Textos estruturados para prática diária progressiva." },
    { title: "Fundação da Leitura Rápida", oldPrice: "37,90", desc: "As bases para uma leitura eficiente e compreensiva." }
  ];

  const testimonials = [
    { name: "Mariana Silva", text: "Meu filho tinha muita dificuldade e hoje lê livrinhos sozinho. Mudou nossa vida!", impact: "Resultados impressionantes em 3 semanas" },
    { name: "Carla Oliveira", text: "A hora da tarefa era um choro só. Agora ele se sente capaz e motivado.", impact: "Paz na hora dos estudos" },
    { name: "Patrícia Mendes", text: "O método é muito simples de aplicar, mesmo eu não sendo pedagoga.", impact: "Fácil e prático" }
  ];

  const faqs = [
    { q: "Como vou receber o material?", a: "O acesso é imediato e 100% digital. Após a confirmação do pagamento, você receberá o link para download em seu e-mail e poderá imprimir quando quiser." },
    { q: "Para qual idade é recomendado?", a: "O material foi desenvolvido para crianças em fase de alfabetização, geralmente entre 4 e 8 anos, ou crianças mais velhas que ainda apresentam dificuldades na leitura." },
    { q: "O material é em PDF?", a: "Sim, todos os arquivos estão em formato PDF de alta qualidade, prontos para impressão em casa ou em gráficas." },
    { q: "Quanto tempo demora para ver resultados?", a: "Seguindo o passo a passo de apenas 10 minutos por dia, muitas mães relatam mudanças significativas na percepção sonora já na primeira semana." }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#D4AF37]/30">
      {/* Top Bar */}
      <div className="bg-black text-[#D4AF37] py-2 text-center text-sm font-bold uppercase tracking-wider sticky top-0 z-50">
        ⚠️ OFERTA VÁLIDA SOMENTE HOJE - {date}
      </div>

      {/* Hero Section */}
      <section className="py-20 px-6 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm mb-6 uppercase tracking-widest font-bold">
          O FIM DA GUERRA NA HORA DA TAREFA
        </motion.div>
        
        <h1 className="text-4xl md:text-7xl font-extrabold max-w-5xl leading-tight mb-8 tracking-tight">
          A Única Intervenção Fônica Capaz de Fazer Seu Filho Ler em <span className="text-[#D4AF37]">30 Dias</span>, Gastando Apenas <span className="text-[#D4AF37]">10 Minutos</span> por Dia.
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mb-12 leading-relaxed">
          Chega de promessas escolares vazias. Assuma o controle com o passo a passo domiciliar que destrava a leitura e devolve a autoestima da criança, mesmo que você não seja professora.
        </p>

        <div className="w-full max-w-[320px] aspect-[9/16] bg-slate-100 rounded-3xl mb-12 shadow-2xl overflow-hidden border-8 border-white relative group mx-auto">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-transparent flex items-center justify-center">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-[#D4AF37] border-b-[10px] border-b-transparent ml-1" />
             </div>
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 text-sm font-medium">Video demonstrativo do método</p>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-[#D4AF37] hover:bg-[#B8860B] text-white font-black text-xl py-6 px-12 rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.4)] uppercase tracking-tight w-full max-w-sm"
        >
          QUERO DESTRAVAR A LEITURA DO MEU FILHO
        </motion.button>
      </section>

      {/* Grid Features */}
      <section className="py-24 px-6 bg-slate-50">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 tracking-tight">O que você desbloqueia agora mesmo</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { emoji: "📖", title: "Nível 1: O Despertar Fonético", text: "O fim das adivinhações. Um processo detalhado onde a criança entende o som real de cada letra." },
            { emoji: "🧩", title: "Nível 2: Conexão e Aceleração", text: "A mágica acontece. O cérebro da criança começa a juntar as peças e formar as primeiras palavras reais." },
            { emoji: "🏆", title: "Nível 3: Domínio e Confiança", text: "Leitura autônoma e escrita firme. O momento em que você respira aliviada ao ver seu filho lendo sozinho." }
          ].map((card, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-3xl border border-slate-200 hover:border-[#D4AF37] transition-all shadow-sm hover:shadow-xl group flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8 bg-slate-50 shadow-inner text-5xl">
                {card.emoji}
              </div>
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-slate-600 leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Logic */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight tracking-tight">Por que nosso método funciona quando a escola falha?</h2>
            <ul className="space-y-6">
              {[
                "Abordagem Clínica Simplificada: Traduzimos táticas avançadas para uma linguagem que qualquer mãe consegue aplicar.",
                "Retenção Acelerada: O cérebro aprende por associação de sons, não por memorização forçada do alfabeto.",
                "Foco na Autonomia: Resgatamos a confiança da criança, transformando o aprendizado em um desafio lógico."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="bg-[#D4AF37]/20 p-1 rounded-full mt-1">
                    <Check className="text-[#D4AF37] w-5 h-5" />
                  </div>
                  <span className="text-lg text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-100 aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative">
             <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent" />
             <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium italic">Espaço para Foto de Criança Lendo</div>
          </div>
        </div>
      </section>

      {/* Carousel Social Proof */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="text-center mb-16 px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Resultados que Devolvem o Alívio</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Veja como a rotina de estudos dessas famílias foi transformada definitivamente.</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-12">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-[0_0_80%] md:flex-[0_0_45%] aspect-[4/5] bg-white rounded-[2rem] shadow-xl border border-slate-100 flex items-center justify-center text-slate-300 italic font-medium">
                  {i === 1 ? "Prints de WhatsApp" : `Resultado ${i}`}
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => emblaApi?.scrollPrev()} className="absolute -left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white shadow-xl border border-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:text-[#D4AF37] transition-all"><ChevronLeft className="w-8 h-8" /></button>
          <button onClick={() => emblaApi?.scrollNext()} className="absolute -right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white shadow-xl border border-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:text-[#D4AF37] transition-all"><ChevronRight className="w-8 h-8" /></button>
          
          <div className="flex justify-center gap-2 mt-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-slate-300" />
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Para quem é este material? */}
      <section className="py-24 px-6 bg-white">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 tracking-tight">Reconhece algum destes sinais no seu dia a dia?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { emoji: "🛑", text: "Você sente que a escola avança os conteúdos, mas seu filho fica para trás." },
            { emoji: "⏰", text: "A hora da tarefa de casa é um verdadeiro desafio que sempre termina em choro ou estresse." },
            { emoji: "🧩", text: "Ele até conhece as letras, mas não consegue formar a conexão entre elas para ler a palavra inteira." },
            { emoji: "💸", text: "Você não tem orçamento para pagar centenas de reais mensais em profissionais particulares." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4 h-full"
            >
              <span className="text-5xl">{item.emoji}</span>
              <p className="text-slate-800 font-medium leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 7: Bônus Exclusivos */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Ao garantir seu acesso hoje, você leva 6 Presentes Exclusivos</h2>
          <p className="text-xl text-slate-600">O empilhamento de valor definitivo para o sucesso do seu filho.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {bonuses.map((bonus, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-md border border-slate-100 flex flex-col items-center text-center gap-6">
              <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 font-black text-2xl border-2 border-dashed border-slate-200">BÔNUS {i+1}</div>
              <div className="flex-1 flex flex-col items-center">
                <h3 className="text-2xl font-bold text-[#D4AF37] mb-3">{bonus.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{bonus.desc}</p>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 line-through">R$ {bonus.oldPrice}</span>
                  <span className="bg-black text-[#D4AF37] text-xs font-black px-4 py-2 rounded-full uppercase tracking-tighter">GRÁTIS HOJE</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-2xl border-4 border-[#D4AF37]/20 text-center">
          <p className="text-2xl font-bold text-slate-800">
            Valor total dos bônus: <span className="text-slate-400 line-through">R$ 277,30</span>. 
            <br />
            <span className="text-[#D4AF37] text-3xl mt-2 block">Levando a oferta hoje: TUDO GRÁTIS.</span>
          </p>
        </div>
      </section>

      {/* Section 8: A Oferta (Pricing) */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Basic Plan */}
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-8">Plano Básico</h3>
              <div className="mb-8">
                <p className="text-slate-400 line-through text-xl">R$ 27,90</p>
                <p className="text-5xl font-black text-slate-900 mt-2">R$ 10,00</p>
              </div>
              <p className="text-slate-600 mb-12">Ideal para quem quer apenas testar a metodologia básica.</p>
              <button className="mt-auto w-full py-5 rounded-2xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-colors uppercase">
                Escolher Básico
              </button>
            </div>

            {/* Premium Plan */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-[3rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-12 rounded-[2.5rem] border-4 border-[#D4AF37] flex flex-col h-full shadow-[0_20px_50px_rgba(212,175,55,0.3)]">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white font-black px-8 py-2 rounded-full text-sm shadow-xl flex items-center gap-2">
                  🔥 MAIS VENDIDO
                </div>
                
                <h3 className="text-3xl font-extrabold text-center mb-4">Plano Premium</h3>
                <p className="text-center text-[#D4AF37] font-bold mb-8 uppercase tracking-widest text-sm">O Método Completo + Todos os Bônus</p>
                
                <div className="text-center mb-8">
                  <p className="text-slate-400 line-through text-xl">R$ 297,00</p>
                  <div className="flex flex-col items-center">
                    <p className="text-6xl font-black text-slate-900 mt-2">R$ 59,90</p>
                    <p className="text-[#D4AF37] font-bold mt-2">ou 6x de R$ 5,49 no cartão</p>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-1 mb-10 bg-slate-50 py-3 rounded-2xl">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="text-slate-600 text-sm font-medium">+2.157 mães já usaram o material</span>
                </div>

                <ul className="space-y-4 mb-12">
                  {[
                    "Material Completo Passo a Passo (Níveis 1, 2 e 3)",
                    "Letra Bastão e Cursiva detalhado",
                    "6 Bônus Exclusivos (Acesso Imediato)",
                    "Suporte prioritário para dúvidas"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <div className="bg-[#D4AF37] rounded-full p-1"><Check className="text-white w-4 h-4" /></div>
                      <span className="font-semibold text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <motion.button 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-full py-6 rounded-2xl bg-[#D4AF37] hover:bg-[#B8860B] text-white font-black text-xl shadow-xl uppercase tracking-tight mb-4"
                >
                  QUERO O ACESSO COMPLETO AGORA
                </motion.button>
                <p className="text-center text-red-600 font-bold text-sm">
                  Último dia com desconto do material completo. 
                  <br />
                  Preço normal a partir do dia {tomorrow}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-slate-900 p-8 rounded-3xl text-center max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 border-2 border-[#D4AF37]">
            <span className="text-4xl">⚠️</span>
            <p className="text-white text-xl font-bold">
              Ainda dá tempo de levar a melhor opção com todas as atualizações e os <span className="text-[#D4AF37]">6 Bônus Exclusivos!</span>
            </p>
          </div>
        </div>
      </section>

      {/* Section 9: Garantia */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto bg-white p-12 rounded-[3rem] shadow-2xl border-2 border-[#D4AF37]/20 flex flex-col items-center text-center">
          <ShieldCheck className="w-24 h-24 text-[#D4AF37] mb-8" />
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight">Risco Zero para Você!</h2>
          <p className="text-2xl text-slate-700 leading-relaxed max-w-3xl mb-0">
            Você tem <strong>7 dias de garantia incondicional</strong>. Baixe o material, aplique nosso método e veja com os próprios olhos. Se por qualquer motivo você achar que não é para o seu filho, devolvemos 100% do seu dinheiro. Sem burocracia.
          </p>
        </div>
      </section>

      {/* Section 10: Prova Social (Avaliações) */}
      <section className="py-24 px-6 bg-white">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 tracking-tight">O que dizem as mamães</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center">
              <div className="flex mb-6">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-slate-600 italic mb-10 flex-1 text-lg">"{t.text}"</p>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-[#D4AF37]/20" />
                <span className="font-black text-slate-900 uppercase tracking-tight">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 11: Quem Somos */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="w-40 h-40 rounded-full bg-white p-2 shadow-2xl mb-12 overflow-hidden border-4 border-[#D4AF37]/20">
             <div className="bg-slate-100 w-full h-full rounded-full flex items-center justify-center text-slate-400 text-xs text-center px-4 font-medium italic">
                Foto Profissional
             </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight">Por trás do Resgate Educacional</h2>
          
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              Somos uma iniciativa focada em devolver às famílias o poder de transformar a educação de seus filhos dentro de casa.
            </p>
            <p>
              Entendemos profundamente a angústia de uma mãe que vê o tempo passar e o filho ficar para trás. Por isso, criamos um método estruturado que foca no que realmente importa: resultados práticos e rápidos.
            </p>
            <p className="font-bold italic text-slate-900 text-xl">
              Nossa missão é destravar o potencial de cada criança através de uma alfabetização consciente e acolhedora.
            </p>
          </div>
        </div>
      </section>

      {/* Section 12: Perguntas Frequentes (FAQ) */}
      <section className="py-24 px-6 bg-white">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 tracking-tight">Perguntas Frequentes</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors text-left"
              >
                <span className="text-lg font-bold text-slate-800">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="text-[#D4AF37]" /> : <ChevronDown className="text-slate-400" />}
              </button>
              {openFaq === i && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  className="p-6 bg-slate-50 text-slate-600 border-t border-slate-100"
                >
                  {faq.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 13: Rodapé (Footer) */}
      <footer className="bg-slate-900 py-20 px-6 text-white text-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-[#D4AF37] font-black text-3xl mb-12">RESGATE EDUCACIONAL</div>
          
          <div className="flex gap-8 mb-12 text-slate-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Políticas de Privacidade</a>
          </div>

          <p className="text-slate-500 max-w-3xl mb-8 leading-relaxed">
            Aviso Legal: Os resultados podem variar de acordo com o empenho e a dedicação de cada família no acompanhamento do método. Este produto não substitui o acompanhamento de profissionais da saúde quando necessário.
          </p>
          
          <div className="text-slate-600 text-sm">
            © 2026 Resgate Educacional - Todos os direitos reservados. 
            <br />
            CNPJ: 00.000.000/0000-00
          </div>
        </div>
      </footer>
    </div>
  );
}

