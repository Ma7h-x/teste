import React, { useState, useEffect } from 'react';
import { UserProfile, ColorTheme, AppMode } from '../types';
import { AVAILABLE_COURSES } from '../data/initialData';
import { THEMES } from '../utils/theme';
import { 
  X, 
  User, 
  GraduationCap, 
  Palette, 
  Clock, 
  Heart, 
  Sparkles, 
  Check, 
  Building,
  RotateCcw,
  KeyRound,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onSwitchToVitoria: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onSwitchToVitoria
}) => {
  const [mode, setMode] = useState<AppMode>(profile.mode);
  const [name, setName] = useState(profile.name);
  const [course, setCourse] = useState(profile.course);
  const [customCourse, setCustomCourse] = useState('');
  const [isCustomCourse, setIsCustomCourse] = useState(false);
  const [semester, setSemester] = useState(profile.semester);
  const [university, setUniversity] = useState(profile.university || '');
  const [theme, setTheme] = useState<ColorTheme>(profile.theme);
  const [avatarEmoji, setAvatarEmoji] = useState(profile.avatarEmoji);
  const [targetHours, setTargetHours] = useState(profile.targetHours.toString());

  // Secret code state for Vitória
  const [showSecretUnlock, setShowSecretUnlock] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [secretFeedback, setSecretFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMode(profile.mode);
      setName(profile.name);
      setCourse(profile.course);
      setSemester(profile.semester);
      setUniversity(profile.university || '');
      setTheme(profile.theme);
      setAvatarEmoji(profile.avatarEmoji);
      setTargetHours(profile.targetHours.toString());
      setShowSecretUnlock(false);
      setSecretCode('');
      setSecretFeedback(null);

      const isKnown = AVAILABLE_COURSES.some(c => c.name.toLowerCase() === profile.course.toLowerCase());
      if (!isKnown && profile.course) {
        setIsCustomCourse(true);
        setCustomCourse(profile.course);
      } else {
        setIsCustomCourse(false);
      }
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSelectCourse = (courseName: string, icon: string, defaultHours: number) => {
    if (courseName === 'Outro Curso Personalizado') {
      setIsCustomCourse(true);
      setAvatarEmoji('🎓');
    } else {
      setIsCustomCourse(false);
      setCourse(courseName);
      setAvatarEmoji(icon);
      setTargetHours(defaultHours.toString());
    }
  };

  const handleModeToggle = (selectedMode: AppMode) => {
    setMode(selectedMode);
    if (selectedMode === 'vitoria') {
      setName('Vitória');
      setCourse('Biomedicina');
      setSemester('5º Semestre');
      setTheme('rose');
      setAvatarEmoji('🔬');
      setTargetHours('400');
      setIsCustomCourse(false);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#f43f5e', '#fda4af']
      });
    } else {
      if (name === 'Vitória') setName('Estudante');
      if (theme === 'rose') setTheme('blue');
    }
  };

  const handleTryUnlockSecret = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = secretCode.trim().toLowerCase();
    if (cleanCode === 'vitoria' || cleanCode === 'amor' || cleanCode === '1234' || cleanCode === 'biomedicina') {
      handleModeToggle('vitoria');
      setSecretFeedback('🌸 Modo Especial da Vitória desbloqueado com sucesso!');
      setTimeout(() => {
        setShowSecretUnlock(false);
        setSecretFeedback(null);
      }, 1800);
    } else {
      setSecretFeedback('Código incorreto. Tente novamente.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCourse = isCustomCourse ? (customCourse.trim() || 'Curso Universitário') : course;
    const finalHours = parseInt(targetHours, 10) || 300;

    onSaveProfile({
      mode,
      name: name.trim() || (mode === 'vitoria' ? 'Vitória' : 'Estudante'),
      course: finalCourse,
      semester: semester.trim() || 'Semestre Atual',
      university: university.trim(),
      theme,
      avatarEmoji: avatarEmoji || '🎓',
      targetHours: finalHours
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-stone-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-base">
              {avatarEmoji}
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900">
                {mode === 'vitoria' ? 'Perfil Especial da Vitória ❤️' : 'Perfil Universitário'}
              </h2>
              <p className="text-[11px] text-stone-500">
                {mode === 'vitoria' 
                  ? 'Modo exclusivo com bilhetes de amor do Matheus' 
                  : 'Personalize seu curso, semestre e preferências'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Exibição condicional caso a Vitória esteja no modo exclusivo */}
          {mode === 'vitoria' && (
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                <span className="text-xs font-bold text-rose-900">
                  Modo Especial Vitória Ativo
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleModeToggle('student')}
                className="px-2.5 py-1 text-[11px] font-bold rounded-xl bg-white hover:bg-rose-100 text-rose-700 border border-rose-200 transition"
              >
                Modo Discreto
              </button>
            </div>
          )}

          {/* Student Name */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Nome do Estudante
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ex: Vitória, Matheus, Ana..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-pink-500 focus:bg-white"
                required
              />
              <span className="absolute right-3 top-2.5 text-xs text-stone-400">
                <User className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Course Selection */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Curso Universitário
            </label>
            
            {/* Quick Course Chips */}
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-stone-50 rounded-xl border border-stone-200 mb-2">
              {AVAILABLE_COURSES.map(c => {
                const isSelected = !isCustomCourse && course.toLowerCase() === c.name.toLowerCase();
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCourse(c.name, c.icon, c.defaultTargetHours)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                      isSelected
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.name}</span>
                    {isSelected && <Check className="w-3 h-3 ml-0.5" />}
                  </button>
                );
              })}
            </div>

            {/* Custom Course input if selected */}
            {isCustomCourse && (
              <div className="mt-2 animate-fadeIn">
                <label className="text-[11px] font-bold text-stone-600 block mb-1">
                  Digite o nome do seu curso:
                </label>
                <input
                  type="text"
                  value={customCourse}
                  onChange={e => setCustomCourse(e.target.value)}
                  placeholder="Ex: Relações Internacionais, Cinema, Economia..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-stone-700"
                />
              </div>
            )}
          </div>

          {/* Semester & Target Hours Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Semestre / Período
              </label>
              <input
                type="text"
                value={semester}
                onChange={e => setSemester(e.target.value)}
                placeholder="Ex: 5º Semestre"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Meta de Horas (Estágio)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="2000"
                  value={targetHours}
                  onChange={e => setTargetHours(e.target.value)}
                  placeholder="Ex: 300"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                />
                <span className="absolute right-2.5 top-2 text-xs font-bold text-stone-400">h</span>
              </div>
            </div>
          </div>

          {/* College / University Name */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Instituição de Ensino (Opcional)
            </label>
            <div className="relative">
              <input
                type="text"
                value={university}
                onChange={e => setUniversity(e.target.value)}
                placeholder="Ex: USP, Unicamp, PUC, Estácio..."
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-pink-500"
              />
              <span className="absolute right-3 top-2.5 text-xs text-stone-400">
                <Building className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Theme Color Picker */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-stone-500" /> Tema Visual do Aplicativo
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(THEMES).map(t => {
                const isCurrentTheme = theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id)}
                    className={`p-2 rounded-xl border text-left flex flex-col gap-1 transition ${
                      isCurrentTheme
                        ? 'border-stone-900 bg-stone-50 ring-2 ring-stone-900/10'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`w-4 h-4 rounded-full ${t.swatchBg} shadow-xs`} />
                      {isCurrentTheme && <Check className="w-3 h-3 text-stone-900" />}
                    </div>
                    <span className="text-[10px] font-bold text-stone-800 line-clamp-1">
                      {t.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Acesso Especial / PIN para Modo Vitória */}
          {mode !== 'vitoria' && (
            <div className="pt-2 border-t border-stone-100">
              {!showSecretUnlock ? (
                <button
                  type="button"
                  onClick={() => setShowSecretUnlock(true)}
                  className="text-[11px] font-semibold text-stone-400 hover:text-stone-600 flex items-center gap-1 transition"
                >
                  <KeyRound className="w-3 h-3" /> Possui um código de acesso especial?
                </button>
              ) : (
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-stone-500" /> Desbloquear Modo Especial
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSecretUnlock(false);
                        setSecretFeedback(null);
                      }}
                      className="text-[11px] text-stone-400 hover:text-stone-600"
                    >
                      Fechar
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={secretCode}
                      onChange={e => setSecretCode(e.target.value)}
                      placeholder="Digite o código secreto..."
                      className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={handleTryUnlockSecret}
                      className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-xs transition"
                    >
                      Desbloquear
                    </button>
                  </div>
                  {secretFeedback && (
                    <p className={`text-[11px] font-semibold ${secretFeedback.includes('desbloqueado') ? 'text-rose-600' : 'text-red-500'}`}>
                      {secretFeedback}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </form>

        {/* Modal Actions */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/90 flex items-center justify-between gap-3">
          {mode === 'vitoria' ? (
            <button
              type="button"
              onClick={() => handleModeToggle('student')}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 py-2 px-3 rounded-xl hover:bg-rose-50 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Modo Discreto
            </button>
          ) : (
            <span className="text-[11px] text-stone-400 font-medium">
              Vitória • Controle Acadêmico
            </span>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-200 rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-black rounded-xl shadow-md transition flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              Salvar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
