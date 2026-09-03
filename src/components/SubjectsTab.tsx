import React, { useState } from 'react';
import { Subject, Assessment } from '../types';
import { calculateSubjectAverage, calculateGradeNeeded } from '../utils/calculations';
import { 
  Plus, 
  Search, 
  Calculator, 
  Calendar, 
  User, 
  MapPin, 
  Clock, 
  Edit3, 
  Trash2, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubjectsTabProps {
  subjects: Subject[];
  onSaveSubject: (subject: Subject) => void;
  onDeleteSubject: (id: string) => void;
  onOpenNewSubject: () => void;
  onEditSubject: (subject: Subject) => void;
  selectedSubjectId?: string;
}

export const SubjectsTab: React.FC<SubjectsTabProps> = ({
  subjects,
  onSaveSubject,
  onDeleteSubject,
  onOpenNewSubject,
  onEditSubject,
  selectedSubjectId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'approved' | 'alert'>('all');
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(selectedSubjectId || null);
  
  // Grade simulator state
  const [simulatorSubjectId, setSimulatorSubjectId] = useState<string | null>(null);
  const [targetAverage, setTargetAverage] = useState<number>(7.0);

  // Filter subjects
  const filteredSubjects = subjects.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.code.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    const { average, isComplete } = calculateSubjectAverage(s.assessments);
    const absenceRatio = s.absences / s.maxAbsences;

    if (filter === 'approved') return isComplete && average !== null && average >= s.minPassingGrade;
    if (filter === 'in_progress') return !isComplete;
    if (filter === 'alert') return (average !== null && average < s.minPassingGrade) || absenceRatio >= 0.75;
    return true;
  });

  const handleUpdateAssessmentScore = (subject: Subject, assessmentId: string, newScore: number | null) => {
    const updatedAssessments = subject.assessments.map(a => {
      if (a.id === assessmentId) {
        return { ...a, score: newScore };
      }
      return a;
    });

    const updatedSubject: Subject = {
      ...subject,
      assessments: updatedAssessments
    };

    onSaveSubject(updatedSubject);

    if (newScore !== null && newScore >= 9.0) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ec4899', '#f43f5e', '#a855f7']
      });
    }
  };

  const handleAdjustAbsences = (subject: Subject, delta: number) => {
    const newAbsences = Math.max(0, Math.min(subject.maxAbsences, subject.absences + delta));
    onSaveSubject({
      ...subject,
      absences: newAbsences
    });
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-4 border border-pink-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-stone-800 flex items-center gap-1.5">
              <GraduationCap className="w-5 h-5 text-pink-500" /> Matérias & Notas
            </h1>
            <p className="text-xs text-stone-500">Acompanhe médias, faltas e avaliações</p>
          </div>
          <button
            onClick={onOpenNewSubject}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-xs hover:opacity-95 flex items-center gap-1 transition"
          >
            <Plus className="w-4 h-4" /> Nova Matéria
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por matéria, professora ou código..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-pink-50/40 rounded-xl border border-pink-200 text-xs outline-none focus:bg-white focus:border-pink-500 transition"
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 text-xs">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'in_progress', label: 'Em Andamento' },
            { id: 'approved', label: 'Aprovadas' },
            { id: 'alert', label: 'Atenção ⚠️' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition text-[11px] ${
                filter === f.id
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-pink-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Banner / Modal trigger */}
      {simulatorSubjectId && (
        <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-4 rounded-3xl border border-pink-200 shadow-sm animate-fadeIn">
          {(() => {
            const sub = subjects.find(s => s.id === simulatorSubjectId);
            if (!sub) return null;
            const sim = calculateGradeNeeded(sub.assessments, targetAverage);

            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-pink-500 text-white flex items-center justify-center">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-stone-800">
                        Simulador de Nota • {sub.name}
                      </h3>
                      <p className="text-[10px] text-stone-500">Quanto você precisa tirar para passar?</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSimulatorSubjectId(null)}
                    className="text-stone-400 hover:text-stone-700 text-xs font-bold px-2 py-0.5 rounded-lg"
                  >
                    Fechar
                  </button>
                </div>

                <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-pink-200 text-xs">
                  <div>
                    <label className="text-[10px] text-stone-500 block font-semibold">Meta de Média Final</label>
                    <div className="flex gap-1 mt-1">
                      {[6.0, 7.0, 8.0, 9.0].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setTargetAverage(val)}
                          className={`px-2 py-0.5 rounded-lg font-bold text-[11px] ${
                            targetAverage === val
                              ? 'bg-pink-500 text-white'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {val.toFixed(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-stone-500 block font-semibold">
                      Precisa tirar na {sim.pendingAssessmentName || 'próxima prova'}:
                    </span>
                    {sim.needed !== null ? (
                      <span className={`text-lg font-black ${sim.possible ? 'text-pink-600' : 'text-rose-600'}`}>
                        {sim.needed <= 0 ? 'Já passou! 🎉' : sim.needed.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-stone-600">Todas as notas lançadas!</span>
                    )}
                  </div>
                </div>

                {sim.needed !== null && sim.needed > 10.0 && (
                  <p className="text-[11px] text-rose-700 bg-rose-100/70 p-2 rounded-xl flex items-center gap-1 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    Para atingir essa média, será necessária prova final / substitutiva (Sub).
                  </p>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Subjects Cards List */}
      <div className="space-y-3">
        {filteredSubjects.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-pink-100">
            <GraduationCap className="w-10 h-10 text-pink-300 mx-auto mb-2" />
            <p className="text-xs text-stone-500 font-medium">Nenhuma disciplina encontrada com esse filtro.</p>
          </div>
        ) : (
          filteredSubjects.map(sub => {
            const { average, isComplete } = calculateSubjectAverage(sub.assessments);
            const isPassing = average !== null && average >= sub.minPassingGrade;
            const isExpanded = expandedSubjectId === sub.id;
            const absencePercent = Math.round((sub.absences / sub.maxAbsences) * 100);
            const absenceDanger = absencePercent >= 75;

            return (
              <div
                key={sub.id}
                className="bg-white rounded-3xl border border-pink-100 shadow-xs overflow-hidden transition hover:border-pink-300"
              >
                {/* Main Card Header */}
                <div
                  onClick={() => setExpandedSubjectId(isExpanded ? null : sub.id)}
                  className="p-4 cursor-pointer hover:bg-pink-50/30 transition flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 font-bold shadow-xs"
                      style={{ backgroundColor: sub.color }}
                    >
                      {sub.code.substring(0, 3)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-600">
                          {sub.code}
                        </span>
                        <span className="text-[10px] font-semibold text-pink-600">
                          {sub.semester}
                        </span>
                      </div>
                      <h2 className="text-sm font-bold text-stone-800 truncate mt-0.5">
                        {sub.name}
                      </h2>
                      <p className="text-xs text-stone-500 flex items-center gap-1 truncate mt-0.5">
                        <User className="w-3 h-3 shrink-0" /> {sub.professor}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className={`px-2.5 py-1 rounded-xl text-xs font-black inline-flex items-center gap-1 ${
                      average === null
                        ? 'bg-stone-100 text-stone-600'
                        : isPassing
                        ? 'bg-pink-100 text-pink-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {average !== null ? `Média ${average.toFixed(1)}` : 'Sem Notas'}
                    </div>

                    <div className="mt-1 flex items-center justify-end gap-1 text-stone-400">
                      <span className="text-[10px] text-stone-500 font-medium">
                        {sub.assessments.filter(a => a.score !== null).length}/{sub.assessments.length} notas
                      </span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-pink-50 space-y-4">
                    {/* Location & Schedule Bar */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-pink-50/40 p-2.5 rounded-2xl text-stone-600">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" /> {sub.room}
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <Clock className="w-3.5 h-3.5 text-pink-500 shrink-0" /> {sub.schedule}
                      </span>
                    </div>

                    {/* Absence Tracker */}
                    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-stone-700">Frequência & Faltas</span>
                          {absenceDanger && (
                            <span className="px-1.5 py-0.2 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-md flex items-center gap-0.5">
                              ⚠️ Limite Próximo!
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-bold text-stone-600">
                          {sub.absences} de {sub.maxAbsences} faltas ({absencePercent}%)
                        </span>
                      </div>

                      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full transition-all ${
                            absenceDanger ? 'bg-rose-500' : 'bg-pink-500'
                          }`}
                          style={{ width: `${Math.min(100, absencePercent)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span>Você ainda pode faltar {Math.max(0, sub.maxAbsences - sub.absences)} vezes</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleAdjustAbsences(sub, -1)}
                            disabled={sub.absences <= 0}
                            className="w-6 h-6 rounded-lg bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-100 disabled:opacity-40 flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-stone-800 w-5 text-center">{sub.absences}</span>
                          <button
                            type="button"
                            onClick={() => handleAdjustAbsences(sub, 1)}
                            disabled={sub.absences >= sub.maxAbsences}
                            className="w-6 h-6 rounded-lg bg-pink-100 border border-pink-200 text-pink-700 font-bold hover:bg-pink-200 flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Assessments Breakdown */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-stone-700">Notas das Avaliações</h4>
                        <button
                          onClick={() => setSimulatorSubjectId(sub.id)}
                          className="text-[11px] font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1"
                        >
                          <Calculator className="w-3 h-3" /> Simular quanto preciso
                        </button>
                      </div>

                      <div className="space-y-2">
                        {sub.assessments.map(a => (
                          <div
                            key={a.id}
                            className="flex items-center justify-between p-2.5 bg-pink-50/30 rounded-xl border border-pink-100"
                          >
                            <div className="min-w-0 pr-2">
                              <span className="text-xs font-bold text-stone-800 block truncate">
                                {a.name}
                              </span>
                              <span className="text-[10px] text-stone-500">
                                Peso: {a.weight} • {a.date ? new Date(a.date + 'T00:00:00').toLocaleDateString('pt-BR') : 'Sem data definida'}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                placeholder="Nota"
                                value={a.score !== null && a.score !== undefined ? a.score : ''}
                                onChange={e => {
                                  const val = e.target.value === '' ? null : parseFloat(e.target.value);
                                  handleUpdateAssessmentScore(sub, a.id, val);
                                }}
                                className="w-16 px-2 py-1 bg-white rounded-lg border border-pink-200 text-xs font-bold text-center text-pink-700 outline-none focus:ring-1 focus:ring-pink-400"
                              />
                              <span className="text-[10px] text-stone-400">/ 10</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes & Actions */}
                    {sub.notes && (
                      <div className="p-2.5 bg-rose-50/50 rounded-xl border border-rose-100 text-xs text-stone-600">
                        <span className="font-bold text-rose-800 block text-[10px] mb-0.5">Dicas & Lembretes:</span>
                        {sub.notes}
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                      <button
                        onClick={() => onEditSubject(sub)}
                        className="px-3 py-1.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Editar
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Deseja realmente excluir a disciplina "${sub.name}"?`)) {
                            onDeleteSubject(sub.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Excluir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
