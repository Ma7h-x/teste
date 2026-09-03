import React, { useState, useEffect } from 'react';
import { LoveNote, AppMode } from '../types';
import { X, Heart, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoveNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: LoveNote) => void;
  mode?: AppMode;
}

export const LoveNoteModal: React.FC<LoveNoteModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  mode = 'vitoria'
}) => {
  const isVitoria = mode === 'vitoria';
  const [author, setAuthor] = useState(isVitoria ? 'Matheus ❤️' : 'Foco nos Estudos');
  const [text, setText] = useState('');
  const [category, setCategory] = useState<string>(isVitoria ? 'carinho' : 'foco');

  useEffect(() => {
    if (isOpen) {
      setAuthor(isVitoria ? 'Matheus ❤️' : 'Foco nos Estudos');
      setCategory(isVitoria ? 'carinho' : 'foco');
      setText('');
    }
  }, [isOpen, isVitoria]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newNote: LoveNote = {
      id: 'note-' + Date.now(),
      author: author.trim() || (isVitoria ? 'Matheus ❤️' : 'Mentalidade Acadêmica'),
      text: text.trim(),
      date: new Date().toISOString().split('T')[0],
      category: category as any,
      favorite: true
    };

    onSave(newNote);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: isVitoria 
        ? ['#ec4899', '#f43f5e', '#fda4af', '#fb7185']
        : ['#3b82f6', '#10b981', '#6366f1', '#f59e0b']
    });
    onClose();
  };

  const vitoriaCategories = [
    { id: 'carinho', label: '💕 Puro Carinho' },
    { id: 'motivacao', label: '🔥 Força nas Provas' },
    { id: 'orgulho', label: '✨ Muito Orgulho' },
    { id: 'descanso', label: '☕ Hora de Relaxar' },
  ];

  const studentCategories = [
    { id: 'foco', label: '🎯 Foco Absoluto' },
    { id: 'sucesso', label: '🏆 Sucesso & Aprovação' },
    { id: 'resiliencia', label: '💪 Resiliência & Garra' },
    { id: 'calma', label: '🌿 Calma & Equilíbrio' },
  ];

  const categories = isVitoria ? vitoriaCategories : studentCategories;

  return (
    <div id="love-note-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-stone-200 overflow-hidden my-6">
        <div className={`p-5 text-white flex items-center justify-between ${
          isVitoria 
            ? 'bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500' 
            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700'
        }`}>
          <div className="flex items-center gap-2">
            {isVitoria ? (
              <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
            ) : (
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            )}
            <h2 className="text-base font-bold">
              {isVitoria ? 'Deixar um Recadinho de Amor' : 'Nova Afirmação Motivacional'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">
              {isVitoria ? 'De quem é o recado?' : 'Autor / Propósito'}
            </label>
            <input
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder={isVitoria ? 'Ex: Matheus ❤️' : 'Ex: Foco nos Estudos, Meta 2026...'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-stone-500 outline-hidden text-stone-800 bg-stone-50"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Categoria</label>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                  className={`py-2 px-2 text-xs rounded-xl border font-semibold transition ${
                    category === item.id
                      ? isVitoria
                        ? 'bg-rose-100 border-rose-400 text-rose-700'
                        : 'bg-blue-100 border-blue-400 text-blue-700'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              {isVitoria ? 'Sua mensagem de amor e incentivo *' : 'Frase motivacional ou lembrete *'}
            </label>
            <textarea
              required
              rows={4}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={
                isVitoria
                  ? 'Escreva algo lindo para ela ler antes das aulas ou nos momentos difíceis...'
                  : 'Escreva um pensamento de incentivo, disciplina ou foco para manter o ânimo nos estudos...'
              }
              className={`w-full p-3 rounded-xl border border-stone-200 focus:outline-hidden text-stone-800 text-xs leading-relaxed ${
                isVitoria ? 'font-handwriting text-lg bg-pink-50/40' : 'bg-stone-50'
              }`}
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`flex-1 py-2.5 rounded-xl text-white font-bold shadow-sm hover:opacity-95 flex items-center justify-center gap-1.5 transition ${
                isVitoria 
                  ? 'bg-rose-500 shadow-rose-200' 
                  : 'bg-blue-600 shadow-blue-200'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
