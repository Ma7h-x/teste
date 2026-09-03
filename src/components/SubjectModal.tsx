import React, { useState } from 'react';
import { Subject, EvaluationType } from '../types';
import { X, Plus, Trash2 } from 'lucide-react';

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subject: Subject) => void;
  initialSubject?: Subject | null;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSubject
}) => {
  const [name, setName] = useState(initialSubject?.name || '');
  const [code, setCode] = useState(initialSubject?.code || '');
  const [professor, setProfessor] = useState(initialSubject?.professor || '');
  const [room, setRoom] = useState(initialSubject?.room || '');
  const [schedule, setSchedule] = useState(initialSubject?.schedule || '');
  const [color, setColor] = useState(initialSubject?.color || '#ec4899');
  const [minPassingGrade, setMinPassingGrade] = useState(initialSubject?.minPassingGrade || 7.0);
  const [maxAbsences, setMaxAbsences] = useState(initialSubject?.maxAbsences || 12);
  const [semester, setSemester] = useState(initialSubject?.semester || '5º Semestre');
  const [notes, setNotes] = useState(initialSubject?.notes || '');
  
  // Assessments
  const [assessments, setAssessments] = useState(
    initialSubject?.assessments || [
      { id: 'as-new-1', name: 'P1 - Teórica', type: 'prova' as EvaluationType, weight: 1, score: null },
      { id: 'as-new-2', name: 'P2 - Teórica', type: 'prova' as EvaluationType, weight: 2, score: null },
      { id: 'as-new-3', name: 'Prática de Laboratório', type: 'pratica' as EvaluationType, weight: 1, score: null }
    ]
  );

  if (!isOpen) return null;

  const colorOptions = [
    '#ec4899', // pink-500
    '#f43f5e', // rose-500
    '#d946ef', // fuchsia-500
    '#fb7185', // rose-400
    '#e879f9', // purple-400
    '#db2777', // pink-600
  ];

  const handleAddAssessment = () => {
    setAssessments([
      ...assessments,
      {
        id: 'as-' + Date.now(),
        name: `Avaliação ${assessments.length + 1}`,
        type: 'prova',
        weight: 1,
        score: null
      }
    ]);
  };

  const handleRemoveAssessment = (id: string) => {
    setAssessments(assessments.filter(a => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const subjectToSave: Subject = {
      id: initialSubject?.id || 'sub-' + Date.now(),
      name: name.trim(),
      code: code.trim() || 'BMD',
      professor: professor.trim() || 'A definir',
      room: room.trim() || 'Laboratório',
      schedule: schedule.trim() || 'A definir',
      color,
      iconName: initialSubject?.iconName || 'Microscope',
      minPassingGrade: Number(minPassingGrade) || 7.0,
      absences: initialSubject?.absences || 0,
      maxAbsences: Number(maxAbsences) || 12,
      semester,
      notes: notes.trim(),
      assessments
    };

    onSave(subjectToSave);
    onClose();
  };

  return (
    <div id="subject-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-pink-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 p-5 text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">
              {initialSubject ? 'Editar Disciplina' : 'Nova Disciplina'}
            </h2>
            <p className="text-xs text-pink-100">Controle acadêmico para biomedicina</p>
          </div>
          <button
            id="close-subject-modal"
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
              Nome da Disciplina *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Imunologia Clínica"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none text-stone-800 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Código</label>
              <input
                type="text"
                placeholder="Ex: BMD-301"
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Semestre</label>
              <input
                type="text"
                value={semester}
                onChange={e => setSemester(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-500 outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Professor(a)</label>
              <input
                type="text"
                placeholder="Ex: Dra. Helena"
                value={professor}
                onChange={e => setProfessor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Local / Sala</label>
              <input
                type="text"
                placeholder="Ex: Lab Microscopia 02"
                value={room}
                onChange={e => setRoom(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">Horário das Aulas</label>
            <input
              type="text"
              placeholder="Ex: Ter e Qui • 08:00 - 10:00"
              value={schedule}
              onChange={e => setSchedule(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-500 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Média Mínima</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="10"
                value={minPassingGrade}
                onChange={e => setMinPassingGrade(parseFloat(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Limite de Faltas</label>
              <input
                type="number"
                min="1"
                max="50"
                value={maxAbsences}
                onChange={e => setMaxAbsences(parseInt(e.target.value) || 12)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-500 outline-none transition"
              />
            </div>
          </div>

          {/* Color tag */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">Cor Temática</label>
            <div className="flex gap-2 items-center">
              {colorOptions.map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform ${color === c ? 'scale-125 ring-2 ring-offset-2 ring-pink-500' : 'hover:scale-110'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Assessment List */}
          <div className="pt-2 border-t border-pink-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-700">Avaliações & Pesos</label>
              <button
                type="button"
                onClick={handleAddAssessment}
                className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Avaliação
              </button>
            </div>
            
            <div className="space-y-2">
              {assessments.map((a, index) => (
                <div key={a.id} className="flex items-center gap-2 p-2 bg-pink-50/50 rounded-xl border border-pink-100">
                  <input
                    type="text"
                    value={a.name}
                    onChange={e => {
                      const updated = [...assessments];
                      updated[index].name = e.target.value;
                      setAssessments(updated);
                    }}
                    placeholder="Nome da prova"
                    className="flex-1 px-2.5 py-1.5 bg-white rounded-lg border border-pink-200 text-xs outline-none"
                  />
                  <div className="w-20">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={a.score !== null ? a.score : ''}
                      onChange={e => {
                        const updated = [...assessments];
                        const val = e.target.value === '' ? null : parseFloat(e.target.value);
                        updated[index].score = val;
                        setAssessments(updated);
                      }}
                      placeholder="Nota"
                      className="w-full px-2 py-1.5 bg-white rounded-lg border border-pink-200 text-xs text-center outline-none"
                    />
                  </div>
                  <div className="w-16">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={a.weight}
                      onChange={e => {
                        const updated = [...assessments];
                        updated[index].weight = parseInt(e.target.value) || 1;
                        setAssessments(updated);
                      }}
                      placeholder="Peso"
                      title="Peso da avaliação"
                      className="w-full px-2 py-1.5 bg-white rounded-lg border border-pink-200 text-xs text-center outline-none"
                    />
                  </div>
                  {assessments.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAssessment(a.id)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">Anotações da Matéria</label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Dicas de estudo, temas que mais caem em prova..."
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
              Salvar Matéria
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
