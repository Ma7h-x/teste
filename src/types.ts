export type EvaluationType = 'prova' | 'pratica' | 'trabalho' | 'seminario' | 'relatorio';

export interface Assessment {
  id: string;
  name: string; // e.g., "P1 - Teórica", "P2 - Final", "Relatório de Lâminas"
  type: EvaluationType;
  weight: number; // e.g., 1 or 2
  score: number | null; // 0 to 10 or null if not yet graded
  date?: string; // YYYY-MM-DD
  notes?: string;
}

export interface Subject {
  id: string;
  name: string; // e.g., "Hematologia Clínica"
  code: string; // e.g., "BIO-302"
  professor: string;
  room: string;
  schedule: string; // e.g., "Seg e Qua • 08:00 - 10:00"
  color: string; // hex or tailwind class
  iconName: string; // lucide icon identifier
  minPassingGrade: number; // standard 7.0
  assessments: Assessment[];
  absences: number;
  maxAbsences: number;
  semester: string; // e.g., "5º Semestre"
  notes?: string;
}

export interface ExamItem {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string; // e.g. "Prova Teórica 1 (P1)"
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  room: string;
  type: EvaluationType;
  topics: string[]; // Content to study
  weight: number;
  completed: boolean;
  score?: number;
  notes?: string;
}

export interface ComplementaryHours {
  id: string;
  title: string;
  category: 'estagio' | 'pesquisa' | 'extensao' | 'curso';
  hours: number;
  date: string;
  place: string;
}

export interface LoveNote {
  id: string;
  author: string; // e.g., "Matheus ❤️"
  text: string;
  date: string;
  category: 'motivacao' | 'carinho' | 'orgulho' | 'descanso';
  favorite?: boolean;
}

export interface MotivationalQuote {
  id: string;
  author: string;
  text: string;
  category: 'foco' | 'disciplina' | 'resiliencia' | 'sucesso' | 'calma';
  favorite?: boolean;
  custom?: boolean;
}

export type AppMode = 'vitoria' | 'student';
export type ColorTheme = 'rose' | 'lavender' | 'blue' | 'emerald' | 'dark' | 'amber';

export interface UserProfile {
  mode: AppMode;
  name: string;
  course: string;
  semester: string;
  university?: string;
  theme: ColorTheme;
  avatarEmoji: string;
  targetHours: number;
}

export interface LabReferenceValue {
  name: string;
  category: 'Hemograma' | 'Bioquímica' | 'Coagulação' | 'Urinálise';
  referenceRange: string;
  unit: string;
  clinicalSignificance: string;
}

export type TabType = 'home' | 'subjects' | 'exams' | 'lab' | 'love';
