import { motion, AnimatePresence } from "framer-motion";
import { Check, BookOpen, Puzzle, Trophy, ChevronLeft, ChevronRight, Star, ShieldCheck, ChevronDown, ChevronUp, ShoppingBag, ArrowDown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
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
        await wait(10000); // Próxima só deve aparecer após 10 segundos (5+5)

        // 2. Aparece 3 em seguida com 2 segundos de diferença
        for (let i = 0; i < 3; i++) {
          addNotification(1);
          await wait(2000);
        }

        // 3. Depois de 15 segundos aparece 3 em seguida (não de uma vez)
        await wait(15000); // (10+5)
        for (let i = 0; i < 3; i++) {
          addNotification(1);
          await wait(2000);
        }

        // 4. Após isso 2 a cada 10 segundos
        for (let i = 0; i < 2; i++) {
          await wait(10000); // (5+5)
          addNotification(1);
        }

        // 5. Após isso 2 a cada 7 segundos
        for (let i = 0; i < 2; i++) {
          await wait(7000); // (2+5)
          addNotification(1);
        }

        // Reinicia o ciclo
        await wait(10000); // (5+5)
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

function LandingPage() {
  const [date, setDate] = useState("");
  const [tomorrow, setTomorrow] = useState("");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      image: "https://i.imgur.com/v8RHNIB.png"
    },
    {
      title: "Conexão Silábica - Nível 2",
      subtitle: "O cérebro da criança começa a juntar os sons de forma automatizada para formar as primeiras palavras reais.",
      image: "https://i.imgur.com/EjFLXae.png"
    },
    {
      title: "Domínio e Autonomia - Nível 3",
      subtitle: "Passo a passo avançado focado na leitura fluente de frases longas e fixação da escrita firme.",
      image: "https://i.imgur.com/v8RHNIB.png"
    },
    {
      title: "Jogos e Fichas Silábicas Práticas",
      subtitle: "Gamificação domiciliar para prender a atenção da criança e acelerar a memorização sem cansaço.",
      image: "https://i.imgur.com/U2UOFMX.png"
    },
    {
      title: "Protocolo de Fluência Leitora",
      subtitle: "Tiras de leitura dinâmica de 10 minutos para eliminar o ritmo robotizado e destravar a leitura natural.",
      image: "https://i.imgur.com/Nna0yec.png"
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

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#D4AF37]/30">
      <SalesToast />
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

        <div className="w-full max-w-[320px] aspect-[9/16] bg-black rounded-3xl mb-12 shadow-2xl overflow-hidden border-8 border-white relative mx-auto">
          <video 
            className="w-full h-full object-cover"
            controls
            playsInline
            autoPlay
            muted
            loop
          >
            <source src="https://i.imgur.com/1TVH4Pt.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
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

      {/* Section 7: O que você desbloqueia agora mesmo */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 tracking-tight">O que você desbloqueia agora mesmo</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                emoji: "📘", 
                title: "Caderno Nível 1: O Despertar Fonético", 
                bullets: [
                  "Material de apoio em PDF liberado na hora para baixar e imprimir.",
                  "Conteúdo organizado em um passo a passo detalhado e à prova de falhas.",
                  "Exercícios práticos de fixação em Letra Bastão e Letra Cursiva.",
                  "Foco: Eliminar o vício de \"chutar\" palavras e fixar o som real de cada letra."
                ]
              },
              { 
                emoji: "🧩", 
                title: "Caderno Nível 2: Conexão e Aceleração", 
                bullets: [
                  "Material em PDF estruturado visualmente para reter a atenção da criança.",
                  "Progressão lógica focada na junção rápida de sílabas e sons.",
                  "Atividades completas disponíveis em Letra Bastão e Letra Cursiva.",
                  "Foco: Fazer o cérebro da criança formar as primeiras palavras reais sem bloqueios."
                ]
              },
              { 
                emoji: "🏆", 
                title: "Caderno Nível 3: Domínio e Confiança", 
                bullets: [
                  "Material em PDF de nível avançado para consolidação da leitura.",
                  "Páginas de treino estruturadas com frases inteiras e fixação da escrita.",
                  "Refinamento motor final em Letra Bastão e Letra Cursiva.",
                  "Foco: Garantir a autonomia absoluta para o seu filho ler sozinho."
                ]
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#FFFBEB] p-10 rounded-[2.5rem] shadow-xl border border-[#D4AF37]/30 flex flex-col gap-6 text-left hover:shadow-2xl transition-all"
              >
                <div className="text-6xl text-center">{item.emoji}</div>
                <div>
                  <h3 className="text-xl font-black mb-6 text-slate-900 leading-tight text-center">{item.title}</h3>
                  <ul className="space-y-4">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                        <span className="text-slate-700 leading-relaxed font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Encontre o exercício certo em segundos */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Encontre o exercício certo em segundos
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Um ecossistema perfeitamente organizado para você identificar a dificuldade exata do seu filho e aplicar a solução imediata.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: "🅰️", title: "Sons das Vogais", desc: "A base absoluta para destravar o reconhecimento visual e fonético inicial." },
              { emoji: "✏️", title: "Letra Bastão Nativa", desc: "Desenhos limpos para gerar o primeiro choque de aprendizado rápido e simples." },
              { emoji: "🖋️", title: "Transição Cursiva", desc: "O passo a passo para conectar e refinar a coordenação motora fina da criança." },
              { emoji: "🧩", title: "Conexão Silábica", desc: "Exercícios cirúrgicos para o seu filho parar definitivamente de adivinhar palavras." },
              { emoji: "🎲", title: "Jogos de Retenção", desc: "Atividades táteis e divertidas que substituem as telas e fixam o conteúdo na mente." },
              { emoji: "⏱️", title: "Treinos de 10 Minutos", desc: "Pílulas diárias desenhadas sob medida para a rotina da mãe sobrecarregada." },
              { emoji: "🚀", title: "Sílabas Complexas", desc: "Estágio focado em superar os travamentos mais avançados e difíceis da leitura." },
              { emoji: "📖", title: "Fluência Leitora", desc: "Roteiro de ritmo natural para acabar de vez com a leitura pausada e robotizada." },
              { emoji: "✍️", title: "Escrita Firme", desc: "Fixação completa para a criança começar a escrever frases inteiras com autonomia." }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, borderColor: "#D4AF37" }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all flex flex-col items-start gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{card.emoji}</span>
                  <h3 className="font-bold text-slate-900">{card.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

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
          <div className="bg-slate-100 aspect-[16/11] md:aspect-[4/3] rounded-xl overflow-hidden shadow-2xl relative w-full">
            <img 
              src="https://i.imgur.com/sDHjn2m.png" 
              alt="Criança lendo com alegria" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 5: EXEMPLOS REAIS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">EXEMPLOS REAIS</h2>
          <p className="text-xl text-slate-600 font-medium">Veja o que você vai receber</p>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-6">
              {productExamples.map((example, i) => (
                <div key={i} className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_70%] aspect-[4/3] md:aspect-[3/2] bg-slate-100 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden group">
                  <img 
                    src={example.image} 
                    alt={example.title}
                    className="absolute inset-0 w-full h-full object-cover"
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
          
          <div className="flex items-center justify-between mt-12">
            <div className="flex gap-2">
              {productExamples.map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${selectedIndex === i ? 'bg-[#D4AF37] w-8' : 'bg-slate-200'}`} />
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => emblaApi?.scrollPrev()} className="w-14 h-14 bg-white shadow-xl border border-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"><ChevronLeft className="w-8 h-8" /></button>
              <button onClick={() => emblaApi?.scrollNext()} className="w-14 h-14 bg-white shadow-xl border border-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"><ChevronRight className="w-8 h-8" /></button>
            </div>
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

      {/* Section Bônus Exclusivos (O Empilhamento de Valor) */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 tracking-tight text-slate-900">
            Ao garantir seu acesso hoje, você leva 6 Presentes Exclusivos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { 
                title: "Acelerador de Consciência Silábica", 
                desc: "Técnicas práticas para a criança dominar a estrutura das sílabas rapidamente.",
                oldPrice: "47,90",
                img: "https://i.imgur.com/bMUryOw.png"
              },
              { 
                title: "Jogo de Retenção Acelerada - Fichas Silábicas", 
                desc: "Material lúdico para fixar o aprendizado de forma divertida e eficiente.",
                oldPrice: "37,90",
                img: "https://i.imgur.com/qFAa7Zz.png"
              },
              { 
                title: "Protocolo de Fluência Leitora", 
                desc: "O guia definitivo para eliminar a leitura pausada e robotizada.",
                oldPrice: "57,90",
                img: "https://i.imgur.com/WW7ZQ4G.png"
              },
              { 
                title: "Tiras de Leitura Dinâmica", 
                desc: "Exercícios rápidos de 10 minutos para destravar a leitura natural.",
                oldPrice: "27,90",
                img: "https://i.imgur.com/gSfIeGC.png"
              },
              { 
                title: "Desafio dos 50 Textos Fatiados", 
                desc: "Atividades progressivas que constroem a confiança na leitura de frases.",
                oldPrice: "67,90",
                img: "https://i.imgur.com/cteIyFd.png"
              },
              { 
                title: "Fundação da Leitura Rápida", 
                desc: "O segredo para acelerar a compreensão de textos sem cansaço.",
                oldPrice: "37,90",
                img: "https://i.imgur.com/ao2RRIJ.png"
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
                <div className="w-full md:w-40 aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                  <img src={bonus.img} alt={bonus.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start gap-1 mb-2">
                    <span className="text-xl">🎁</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BÔNUS {i + 1}</span>
                  </div>
                  <h3 className="text-lg font-black text-[#D4AF37] mb-1 uppercase tracking-tight">{bonus.title}</h3>
                  <div className="flex flex-col items-center md:items-start mb-4">
                    <span className="text-red-600 line-through text-xs font-bold">R$ {bonus.oldPrice}</span>
                    <span className="text-emerald-600 text-sm font-black uppercase tracking-tighter">
                      Por R$ 0,00
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{bonus.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border-4 border-[#D4AF37]/20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />
            <p className="text-slate-500 font-bold mb-2 uppercase tracking-widest text-sm">Empilhamento Total de Valor</p>
            <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-2">
              Valor total dos bônus: <span className="text-red-600 line-through">R$ 277,30</span>
            </h4>
            <div className="text-[#D4AF37] font-black text-3xl md:text-4xl uppercase tracking-tighter">
              Levando a oferta hoje: TUDO GRÁTIS
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto">
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
                  <div key={i} className="flex gap-3 items-center justify-start w-full max-w-[250px]">
                    <Check className="text-slate-300 w-4 h-4 shrink-0" />
                    <span className="text-slate-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-5 rounded-2xl border-2 border-slate-200 text-slate-400 font-black hover:bg-slate-50 transition-colors uppercase tracking-tight mb-8">
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
                <div className="relative bg-white p-8 md:p-10 rounded-[3rem] border-4 border-[#D4AF37] flex flex-col h-full shadow-[0_30px_60px_rgba(212,175,55,0.25)] overflow-hidden text-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 bg-red-600 text-white font-black px-8 py-2 md:rounded-bl-3xl rounded-b-xl text-sm shadow-xl flex items-center gap-2 z-10">
                    🔥 MAIS VENDIDO
                  </div>
                  
                  <h3 className="text-3xl font-black text-slate-900 mb-2 mt-6 md:mt-0 uppercase tracking-tight">Plano Premium</h3>
                  <p className="text-[#D4AF37] font-black mb-8 uppercase tracking-widest text-xs">Acesso Vitalício + Todos os Bônus</p>
                  
                  <div className="mb-6">
                    <p className="text-red-600 line-through text-lg">R$ 297,00</p>
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-xl font-bold text-slate-900">R$</span>
                        <span className="text-6xl md:text-7xl font-black text-slate-900">59,90</span>
                        <span className="text-slate-500 font-bold text-sm uppercase tracking-tighter">à vista</span>
                      </div>
                      <p className="text-[#D4AF37] font-black text-lg md:text-xl mt-1 uppercase tracking-tighter">Ou 6x de R$ 5,49 no cartão</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 mb-8 text-slate-500 text-xs font-bold bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <span>+2.157 mães já usaram o material e conquistaram a leitura fluente</span>
                  </div>

                  <div className="space-y-4 mb-8 flex flex-col items-center">
                    {[
                      "O Programa Completo (Níveis 1, 2 e 3).",
                      "Letra Bastão e Cursiva detalhado em passo a passo.",
                      "Suporte exclusivo para dúvidas."
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start justify-start w-full max-w-[280px]">
                        <div className="mt-1 bg-[#D4AF37] rounded-full p-0.5 shrink-0"><Check className="text-white w-3 h-3" /></div>
                        <span className="font-bold text-slate-700 text-sm leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-slate-100 mb-8" />
                  
                  <h4 className="font-black text-slate-900 mb-6 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                    <span>🎁</span> 6 Bônus Exclusivos (Acesso Imediato)
                  </h4>
                  
                  <div className="space-y-4 mb-10 flex flex-col items-center">
                    {[
                      "Bônus 1: Acelerador de Consciência Silábica",
                      "Bônus 2: Jogo de Retenção Acelerada",
                      "Bônus 3: Protocolo de Fluência Leitora",
                      "Bônus 4: Tiras de Leitura Dinâmica",
                      "Bônus 5: Desafio dos 50 Textos Fatiados",
                      "Bônus 6: Fundação da Leitura Rápida"
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-center justify-start w-full max-w-[280px]">
                        <Check className="text-[#D4AF37] w-4 h-4 shrink-0" />
                        <span className="font-bold text-slate-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button 
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-full py-7 rounded-2xl bg-[#D4AF37] hover:bg-[#B8860B] text-white font-black text-xl md:text-2xl shadow-[0_15px_40px_rgba(212,175,55,0.4)] uppercase tracking-tight mb-4"
                  >
                    QUERO O MATERIAL COMPLETO
                  </motion.button>
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

      {/* Section 9: Garantia */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto bg-[#D4AF37] p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-white/20 flex flex-col items-center text-center text-white">
          <ShieldCheck className="w-16 h-16 md:w-20 md:h-20 text-white mb-6 md:mb-8" />
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-8 tracking-tight uppercase">Risco Zero para Você!</h2>
          <p className="text-sm md:text-lg leading-relaxed max-w-2xl mb-0 font-medium">
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

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white aspect-[9/16] max-w-[320px] mx-auto">
            <iframe 
              src="https://imgur.com/sCrLF00/embed" 
              className="w-full h-full"
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Section 11: Quem Somos */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-white p-2 shadow-2xl mb-12 overflow-hidden border-4 border-[#D4AF37]/20">
             <img src="https://i.imgur.com/7ILP61C.png" alt="Equipe Resgate Educacional" className="w-full h-full object-cover rounded-full" />
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

