import React, { useState } from 'react';
import { LAB_REFERENCE_VALUES } from '../data/initialData';
import { UserProfile } from '../types';
import { 
  FlaskConical, 
  Search, 
  Calculator, 
  Layers, 
  CheckSquare, 
  Square, 
  Microscope, 
  Sparkles,
  Info,
  GraduationCap,
  Calendar,
  AlertTriangle,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

interface LabToolsTabProps {
  profile: UserProfile;
}

export const LabToolsTab: React.FC<LabToolsTabProps> = ({ profile }) => {
  const isHealthCourse = 
    profile.course.toLowerCase().includes('bio') ||
    profile.course.toLowerCase().includes('med') ||
    profile.course.toLowerCase().includes('saúde') ||
    profile.course.toLowerCase().includes('farm') ||
    profile.course.toLowerCase().includes('enf');

  const [activeSection, setActiveSection] = useState<'grade_sim' | 'attendance_sim' | 'references' | 'dilution' | 'checklist'>('grade_sim');
  const [searchRef, setSearchRef] = useState('');
  const [refCategory, setRefCategory] = useState<string>('all');

  // Academic Grade Simulator State
  const [p1Grade, setP1Grade] = useState<string>('6.5');
  const [targetMinGrade, setTargetMinGrade] = useState<string>('7.0');
  const [weightP1, setWeightP1] = useState<string>('4');
  const [weightP2, setWeightP2] = useState<string>('6');

  // Calculation for required P2 grade: (P1*w1 + P2*w2)/(w1+w2) = Target => P2 = (Target*(w1+w2) - P1*w1)/w2
  const nP1 = parseFloat(p1Grade);
  const nTarget = parseFloat(targetMinGrade) || 7.0;
  const nW1 = parseFloat(weightP1) || 5;
  const nW2 = parseFloat(weightP2) || 5;

  let requiredP2: number | null = null;
  if (!isNaN(nP1) && nW2 > 0) {
    const totalW = nW1 + nW2;
    requiredP2 = (nTarget * totalW - nP1 * nW1) / nW2;
    requiredP2 = Math.round(requiredP2 * 10) / 10;
  }

  // Attendance & Absence Limit Calculator
  const [totalWorkload, setTotalWorkload] = useState<string>('80'); // total hours e.g. 80h
  const [hoursPerClass, setHoursPerClass] = useState<string>('4'); // 4 hours per day
  const [currentAbsences, setCurrentAbsences] = useState<string>('2');

  const nWorkload = parseFloat(totalWorkload) || 80;
  const nClassHours = parseFloat(hoursPerClass) || 4;
  const nAbsences = parseFloat(currentAbsences) || 0;

  // Max 25% absences allowed by MEC / Universities
  const maxAbsenceHours = Math.floor(nWorkload * 0.25);
  const maxAbsenceDays = Math.floor(maxAbsenceHours / nClassHours);
  const currentAbsenceHours = nAbsences * nClassHours;
  const remainingAbsenceDays = Math.max(0, maxAbsenceDays - nAbsences);

  // Dilution Calculator State: C1 * V1 = C2 * V2
  const [c1, setC1] = useState<string>('10'); // e.g., 10 mol/L or 10%
  const [c2, setC2] = useState<string>('2');  // target conc
  const [v2, setV2] = useState<string>('100'); // target volume (mL)
  
  const numC1 = parseFloat(c1);
  const numC2 = parseFloat(c2);
  const numV2 = parseFloat(v2);

  let calculatedV1: number | null = null;
  let calculatedWater: number | null = null;
  if (numC1 > 0 && numC2 > 0 && numV2 > 0 && numC1 >= numC2) {
    calculatedV1 = Number(((numC2 * numV2) / numC1).toFixed(2));
    calculatedWater = Number((numV2 - calculatedV1).toFixed(2));
  }

  // Academic / Lab Checklist State
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'caderno': true,
    'calculadora': true,
    'garrafa': true,
    'jaleco': true,
    'canetas': true,
    'trabalho_impresso': false,
  });

  const toggleCheck = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredRefs = LAB_REFERENCE_VALUES.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchRef.toLowerCase()) ||
                          r.clinicalSignificance.toLowerCase().includes(searchRef.toLowerCase());
    if (!matchesSearch) return false;
    if (refCategory === 'all') return true;
    return r.category === refCategory;
  });

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div>
          <h1 className="text-base font-black text-stone-800 flex items-center gap-1.5">
            {isHealthCourse ? (
              <>
                <FlaskConical className="w-5 h-5 text-blue-600" /> Ferramentas & Guia Acadêmico
              </>
            ) : (
              <>
                <Calculator className="w-5 h-5 text-blue-600" /> Calculadoras & Ferramentas de Estudo
              </>
            )}
          </h1>
          <p className="text-xs text-stone-500">
            Simulador de notas, limite de faltas e ferramentas de apoio para {profile.course}
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex gap-1 p-1 bg-stone-100 rounded-2xl border border-stone-200 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveSection('grade_sim')}
            className={`py-2 px-3 rounded-xl transition text-center whitespace-nowrap ${
              activeSection === 'grade_sim'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Simulador de Média
          </button>

          <button
            onClick={() => setActiveSection('attendance_sim')}
            className={`py-2 px-3 rounded-xl transition text-center whitespace-nowrap ${
              activeSection === 'attendance_sim'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Limite de Faltas
          </button>

          {isHealthCourse && (
            <button
              onClick={() => setActiveSection('references')}
              className={`py-2 px-3 rounded-xl transition text-center whitespace-nowrap ${
                activeSection === 'references'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Valores Ref. Lab
            </button>
          )}

          <button
            onClick={() => setActiveSection('dilution')}
            className={`py-2 px-3 rounded-xl transition text-center whitespace-nowrap ${
              activeSection === 'dilution'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Diluição C1V1
          </button>

          <button
            onClick={() => setActiveSection('checklist')}
            className={`py-2 px-3 rounded-xl transition text-center whitespace-nowrap ${
              activeSection === 'checklist'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Checklist Aula
          </button>
        </div>
      </div>

      {/* 1. Academic Grade Simulator (Universal for any course) */}
      {activeSection === 'grade_sim' && (
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              Simulador: Quanto preciso tirar na próxima prova?
            </h2>
            <p className="text-xs text-stone-500">
              Calcule a nota exata necessária para ser aprovado sem ficar de recuperação ou exame final.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Nota da 1ª Prova (P1)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={p1Grade}
                onChange={e => setP1Grade(e.target.value)}
                placeholder="Ex: 6.5"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Média Mínima para Aprovação
              </label>
              <input
                type="number"
                step="0.5"
                min="5"
                max="10"
                value={targetMinGrade}
                onChange={e => setTargetMinGrade(e.target.value)}
                placeholder="Ex: 7.0"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Peso da P1 (Opcional)
              </label>
              <input
                type="number"
                step="1"
                min="1"
                max="10"
                value={weightP1}
                onChange={e => setWeightP1(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Peso da P2 (Opcional)
              </label>
              <input
                type="number"
                step="1"
                min="1"
                max="10"
                value={weightP2}
                onChange={e => setWeightP2(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
              />
            </div>
          </div>

          {/* Result Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 text-center space-y-1.5">
            <span className="text-xs font-bold text-blue-900 block">
              Para fechar com média final {nTarget.toFixed(1)}:
            </span>
            {requiredP2 !== null ? (
              <div>
                <span className={`text-3xl font-black ${
                  requiredP2 <= 5
                    ? 'text-emerald-600'
                    : requiredP2 <= 7.5
                    ? 'text-blue-600'
                    : requiredP2 <= 10
                    ? 'text-amber-600'
                    : 'text-rose-600'
                }`}>
                  {requiredP2 > 10 ? 'Nota > 10' : `${Math.max(0, requiredP2).toFixed(1)}`}
                </span>
                <p className="text-xs text-stone-600 mt-1">
                  {requiredP2 <= 0
                    ? '🎉 Você já atingiu a média necessária apenas com a P1!'
                    : requiredP2 <= 7
                    ? 'Meta perfeitamente viável! Mantenha a rotina de resumos e exercícios.'
                    : requiredP2 <= 10
                    ? 'Hora de intensificar o foco nos conteúdos da segunda prova!'
                    : 'Atenção: A nota necessária ultrapassa 10. Você provavelmente precisará de exame final.'}
                </p>
              </div>
            ) : (
              <span className="text-xs text-stone-400">Insira valores válidos acima</span>
            )}
          </div>
        </div>
      )}

      {/* 2. Attendance & Absence Limit Calculator */}
      {activeSection === 'attendance_sim' && (
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              Calculadora de Frequência & Faltas Máximas (75%)
            </h2>
            <p className="text-xs text-stone-500">
              Universidades e o MEC exigem no mínimo 75% de presença nas aulas.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Carga Horária (h)
              </label>
              <input
                type="number"
                value={totalWorkload}
                onChange={e => setTotalWorkload(e.target.value)}
                placeholder="80"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Horas / Aula
              </label>
              <input
                type="number"
                value={hoursPerClass}
                onChange={e => setHoursPerClass(e.target.value)}
                placeholder="4"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Faltas Atuais (Dias)
              </label>
              <input
                type="number"
                value={currentAbsences}
                onChange={e => setCurrentAbsences(e.target.value)}
                placeholder="2"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
              <span className="text-[10px] text-stone-500 block font-bold">Limite Permitido (25%)</span>
              <span className="text-xl font-black text-stone-900">{maxAbsenceDays} dias</span>
              <span className="text-[10px] text-stone-500 block">({maxAbsenceHours} horas totais)</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
              <span className="text-[10px] text-stone-500 block font-bold">Você ainda pode faltar</span>
              <span className={`text-xl font-black ${
                remainingAbsenceDays <= 1 ? 'text-rose-600' : 'text-emerald-600'
              }`}>
                {remainingAbsenceDays} {remainingAbsenceDays === 1 ? 'dia' : 'dias'}
              </span>
              <span className="text-[10px] text-stone-500 block">antes da reprovação</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Reference Values (Health/Bio/Med) */}
      {activeSection === 'references' && (
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-2xl border border-stone-200 space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchRef}
                onChange={e => setSearchRef(e.target.value)}
                placeholder="Buscar exame (ex: Leucócitos, Glicose, Ureia...)"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-medium text-stone-800 outline-hidden"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
              {['all', 'Hematologia', 'Bioquímica', 'Coagulação'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setRefCategory(cat)}
                  className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                    refCategory === cat
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat === 'all' ? 'Todos' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filteredRefs.map((item, idx) => (
              <div key={idx} className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-stone-900">{item.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold">
                    {item.category}
                  </span>
                </div>
                <div className="text-xs font-black text-blue-700">
                  {item.referenceRange}
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed pt-1 border-t border-stone-100">
                  {item.clinicalSignificance}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Dilution C1V1 Calculator */}
      {activeSection === 'dilution' && (
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div>
            <h2 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-blue-600" />
              Calculadora de Diluição: C1 × V1 = C2 × V2
            </h2>
            <p className="text-xs text-stone-500">
              Ideal para soluções e reagentes em laboratórios e aulas práticas
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Conc. Inicial (C1)</label>
              <input
                type="number"
                value={c1}
                onChange={e => setC1(e.target.value)}
                placeholder="Ex: 10"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Conc. Final (C2)</label>
              <input
                type="number"
                value={c2}
                onChange={e => setC2(e.target.value)}
                placeholder="Ex: 2"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Volume Final (V2 mL)</label>
              <input
                type="number"
                value={v2}
                onChange={e => setV2(e.target.value)}
                placeholder="Ex: 100"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold"
              />
            </div>
          </div>

          {calculatedV1 !== null && calculatedWater !== null ? (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
              <div className="text-xs font-bold text-blue-950">Receita de Preparo:</div>
              <ul className="text-xs text-blue-900 space-y-1">
                <li>• Medir <strong>{calculatedV1} mL</strong> da solução concentrada (C1).</li>
                <li>• Adicionar <strong>{calculatedWater} mL</strong> de diluente / água destilada.</li>
                <li>• Volume final obtido: <strong>{numV2} mL</strong> na concentração <strong>{numC2}</strong>.</li>
              </ul>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-stone-50 text-stone-500 text-xs text-center">
              A concentração inicial (C1) deve ser maior que a final (C2).
            </div>
          )}
        </div>
      )}

      {/* 5. Checklist de Materiais */}
      {activeSection === 'checklist' && (
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div>
            <h2 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-blue-600" />
              Checklist de Materiais para a Aula
            </h2>
            <p className="text-xs text-stone-500">Nunca esqueça itens essenciais para a faculdade</p>
          </div>

          <div className="space-y-2">
            {[
              { id: 'caderno', label: 'Caderno / Tablet de Anotações' },
              { id: 'canetas', label: 'Estojo (Canetas, Marca-texto, Lápis)' },
              { id: 'calculadora', label: 'Calculadora Científica' },
              { id: 'garrafa', label: 'Garrafinha de Água & Lanche' },
              { id: 'jaleco', label: 'Jaleco Branco (Aulas Práticas / Lab)' },
              { id: 'trabalho_impresso', label: 'Trabalhos / Seminários do Dia' },
            ].map(item => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  checklist[item.id]
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : 'bg-stone-50 border-stone-200 text-stone-600'
                }`}
              >
                <span className="text-xs font-semibold">{item.label}</span>
                {checklist[item.id] ? (
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                ) : (
                  <Square className="w-4 h-4 text-stone-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
