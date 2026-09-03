/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Subject, ExamItem, LoveNote, ComplementaryHours, UserProfile, MotivationalQuote } from './types';
import { 
  loadSubjects, 
  saveSubjects, 
  loadExams, 
  saveExams, 
  loadLoveNotes, 
  saveLoveNotes, 
  loadHours, 
  saveHours,
  loadProfile,
  saveProfile,
  loadMotivationalQuotes,
  saveMotivationalQuotes
} from './utils/storage';
import { INITIAL_PROFILE_VITORIA, INITIAL_PROFILE_STUDENT } from './data/initialData';
import { AndroidFrame } from './components/AndroidFrame';
import { HomeTab } from './components/HomeTab';
import { SubjectsTab } from './components/SubjectsTab';
import { ExamsTab } from './components/ExamsTab';
import { LabToolsTab } from './components/LabToolsTab';
import { FocusAndLoveTab } from './components/FocusAndLoveTab';
import { SubjectModal } from './components/SubjectModal';
import { ExamModal } from './components/ExamModal';
import { LoveNoteModal } from './components/LoveNoteModal';
import { ProfileModal } from './components/ProfileModal';
import { PlayStoreGuideModal } from './components/PlayStoreGuideModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [motivationalQuotes, setMotivationalQuotes] = useState<MotivationalQuote[]>(loadMotivationalQuotes);
  const [subjects, setSubjects] = useState<Subject[]>(loadSubjects);
  const [exams, setExams] = useState<ExamItem[]>(loadExams);
  const [loveNotes, setLoveNotes] = useState<LoveNote[]>(loadLoveNotes);
  const [hours, setHours] = useState<ComplementaryHours[]>(loadHours);

  // Selected subject for deep navigation from Home
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | undefined>(undefined);

  // Modals state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPlayStoreGuideOpen, setIsPlayStoreGuideOpen] = useState(false);

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState<Subject | null>(null);

  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [examToEdit, setExamToEdit] = useState<ExamItem | null>(null);

  const [isLoveNoteModalOpen, setIsLoveNoteModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveMotivationalQuotes(motivationalQuotes);
  }, [motivationalQuotes]);

  useEffect(() => {
    saveSubjects(subjects);
  }, [subjects]);

  useEffect(() => {
    saveExams(exams);
  }, [exams]);

  useEffect(() => {
    saveLoveNotes(loveNotes);
  }, [loveNotes]);

  useEffect(() => {
    saveHours(hours);
  }, [hours]);

  // Profile Handlers
  const handleSaveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const handleSwitchToVitoria = () => {
    setProfile(INITIAL_PROFILE_VITORIA);
  };

  const handleToggleMode = () => {
    if (profile.mode === 'vitoria') {
      setProfile(prev => ({
        ...prev,
        mode: 'student',
        theme: 'blue',
        name: prev.name === 'Vitória' ? 'Estudante' : prev.name
      }));
    } else {
      setProfile(INITIAL_PROFILE_VITORIA);
    }
  };

  // Motivational Quotes Handlers
  const handleSaveMotivationalQuote = (quote: MotivationalQuote) => {
    setMotivationalQuotes(prev => [quote, ...prev]);
  };

  const handleDeleteMotivationalQuote = (id: string) => {
    setMotivationalQuotes(prev => prev.filter(q => q.id !== id));
  };

  // Subject Handlers
  const handleSaveSubject = (savedSubject: Subject) => {
    setSubjects(prev => {
      const exists = prev.some(s => s.id === savedSubject.id);
      if (exists) {
        return prev.map(s => (s.id === savedSubject.id ? savedSubject : s));
      }
      return [...prev, savedSubject];
    });
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
    setExams(prev => prev.filter(e => e.subjectId !== id));
  };

  const handleOpenNewSubject = () => {
    setSubjectToEdit(null);
    setIsSubjectModalOpen(true);
  };

  const handleEditSubject = (subject: Subject) => {
    setSubjectToEdit(subject);
    setIsSubjectModalOpen(true);
  };

  // Exam Handlers
  const handleSaveExam = (savedExam: ExamItem) => {
    setExams(prev => {
      const exists = prev.some(e => e.id === savedExam.id);
      if (exists) {
        return prev.map(e => (e.id === savedExam.id ? savedExam : e));
      }
      return [...prev, savedExam];
    });
  };

  const handleDeleteExam = (id: string) => {
    setExams(prev => prev.filter(e => e.id !== id));
  };

  const handleOpenNewExam = () => {
    setExamToEdit(null);
    setIsExamModalOpen(true);
  };

  const handleEditExam = (exam: ExamItem) => {
    setExamToEdit(exam);
    setIsExamModalOpen(true);
  };

  // Love Note or Motivational Affirmation Handlers
  const handleSaveLoveNote = (newNote: LoveNote) => {
    if (profile.mode === 'vitoria') {
      setLoveNotes(prev => [newNote, ...prev]);
    } else {
      const newQuote: MotivationalQuote = {
        id: newNote.id,
        author: newNote.author,
        text: newNote.text,
        category: (newNote.category as any) || 'foco',
        favorite: true
      };
      setMotivationalQuotes(prev => [newQuote, ...prev]);
    }
  };

  const handleDeleteLoveNote = (id: string) => {
    setLoveNotes(prev => prev.filter(n => n.id !== id));
  };

  const pendingExamsCount = exams.filter(e => !e.completed).length;

  return (
    <AndroidFrame
      activeTab={activeTab}
      onTabChange={tab => {
        setActiveTab(tab);
        if (tab !== 'subjects') setSelectedSubjectId(undefined);
      }}
      pendingExamsCount={pendingExamsCount}
      profile={profile}
      onOpenProfile={() => setIsProfileModalOpen(true)}
      onOpenPlayStoreGuide={() => setIsPlayStoreGuideOpen(true)}
    >
      {activeTab === 'home' && (
        <HomeTab
          subjects={subjects}
          exams={exams}
          loveNotes={loveNotes}
          motivationalQuotes={motivationalQuotes}
          hours={hours}
          profile={profile}
          onNavigate={tab => {
            setActiveTab(tab);
          }}
          onOpenNewExam={handleOpenNewExam}
          onOpenNewNote={() => setIsLoveNoteModalOpen(true)}
          onSelectSubject={id => {
            setSelectedSubjectId(id);
            setActiveTab('subjects');
          }}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenPlayStoreGuide={() => setIsPlayStoreGuideOpen(true)}
          onToggleMode={handleToggleMode}
        />
      )}

      {activeTab === 'subjects' && (
        <SubjectsTab
          subjects={subjects}
          onSaveSubject={handleSaveSubject}
          onDeleteSubject={handleDeleteSubject}
          onOpenNewSubject={handleOpenNewSubject}
          onEditSubject={handleEditSubject}
          selectedSubjectId={selectedSubjectId}
        />
      )}

      {activeTab === 'exams' && (
        <ExamsTab
          exams={exams}
          subjects={subjects}
          onSaveExam={handleSaveExam}
          onDeleteExam={handleDeleteExam}
          onOpenNewExam={handleOpenNewExam}
          onEditExam={handleEditExam}
        />
      )}

      {activeTab === 'lab' && <LabToolsTab profile={profile} />}

      {activeTab === 'love' && (
        <FocusAndLoveTab
          loveNotes={loveNotes}
          motivationalQuotes={motivationalQuotes}
          subjects={subjects}
          profile={profile}
          onSaveLoveNote={handleSaveLoveNote}
          onDeleteLoveNote={handleDeleteLoveNote}
          onSaveMotivationalQuote={handleSaveMotivationalQuote}
          onDeleteMotivationalQuote={handleDeleteMotivationalQuote}
          onOpenNewNote={() => setIsLoveNoteModalOpen(true)}
        />
      )}

      {/* Modals */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        onSwitchToVitoria={handleSwitchToVitoria}
      />

      <PlayStoreGuideModal
        isOpen={isPlayStoreGuideOpen}
        onClose={() => setIsPlayStoreGuideOpen(false)}
      />

      <SubjectModal
        isOpen={isSubjectModalOpen}
        onClose={() => {
          setIsSubjectModalOpen(false);
          setSubjectToEdit(null);
        }}
        onSave={handleSaveSubject}
        initialSubject={subjectToEdit}
      />

      <ExamModal
        isOpen={isExamModalOpen}
        onClose={() => {
          setIsExamModalOpen(false);
          setExamToEdit(null);
        }}
        onSave={handleSaveExam}
        subjects={subjects}
        initialExam={examToEdit}
      />

      <LoveNoteModal
        isOpen={isLoveNoteModalOpen}
        onClose={() => setIsLoveNoteModalOpen(false)}
        onSave={handleSaveLoveNote}
        mode={profile.mode}
      />
    </AndroidFrame>
  );
}
