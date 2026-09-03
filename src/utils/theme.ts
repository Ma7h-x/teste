import { ColorTheme } from '../types';

export interface ThemeColors {
  id: ColorTheme;
  name: string;
  headerGradient: string;
  statusBar: string;
  primary: string;
  textAccent: string;
  bgLight: string;
  borderLight: string;
  cardBanner: string;
  buttonPrimary: string;
  badgeBg: string;
  badgeText: string;
  swatchBg: string;
}

export const THEMES: Record<ColorTheme, ThemeColors> = {
  rose: {
    id: 'rose',
    name: 'Rosa Vitória (Delicado & Romântico)',
    headerGradient: 'from-pink-600 via-rose-500 to-pink-500',
    statusBar: 'bg-pink-600',
    primary: 'pink-500',
    textAccent: 'text-pink-600',
    bgLight: 'bg-rose-50/70',
    borderLight: 'border-pink-100',
    cardBanner: 'from-pink-500 via-rose-500 to-pink-600',
    buttonPrimary: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-pink-700',
    swatchBg: 'bg-pink-500'
  },
  lavender: {
    id: 'lavender',
    name: 'Lavanda & Violeta (Elegante & Criativo)',
    headerGradient: 'from-purple-600 via-violet-600 to-indigo-600',
    statusBar: 'bg-purple-700',
    primary: 'purple-600',
    textAccent: 'text-purple-600',
    bgLight: 'bg-purple-50/70',
    borderLight: 'border-purple-100',
    cardBanner: 'from-purple-600 via-violet-600 to-indigo-700',
    buttonPrimary: 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    swatchBg: 'bg-purple-600'
  },
  blue: {
    id: 'blue',
    name: 'Azul Cobalto (Foco Universitário & Clean)',
    headerGradient: 'from-blue-600 via-indigo-600 to-blue-700',
    statusBar: 'bg-blue-700',
    primary: 'blue-600',
    textAccent: 'text-blue-600',
    bgLight: 'bg-blue-50/70',
    borderLight: 'border-blue-100',
    cardBanner: 'from-blue-600 via-indigo-600 to-blue-700',
    buttonPrimary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    swatchBg: 'bg-blue-600'
  },
  emerald: {
    id: 'emerald',
    name: 'Verde Esmeralda (Saúde & Equilíbrio)',
    headerGradient: 'from-teal-600 via-emerald-600 to-green-600',
    statusBar: 'bg-emerald-700',
    primary: 'emerald-600',
    textAccent: 'text-emerald-600',
    bgLight: 'bg-emerald-50/70',
    borderLight: 'border-emerald-100',
    cardBanner: 'from-teal-600 via-emerald-600 to-green-700',
    buttonPrimary: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    swatchBg: 'bg-emerald-600'
  },
  dark: {
    id: 'dark',
    name: 'Grafite & Dark (Minimalista Moderno)',
    headerGradient: 'from-stone-900 via-zinc-800 to-stone-800',
    statusBar: 'bg-stone-900',
    primary: 'stone-800',
    textAccent: 'text-stone-800',
    bgLight: 'bg-stone-100/70',
    borderLight: 'border-stone-200',
    cardBanner: 'from-stone-900 via-zinc-800 to-stone-950',
    buttonPrimary: 'bg-gradient-to-r from-stone-800 to-zinc-800 hover:from-stone-900 hover:to-zinc-900 text-white',
    badgeBg: 'bg-stone-200',
    badgeText: 'text-stone-800',
    swatchBg: 'bg-stone-800'
  },
  amber: {
    id: 'amber',
    name: 'Âmbar & Laranja (Energia & Entusiasmo)',
    headerGradient: 'from-orange-500 via-amber-600 to-amber-500',
    statusBar: 'bg-amber-700',
    primary: 'amber-600',
    textAccent: 'text-amber-600',
    bgLight: 'bg-amber-50/70',
    borderLight: 'border-amber-100',
    cardBanner: 'from-orange-500 via-amber-600 to-yellow-600',
    buttonPrimary: 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    swatchBg: 'bg-amber-500'
  }
};

export function getTheme(theme?: ColorTheme): ThemeColors {
  return THEMES[theme || 'rose'] || THEMES.rose;
}
