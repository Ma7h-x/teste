import React, { useState, useEffect } from 'react';
import { TabType, UserProfile } from '../types';
import { getTheme } from '../utils/theme';
import { 
  Home, 
  GraduationCap, 
  Calendar, 
  FlaskConical, 
  Heart, 
  Wifi, 
  BatteryMedium, 
  Sparkles, 
  Smartphone, 
  Maximize2, 
  User, 
  Wrench
} from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pendingExamsCount: number;
  profile: UserProfile;
  onOpenProfile: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  activeTab,
  onTabChange,
  pendingExamsCount,
  profile,
  onOpenProfile
}) => {
  const [currentTime, setCurrentTime] = useState('');
  const [isDesktopMockup, setIsDesktopMockup] = useState(true);

  const themeConfig = getTheme(profile.theme);
  const isVitoriaMode = profile.mode === 'vitoria';
  const isHealthField = 
    profile.course.toLowerCase().includes('bio') || 
    profile.course.toLowerCase().includes('med') || 
    profile.course.toLowerCase().includes('saúde') ||
    profile.course.toLowerCase().includes('farm') ||
    profile.course.toLowerCase().includes('enf');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 select-none">
      {/* Desktop Mode Switcher Bar */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md md:max-w-lg mb-2.5 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
          <span className="text-xs font-bold text-stone-700 tracking-wide uppercase">
            {isVitoriaMode ? 'Vitória • Edição Amor' : 'Gestor Acadêmico'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsDesktopMockup(!isDesktopMockup)}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/80 hover:bg-white text-stone-800 rounded-full text-xs font-bold shadow-xs transition backdrop-blur-xs border border-stone-200"
          >
            {isDesktopMockup ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" /> Tela Cheia
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" /> Celular
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container / Android Device Mockup */}
      <div
        className={`w-full bg-white relative flex flex-col transition-all duration-300 ${
          isDesktopMockup
            ? 'sm:max-w-[430px] sm:h-[890px] sm:max-h-[96vh] sm:rounded-[44px] sm:border-[10px] sm:border-stone-900 sm:shadow-2xl overflow-hidden'
            : 'max-w-4xl min-h-screen sm:min-h-[88vh] sm:rounded-3xl sm:border border-stone-200 sm:shadow-xl'
        }`}
      >
        {/* Android Punch Hole Camera (on mockup) */}
        {isDesktopMockup && (
          <div className="hidden sm:block absolute top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-stone-900 rounded-full z-50 pointer-events-none ring-1 ring-stone-800" />
        )}

        {/* Android Status Bar */}
        <div className={`w-full ${themeConfig.statusBar} text-white px-5 pt-3 pb-2 flex items-center justify-between text-xs font-semibold shrink-0 z-40 transition-colors`}>
          <span className="font-bold tracking-tight">{currentTime || '12:00'}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-bold">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-bold">98%</span>
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Top App Header */}
        <div className={`bg-gradient-to-r ${themeConfig.headerGradient} text-white px-4 py-2.5 shadow-sm flex items-center justify-between shrink-0 z-30 transition-all`}>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenProfile}
              title="Trocar Perfil / Modo"
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-white shadow-xs hover:bg-white/30 transition active:scale-95 ring-1 ring-white/30 text-sm"
            >
              {profile.avatarEmoji || (isVitoriaMode ? '🔬' : '🎓')}
            </button>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight leading-none">
                  {profile.name}
                </span>
                {isVitoriaMode ? (
                  <Heart className="w-3.5 h-3.5 fill-pink-200 text-pink-200" />
                ) : (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-bold">
                    {profile.semester.split(' ')[0] || '1º'}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-white/90 block font-medium truncate max-w-[170px]">
                {profile.course} • {isVitoriaMode ? 'Estudos & Lab' : 'Acadêmico'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {pendingExamsCount > 0 && (
              <button
                onClick={() => onTabChange('exams')}
                className="px-2 py-0.5 rounded-full bg-white text-stone-900 text-[10px] font-black shadow-xs flex items-center gap-1 hover:bg-stone-100 transition"
              >
                <Calendar className="w-2.5 h-2.5 text-rose-500" /> {pendingExamsCount} {pendingExamsCount === 1 ? 'prova' : 'provas'}
              </button>
            )}

            <button
              onClick={onOpenProfile}
              title="Configurar Perfil e Curso"
              className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition active:scale-95"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Viewport */}
        <div className="flex-1 overflow-y-auto p-4 bg-stone-50/80 relative">
          {children}
        </div>

        {/* Android Native Bottom Navigation Bar */}
        <div className="bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-2 flex items-center justify-around shrink-0 z-40 shadow-lg">
          {/* 1. Home */}
          <button
            id="nav-home"
            onClick={() => onTabChange('home')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition ${
              activeTab === 'home'
                ? 'text-stone-900 font-bold scale-105'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${activeTab === 'home' ? 'bg-stone-100' : ''}`}>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px]">Início</span>
          </button>

          {/* 2. Subjects */}
          <button
            id="nav-subjects"
            onClick={() => onTabChange('subjects')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition ${
              activeTab === 'subjects'
                ? 'text-stone-900 font-bold scale-105'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${activeTab === 'subjects' ? 'bg-stone-100' : ''}`}>
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[10px]">Matérias</span>
          </button>

          {/* 3. Exams */}
          <button
            id="nav-exams"
            onClick={() => onTabChange('exams')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl relative transition ${
              activeTab === 'exams'
                ? 'text-stone-900 font-bold scale-105'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${activeTab === 'exams' ? 'bg-stone-100' : ''}`}>
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[10px]">Provas</span>
            {pendingExamsCount > 0 && (
              <span className="absolute top-1 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* 4. Tools & Lab */}
          <button
            id="nav-lab"
            onClick={() => onTabChange('lab')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition ${
              activeTab === 'lab'
                ? 'text-stone-900 font-bold scale-105'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${activeTab === 'lab' ? 'bg-stone-100' : ''}`}>
              {isHealthField ? <FlaskConical className="w-5 h-5" /> : <Wrench className="w-5 h-5" />}
            </div>
            <span className="text-[10px]">{isHealthField ? 'Lab Guia' : 'Ferramentas'}</span>
          </button>

          {/* 5. Love (Vitória) OR Motivation (Student) */}
          <button
            id="nav-love"
            onClick={() => onTabChange('love')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition ${
              activeTab === 'love'
                ? isVitoriaMode
                  ? 'text-rose-600 font-bold scale-105'
                  : 'text-blue-600 font-bold scale-105'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${
              activeTab === 'love' 
                ? isVitoriaMode ? 'bg-rose-100' : 'bg-blue-100' 
                : ''
            }`}>
              {isVitoriaMode ? (
                <Heart className="w-5 h-5 fill-current" />
              ) : (
                <Sparkles className="w-5 h-5 text-current" />
              )}
            </div>
            <span className="text-[10px]">
              {isVitoriaMode ? 'Meu Amor' : 'Motivação'}
            </span>
          </button>
        </div>

        {/* Android Gesture Bar / Bottom indicator */}
        <div className="w-full bg-white pb-2 pt-0.5 flex justify-center shrink-0">
          <div className="w-32 h-1 bg-stone-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
