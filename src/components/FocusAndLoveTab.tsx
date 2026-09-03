import React, { useState, useEffect } from 'react';
import { LoveNote, Subject, UserProfile, MotivationalQuote } from '../types';
import { getTheme } from '../utils/theme';
import { 
  Heart, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Sparkles, 
  Coffee, 
  BookOpen, 
  MessageCircleHeart,
  Award,
  Star,
  Trash2,
  Copy,
  Check,
  Flame,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FocusAndLoveTabProps {
  loveNotes: LoveNote[];
  motivationalQuotes: MotivationalQuote[];
  subjects: Subject[];
  profile: UserProfile;
  onSaveLoveNote: (note: LoveNote) => void;
  onDeleteLoveNote: (id: string) => void;
  onSaveMotivationalQuote: (quote: MotivationalQuote) => void;
  onDeleteMotivationalQuote: (id: string) => void;
  onOpenNewNote: () => void;
}

export const FocusAndLoveTab: React.FC<FocusAndLoveTabProps> = ({
  loveNotes,
  motivationalQuotes,
  subjects,
  profile,
  onSaveLoveNote,
  onDeleteLoveNote,
  onSaveMotivationalQuote,
  onDeleteMotivationalQuote,
  onOpenNewNote
}) => {
  const isVitoriaMode = profile.mode === 'vitoria';
  const themeConfig = getTheme(profile.theme);

  const [activeSubTab, setActiveSubTab] = useState<'messages' | 'focus'>('messages');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pomodoro State
  const [timerMode, setTimerMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionsCompleted, setSessionsCompleted] = useState<number>(0);

  // Setup timer durations
  const durations = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (timerMode === 'focus') {
        setSessionsCompleted(prev => prev + 1);
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: isVitoriaMode 
            ? ['#ec4899', '#f43f5e', '#fda4af']
            : ['#3b82f6', '#10b981', '#f59e0b']
        });
        setTimerMode('shortBreak');
        setTimeLeft(durations.shortBreak);
      } else {
        setTimerMode('focus');
        setTimeLeft(durations.focus);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerMode, isVitoriaMode]);

  const handleModeChange = (mode: 'focus' | 'shortBreak' | 'longBreak') => {
    setTimerMode(mode);
    setIsRunning(false);
    setTimeLeft(durations[mode]);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimeLeft(durations[timerMode]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSurpriseNote = () => {
    if (isVitoriaMode) {
      if (loveNotes.length === 0) return;
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#ec4899', '#fb7185', '#e11d48']
      });
      const randomIdx = Math.floor(Math.random() * loveNotes.length);
      alert(`💌 Recadinho do ${loveNotes[randomIdx].author}:\n\n"${loveNotes[randomIdx].text}"`);
    } else {
      if (motivationalQuotes.length === 0) return;
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });
      const randomIdx = Math.floor(Math.random() * motivationalQuotes.length);
      alert(`⭐ Frase do Dia (${motivationalQuotes[randomIdx].author}):\n\n"${motivationalQuotes[randomIdx].text}"`);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered quotes in student mode
  const filteredQuotes = motivationalQuotes.filter(q => {
    if (selectedCategory === 'all') return true;
    return q.category === selectedCategory;
  });

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Header with Switcher */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-black text-stone-800 flex items-center gap-1.5">
              {isVitoriaMode ? (
                <>
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Cantinho do Amor & Foco
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-blue-600" /> Motivação & Foco Acadêmico
                </>
              )}
            </h1>
            <p className="text-xs text-stone-500">
              {isVitoriaMode
                ? 'Recadinhos carinhosos do Matheus e pomodoro para os estudos'
                : 'Pílulas diárias de motivação universitária e temporizador de estudos'}
            </p>
          </div>

          <button
            onClick={onOpenNewNote}
            className={`px-3 py-1.5 rounded-xl text-white font-bold text-xs shadow-xs hover:opacity-95 flex items-center gap-1 transition ${
              isVitoriaMode ? 'bg-rose-500' : 'bg-blue-600'
            }`}
          >
            <Plus className="w-4 h-4" /> {isVitoriaMode ? 'Novo Bilhete' : 'Nova Frase'}
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100 rounded-2xl border border-stone-200 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('messages')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeSubTab === 'messages'
                ? isVitoriaMode
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-blue-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {isVitoriaMode ? (
              <>
                <MessageCircleHeart className="w-4 h-4" /> Recadinhos ({loveNotes.length})
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Frases Motivacionais ({motivationalQuotes.length})
              </>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('focus')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeSubTab === 'focus'
                ? isVitoriaMode
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-blue-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Modo Foco Pomodoro
          </button>
        </div>
      </div>

      {/* 1. Messages / Motivation Tab */}
      {activeSubTab === 'messages' && (
        <div className="space-y-3">
          {/* Banner */}
          {isVitoriaMode ? (
            <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 p-5 rounded-3xl text-white shadow-md relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-rose-100 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Sempre ao seu lado
                  </span>
                  <button
                    onClick={handleSurpriseNote}
                    className="px-2.5 py-1 rounded-xl bg-white text-rose-600 font-black text-xs shadow-xs hover:bg-rose-50 transition flex items-center gap-1"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-600" /> Sortear Bilhete
                  </button>
                </div>
                <h2 className="text-lg font-black">Você é o meu maior orgulho, Vitória! 🌸</h2>
                <p className="text-xs text-rose-100 leading-relaxed">
                  Estudar biomedicina exige muita dedicação, noites de sono e amor pela ciência.
                  Nos dias difíceis ou antes daquela prova puxada, lembre-se do quanto você é capaz!
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-800 p-5 rounded-3xl text-white shadow-md relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-blue-100 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-300" /> Foco Universitário
                  </span>
                  <button
                    onClick={handleSurpriseNote}
                    className="px-2.5 py-1 rounded-xl bg-white text-blue-700 font-black text-xs shadow-xs hover:bg-blue-50 transition flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Frase do Dia
                  </button>
                </div>
                <h2 className="text-lg font-black">O diploma é a soma dos seus esforços diários! 🎓</h2>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Cada aula assistida, resumo feito e exercício resolvido aproxima você do profissional de sucesso que o mercado e a sociedade esperam.
                </p>
              </div>
            </div>
          )}

          {/* Category Filter Chips for Student Mode */}
          {!isVitoriaMode && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'Todas' },
                { id: 'foco', label: '🎯 Foco' },
                { id: 'sucesso', label: '🏆 Sucesso' },
                { id: 'resiliencia', label: '💪 Resiliência' },
                { id: 'calma', label: '🌿 Equilíbrio' },
                { id: 'disciplina', label: '⚡ Disciplina' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* Notes or Quotes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {isVitoriaMode
              ? loveNotes.map(note => (
                  <div
                    key={note.id}
                    className="bg-white p-4 rounded-3xl border border-pink-200 shadow-xs hover:shadow-md transition relative flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> {note.author}
                        </span>
                        <span className="text-[10px] text-stone-400 font-medium">{note.date}</span>
                      </div>

                      <p className="font-handwriting text-lg text-stone-800 leading-relaxed my-2">
                        "{note.text}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-pink-50 text-[10px] text-stone-500">
                      <span className="capitalize px-2 py-0.5 rounded-md bg-pink-50 text-pink-700 font-semibold">
                        {note.category}
                      </span>
                      {loveNotes.length > 1 && (
                        <button
                          onClick={() => onDeleteLoveNote(note.id)}
                          className="text-stone-300 hover:text-rose-500 p-1 opacity-0 group-hover:opacity-100 transition"
                          title="Remover recado"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              : filteredQuotes.map(quote => (
                  <div
                    key={quote.id}
                    className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition relative flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-stone-900 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" /> {quote.author}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                          #{quote.category}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-stone-700 leading-relaxed my-2">
                        "{quote.text}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-stone-100 text-[10px] text-stone-500">
                      <button
                        onClick={() => handleCopyText(quote.text, quote.id)}
                        className="flex items-center gap-1 text-stone-500 hover:text-stone-900 font-semibold"
                      >
                        {copiedId === quote.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copiar citação
                          </>
                        )}
                      </button>

                      {motivationalQuotes.length > 1 && (
                        <button
                          onClick={() => onDeleteMotivationalQuote(quote.id)}
                          className="text-stone-300 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition"
                          title="Remover frase"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}

      {/* 2. Pomodoro Focus Tab */}
      {activeSubTab === 'focus' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm text-center space-y-6">
            {/* Subject Selector for Study Session */}
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1">
                O que você vai estudar agora?
              </label>
              <select
                value={selectedSubjectId}
                onChange={e => setSelectedSubjectId(e.target.value)}
                className="px-4 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs font-bold text-stone-800 outline-hidden max-w-xs mx-auto"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Timer Modes Switcher */}
            <div className="inline-flex p-1 bg-stone-100 rounded-2xl border border-stone-200 text-xs font-bold">
              <button
                onClick={() => handleModeChange('focus')}
                className={`py-1.5 px-3 rounded-xl transition ${
                  timerMode === 'focus'
                    ? isVitoriaMode
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-blue-600 text-white shadow-xs'
                    : 'text-stone-600'
                }`}
              >
                Foco (25m)
              </button>
              <button
                onClick={() => handleModeChange('shortBreak')}
                className={`py-1.5 px-3 rounded-xl transition ${
                  timerMode === 'shortBreak'
                    ? isVitoriaMode
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-blue-600 text-white shadow-xs'
                    : 'text-stone-600'
                }`}
              >
                Pausa Curta (5m)
              </button>
              <button
                onClick={() => handleModeChange('longBreak')}
                className={`py-1.5 px-3 rounded-xl transition ${
                  timerMode === 'longBreak'
                    ? isVitoriaMode
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-blue-600 text-white shadow-xs'
                    : 'text-stone-600'
                }`}
              >
                Pausa Longa (15m)
              </button>
            </div>

            {/* Giant Circular / Minimalist Display */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className={`w-52 h-52 rounded-full border-4 flex flex-col items-center justify-center shadow-inner transition-colors ${
                isRunning
                  ? isVitoriaMode
                    ? 'border-rose-500 bg-rose-50/50 ring-8 ring-rose-100'
                    : 'border-blue-600 bg-blue-50/50 ring-8 ring-blue-100'
                  : 'border-stone-200 bg-stone-50 ring-4 ring-stone-100'
              }`}>
                <span className="text-5xl font-black text-stone-900 tracking-tighter">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-xs font-bold text-stone-500 mt-2 capitalize flex items-center gap-1">
                  {timerMode === 'focus' ? (
                    <>
                      <BookOpen className="w-3.5 h-3.5 text-stone-700" />
                      Foco no Conteúdo
                    </>
                  ) : (
                    <>
                      <Coffee className="w-3.5 h-3.5 text-amber-600" />
                      Respire e tome água
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-8 py-3 rounded-2xl text-white font-extrabold text-sm shadow-md transition flex items-center gap-2 ${
                  isRunning
                    ? 'bg-stone-800 hover:bg-black'
                    : isVitoriaMode
                    ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-200'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" /> Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" /> Iniciar Estudo
                  </>
                )}
              </button>

              <button
                onClick={handleResetTimer}
                title="Reiniciar tempo"
                className="p-3 rounded-2xl border border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Completed sessions counter */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5 font-bold">
                <Award className="w-4 h-4 text-amber-500" /> Ciclos Concluídos Hoje:
              </span>
              <span className="font-black text-stone-800 text-sm">
                {sessionsCompleted} sessões ({sessionsCompleted * 25} min)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
