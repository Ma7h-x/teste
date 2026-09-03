import React, { useState } from 'react';
import { ExamItem, Subject } from '../types';
import { getDaysUntil } from '../utils/calculations';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Circle, 
  Plus, 
  Filter, 
  BookOpen, 
  CheckSquare, 
  Square,
  Sparkles,
  Edit3,
  Trash2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExamsTabProps {
  exams: ExamItem[];
  subjects: Subject[];
  onSaveExam: (exam: ExamItem) => void;
  onDeleteExam: (id: string) => void;
  onOpenNewExam: () => void;
  onEditExam: (exam: ExamItem) => void;
}

export const ExamsTab: React.FC<ExamsTabProps> = ({
  exams,
  subjects,
  onSaveExam,
  onDeleteExam,
  onOpenNewExam,
  onEditExam
}) => {
  const [filter, setFilter] = useState<'pending' | 'completed' | 'all'>('pending');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  
  // Track checked topics locally
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  const toggleTopic = (examId: string, topicIdx: number) => {
    const key = `${examId}-${topicIdx}`;
    setCompletedTopics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleToggleCompleteExam = (exam: ExamItem) => {
    const newCompleted = !exam.completed;
    onSaveExam({
      ...exam,
      completed: newCompleted
    });

    if (newCompleted) {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#f43f5e', '#fb7185', '#38bdf8', '#34d399']
      });
    }
  };

  const filteredExams = exams
    .filter(e => {
      if (filter === 'pending') return !e.completed;
      if (filter === 'completed') return e.completed;
      return true;
    })
    .filter(e => {
      if (selectedSubjectFilter === 'all') return true;
      return e.subjectId === selectedSubjectFilter;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-3xl p-4 border border-pink-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-stone-800 flex items-center gap-1.5">
              <Calendar className="w-5 h-5 text-pink-500" /> Provas & Prazos
            </h1>
            <p className="text-xs text-stone-500">Cronograma de estudos e contagem regressiva</p>
          </div>
          <button
            onClick={onOpenNewExam}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-xs hover:opacity-95 flex items-center gap-1 transition"
          >
            <Plus className="w-4 h-4" /> Nova Prova
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-pink-50">
          <div className="flex gap-1.5 text-xs">
            {[
              { id: 'pending', label: 'Próximas' },
              { id: 'completed', label: 'Concluídas' },
              { id: 'all', label: 'Todas' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-3 py-1 rounded-full font-semibold transition text-[11px] ${
                  filter === f.id
                    ? 'bg-pink-500 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-pink-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <select
            value={selectedSubjectFilter}
            onChange={e => setSelectedSubjectFilter(e.target.value)}
            className="text-[11px] px-2.5 py-1 bg-pink-50 rounded-xl border border-pink-200 text-stone-700 outline-none max-w-[140px] truncate"
          >
            <option value="all">Todas matérias</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Exams list */}
      <div className="space-y-3">
        {filteredExams.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-pink-100">
            <CheckCircle className="w-10 h-10 text-pink-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-stone-700">Nenhuma avaliação encontrada</h3>
            <p className="text-xs text-stone-500 mt-1">Tudo calmo no seu cronograma acadêmico!</p>
          </div>
        ) : (
          filteredExams.map(exam => {
            const days = getDaysUntil(exam.date);
            const isToday = days === 0;
            const isTomorrow = days === 1;
            const isUrgent = days !== null && days <= 3 && !exam.completed;

            return (
              <div
                key={exam.id}
                className={`bg-white rounded-3xl border p-4 shadow-xs transition hover:border-pink-300 ${
                  exam.completed
                    ? 'border-stone-200 opacity-75'
                    : isUrgent
                    ? 'border-rose-300 ring-2 ring-rose-100'
                    : 'border-pink-100'
                }`}
              >
                {/* Top status bar */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-pink-100 text-pink-700 uppercase tracking-wider">
                      {exam.subjectName}
                    </span>
                    <h2 className="text-sm font-bold text-stone-800 mt-1">
                      {exam.title}
                    </h2>
                  </div>

                  {/* Countdown Badge */}
                  {!exam.completed ? (
                    <div className={`px-2.5 py-1 rounded-xl text-xs font-black shrink-0 flex items-center gap-1 ${
                      isToday
                        ? 'bg-rose-500 text-white animate-pulse'
                        : isTomorrow
                        ? 'bg-rose-100 text-rose-700'
                        : isUrgent
                        ? 'bg-pink-200 text-pink-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {isToday ? 'É HOJE! 🍀' : isTomorrow ? 'Amanhã!' : days < 0 ? 'Já passou' : `${days} dias`}
                    </div>
                  ) : (
                    <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1 shrink-0">
                      <CheckCircle className="w-3.5 h-3.5" /> Concluída
                    </span>
                  )}
                </div>

                {/* Date, Time and Room info */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600 py-2 border-y border-pink-50 my-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-pink-500" />
                    {new Date(exam.date + 'T00:00:00').toLocaleDateString('pt-BR', {
                      weekday: 'short',
                      day: '2-digit',
                      month: 'long'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-pink-500" />
                    {exam.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-pink-500" />
                    {exam.room}
                  </span>
                </div>

                {/* Checkable Study Topics */}
                {exam.topics && exam.topics.length > 0 && (
                  <div className="mt-2 bg-pink-50/40 p-3 rounded-2xl border border-pink-100/60">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-stone-700 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-pink-600" /> Conteúdos para Estudar
                      </span>
                      <span className="text-[10px] text-pink-600 font-semibold">
                        {exam.topics.filter((_, idx) => completedTopics[`${exam.id}-${idx}`]).length}/{exam.topics.length} revisados
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {exam.topics.map((topic, idx) => {
                        const isChecked = !!completedTopics[`${exam.id}-${idx}`];
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleTopic(exam.id, idx)}
                            className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 hover:text-pink-700 transition select-none"
                          >
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-pink-500 shrink-0" />
                            ) : (
                              <Square className="w-4 h-4 text-stone-300 shrink-0" />
                            )}
                            <span className={isChecked ? 'line-through text-stone-400' : ''}>
                              {topic}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Notes if any */}
                {exam.notes && (
                  <p className="mt-2 text-xs text-stone-500 italic bg-stone-50 p-2 rounded-xl">
                    💡 {exam.notes}
                  </p>
                )}

                {/* Actions bottom */}
                <div className="flex items-center justify-between pt-3 mt-1">
                  <button
                    onClick={() => handleToggleCompleteExam(exam)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition ${
                      exam.completed
                        ? 'border-stone-200 text-stone-600 hover:bg-stone-100'
                        : 'border-pink-500 bg-pink-50 text-pink-700 hover:bg-pink-100'
                    }`}
                  >
                    {exam.completed ? (
                      <>Marcar como pendente</>
                    ) : (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-pink-600" /> Marcar como Realizada
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditExam(exam)}
                      className="p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition"
                      title="Editar prova"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Deseja excluir a prova "${exam.title}"?`)) {
                          onDeleteExam(exam.id);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Excluir prova"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
