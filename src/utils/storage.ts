import { Subject, ExamItem, LoveNote, ComplementaryHours, UserProfile, MotivationalQuote } from '../types';
import { 
  INITIAL_SUBJECTS, 
  INITIAL_EXAMS, 
  INITIAL_LOVE_NOTES, 
  INITIAL_HOURS,
  INITIAL_PROFILE_VITORIA,
  INITIAL_MOTIVATIONAL_QUOTES
} from '../data/initialData';

const STORAGE_KEYS = {
  SUBJECTS: 'vitoria_app_subjects_v1',
  EXAMS: 'vitoria_app_exams_v1',
  LOVE_NOTES: 'vitoria_app_love_notes_v1',
  HOURS: 'vitoria_app_hours_v1',
  USER_PROFILE: 'vitoria_app_profile_v1',
  MOTIVATIONAL_QUOTES: 'vitoria_app_quotes_v1',
};

export function loadProfile(): UserProfile {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read profile from storage', e);
  }
  return INITIAL_PROFILE_VITORIA;
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile to storage', e);
  }
}

export function loadMotivationalQuotes(): MotivationalQuote[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MOTIVATIONAL_QUOTES);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read motivational quotes from storage', e);
  }
  return INITIAL_MOTIVATIONAL_QUOTES;
}

export function saveMotivationalQuotes(quotes: MotivationalQuote[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MOTIVATIONAL_QUOTES, JSON.stringify(quotes));
  } catch (e) {
    console.error('Failed to save motivational quotes to storage', e);
  }
}

export function loadSubjects(): Subject[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read subjects from storage', e);
  }
  return INITIAL_SUBJECTS;
}

export function saveSubjects(subjects: Subject[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  } catch (e) {
    console.error('Failed to save subjects to storage', e);
  }
}

export function loadExams(): ExamItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EXAMS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read exams from storage', e);
  }
  return INITIAL_EXAMS;
}

export function saveExams(exams: ExamItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
  } catch (e) {
    console.error('Failed to save exams to storage', e);
  }
}

export function loadLoveNotes(): LoveNote[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LOVE_NOTES);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read love notes from storage', e);
  }
  return INITIAL_LOVE_NOTES;
}

export function saveLoveNotes(notes: LoveNote[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LOVE_NOTES, JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to save love notes to storage', e);
  }
}

export function loadHours(): ComplementaryHours[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HOURS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read hours from storage', e);
  }
  return INITIAL_HOURS;
}

export function saveHours(hours: ComplementaryHours[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.HOURS, JSON.stringify(hours));
  } catch (e) {
    console.error('Failed to save hours to storage', e);
  }
}
