import { motion, AnimatePresence } from "framer-motion";
import { Check, BookOpen, Puzzle, Trophy, ChevronLeft, ChevronRight, Star, ShieldCheck, ChevronDown, ChevronUp, ShoppingBag, ArrowDown, Play } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const recentSales = [
  "Ana - MG", "Juliana - SP", "Mariana - RJ", "Fernanda - PR", "Beatriz - SC", 
  "Camila - RS", "Amanda - BA", "Larissa - PE", "Patricia - CE", "Renata - DF", 
  "Bruna - GO", "Carla - ES", "Paula - MT", "Vanessa - MS", "Tatiana - RN", 
  "Aline - PB", "Letícia - AL", "Marcela - SE", "Isabela - PI", "Silvia - MA", 
  "Carolina - MG", "Helena - SP", "Laura - RS", "Alice - PR", "Sophia - SC", 
  "Manuela - BA", "Isabella - RJ", "Luiza - GO", "Valentina - MT", "Giovanna - MS", 
  "Eduarda - PE", "Lorena - CE", "Lívia - RN", "Maitê - PB", "Antonella - AL", 
  "Aurora - SE", "Catarina - PI", "Melissa - MA", "Agatha - RO", "Natália - AC", 
  "Alícia - AP", "Rebeca - RR", "Cecília - TO", "Lavínia - PA", "Bianca - AM", 
  "Emanuelly - MG", "Sarah - SP", "Elisa - RJ", "Esther - PR", "Clara - SC", 
  "Marina - RS", "Isadora - BA", "Nina - PE", "Mirella - CE", "Stella - DF", 
  "Evelyn - GO", "Joana - ES", "Milena - MT", "Heloísa - MS", "Bárbara - RN"
];

interface Notification {
  id: number;
  name: string;
}

