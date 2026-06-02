import { Check, Trophy, ChevronLeft, ChevronRight, ShieldCheck, ChevronDown, ChevronUp, ArrowDown, Play, Target, Puzzle, Timer, BookOpen } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preconnect", href: "https://i.imgur.com", crossOrigin: "" },
      { rel: "dns-prefetch", href: "https://i.imgur.com" },
      {
        rel: "preload",
        as: "image",
        href: "https://i.imgur.com/Tr7zGoR.png",
        fetchpriority: "high",
      },
    ],
  }),
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

      // Wait 15 seconds before the first one appears
      await wait(15000);

      while (true) {
        addNotification(1);
        // Wait 15 seconds between each notification
        await wait(15000);
      }
    };

    runSequence();
    return () => clearTimeout(timeoutId);
  }, [addNotification]);

  return (
    <div className="fixed bottom-4 left-4 z-[100] flex flex-col-reverse gap-3 pointer-events-none">
      <>
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-white border border-slate-100 shadow-2xl rounded-2xl p-4 flex items-center gap-4 min-w-[260px] pointer-events-auto animate-fade-in"
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
          </div>
        ))}
      </>
    </div>
  );
}

const BASIC_CHECKOUT_URL = "https://pay.kirvano.com/ed693073-011c-4fc0-a8f6-332ec1815d19";
const PREMIUM_UPSELL_CHECKOUT_URL = "https://pay.kirvano.com/a06e7ea1-ecef-4f82-a02d-14adcd5fe27f";

function DiscountPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-[2rem] max-w-md w-full p-6 md:p-8 shadow-2xl border-4 border-[#D4AF37] text-center overflow-hidden animate-scale-in"
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
              <p className="text-red-600 line-through text-base font-bold">De R$ 27,00</p>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Por apenas</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl font-bold text-slate-900">R$</span>
                <span
                  className="text-6xl md:text-7xl font-black text-[#D4AF37] inline-block animate-pulse-xl"
                  style={{ textShadow: "0 6px 24px rgba(212,175,55,0.4)" }}
                >
                  17,00
                </span>
              </div>
              <p className="text-emerald-600 font-black text-xs uppercase tracking-tighter mt-2">
                Economia de R$ 10,00 agora
              </p>
            </div>

            <p className="text-red-600 font-black uppercase text-xs tracking-wider mb-5">
              ⏳ Essa oferta some assim que você fechar esta janela
            </p>

            <a
              href={PREMIUM_UPSELL_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-5 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white font-black text-lg shadow-[0_10px_30px_rgba(34,197,94,0.4)] uppercase tracking-tight mb-3 animate-pulse-cta hover:scale-105 active:scale-95 transition-transform"
            >
              SIM! QUERO AGORA POR R$ 17,00
            </a>

            <a
              href={BASIC_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="block w-full py-4 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-sm uppercase tracking-tight mb-3 text-center transition-colors"
            >
              NÃO! QUERO O BÁSICO SEM OS BÔNUS POR R$10
            </a>

            <a
              href={BASIC_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="block text-slate-400 hover:text-slate-600 text-xs font-medium underline underline-offset-2"
            >
              Não, prefiro recusar essa oferta única
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function LandingPage() {
  const [date, setDate] = useState("");
  const [tomorrow, setTomorrow] = useState("");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [methodEmblaRef, methodEmblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { active: false }
    }
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [methodSelectedIndex, setMethodSelectedIndex] = useState(0);
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
    if (!methodEmblaApi) return;
    const onSelect = () => setMethodSelectedIndex(methodEmblaApi.selectedScrollSnap());
    methodEmblaApi.on('select', onSelect);
    return () => {
      methodEmblaApi.off('select', onSelect);
    };
  }, [methodEmblaApi]);

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

  const faqs = [
    { q: "Como vou receber o material?", a: "O acesso é imediato e 100% digital. Após a confirmação do pagamento, você receberá o link para download em seu e-mail e poderá imprimir quando quiser." },
    { q: "Para qual idade é recomendado?", a: "O material foi desenvolvido para crianças em fase de alfabetização, geralmente entre 4 e 8 anos, ou crianças mais velhas que ainda apresentam dificuldades na leitura." },
    { q: "Não sou professora, vou conseguir aplicar com meu filho?", a: "Sim! O método foi criado justamente para mães, sem a necessidade de qualquer formação pedagógica. O material é intuitivo e guia você passo a passo em cada exercício, exigindo apenas 10 minutos do seu dia." },
    { q: "Quanto tempo demora para ver resultados?", a: "Seguindo o passo a passo de apenas 10 minutos por dia, muitas mães relatam mudanças significativas na percepção sonora já na primeira semana." }
  ];

  useEffect(() => {
    const unmuteAll = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
      }
      if (socialVideoRef.current) {
        socialVideoRef.current.muted = false;
      }
      // Uma vez que interagiu, podemos remover os listeners
      window.removeEventListener('click', unmuteAll);
      window.removeEventListener('touchstart', unmuteAll);
      window.removeEventListener('scroll', unmuteAll);
    };

    window.addEventListener('click', unmuteAll);
    window.addEventListener('touchstart', unmuteAll);
    window.addEventListener('scroll', unmuteAll);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          // Tenta tocar com som (pode falhar se não houve interação ainda)
          video.muted = false;
          video.play().catch(() => {
            // Se falhar, toca mudo (padrão dos browsers para autoplay)
            video.muted = true;
            return video.play();
          }).then(() => {
            // Remove overlay de play assim que o vídeo começa
            if (video === videoRef.current) setShowPlayButton(false);
            if (video === socialVideoRef.current) setShowSocialPlayButton(false);
          });
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (videoRef.current) observer.observe(videoRef.current);
    if (socialVideoRef.current) observer.observe(socialVideoRef.current);

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
        <div className="px-4 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm mb-6 uppercase tracking-widest font-bold animate-fade-in">
          O FIM DA GUERRA NA HORA DA TAREFA
        </div>
        
        <h1 className="text-4xl md:text-7xl font-extrabold max-w-5xl leading-tight mb-8 tracking-tight">
          Seu filho ainda não lê sozinho? <span className="text-[#D4AF37]">+847 mães</span> resolveram isso em <span className="text-[#D4AF37]">30 dias</span> com um método simples
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mb-12 font-medium leading-relaxed">
          Seu filho só precisa de alguém que acredite nele e de 10 minutos por dia.
        </p>
        

        <img
          src="https://i.imgur.com/Tr7zGoR.png"
          alt="Material do Método"
          width={1024}
          height={1024}
          loading="eager"
          decoding="async"
          // @ts-ignore - fetchpriority is a valid HTML attribute
          fetchpriority="high"
          className="mb-12 max-w-2xl w-full h-auto rounded-2xl shadow-2xl"
        />


        <a
          href="#oferta"
          className="bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white font-black text-xl py-6 px-12 rounded-2xl shadow-[0_10px_30px_rgba(34,197,94,0.4)] uppercase tracking-tight w-full max-w-sm inline-block text-center animate-pulse-sm hover:scale-105 active:scale-95 transition-transform"
        >
          Quero Destravar a Leitura do Meu Filho Agora
        </a>
        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="bg-white rounded-full px-6 py-2.5 shadow-xl border border-slate-100 flex items-center gap-3">
            <div className="flex -space-x-2">
              <img src="https://i.imgur.com/tR994JQ.png" alt="Criança 1" width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
              <img src="https://i.imgur.com/Ngnrla4.png" alt="Criança 2" width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
              <img src="https://i.imgur.com/MIv4BCw.png" alt="Criança 3" width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
            </div>
            <span className="text-slate-600 font-black text-sm uppercase tracking-tighter">
              +847 crianças transformadas
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
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 tracking-tight">Tudo que seu filho precisa para ler com confiança do zero à leitura fluente</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                emoji: "📘", 
                title: "Kit Nível 1: O Despertar Fonético", 
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
                title: "Kit Nível 2: Conexão e Aceleração", 
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
                title: "Kit Nível 3: Domínio e Confiança", 

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
              <div
                key={i}
                className="bg-[#FFFBEB] pt-8 px-8 pb-0 md:pt-10 md:px-10 rounded-[2.5rem] shadow-xl border border-[#D4AF37]/30 flex flex-col gap-6 text-left overflow-hidden"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: EXEMPLOS REAIS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">Veja o método funcionando na prática</h2>
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
            preload="none"
            poster="https://i.imgur.com/U0beZTE.png"
          >
            <source src="https://i.imgur.com/PNodnZZ.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>

          <>
            {showPlayButton && (
              <div 
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] animate-fade-in"
              >
                <button
                  onClick={handlePlayVideo}
                  className="bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white p-6 rounded-full shadow-[0_0_50px_rgba(34,197,94,0.6)] mb-4 animate-pulse-xl hover:scale-110 active:scale-95 transition-transform"
                >
                  <Play className="w-10 h-10 fill-current" />
                </button>
                <button 
                  onClick={handlePlayVideo}
                  className="bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-tight shadow-xl border-2 border-white/20"
                >
                  Clique aqui para ouvir
                </button>
              </div>
            )}
          </>
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
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
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

      {/* Section: Como funciona o "Método de 4 Pontas" na prática? */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Por que seu filho ainda não lê e <span className="text-[#D4AF37]">como resolver isso em 30 dias</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Um passo a passo tão simples que seu filho aprende brincando, sem exigir que você seja pedagoga.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden md:overflow-visible" ref={methodEmblaRef}>
              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                {[
                  {
                    icon: <Target className="w-8 h-8 text-[#D4AF37]" />,
                    title: "PONTA 1: Fim do Chute",
                    desc: "Focamos no som real de cada letra, eliminando o vício da criança de tentar adivinhar palavras."
                  },
                  {
                    icon: <Puzzle className="w-8 h-8 text-[#D4AF37]" />,
                    title: "PONTA 2: Conexão",
                    desc: "Uso de blocos visuais para juntar sílabas sem esforço, formando palavras reais logo nos primeiros dias."
                  },
                  {
                    icon: <BookOpen className="w-8 h-8 text-[#D4AF37]" />,
                    title: "PONTA 3: Autonomia",
                    desc: "Transição suave para frases e letra cursiva, construindo confiança para uma leitura fluente."
                  },
                  {
                    icon: <Timer className="w-8 h-8 text-[#D4AF37]" />,
                    title: "PONTA 4: 10 Minutos",
                    desc: "Pílulas diárias de diversão que garantem 3x mais retenção sem estresse ou cansaço."
                  }
                ].map((card, i) => (
                  <div
                    key={i}
                    className="flex-[0_0_85%] md:flex-none bg-[#FFFBEB] p-6 md:p-8 rounded-[2.5rem] border-2 border-[#D4AF37]/30 shadow-xl hover:shadow-2xl transition-all flex flex-col items-center text-center gap-4 md:gap-6 group hover:-translate-y-2 mr-4 md:mr-0"
                  >
                    <div className="bg-white p-4 md:p-5 rounded-2xl shadow-md group-hover:scale-110 transition-transform border border-[#D4AF37]/20">
                      {card.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Only visible on mobile since grid is used on desktop */}
            <div className="flex md:hidden items-center justify-center mt-8 gap-4">
              <button 
                onClick={() => methodEmblaApi?.scrollPrev()} 
                className="w-12 h-12 bg-white shadow-lg border border-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:text-[#D4AF37] active:scale-95 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-all ${methodSelectedIndex === i ? 'bg-[#D4AF37] w-4' : 'bg-slate-200'}`} />
                ))}
              </div>
              <button 
                onClick={() => methodEmblaApi?.scrollNext()} 
                className="w-12 h-12 bg-white shadow-lg border border-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:text-[#D4AF37] active:scale-95 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="#oferta"
              className="inline-block bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white font-black text-lg py-6 px-12 rounded-2xl shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:scale-105 active:scale-95 transition-all uppercase tracking-tight"
            >
              Sim, Quero Transformar a Leitura do Meu Filho Hoje
            </a>
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
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-8">
              Tudo que você leva hoje sem precisar comprar nada separado
            </h2>
            <div className="flex justify-center mb-12">
              <img 
                src="https://i.imgur.com/fIEjlwd.png" 
                alt="Presentes Exclusivos" 
                className="w-full max-w-4xl h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { 
                title: "Acelerador de Consciência Silábica", 
                desc: "Domine a estrutura das sílabas rapidamente.",
                img: "https://i.imgur.com/K1FlMpX.png",
                price: "R$ 47,00"
              },
              { 
                title: "Jogo de Retenção Acelerada - Fichas Silábicas", 
                desc: "Material lúdico para fixar o aprendizado brincando.",
                img: "https://i.imgur.com/b6Is6u1.png",
                price: "R$ 37,00"
              },
              { 
                title: "Protocolo de Fluência Leitora", 
                desc: "Elimine a leitura pausada e robotizada.",
                img: "https://i.imgur.com/G0VWwVm.png",
                price: "R$ 57,00"
              },
              { 
                title: "Tiras de Leitura Dinâmica", 
                desc: "Exercícios de 10 minutos para destravar a leitura.",
                img: "https://i.imgur.com/hW2TZJo.png",
                price: "R$ 47,00"
              },
              { 
                title: "Desafio dos 50 Textos Fatiados", 
                desc: "Atividades progressivas para ler frases com confiança.",
                img: "https://i.imgur.com/iOWJrLt.png",
                price: "R$ 47,00"
              },
              { 
                title: "Fundação da Leitura Rápida", 
                desc: "Acelere a compreensão de textos sem cansaço.",
                img: "https://i.imgur.com/2q7pzfO.png",
                price: "R$ 42,30"
              }
            ].map((bonus, i) => (
              <div 
                key={i}
                className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-6"
              >
                <div className="w-full md:w-40 aspect-square bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                  <img src={bonus.img} alt={bonus.title} width={400} height={400} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start gap-1 mb-2">
                    <span className="text-xl">🎁</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BÔNUS {i + 1}</span>
                  </div>
                  <h3 className="text-lg font-black text-[#D4AF37] mb-2 uppercase tracking-tight">{bonus.title}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{bonus.desc}</p>
                  <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
                    <span className="text-slate-400 line-through font-bold text-base">De {bonus.price}</span>
                    <span className="text-emerald-600 font-black text-lg uppercase tracking-wide">Por R$ 0,00</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border-4 border-[#D4AF37]/20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />
            <p className="text-slate-500 font-bold mb-2 uppercase tracking-widest text-sm">Resumo dos bônus</p>
            <div className="text-emerald-600 font-black text-2xl md:text-3xl tracking-tight leading-snug">
              Você economiza <span className="text-emerald-700">R$ 277,30</span> levando tudo hoje incluso no plano
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-8 tracking-tight">Mães reais. Crianças reais. Resultados reais.</h2>
        
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
              preload="none"
            >
              <source src="https://i.imgur.com/O6sRb8J.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>

            <>
              {showSocialPlayButton && (
                <div 
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] animate-fade-in"
                >
                  <button
                    onClick={handlePlaySocialVideo}
                    className="bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white p-6 rounded-full shadow-[0_0_50px_rgba(34,197,94,0.6)] mb-4 animate-pulse-xl hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Play className="w-10 h-10 fill-current" />
                  </button>
                  <button 
                    onClick={handlePlaySocialVideo}
                    className="bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-tight shadow-xl border-2 border-white/20 flex items-center gap-2"
                  >
                    Clique aqui para ouvir <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          </div>
        </div>
      </section>

      <section id="oferta" className="py-16 px-6 bg-white relative scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-6 tracking-tight">Escolha como quer começar e garanta hoje com desconto</h2>
          <div className="max-w-2xl mx-auto mb-12 bg-red-50 border-2 border-red-300 rounded-2xl px-6 py-4 text-center">
            <p className="text-red-700 font-black text-base md:text-lg uppercase tracking-tight">
              ⚠️ Oferta válida somente hoje. O preço volta ao normal amanhã.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 flex flex-col shadow-sm text-center">
              <h3 className="text-2xl font-black text-slate-400 mb-8 uppercase tracking-widest">Plano Básico</h3>
              <div className="mb-10">
                <p className="text-red-600 line-through text-lg">R$ 47,00</p>
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
                Quero Começar com o Básico
              </button>
              <div className="flex flex-row items-center justify-center gap-4 text-slate-500 font-bold text-xs uppercase mb-8">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-emerald-600" />
                  <span>7 Dias Garantia</span>
                </div>
              </div>

              <div className="bg-slate-900 text-white py-4 px-6 rounded-2xl text-center text-xs font-bold flex flex-col items-center justify-center gap-3 shadow-xl border border-[#D4AF37]/30">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <span>Ainda dá tempo de levar a melhor opção: atualizações e os 6 Bônus Exclusivos!</span>
                </div>
                <div className="flex justify-center gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="animate-bounce-down"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      <ArrowDown className="w-5 h-5 text-[#D4AF37]" />
                    </div>
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
                     <p className="text-red-600 line-through text-base">R$ 97,00</p>
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-xl font-bold text-slate-900">R$</span>
                        <span className="text-5xl md:text-6xl font-black text-slate-900">27,00</span>
                        <span className="text-slate-500 font-bold text-sm uppercase tracking-tighter">à vista</span>
                      </div>
                      <p className="text-[#D4AF37] font-black text-base md:text-lg mt-1 uppercase tracking-tighter">Ou 3x de R$ 9,90 no cartão</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 mb-5 text-slate-500 text-xs font-bold bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                    <span>+847 mães já usaram o material e conquistaram a leitura fluente</span>
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

                  <a
                    href="https://pay.kirvano.com/d8d06c9f-e81b-4a4e-af6a-1a259dfe4fc7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-400 hover:from-green-700 hover:to-emerald-500 text-white font-black text-lg md:text-xl shadow-[0_15px_40px_rgba(34,197,94,0.4)] uppercase tracking-tight mb-3 inline-block text-center animate-pulse-cta hover:scale-105 active:scale-95 transition-transform"
                  >
                    Quero o Método Completo -  Garantir Agora
                  </a>
                  <div className="flex flex-row items-center justify-center gap-4 text-slate-500 font-bold text-xs uppercase mb-4">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Acesso Imediato</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-emerald-600" />
                      <span>7 Dias Garantia</span>
                    </div>
                  </div>
                  <p className="text-center text-red-600 font-black text-sm md:text-base uppercase tracking-wider">
                    ⚠️ Último dia com desconto do material completo.
                    <br />
                    Preço normal a partir do dia {tomorrow}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-6 px-6 bg-white overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#FFF1BF] py-3 px-6 rounded-full border border-[#FDE68A] flex items-center justify-center shadow-sm">
            <p className="text-amber-900 font-bold text-sm md:text-base tracking-tight text-center">
              Garantia de Satisfação de 7 dias
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-8 tracking-tight">Depoimentos</h2>
        
        <div className="flex flex-col gap-6 max-w-[480px] mx-auto">
          {[
            "https://i.imgur.com/X0ZwkvB.jpeg",
            "https://i.imgur.com/GcM5DRs.jpeg",
            "https://i.imgur.com/AVTtPHm.jpeg",
            "https://i.imgur.com/keJhWpy.jpeg",
          ].map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-white">
              <img src={src} alt={`Prova social ${i + 1}`} width={600} height={800} loading="lazy" decoding="async" className="w-full h-auto object-contain" />
            </div>
          ))}
        </div>
      </section>




      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white p-2 shadow-2xl overflow-hidden border-4 border-[#D4AF37]/20">
              <img src="https://i.imgur.com/6o9r43s.png" alt="Suzane Lopes" width={320} height={320} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-full" />
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
                <div 
                  className="p-6 bg-slate-50 text-slate-600 border-t border-slate-100 animate-fade-in"
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 13: Rodapé (Footer) */}
      <footer className="bg-slate-900 py-12 px-6 text-white text-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-8 border-4 border-[#D4AF37]/30 shadow-xl">
            <img src="https://i.imgur.com/wKX4vto.jpeg" alt="Lendo em 30 Dias" width={128} height={128} loading="lazy" decoding="async" className="w-full h-full object-cover" />
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
