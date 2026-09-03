import React, { useState } from 'react';
import { ExamItem, Subject, EvaluationType } from '../types';
import { X, Plus, Trash2, Calendar, Clock, MapPin } from 'lucide-react';

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exam: ExamItem) => void;
  subjects: Subject[];
  initialExam?: ExamItem | null;
}

export const ExamModal: React.FC<ExamModalProps> = ({
  isOpen,
  onClose,
  onSave,
  subjects,
  initialExam
}) => {
  const [subjectId, setSubjectId] = useState(initialExam?.subjectId || (subjects[0]?.id || ''));
  const [title, setTitle] = useState(initialExam?.title || '');
  const [date, setDate] = useState(initialExam?.date || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(initialExam?.time || '08:00');
  const [room, setRoom] = useState(initialExam?.room || '');
  const [type, setType] = useState<EvaluationType>(initialExam?.type || 'prova');
  const [weight, setWeight] = useState(initialExam?.weight || 2);
  const [topics, setTopics] = useState<string[]>(initialExam?.topics || ['']);
  const [notes, setNotes] = useState(initialExam?.notes || '');
  const [completed, setCompleted] = useState(initialExam?.completed || false);
  const [score, setScore] = useState<number | undefined>(initialExam?.score);

  if (!isOpen) return null;

  const handleAddTopic = () => {
    setTopics([...topics, '']);
  };

  const handleRemoveTopic = (index: number) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  const handleTopicChange = (index: number, val: string) => {
    const updated = [...topics];
    updated[index] = val;
    setTopics(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const selectedSub = subjects.find(s => s.id === subjectId);

    const examToSave: ExamItem = {
      id: initialExam?.id || 'ex-' + Date.now(),
      subjectId,
      subjectName: selectedSub?.name || 'Disciplina',
      title: title.trim(),
      date,
      time,
      room: room.trim() || selectedSub?.room || 'Laboratório',
      type,
      weight: Number(weight) || 1,
      topics: topics.map(t => t.trim()).filter(Boolean),
      completed,
      score: score !== undefined && !isNaN(score) ? score : undefined,
      notes: notes.trim()
    };

    onSave(examToSave);
    onClose();
  };

  return (
    <div id="exam-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-pink-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 p-5 text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">
              {initialExam ? 'Editar Prova / Prazo' : 'Nova Prova ou Avaliação'}
            </h2>
            <p className="text-xs text-pink-100">Contagem regressiva e conteúdos para estudar</p>
          </div>
          <button
            id="close-exam-modal"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-sm">
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">
              Disciplina *
            </label>
            <select
              value={subjectId}
              onChange={e => {
                setSubjectId(e.target.value);
                const s = subjects.find(sub => sub.id === e.target.value);
                if (s && !room) setRoom(s.room);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none text-stone-800 transition bg-white"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">
              Título da Prova ou Entrega *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: P2 - Hemostasia & Coagulação"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none text-stone-800 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-pink-500" /> Data *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-pink-500" /> Horário
              </label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-500 outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-pink-500" /> Sala / Lab
              </label>
              <input
                type="text"
                placeholder="Ex: Lab 03"
                value={room}
                onChange={e => setRoom(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Tipo</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as EvaluationType)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-500 outline-none transition bg-white"
              >
                <option value="prova">Prova Teórica</option>
                <option value="pratica">Prática / Lâminas</option>
                <option value="relatorio">Relatório Lab</option>
                <option value="seminario">Seminário</option>
                <option value="trabalho">Trabalho</option>
              </select>
            </div>
          </div>

          {/* Topics to study */}
          <div className="pt-2 border-t border-pink-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-700">Conteúdos que vão cair</label>
              <button
                type="button"
                onClick={handleAddTopic}
                className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Tópico
              </button>
            </div>

            <div className="space-y-2">
              {topics.map((t, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-pink-400 w-4">{idx + 1}.</span>
                  <input
                    type="text"
                    value={t}
                    onChange={e => handleTopicChange(idx, e.target.value)}
                    placeholder="Ex: Cascata de coagulação e TP/TTPA"
                    className="flex-1 px-3 py-1.5 bg-pink-50/50 rounded-xl border border-pink-200 text-xs outline-none focus:bg-white transition"
                  />
                  {topics.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTopic(idx)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Completed and Score */}
          <div className="p-3 bg-pink-50/40 rounded-2xl border border-pink-100 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
              <input
                type="checkbox"
                checked={completed}
                onChange={e => setCompleted(e.target.checked)}
                className="w-4 h-4 text-pink-500 rounded border-pink-300 focus:ring-pink-400"
              />
              Já realizei esta prova
            </label>

            {completed && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-600 font-medium">Nota:</span>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  placeholder="0.0"
                  value={score ?? ''}
                  onChange={e => setScore(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                  className="w-16 px-2 py-1 bg-white border border-pink-200 rounded-lg text-xs text-center font-bold text-pink-600"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">Anotações / Lembretes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Ex: Levar jaleco, caneta preta e calculadora simples..."
              className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-500 outline-none transition text-xs"
            />
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-semibold hover:bg-stone-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-md shadow-pink-200 hover:opacity-95 transition"
            >
              Salvar Prova
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