function SalesToast() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((count: number = 1) => {
    setNotifications(prev => {
      const newNotifications = [...prev];
      for (let i = 0; i < count; i++) {
        const randomName = recentSales[Math.floor(Math.random() * recentSales.length)];
        const id = Date.now() + i + Math.random();
        newNotifications.push({ id, name: randomName });
        
        // Remove after 4 seconds
        setTimeout(() => {
          setNotifications(current => current.filter(n => n.id !== id));
        }, 4000);
      }
      return newNotifications;
    });
  }, []);

  useEffect(() => {
    let timeoutId: any;

    const runSequence = async () => {
      const wait = (ms: number) => new Promise(resolve => timeoutId = setTimeout(resolve, ms));

      while (true) {
        // 1. Primeira aparece
        addNotification(1);
        await wait(25000);

        // 2. Aparece 3 em seguida com pausa maior
        for (let i = 0; i < 3; i++) {
          addNotification(1);
          await wait(6000);
        }

        // 3. Pausa longa, depois 3 em seguida
        await wait(35000);
        for (let i = 0; i < 3; i++) {
          addNotification(1);
          await wait(6000);
        }

        // 4. 2 a cada 25 segundos
        for (let i = 0; i < 2; i++) {
          await wait(25000);
          addNotification(1);
        }

        // 5. 2 a cada 20 segundos
        for (let i = 0; i < 2; i++) {
          await wait(20000);
          addNotification(1);
        }

        // Reinicia o ciclo
        await wait(30000);
      }
    };

    runSequence();
    return () => clearTimeout(timeoutId);
  }, [addNotification]);

  return (
    <div className="fixed bottom-4 left-4 z-[100] flex flex-col-reverse gap-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className="bg-white border border-slate-100 shadow-2xl rounded-2xl p-4 flex items-center gap-4 min-w-[260px] pointer-events-auto"
          >
            <div className="bg-green-100 p-2 rounded-full">
              <span className="text-xl">🛒</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-slate-900 font-bold text-sm">
                {n.name}
              </span>
              <span className="text-slate-600 text-xs">
                Comprou o Premium
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function DiscountPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 40, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-[2rem] max-w-md w-full p-6 md:p-8 shadow-2xl border-4 border-[#D4AF37] text-center overflow-hidden"
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-3 right-4 text-slate-400 hover:text-slate-700 text-3xl font-light leading-none"
            >
              ×
            </button>

            <div className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 animate-pulse">
              ⚠️ Oferta Limitada
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 leading-tight uppercase tracking-tight">
              Espera, Mãe! <br />Última Chance Real
            </h2>

            <p className="text-slate-600 font-medium mb-5 text-sm md:text-base leading-relaxed">
              Só agora, nesta tela, liberamos o <strong>Plano Premium completo + 6 bônus</strong> por um preço que <strong>não volta a aparecer</strong>.
            </p>

            <div className="bg-[#FFFBEB] border-2 border-dashed border-[#D4AF37] rounded-2xl p-5 mb-5">
              <p className="text-red-600 line-through text-base font-bold">De R$ 39,90</p>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Por apenas</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl font-bold text-slate-900">R$</span>
                <motion.span
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-6xl md:text-7xl font-black text-[#D4AF37] inline-block"
                  style={{ textShadow: "0 6px 24px rgba(212,175,55,0.4)" }}
                >
                  14,90
                </motion.span>
              </div>
              <p className="text-emerald-600 font-black text-xs uppercase tracking-tighter mt-2">
                Economia de R$ 40,00 agora
              </p>
            </div>

            <p className="text-red-600 font-black uppercase text-xs tracking-wider mb-5">
              ⏳ Essa oferta some assim que você fechar esta janela
            </p>

            <motion.a
              href="https://pay.kirvano.com/a06e7ea1-ecef-4f82-a02d-14adcd5fe27f"
              target="_blank"
              rel="noopener noreferrer"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 1.3 }}
              className="block w-full py-5 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white font-black text-lg shadow-[0_10px_30px_rgba(34,197,94,0.4)] uppercase tracking-tight mb-3"
            >
              SIM! QUERO AGORA POR R$ 14,90
            </motion.a>

            <a
              href="https://pay.kirvano.com/ed693073-011c-4fc0-a8f6-332ec1815d19"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="block text-slate-400 hover:text-slate-600 text-xs font-medium underline underline-offset-2"
            >
              Não, prefiro recusar essa oferta única
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LandingPage() {
  const [date, setDate] = useState("");
  const [tomorrow, setTomorrow] = useState("");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showSocialPlayButton, setShowSocialPlayButton] = useState(true);
  const [showDiscount, setShowDiscount] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const socialVideoRef = useRef<HTMLVideoElement>(null);

  // Pop-up de upsell abre apenas ao clicar no botão do plano de R$ 10

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.75;
      videoRef.current.play();
      setShowPlayButton(false);
    }
  };

  const handlePlaySocialVideo = () => {
    if (socialVideoRef.current) {
      socialVideoRef.current.muted = false;
      socialVideoRef.current.volume = 0.75;
      socialVideoRef.current.play();
      setShowSocialPlayButton(false);
    }
  };

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const today = new Date();
    setDate(today.toLocaleDateString("pt-BR"));
    
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + 1);
    setTomorrow(nextDay.toLocaleDateString("pt-BR"));
  }, []);

  const programItems = [
    { title: "Nível 1: O Despertar Fonético (Letra Bastão e Cursiva)", desc: "O fim das adivinhações. Um passo a passo detalhado onde a criança entende o som real de cada letra, formando a conexão inicial." },
    { title: "Nível 2: Conexão e Aceleração (Letra Bastão e Cursiva)", desc: "A mágica acontece. O cérebro da criança junta as peças e forma palavras reais sem esforço." },
    { title: "Nível 3: Domínio e Confiança (Letra Bastão e Cursiva)", desc: "Leitura autônoma e escrita firme. O momento em que você respira aliviada ao ver seu filho lendo sozinho." }
  ];

  const bonusItems = [
    { title: "Bônus 1: Acelerador de Consciência Silábica", desc: "O treino prático para fatiar e entender a estrutura das palavras sem decoreba." },
    { title: "Bônus 2: Jogo de Retenção Acelerada (Fichas Silábicas)", desc: "Cartões visuais que transformam o aprendizado de palavras longas em brincadeira." },
    { title: "Bônus 3: Protocolo de Fluência Leitora", desc: "Focado em fazer a leitura sair natural e com ritmo, usando frases curtas e imagens de apoio." },
    { title: "Bônus 4: Tiras de Leitura Dinâmica", desc: "Pílulas de leitura rápida. Frases em bastão e cursiva para treinar o olhar em poucos minutos por dia." },
    { title: "Bônus 5: Desafio dos 50 Textos Fatiados", desc: "Um sistema de quebra-cabeças com textos curtos que resolve as dificuldades mais avançadas." },
    { title: "Bônus 6: Fundação da Leitura Rápida (Sílabas Simples)", desc: "O guia de consulta para a criança reconhecer padrões simples imediatamente." }
  ];

  const productExamples = [
    {
      title: "Caderno de Grafismo Fônico - Nível 1",
      subtitle: "Fundação fônica completa em Letra Bastão e Cursiva para acabar com o hábito de chutar palavras.",
      image: "https://i.imgur.com/KO4maH3.png"
    },
    {
      title: "Conexão Silábica - Nível 2",
      subtitle: "O cérebro da criança começa a juntar os sons de forma automatizada para formar as primeiras palavras reais.",
      image: "https://i.imgur.com/GEhxP4N.png"
    },
    {
      title: "Domínio e Autonomia - Nível 3",
      subtitle: "Passo a passo avançado focado na leitura fluente de frases longas e fixação da escrita firme.",
      image: "https://i.imgur.com/a9muPzM.png"
    },
    {
      title: "Jogos e Fichas Silábicas Práticas",
      subtitle: "Gamificação domiciliar para prender a atenção da criança e acelerar a memorização sem cansaço.",
      image: "https://i.imgur.com/22Rw9jC.png"
    }
  ];

  const testimonials = [
    { name: "Mariana Silva", text: "Meu filho tinha muita dificuldade e hoje lê livrinhos sozinho. Mudou nossa vida!", image: "https://i.imgur.com/PHQ6tpy.png" },
    { name: "Carla Oliveira", text: "A hora da tarefa era um choro só. Agora ele se sente capaz e motivado.", image: "https://i.imgur.com/gpEBlEG.png" },
    { name: "Patrícia Mendes", text: "O método é muito simples de aplicar, mesmo eu não sendo pedagoga.", image: "https://i.imgur.com/CSHkF2d.png" }
  ];

  const faqs = [
    { q: "Como vou receber o material?", a: "O acesso é imediato e 100% digital. Após a confirmação do pagamento, você receberá o link para download em seu e-mail e poderá imprimir quando quiser." },
    { q: "Para qual idade é recomendado?", a: "O material foi desenvolvido para crianças em fase de alfabetização, geralmente entre 4 e 8 anos, ou crianças mais velhas que ainda apresentam dificuldades na leitura." },
    { q: "O material é em PDF?", a: "Sim, todos os arquivos estão em formato PDF de alta qualidade, prontos para impressão em casa ou em gráficas." },
    { q: "Quanto tempo demora para ver resultados?", a: "Seguindo o passo a passo de apenas 10 minutos por dia, muitas mães relatam mudanças significativas na percepção sonora já na primeira semana." }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          // Tenta iniciar com som
          video.muted = false;
          video.volume = 0.75;
          
          video.play().then(() => {
            // Se o navegador permitiu com som, removemos o botão de overlay
            if (video === videoRef.current) setShowPlayButton(false);
            if (video === socialVideoRef.current) setShowSocialPlayButton(false);
          }).catch(() => {
            // Se o navegador bloqueou som sem interação prévia, iniciamos mudo
            video.muted = true;
            video.play();
          });
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (videoRef.current) observer.observe(videoRef.current);
    if (socialVideoRef.current) observer.observe(socialVideoRef.current);

    // Evento global para "desmutar" os vídeos na primeira interação real
    const unmuteAll = () => {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.muted = false;
        setShowPlayButton(false);
      }
      if (socialVideoRef.current && !socialVideoRef.current.paused) {
        socialVideoRef.current.muted = false;
        setShowSocialPlayButton(false);
      }
      window.removeEventListener('click', unmuteAll);
      window.removeEventListener('touchstart', unmuteAll);
      window.removeEventListener('scroll', unmuteAll);
    };

    window.addEventListener('click', unmuteAll);
    window.addEventListener('touchstart', unmuteAll);
    window.addEventListener('scroll', unmuteAll);

    return () => {
      observer.disconnect();
      window.removeEventListener('click', unmuteAll);
      window.removeEventListener('touchstart', unmuteAll);
      window.removeEventListener('scroll', unmuteAll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#D4AF37]/30">
      <SalesToast />
      <DiscountPopup open={showDiscount} onClose={() => setShowDiscount(false)} />
      {/* Top Bar */}
      <div className="bg-black text-[#D4AF37] py-2 text-center text-sm font-bold uppercase tracking-wider sticky top-0 z-50">
        ⚠️ OFERTA VÁLIDA SOMENTE HOJE - {date}
      </div>

      {/* Hero Section */}
      <section className="pt-4 pb-12 px-6 flex flex-col items-center text-center bg-[radial-gradient(50%_50%_at_50%_50%,_#FFFFFF_0%,_#FFF4CC_100%)]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm mb-6 uppercase tracking-widest font-bold">
          O FIM DA GUERRA NA HORA DA TAREFA
        </motion.div>
        
        <h1 className="text-4xl md:text-7xl font-extrabold max-w-5xl leading-tight mb-8 tracking-tight">
          A Única Intervenção Fônica Capaz de Fazer Seu Filho Ler em <span className="text-[#D4AF37]">30 Dias</span>, Gastando Apenas <span className="text-[#D4AF37]">10 Minutos</span> por Dia.
        </h1>
        

        <picture className="mb-12 max-w-2xl w-full">
          <source media="(max-width: 767px)" srcSet="https://i.imgur.com/9gRz4da.png" />
          <img
            src="https://i.imgur.com/U0beZTE.png"
            alt="Material do Método"
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
        </picture>


        <motion.a
          href="#oferta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white font-black text-xl py-6 px-12 rounded-2xl shadow-[0_10px_30px_rgba(34,197,94,0.4)] uppercase tracking-tight w-full max-w-sm inline-block text-center"
        >
          QUERO DESTRAVAR A LEITURA DO MEU FILHO
        </motion.a>
        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="bg-white rounded-full px-6 py-2.5 shadow-xl border border-slate-100 flex items-center gap-3">
            <div className="flex -space-x-2">
              <img src="https://i.imgur.com/tR994JQ.png" alt="Criança 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
              <img src="https://i.imgur.com/Ngnrla4.png" alt="Criança 2" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
              <img src="https://i.imgur.com/MIv4BCw.png" alt="Criança 3" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
            </div>
            <span className="text-slate-600 font-black text-sm uppercase tracking-tighter">
              +300 crianças transformadas
            </span>
          </div>
          
          <div className="flex flex-row items-center gap-6 md:gap-8 text-slate-500 font-bold text-sm md:text-base">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-600" />
              <span>7 Dias Garantia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: O que você desbloqueia agora mesmo */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 tracking-tight">O que você desbloqueia agora mesmo</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                emoji: "📘", 
                title: "Caderno Nível 1: O Despertar Fonético", 
                badge: "NÍVEL 1",
                badgeClass: "bg-blue-600 text-white",
                result: "🎯 Sílabas dominadas em dias",
                bullets: [
                  "📥 PDF liberado na hora",
                  "📋 Passo a passo à prova de falhas",
                  "✏️ Bastão e Cursiva inclusos",
                  "🎯 Elimina o vício de chutar"
                ]
              },
              { 
                emoji: "🧩", 
                title: "Caderno Nível 2: Conexão e Aceleração", 
                badge: "NÍVEL 2",
                badgeClass: "bg-emerald-600 text-white",
                result: "🎯 Primeiras palavras reais",
                bullets: [
                  "👁️ Visual estruturado para focar",
                  "🔗 Junção rápida de sílabas",
                  "✏️ Bastão e Cursiva inclusos",
                  "🧠 Primeiras palavras sem bloqueio"
                ]
              },
              { 
                emoji: "🏆", 
                title: "Caderno Nível 3: Domínio e Confiança", 
                badge: "NÍVEL 3 ⭐",
                badgeClass: "bg-[#F5C518] text-slate-900",
                result: "🎯 Leitura autônoma completa",
                bullets: [
                  "📈 Nível avançado de consolidação",
                  "📝 Frases inteiras e fixação",
                  "✍️ Refinamento em Cursiva",
                  "🏆 Leitura 100% autônoma"
                ]
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#FFFBEB] pt-8 px-8 pb-0 md:pt-10 md:px-10 rounded-[2.5rem] shadow-xl border border-[#D4AF37]/30 flex flex-col gap-6 text-left hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="flex justify-center">
                  <span className={`inline-block px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </div>
                <div className="text-7xl md:text-8xl text-center py-4 leading-none">{item.emoji}</div>
                <div>
                  <h3 className="text-xl font-black mb-6 leading-tight text-center" style={{ color: "#F5C518" }}>{item.title}</h3>
                  <ul className="space-y-4 mb-6">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                        <span className="text-slate-700 leading-relaxed font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="-mx-8 md:-mx-10 mt-auto bg-[#F5C518] text-slate-900 font-black text-center py-4 px-4 text-sm md:text-base uppercase tracking-tight rounded-b-[2.5rem]">
                  {item.result}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logic */}
      <section className="py-16 px-6 bg-[#FFFDE7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-slate-900">
              A Técnica Comprovada por Harvard que Ensina Qualquer Criança a Ler em 30 Dias
            </h2>
            <div className="flex justify-center py-8">
              <img
                src="https://i.imgur.com/uCfFn2j.png"
                alt="Harvard University"
                className="h-20 md:h-28 w-auto"
              />
            </div>
            <p className="text-lg md:text-xl text-slate-800 max-w-3xl mx-auto leading-relaxed font-medium">
              Você sabia que existe uma técnica{" "}
              <span className="bg-[#F5C518] text-slate-900 font-bold px-2 py-0.5 rounded">
                comprovada por Harvard
              </span>{" "}
              que permite qualquer criança aprender a ler de forma natural, rápida e sem traumas?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: "🧠", iconBg: "bg-blue-100", title: "Ciência Simplificada", text: "Táticas avançadas traduzidas em passos simples para qualquer mãe aplicar." },
              { icon: "⚡", iconBg: "bg-[#D4AF37]/20", title: "Aprendizado Acelerado", text: "O cérebro aprende por sons, não por decoreba. Resultado em dias, não meses." },
              { icon: "🏆", iconBg: "bg-emerald-100", title: "Confiança de Volta", text: "A criança passa a encarar a leitura como um desafio e a autoestima cresce junto." }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center gap-4 hover:shadow-xl transition-all"
              >
                <div className={`${card.iconBg} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Encontre o exercício certo em segundos */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Encontre o exercício certo em segundos
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Um ecossistema perfeitamente organizado para você identificar a dificuldade exata do seu filho e aplicar a solução imediata.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: "🅰️", title: "Sons das Vogais" },
              { emoji: "✏️", title: "Letra Bastão Nativa" },
              { emoji: "🖋️", title: "Transição Cursiva" },
              { emoji: "🧩", title: "Conexão Silábica" },
              
              { emoji: "⏱️", title: "Treinos de 10 Minutos" },
              { emoji: "🚀", title: "Sílabas Complexas" },
              { emoji: "📖", title: "Fluência Leitora" },
              { emoji: "✍️", title: "Escrita Firme" }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, borderColor: "#D4AF37" }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all flex flex-col items-center text-center gap-3"
              >
                <span className="text-3xl">{card.emoji}</span>
                <h3 className="font-bold text-slate-900 leading-tight">{card.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: EXEMPLOS REAIS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">EXEMPLOS REAIS</h2>
          <p className="text-xl text-slate-600 font-medium">Veja o que você vai receber</p>
        </div>

        <div 
          onMouseEnter={handlePlayVideo}
          onTouchStart={handlePlayVideo}
          className="w-full max-w-[320px] aspect-[9/16] bg-black rounded-3xl mb-16 shadow-2xl overflow-hidden border-8 border-white relative mx-auto group"
        >
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            controls
            playsInline
            loop
            muted
          >
            <source src="https://i.imgur.com/PNodnZZ.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>

          <AnimatePresence>
            {showPlayButton && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]"
              >
                <motion.button
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayVideo}
                  className="bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white p-6 rounded-full shadow-[0_0_50px_rgba(34,197,94,0.6)] mb-4"
                >
                  <Play className="w-10 h-10 fill-current" />
                </motion.button>
                <button 
                  onClick={handlePlayVideo}
                  className="bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-tight shadow-xl border-2 border-white/20"
                >
                  Clique aqui para ouvir
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="max-w-xs mx-auto my-10 h-1 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-6">
              {productExamples.map((example, i) => (
                <div key={i} className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_70%] aspect-[4/5] md:aspect-[3/2] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden group">
                  <img 
                    src={example.image} 
                    alt={example.title}
                    className="absolute inset-0 w-full h-full object-cover md:object-contain bg-white"
                  />
                  
                  {/* Bottom-Center Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center text-center">
                    <div className="max-w-xl">
                      <div className="inline-block bg-[#D4AF37] text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 shadow-lg">
                        Material Digital
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-white mb-2 leading-tight uppercase tracking-tighter">
                        {example.title}
                      </h3>
                      <p className="text-sm md:text-base text-slate-200 font-medium leading-relaxed line-clamp-2 md:line-clamp-none">
                        {example.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center mt-12 gap-6">
            <div className="flex gap-4">
              <button onClick={() => emblaApi?.scrollPrev()} className="w-14 h-14 bg-white shadow-xl border border-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"><ChevronLeft className="w-8 h-8" /></button>
              <button onClick={() => emblaApi?.scrollNext()} className="w-14 h-14 bg-white shadow-xl border border-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"><ChevronRight className="w-8 h-8" /></button>
            </div>
            <div className="flex gap-2">
              {productExamples.map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${selectedIndex === i ? 'bg-[#D4AF37] w-8' : 'bg-slate-200'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Bônus Exclusivos (O Empilhamento de Valor) */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-black text-[#D4AF37] mb-4 flex items-center justify-center gap-3">
              <span className="text-5xl md:text-7xl">🎁</span> BÔNUS
            </h3>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Ao garantir seu acesso hoje, você leva 6 Presentes Exclusivos
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { 
                title: "Acelerador de Consciência Silábica", 
                desc: "Técnicas práticas para a criança dominar a estrutura das sílabas rapidamente.",
                oldPrice: "47,90",
                img: "https://i.imgur.com/K1FlMpX.png"
              },
              { 
                title: "Jogo de Retenção Acelerada - Fichas Silábicas", 
                desc: "Material lúdico para fixar o aprendizado de forma divertida e eficiente.",
                oldPrice: "37,90",
                img: "https://i.imgur.com/b6Is6u1.png"
              },
              { 
                title: "Protocolo de Fluência Leitora", 
                desc: "O guia definitivo para eliminar a leitura pausada e robotizada.",
                oldPrice: "57,90",
                img: "https://i.imgur.com/G0VWwVm.png"
              },
              { 
                title: "Tiras de Leitura Dinâmica", 
                desc: "Exercícios rápidos de 10 minutos para destravar a leitura natural.",
                oldPrice: "27,90",
                img: "https://i.imgur.com/hW2TZJo.png"
              },
              { 
                title: "Desafio dos 50 Textos Fatiados", 
                desc: "Atividades progressivas que constroem a confiança na leitura de frases.",
                oldPrice: "67,90",
                img: "https://i.imgur.com/iOWJrLt.png"
              },
              { 
                title: "Fundação da Leitura Rápida", 
                desc: "O segredo para acelerar a compreensão de textos sem cansaço.",
                oldPrice: "37,90",
                img: "https://i.imgur.com/2q7pzfO.png"
              }
            ].map((bonus, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-6 group hover:shadow-2xl transition-all"
              >
                <div className="w-full md:w-40 aspect-square bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                  <img src={bonus.img} alt={bonus.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start gap-1 mb-2">
                    <span className="text-xl">🎁</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BÔNUS {i + 1}</span>
                  </div>
                  <h3 className="text-lg font-black text-[#D4AF37] mb-1 uppercase tracking-tight">{bonus.title}</h3>
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center md:items-start mb-4"
                  >
                    <span className="text-red-600 line-through text-lg md:text-xl font-bold">R$ {bonus.oldPrice}</span>
                    <span className="text-emerald-600 text-xl md:text-2xl font-black uppercase tracking-tighter">
                      Por R$ 0,00
                    </span>
                  </motion.div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{bonus.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border-4 border-[#D4AF37]/20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />
            <p className="text-slate-500 font-bold mb-2 uppercase tracking-widest text-sm">Quanto você economiza levando hoje:</p>
            <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-2">
              Valor total dos bônus: <span className="text-red-600 line-through">R$ 277,30</span>
            </h4>
            <div className="text-emerald-600 font-black text-3xl md:text-4xl uppercase tracking-tighter">
              Levando a oferta hoje: TUDO GRÁTIS
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-8 tracking-tight">O que dizem as mamães</h2>
        
        <div className="mb-16 max-w-4xl mx-auto">
          <div 
            onMouseEnter={handlePlaySocialVideo}
            onTouchStart={handlePlaySocialVideo}
            className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white aspect-[9/16] max-w-[320px] mx-auto relative group"
          >
            <video 
              ref={socialVideoRef}
              className="w-full h-full object-cover"
              controls
              playsInline
              loop
              muted
            >
              <source src="https://i.imgur.com/O6sRb8J.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>

            <AnimatePresence>
              {showSocialPlayButton && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]"
                >
                  <motion.button
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlaySocialVideo}
                    className="bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white p-6 rounded-full shadow-[0_0_50px_rgba(34,197,94,0.6)] mb-4"
                  >
                    <Play className="w-10 h-10 fill-current" />
                  </motion.button>
                  <button 
                    onClick={handlePlaySocialVideo}
                    className="bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-tight shadow-xl border-2 border-white/20 flex items-center gap-2"
                  >
                    Clique aqui para ouvir <ArrowDown className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="oferta" className="py-16 px-6 bg-white relative scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12 tracking-tight">Escolha o Plano que mais combina com seu você...</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 flex flex-col shadow-sm text-center">
              <h3 className="text-2xl font-black text-slate-400 mb-8 uppercase tracking-widest">Plano Básico</h3>
              <div className="mb-10">
                <p className="text-red-600 line-through text-lg">R$ 27,90</p>
                <div className="flex flex-wrap items-baseline justify-center gap-1">
                  <span className="text-2xl font-bold text-slate-900">R$</span>
                  <span className="text-6xl font-black text-slate-900">10,00</span>
                  <span className="text-slate-500 font-medium">à vista</span>
                </div>
              </div>

              <div className="space-y-4 mb-12 flex-1 flex flex-col items-center">
                {[
                  "Nível 1: O Despertar Fonético",
                  "Nível 2: Conexão e Aceleração",
                  "Nível 3: Domínio e Confiança"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-center justify-start w-full max-w-[250px] text-left">
                    <Check className="text-slate-300 w-4 h-4 shrink-0" />
                    <span className="text-slate-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowDiscount(true)}
                className="w-full py-5 rounded-2xl bg-[#D4AF37] hover:bg-[#B8860B] text-white font-black uppercase tracking-tight mb-8 inline-block text-center shadow-lg"
              >
                Quero apenas o básico
              </button>

              <div className="bg-slate-900 text-white py-4 px-6 rounded-2xl text-center text-xs font-bold flex flex-col items-center justify-center gap-3 shadow-xl border border-[#D4AF37]/30">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <span>Ainda dá tempo de levar a melhor opção: atualizações e os 6 Bônus Exclusivos!</span>
                </div>
                <div className="flex justify-center gap-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    >
                      <ArrowDown className="w-5 h-5 text-[#D4AF37]" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="flex flex-col gap-4">
              <div className="relative group flex-1">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-[3rem] blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
                <div className="relative bg-white p-6 md:p-8 rounded-[3rem] border-4 border-[#D4AF37] flex flex-col h-full shadow-[0_30px_60px_rgba(212,175,55,0.25)] overflow-hidden text-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 bg-red-600 text-white font-black px-8 py-2 md:rounded-bl-3xl rounded-b-xl text-sm shadow-xl flex items-center gap-2 z-10 whitespace-nowrap">
                    🔥 MAIS VENDIDO
                  </div>
                  
                  <h3 className="text-3xl font-black text-slate-900 mb-1 mt-16 md:mt-0 uppercase tracking-tight">Plano Premium</h3>
                  <p className="text-[#D4AF37] font-black mb-4 uppercase tracking-widest text-xs">Acesso Vitalício + Todos os Bônus</p>
                  
                  <div className="mb-4">
                     <p className="text-red-600 line-through text-base">R$ 297,00</p>
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-xl font-bold text-slate-900">R$</span>
                        <span className="text-5xl md:text-6xl font-black text-slate-900">27,00</span>
                        <span className="text-slate-500 font-bold text-sm uppercase tracking-tighter">à vista</span>
                      </div>
                      <p className="text-[#D4AF37] font-black text-base md:text-lg mt-1 uppercase tracking-tighter">Ou 6x de R$ 4,50 no cartão</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 mb-5 text-slate-500 text-xs font-bold bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                    <span>+2.157 mães já usaram o material e conquistaram a leitura fluente</span>
                  </div>

                  <div className="space-y-2 mb-5 flex flex-col items-center">
                    {[
                      "O Programa Completo (Níveis 1, 2 e 3).",
                      "Letra Bastão e Cursiva detalhado em passo a passo.",
                      "Suporte exclusivo para dúvidas."
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start justify-start w-full max-w-[280px] text-left">
                        <div className="mt-1 bg-[#D4AF37] rounded-full p-0.5 shrink-0"><Check className="text-white w-3 h-3" /></div>
                        <span className="font-bold text-slate-700 text-sm leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-slate-100 mb-5" />
                  
                  <h4 className="font-black text-slate-900 mb-4 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                    <span>🎁</span> 6 Bônus Exclusivos (Acesso Imediato)
                  </h4>
                  
                  <div className="space-y-2 mb-6 flex flex-col items-center">
                    {[
                      "Bônus 1: Acelerador de Consciência Silábica",
                      "Bônus 2: Jogo de Retenção Acelerada",
                      "Bônus 3: Protocolo de Fluência Leitora",
                      "Bônus 4: Tiras de Leitura Dinâmica",
                      "Bônus 5: Desafio dos 50 Textos Fatiados",
                      "Bônus 6: Fundação da Leitura Rápida"
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-center justify-start w-full max-w-[280px] text-left">
                        <Check className="text-[#D4AF37] w-4 h-4 shrink-0" />
                        <span className="font-bold text-slate-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <motion.a
                    href="https://pay.kirvano.com/d8d06c9f-e81b-4a4e-af6a-1a259dfe4fc7"
                    target="_blank"
                    rel="noopener noreferrer"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white font-black text-lg md:text-xl shadow-[0_15px_40px_rgba(34,197,94,0.4)] uppercase tracking-tight mb-3 inline-block text-center"
                  >
                    QUERO O MATERIAL COMPLETO
                  </motion.a>
                  <p className="text-center text-red-600 font-black text-xs uppercase tracking-wider">
                    Último dia com desconto do material completo. 
                    <br />
                    Preço normal a partir do dia {tomorrow}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-8 tracking-tight">Depoimentos</h2>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-4xl mx-auto mb-16">
          {[
            "https://i.imgur.com/X0ZwkvB.jpeg",
            "https://i.imgur.com/GcM5DRs.jpeg",
            "https://i.imgur.com/AVTtPHm.jpeg",
            "https://i.imgur.com/keJhWpy.jpeg",
          ].map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-white">
              <img src={src} alt={`Prova social ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center">
              <p className="text-slate-600 italic mb-10 flex-1 text-lg leading-relaxed">"{t.text}"</p>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-[#D4AF37]/20 overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <span className="font-black text-slate-900 uppercase tracking-tight">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: Garantia */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto bg-[#D4AF37] p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-white/20 flex flex-col items-center text-center text-white">
          <ShieldCheck className="w-16 h-16 md:w-20 md:h-20 text-white mb-6 md:mb-8" />
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-8 tracking-tight uppercase">Risco Zero para Você!</h2>
          <p className="text-sm md:text-lg leading-relaxed max-w-2xl mb-0 font-medium">
            Você tem <strong>7 dias de garantia incondicional</strong>. Baixe o material, aplique nosso método e veja com os próprios olhos. Se por qualquer motivo você achar que não é para o seu filho, devolvemos 100% do seu dinheiro. Sem burocracia.
          </p>
        </div>
      </section>



      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white p-2 shadow-2xl overflow-hidden border-4 border-[#D4AF37]/20">
              <img src="https://i.imgur.com/atfjAG1.jpeg" alt="Suzane Lopes" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <span className="font-bold text-[#D4AF37] text-sm md:text-base mb-3 block uppercase tracking-widest">Quem criou tudo isso?</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">Suzane Lopes</h2>
            <p className="italic text-slate-700 text-base md:text-lg mb-6">Especialista em Alfabetização e Desenvolvimento Infantil</p>

            <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed mb-6">
              <p>
                Depois de anos acompanhando crianças com dificuldade de leitura, Suzane percebeu que o problema não estava nas crianças, estava no método. A escola ensina do jeito que sempre ensinou. Suzane ensina do jeito que o cérebro infantil realmente aprende.
              </p>
              <p>
                Foi assim que nasceu o Lendo em 30 Dias: um método estruturado, baseado em ciência e simplificado para que qualquer mãe possa aplicar em casa, sem precisar ser professora, sem pressão, sem traumas.
              </p>
            </div>

            <blockquote className="bg-[#FFFDE7] border-l-4 border-[#D4AF37] rounded-r-2xl p-5 md:p-6 mb-8 text-left">
              <p className="font-bold text-slate-900 text-base md:text-lg italic leading-relaxed">
                "Minha missão é simples: devolver à sua criança a confiança que ela merece e provar que 10 minutos por dia são suficientes para mudar tudo."
              </p>
              <footer className="mt-3 text-sm font-semibold text-[#B8860B] not-italic">— Suzane Lopes</footer>
            </blockquote>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="inline-flex items-center gap-2 bg-[#FFFDE7] border border-[#D4AF37]/30 rounded-full px-4 py-2 text-sm font-semibold text-slate-800">
                <span className="text-lg">🎓</span> Especialista em Alfabetização
              </span>
              <span className="inline-flex items-center gap-2 bg-[#FFFDE7] border border-[#D4AF37]/30 rounded-full px-4 py-2 text-sm font-semibold text-slate-800">
                <span className="text-lg">👶</span> +500 crianças transformadas
              </span>
              <span className="inline-flex items-center gap-2 bg-[#FFFDE7] border border-[#D4AF37]/30 rounded-full px-4 py-2 text-sm font-semibold text-slate-800">
                <span className="text-lg">📚</span> Método baseado em neurociência
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 12: Perguntas Frequentes (FAQ) */}
      <section className="py-16 px-6 bg-white">
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
      <footer className="bg-slate-900 py-12 px-6 text-white text-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-8 border-4 border-[#D4AF37]/30 shadow-xl">
            <img src="https://i.imgur.com/wKX4vto.jpeg" alt="Lendo em 30 Dias" className="w-full h-full object-cover" />
          </div>

          <h3 className="text-[#D4AF37] font-black text-3xl md:text-4xl mb-8 tracking-tight">Lendo em 30 Dias</h3>

          <div className="text-slate-600 text-sm">
            © 2026 - Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
