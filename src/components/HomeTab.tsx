import React, { useState } from 'react';
import { Subject, ExamItem, LoveNote, ComplementaryHours, UserProfile, MotivationalQuote } from '../types';
import { calculateOverallStats, getDaysUntil, calculateSubjectAverage } from '../utils/calculations';
import { getTheme } from '../utils/theme';
import { 
  Calendar, 
  Sparkles, 
  Heart, 
  ChevronRight, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Award,
  FlaskConical,
  RefreshCw,
  Plus,
  User,
  Calculator,
  Compass,
  Smile
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HomeTabProps {
  subjects: Subject[];
  exams: ExamItem[];
  loveNotes: LoveNote[];
  motivationalQuotes: MotivationalQuote[];
  hours: ComplementaryHours[];
  profile: UserProfile;
  onNavigate: (tab: any) => void;
  onOpenNewExam: () => void;
  onOpenNewNote: () => void;
  onSelectSubject: (subId: string) => void;
  onOpenProfile: () => void;
  onToggleMode: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  subjects,
  exams,
  loveNotes,
  motivationalQuotes,
  hours,
  profile,
  onNavigate,
  onOpenNewExam,
  onOpenNewNote,
  onSelectSubject,
  onOpenProfile,
  onToggleMode
}) => {
  const [activeNoteIndex, setActiveNoteIndex] = useState(0);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  const themeConfig = getTheme(profile.theme);
  const isVitoriaMode = profile.mode === 'vitoria';

  const currentLoveNote = loveNotes[activeNoteIndex % (loveNotes.length || 1)];
  const currentQuote = motivationalQuotes[activeQuoteIndex % (motivationalQuotes.length || 1)];

  const overall = calculateOverallStats(subjects);

  // Total complementary hours
  const totalHours = hours.reduce((acc, h) => acc + h.hours, 0);
  const targetHours = profile.targetHours || 300;
  const hoursPercent = Math.min(100, Math.round((totalHours / targetHours) * 100));

  // Next upcoming uncompleted exam
  const pendingExams = exams
    .filter(e => !e.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const nextExam = pendingExams[0];
  const daysToExam = nextExam ? getDaysUntil(nextExam.date) : null;

  const handleNextMessage = () => {
    if (isVitoriaMode) {
      setActiveNoteIndex(prev => (prev + 1) % (loveNotes.length || 1));
    } else {
      setActiveQuoteIndex(prev => (prev + 1) % (motivationalQuotes.length || 1));
    }
  };

  const handleCelebrate = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']
    });
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Banner exclusivo exibido apenas se o modo da Vitória estiver ativado */}
      {isVitoriaMode && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-2.5 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold text-rose-900">
              🌸 Modo Especial Vitória ❤️
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleMode}
              title="Alternar temporariamente para modo discreto de estudos"
              className="px-2.5 py-1 text-[11px] font-bold rounded-xl bg-white hover:bg-rose-100 text-rose-700 border border-rose-200 transition"
            >
              Modo Discreto
            </button>
            <button
              onClick={onOpenProfile}
              title="Editar dados do perfil"
              className="p-1 rounded-lg text-rose-400 hover:text-rose-700 hover:bg-rose-100 transition"
            >
              <User className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Welcome Banner */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${themeConfig.cardBanner} p-5 text-white shadow-lg shadow-stone-900/10`}>
        {/* Soft decorative background circles */}
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 blur-md pointer-events-none" />
        <div className="absolute -bottom-8 -left-6 w-32 h-32 rounded-full bg-white/10 blur-lg pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold text-white mb-2">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              {profile.semester} • {profile.course}
            </div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              {isVitoriaMode ? (
                <>Olá, Dra. Vitória! <span className="inline-block animate-bounce">🔬</span></>
              ) : (
                <>Olá, {profile.name}! <span className="inline-block animate-bounce">{profile.avatarEmoji}</span></>
              )}
            </h1>
            <p className="text-xs text-white/90 mt-1 max-w-xs leading-relaxed font-medium">
              {isVitoriaMode
                ? 'Seu cantinho de estudos, notas e rotina no laboratório. Feito com amor pra você brilhar!'
                : 'Seu painel acadêmico para organizar notas, frequência, provas e foco nos estudos universitários.'}
            </p>
          </div>

          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner text-2xl">
              {profile.avatarEmoji}
            </div>
            <button
              onClick={handleCelebrate}
              title="Comemorar!"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-stone-800 flex items-center justify-center text-xs shadow-sm hover:scale-110 active:scale-95 transition"
            >
              🎉
            </button>
          </div>
        </div>

        {/* Quick Academic KPI Bar inside header */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/20 text-center">
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl py-2 px-1">
            <span className="text-[10px] text-white/80 block font-medium">CR Geral</span>
            <span className="text-base font-black text-white">{overall.overallCR.toFixed(1)}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl py-2 px-1">
            <span className="text-[10px] text-white/80 block font-medium">Provas Próximas</span>
            <span className="text-base font-black text-white">{pendingExams.length}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl py-2 px-1">
            <span className="text-[10px] text-white/80 block font-medium">Horas Estágio</span>
            <span className="text-base font-black text-white">{totalHours}h</span>
          </div>
        </div>
      </div>

      {/* Message Card: Love Note (Vitória Mode) OR Motivational Academic Quote (Student Mode) */}
      {isVitoriaMode ? (
        currentLoveNote && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-100 via-pink-100 to-rose-50 border border-pink-200/80 p-4 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                </div>
                <span className="text-xs font-bold text-rose-800">
                  Recadinho do {currentLoveNote.author}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleNextMessage}
                  title="Próxima mensagem de carinho"
                  className="p-1 rounded-full text-rose-600 hover:bg-pink-200/60 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenNewNote}
                  title="Deixar novo recadinho"
                  className="p-1 rounded-full text-rose-600 hover:bg-pink-200/60 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="font-handwriting text-lg text-stone-800 leading-snug px-1 py-0.5">
              "{currentLoveNote.text}"
            </p>

            <div className="flex justify-between items-center mt-2 text-[10px] text-rose-600 font-medium">
              <span>Para o amor da minha vida 💕</span>
              <span>{currentLoveNote.date}</span>
            </div>
          </div>
        )
      ) : (
        currentQuote && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-stone-50 border border-blue-200/80 p-4 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-blue-900">
                  Motivação Acadêmica • {currentQuote.author}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleNextMessage}
                  title="Sortear outra frase de motivação"
                  className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('love')}
                  title="Ver todas as frases e Pomodoro"
                  className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs font-semibold text-stone-800 leading-relaxed px-1 py-1">
              "{currentQuote.text}"
            </p>

            <div className="flex justify-between items-center mt-2 text-[10px] text-blue-700 font-medium">
              <span>Foco, resiliência e disciplina nos estudos</span>
              <span className="uppercase tracking-wider font-bold">#{currentQuote.category}</span>
            </div>
          </div>
        )
      )}

      {/* Urgent / Next Exam Spotlight */}
      {nextExam ? (
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm hover:border-stone-300 transition">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-800">Próxima Prova em Foco</h3>
                <p className="text-[10px] text-stone-500">{nextExam.subjectName}</p>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className={`px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 ${
              daysToExam !== null && daysToExam <= 3
                ? 'bg-rose-100 text-rose-700 animate-pulse'
                : 'bg-stone-100 text-stone-700'
            }`}>
              <Clock className="w-3 h-3" />
              {daysToExam === 0
                ? 'É HOJE! 🍀'
                : daysToExam === 1
                ? 'Amanhã!'
                : daysToExam !== null && daysToExam < 0
                ? 'Data ultrapassada'
                : `Faltam ${daysToExam} dias`}
            </div>
          </div>

          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 mb-3">
            <h4 className="text-sm font-bold text-stone-800 mb-1">{nextExam.title}</h4>
            <div className="flex flex-wrap gap-y-1 gap-x-3 text-xs text-stone-600">
              <span className="flex items-center gap-1 font-medium">
                📅 {new Date(nextExam.date + 'T00:00:00').toLocaleDateString('pt-BR')} às {nextExam.time}
              </span>
              <span className="flex items-center gap-1 font-medium">
                📍 {nextExam.room}
              </span>
            </div>

            {nextExam.topics && nextExam.topics.length > 0 && (
              <div className="mt-2 pt-2 border-t border-stone-200">
                <span className="text-[10px] font-bold text-stone-500 block mb-1">
                  Conteúdos chave para revisar:
                </span>
                <ul className="space-y-1">
                  {nextExam.topics.slice(0, 2).map((t, idx) => (
                    <li key={idx} className="text-xs text-stone-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-700 shrink-0" />
                      <span className="truncate">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('exams')}
              className="text-xs font-bold text-stone-700 hover:text-black flex items-center gap-1"
            >
              Ver todas as provas ({pendingExams.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('love')}
              className="px-3 py-1.5 bg-stone-900 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-black transition"
            >
              Iniciar Pomodoro ⏱️
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-5 text-center border border-stone-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-stone-800">Sem provas pendentes no momento!</h3>
          <p className="text-xs text-stone-500 mt-1">
            Você está em dia com as avaliações cadastradas no semestre.
          </p>
          <button
            onClick={onOpenNewExam}
            className="mt-3 px-3.5 py-1.5 rounded-xl bg-stone-100 text-stone-800 font-bold text-xs hover:bg-stone-200 transition inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Agendar Nova Prova
          </button>
        </div>
      )}

      {/* Como você está na faculdade - Academic Standing */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-600" /> Disciplinas & Frequência
            </h2>
            <p className="text-xs text-stone-500">Médias calculadas e controle de faltas</p>
          </div>
          <button
            onClick={() => onNavigate('subjects')}
            className="text-xs font-bold text-stone-700 hover:underline flex items-center gap-0.5"
          >
            Ver Todas <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subjects snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {subjects.slice(0, 4).map(sub => {
            const { average } = calculateSubjectAverage(sub.assessments);
            const isPassing = average !== null && average >= sub.minPassingGrade;
            const absenceAlert = sub.absences >= sub.maxAbsences * 0.75;

            return (
              <div
                key={sub.id}
                onClick={() => {
                  onSelectSubject(sub.id);
                  onNavigate('subjects');
                }}
                className="p-3 rounded-2xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/70 transition cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-2.5 h-8 rounded-full shrink-0"
                    style={{ backgroundColor: sub.color }}
                  />
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-stone-800 truncate">{sub.name}</h4>
                    <p className="text-[10px] text-stone-500 truncate">{sub.professor || sub.code}</p>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <span className={`text-xs font-black px-2 py-0.5 rounded-lg inline-block ${
                    average === null
                      ? 'bg-stone-200 text-stone-600'
                      : isPassing
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-700'
                  }`}>
                    {average !== null ? `Média ${average.toFixed(1)}` : 'S/ Nota'}
                  </span>
                  {absenceAlert && (
                    <span className="block text-[9px] font-bold text-rose-600 mt-0.5">
                      ⚠️ {sub.absences}/{sub.maxAbsences} faltas
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Horas de Estágio e Atividades Complementares Progress */}
        <div className="p-3.5 bg-gradient-to-r from-stone-50 to-stone-100 rounded-2xl border border-stone-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-stone-700" /> Estágio & Horas Complementares
            </span>
            <span className="text-xs font-black text-stone-900">
              {totalHours}h / {targetHours}h ({hoursPercent}%)
            </span>
          </div>

          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-stone-900 rounded-full transition-all duration-500"
              style={{ width: `${hoursPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-stone-500 mt-1.5">
            Faltam {Math.max(0, targetHours - totalHours)} horas para atingir a meta do curso ({targetHours}h).
          </p>
        </div>
      </div>

      {/* Quick Access Tools */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('lab')}
          className="p-4 rounded-3xl bg-white border border-stone-200 hover:border-stone-300 shadow-xs text-left group transition"
        >
          <div className="w-9 h-9 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-110 transition">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-stone-800">Calculadoras & Guia</h3>
          <p className="text-[10px] text-stone-500 mt-0.5">Simulador de notas, faltas e diluição</p>
        </button>

        <button
          onClick={() => onNavigate('hours')}
          className="p-4 rounded-3xl bg-white border border-stone-200 hover:border-stone-300 shadow-xs text-left group transition"
        >
          <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-110 transition">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-stone-800">Horas Complementares</h3>
          <p className="text-[10px] text-stone-500 mt-0.5">Certificados, cursos e progresso</p>
        </button>
      </div>
    </div>
  );
};
