import { Subject, ExamItem, LoveNote, LabReferenceValue, ComplementaryHours, UserProfile, MotivationalQuote } from '../types';

export const INITIAL_PROFILE_VITORIA: UserProfile = {
  mode: 'vitoria',
  name: 'Vitória',
  course: 'Biomedicina',
  semester: '5º Semestre',
  university: 'Universidade de Biomedicina',
  theme: 'rose',
  avatarEmoji: '🔬',
  targetHours: 400
};

export const INITIAL_PROFILE_STUDENT: UserProfile = {
  mode: 'student',
  name: 'Estudante',
  course: 'Medicina',
  semester: '3º Semestre',
  university: 'Faculdade',
  theme: 'blue',
  avatarEmoji: '🎓',
  targetHours: 300
};

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'sub-1',
    name: 'Hematologia Clínica',
    code: 'BMD-301',
    professor: 'Dra. Camila Dutra',
    room: 'Lab Microscopia 03',
    schedule: 'Seg e Qua • 08:00 - 10:00',
    color: '#f43f5e', // rose
    iconName: 'Droplet',
    minPassingGrade: 7.0,
    semester: '5º Semestre',
    absences: 2,
    maxAbsences: 12,
    notes: 'Atenção aos critérios diagnósticos de anemias microcíticas e leucemias agudas na lâmina.',
    assessments: [
      { id: 'as-1', name: 'P1 - Teórica (Série Vermelha & Branca)', type: 'prova', weight: 1, score: 8.8, date: '2026-08-15' },
      { id: 'as-2', name: 'Prática de Lâminas & Diferencial', type: 'pratica', weight: 1, score: 9.5, date: '2026-08-28' },
      { id: 'as-3', name: 'P2 - Hemostasia & Leucemias', type: 'prova', weight: 2, score: null, date: '2026-09-18' },
    ]
  },
  {
    id: 'sub-2',
    name: 'Imunologia Médica',
    code: 'BMD-302',
    professor: 'Dr. Ricardo Matos',
    room: 'Anfiteatro da Saúde',
    schedule: 'Ter e Qui • 10:00 - 12:00',
    color: '#ec4899', // pink
    iconName: 'ShieldCheck',
    minPassingGrade: 7.0,
    semester: '5º Semestre',
    absences: 1,
    maxAbsences: 12,
    notes: 'Rever mecanismos das reações de hipersensibilidade tipo I a IV e teste ELISA.',
    assessments: [
      { id: 'as-4', name: 'P1 - Resposta Imune & Citocinas', type: 'prova', weight: 1, score: 9.2, date: '2026-08-12' },
      { id: 'as-5', name: 'Seminário de Imunodeficiências', type: 'seminario', weight: 1, score: 9.8, date: '2026-08-26' },
      { id: 'as-6', name: 'P2 - Diagnóstico Sorológico & Autoimunidade', type: 'prova', weight: 2, score: null, date: '2026-09-24' },
    ]
  },
  {
    id: 'sub-3',
    name: 'Microbiologia Clínica',
    code: 'BMD-303',
    professor: 'Dra. Beatriz Fontana',
    room: 'Lab de Cultura e Esterilização',
    schedule: 'Terça • 14:00 - 18:00',
    color: '#d946ef', // fuchsia
    iconName: 'Bug',
    minPassingGrade: 7.0,
    semester: '5º Semestre',
    absences: 0,
    maxAbsences: 8,
    notes: 'Memorizar o procedimento da coloração de Gram e testes de catalase e coagulase.',
    assessments: [
      { id: 'as-7', name: 'P1 - Morfologia & Fisiologia Bacteriana', type: 'prova', weight: 1, score: 8.2, date: '2026-08-18' },
      { id: 'as-8', name: 'Relatório de Antibiograma & Meios', type: 'relatorio', weight: 1, score: 9.0, date: '2026-08-30' },
      { id: 'as-9', name: 'P2 - Cocos e Bacilos Gram-negativos', type: 'prova', weight: 2, score: null, date: '2026-09-29' },
    ]
  },
  {
    id: 'sub-4',
    name: 'Bioquímica Metabólica',
    code: 'BMD-304',
    professor: 'Prof. Marcos Andrade',
    room: 'Bloco C - Sala 204',
    schedule: 'Quarta • 14:00 - 17:00',
    color: '#fb7185', // rose light
    iconName: 'FlaskConical',
    minPassingGrade: 7.0,
    semester: '5º Semestre',
    absences: 3,
    maxAbsences: 10,
    notes: 'Estudar regulação da gliconeogênese, lipoproteínas (quilomícrons, VLDL, LDL, HDL) e enzimas hepáticas.',
    assessments: [
      { id: 'as-10', name: 'P1 - Metabolismo de Carboidratos & Lipídios', type: 'prova', weight: 1, score: 7.8, date: '2026-08-10' },
      { id: 'as-11', name: 'Trabalho de Enzimologia Clínica', type: 'trabalho', weight: 1, score: 8.5, date: '2026-08-25' },
      { id: 'as-12', name: 'P2 - Ciclo de Krebs e Marcadores Hepáticos', type: 'prova', weight: 2, score: null, date: '2026-09-22' },
    ]
  },
  {
    id: 'sub-5',
    name: 'Parasitologia Humana',
    code: 'BMD-305',
    professor: 'Dra. Juliana Prado',
    room: 'Lab Microscopia 01',
    schedule: 'Sexta • 08:00 - 11:30',
    color: '#f472b6', // pink-400
    iconName: 'Microscope',
    minPassingGrade: 7.0,
    semester: '5º Semestre',
    absences: 1,
    maxAbsences: 10,
    notes: 'Foco em identificação de cistos de Giardia, ovos de Schistosoma e ciclo do Plasmodium.',
    assessments: [
      { id: 'as-13', name: 'P1 - Protozoários Intestinais e Sangue', type: 'prova', weight: 1, score: 9.4, date: '2026-08-08' },
      { id: 'as-14', name: 'Prática de Identificação Coproparasitológica', type: 'pratica', weight: 1, score: 10.0, date: '2026-08-29' },
      { id: 'as-15', name: 'P2 - Helmintos & Vetores', type: 'prova', weight: 2, score: null, date: '2026-10-02' },
    ]
  },
  {
    id: 'sub-6',
    name: 'Biologia Molecular',
    code: 'BMD-306',
    professor: 'Dr. Marcelo Ramos',
    room: 'Lab Biotecnologia',
    schedule: 'Segunda • 10:30 - 12:30',
    color: '#e879f9', // purple/fuchsia
    iconName: 'Dna',
    minPassingGrade: 7.0,
    semester: '5º Semestre',
    absences: 0,
    maxAbsences: 8,
    notes: 'Extração de DNA, parâmetros de PCR em tempo real e eletroforese em gel de agarose.',
    assessments: [
      { id: 'as-16', name: 'P1 - Técnicas de PCR e Eletroforese', type: 'prova', weight: 1, score: 9.0, date: '2026-08-17' },
      { id: 'as-17', name: 'P2 - Diagnóstico Molecular & Sequenciamento', type: 'prova', weight: 2, score: null, date: '2026-10-05' },
    ]
  }
];

export const INITIAL_EXAMS: ExamItem[] = [
  {
    id: 'ex-1',
    subjectId: 'sub-1',
    subjectName: 'Hematologia Clínica',
    title: 'P2 - Hemostasia, Coagulação & Leucemias',
    date: '2026-09-18',
    time: '08:00',
    room: 'Lab Microscopia 03',
    type: 'prova',
    topics: [
      'Cascata de coagulação (via intrínseca, extrínseca e comum)',
      'TP, TTPA e contagem de plaquetas',
      'Leucemias Agudas (LLA vs LMA - bastonetes de Auer)',
      'Análise de lâminas com blastos'
    ],
    weight: 2,
    completed: false,
    notes: 'Revisar os valores de TTPA e RNI antes da prova!'
  },
  {
    id: 'ex-2',
    subjectId: 'sub-4',
    subjectName: 'Bioquímica Metabólica',
    title: 'P2 - Ciclo de Krebs & Marcadores Hepáticos',
    date: '2026-09-22',
    time: '14:00',
    room: 'Bloco C - Sala 204',
    type: 'prova',
    topics: [
      'Regulação da Piruvato Desidrogenase',
      'Fosforilação Oxidativa e inibidores',
      'Enzimas TGO (AST), TGP (ALT) e Gama-GT',
      'Lipoproteínas e aterogênese'
    ],
    weight: 2,
    completed: false,
    notes: 'Fazer o mapa mental dos transportadores de elétrons.'
  },
  {
    id: 'ex-3',
    subjectId: 'sub-2',
    subjectName: 'Imunologia Médica',
    title: 'P2 - Diagnóstico Sorológico & Doenças Autoimunes',
    date: '2026-09-24',
    time: '10:00',
    room: 'Anfiteatro da Saúde',
    type: 'prova',
    topics: [
      'Princípios de ELISA direto, indireto e sanduíche',
      'FAN (Fator Antinúcleo) e padrões de imunofluorescência',
      'Lúpus Eritematoso Sistêmico e Artrite Reumatoide',
      'Sistema Complemento (via clássica e alternativa)'
    ],
    weight: 2,
    completed: false
  },
  {
    id: 'ex-4',
    subjectId: 'sub-3',
    subjectName: 'Microbiologia Clínica',
    title: 'P2 - Bactérias Gram-negativas & Antibiograma',
    date: '2026-09-29',
    time: '14:00',
    room: 'Lab de Cultura',
    type: 'prova',
    topics: [
      'Enterobactérias (E. coli, Klebsiella, Salmonella)',
      'Crescimento em Ágar MacConkey',
      'Metodologia de Kirby-Bauer (TSA)',
      'Interpretação de halos de inibição'
    ],
    weight: 2,
    completed: false
  },
  {
    id: 'ex-5',
    subjectId: 'sub-5',
    subjectName: 'Parasitologia Humana',
    title: 'P2 - Helmintos & Diagnóstico Parasitológico',
    date: '2026-10-02',
    time: '08:30',
    room: 'Lab Microscopia 01',
    type: 'prova',
    topics: [
      'Schistosoma mansoni e ciclo biológico',
      'Ascaris lumbricoides, Ancilostomídeos e Enterobius',
      'Métodos de sedimentação e flutuação (Hoffman, Faust)',
      'Identificação microscópica de ovos e larvas'
    ],
    weight: 2,
    completed: false
  }
];

export const INITIAL_LOVE_NOTES: LoveNote[] = [
  {
    id: 'note-1',
    author: 'Matheus ❤️',
    text: 'Meu amor, fiz esse app com todo o carinho do mundo pra você! Ver a sua dedicação aos estudos, ao jaleco e a tudo na biomedicina me enche de orgulho. Você já é vitoriosa em tudo o que faz!',
    date: '2026-09-03',
    category: 'carinho',
    favorite: true
  },
  {
    id: 'note-2',
    author: 'Matheus ❤️',
    text: 'Respira fundo antes de entrar no laboratório e nas provas. Você estudou muito, é inteligente demais e nasceu pra cuidar de vidas através da ciência. Tô sempre torcendo por você!',
    date: '2026-09-02',
    category: 'motivacao',
    favorite: true
  },
  {
    id: 'note-3',
    author: 'Matheus ❤️',
    text: 'Lembrete do dia da sua pessoa favorita: bebe água, come alguma coisa gostosa e não se sobrecarregue. Você é o meu maior orgulho, futura Dra. Biomédica mais linda do universo! Te amo!',
    date: '2026-09-01',
    category: 'orgulho',
    favorite: false
  },
  {
    id: 'note-4',
    author: 'Matheus ❤️',
    text: 'Quando terminar de ler essa lâmina ou de estudar a cascata de coagulação, ganha um abraço quentinho e um beijo demorado. Vai dar tudo certo na P2!',
    date: '2026-08-30',
    category: 'descanso',
    favorite: false
  }
];

export const INITIAL_HOURS: ComplementaryHours[] = [
  { id: 'h-1', title: 'Estágio Supervisionado em Análises Clínicas', category: 'estagio', hours: 160, date: '2026-07-20', place: 'Hospital Universitário' },
  { id: 'h-2', title: 'Iniciação Científica - Marcadores Tumorais', category: 'pesquisa', hours: 80, date: '2026-08-10', place: 'Laboratório de Genômica' },
  { id: 'h-3', title: 'Congresso Brasileiro de Biomedicina', category: 'curso', hours: 30, date: '2026-05-18', place: 'Associação de Biomedicina' },
  { id: 'h-4', title: 'Campanha de Doação de Sangue e Tipagem ABO', category: 'extensao', hours: 20, date: '2026-06-12', place: 'Hemocentro Regional' },
];

export const LAB_REFERENCE_VALUES: LabReferenceValue[] = [
  {
    name: 'Hemoglobina (Hb)',
    category: 'Hemograma',
    referenceRange: '12,0 a 16,0 g/dL (Mulheres)',
    unit: 'g/dL',
    clinicalSignificance: 'Diminuída em anemias; aumentada em desidratação ou poliglobulia.'
  },
  {
    name: 'Hematócrito (Ht)',
    category: 'Hemograma',
    referenceRange: '36% a 46% (Mulheres)',
    unit: '%',
    clinicalSignificance: 'Porcentagem do volume total de sangue ocupado pelas hemácias.'
  },
  {
    name: 'Leucócitos Totais',
    category: 'Hemograma',
    referenceRange: '4.500 a 11.000 /µL',
    unit: '/µL',
    clinicalSignificance: 'Leucocitose indica infecção, inflamação ou estresse; leucopenia indica toxicidade ou infecções virais.'
  },
  {
    name: 'Plaquetas',
    category: 'Hemograma',
    referenceRange: '150.000 a 450.000 /µL',
    unit: '/µL',
    clinicalSignificance: 'Essenciais para hemostasia primária. Plaquetopenia abaixo de 50.000 eleva risco de sangramento.'
  },
  {
    name: 'Glicose em Jejum',
    category: 'Bioquímica',
    referenceRange: '70 a 99 mg/dL',
    unit: 'mg/dL',
    clinicalSignificance: '100-125 mg/dL sugere glicemia de jejum alterada; ≥126 mg/dL critério para Diabetes Mellitus.'
  },
  {
    name: 'Creatinina Sérica',
    category: 'Bioquímica',
    referenceRange: '0,5 a 1,1 mg/dL (Mulheres)',
    unit: 'mg/dL',
    clinicalSignificance: 'Principal marcador da taxa de filtração glomerular e função renal.'
  },
  {
    name: 'Ureia',
    category: 'Bioquímica',
    referenceRange: '15 a 45 mg/dL',
    unit: 'mg/dL',
    clinicalSignificance: 'Produto do metabolismo de proteínas, filtrada pelos rins.'
  },
  {
    name: 'TGP (ALT) / TGO (AST)',
    category: 'Bioquímica',
    referenceRange: 'TGP: até 35 U/L | TGO: até 32 U/L',
    unit: 'U/L',
    clinicalSignificance: 'Marcadores de lesão hepatocelular (ALT mais específica do fígado).'
  },
  {
    name: 'Tempo de Protrombina (TP/RNI)',
    category: 'Coagulação',
    referenceRange: 'RNI: 0,8 a 1,2 (sem anticoagulante)',
    unit: 'RNI',
    clinicalSignificance: 'Avalia via extrínseca e comum da coagulação; monitora uso de Varfarina.'
  },
  {
    name: 'TTPA (Tempo de Tromboplastina Parcial Ativada)',
    category: 'Coagulação',
    referenceRange: '24 a 36 segundos (relação < 1,2)',
    unit: 'segundos',
    clinicalSignificance: 'Avalia via intrínseca e comum da coagulação; monitora uso de Heparina.'
  }
];

export const INITIAL_MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  {
    id: 'quote-1',
    author: 'Foco & Disciplina',
    text: 'A persistência é o caminho do êxito. Cada hora de dedicação aos cadernos hoje constrói o profissional respeitado de amanhã.',
    category: 'foco',
    favorite: true
  },
  {
    id: 'quote-2',
    author: 'Propósito Universitário',
    text: 'Não estude apenas para passar na prova; estude para ser a pessoa mais capacitada e ética na vida de quem você for atender ou liderar.',
    category: 'sucesso',
    favorite: true
  },
  {
    id: 'quote-3',
    author: 'Resiliência nos Estudos',
    text: 'O cansaço das noites em claro passa, mas o diploma e o conhecimento conquistado com esforço ficam para sempre. Você consegue!',
    category: 'resiliencia',
    favorite: false
  },
  {
    id: 'quote-4',
    author: 'Equilíbrio & Paz Mental',
    text: 'Lembre-se de respirar fundo, tomar água e fazer pausas. Seu cérebro precisa de descanso para fixar as sinapses da memória.',
    category: 'calma',
    favorite: false
  },
  {
    id: 'quote-5',
    author: 'Constância Diária',
    text: 'Você não precisa estudar 10 horas seguidas. Trinta minutos focados e sem distrações todos os dias superam a procrastinação de semanas.',
    category: 'disciplina',
    favorite: true
  },
  {
    id: 'quote-6',
    author: 'Superação Acadêmica',
    text: 'Uma nota ruim não define sua inteligência nem o seu futuro. Aprenda com o erro da questão, ajuste o método e siga firme.',
    category: 'resiliencia',
    favorite: false
  },
  {
    id: 'quote-7',
    author: 'Mentalidade Vencedora',
    text: 'Faça hoje aquilo que o seu "eu formado e comemorando na colação de grau" vai olhar para trás e agradecer de pé!',
    category: 'sucesso',
    favorite: true
  }
];

export interface CourseOption {
  id: string;
  name: string;
  area: 'Saúde & Biológicas' | 'Exatas & Tecnologia' | 'Humanas & Sociais' | 'Outro';
  icon: string; // emoji or lucide
  defaultTargetHours: number;
}

export const AVAILABLE_COURSES: CourseOption[] = [
  { id: 'biomedicina', name: 'Biomedicina', area: 'Saúde & Biológicas', icon: '🔬', defaultTargetHours: 400 },
  { id: 'medicina', name: 'Medicina', area: 'Saúde & Biológicas', icon: '🩺', defaultTargetHours: 400 },
  { id: 'enfermagem', name: 'Enfermagem', area: 'Saúde & Biológicas', icon: '💉', defaultTargetHours: 350 },
  { id: 'farmacia', name: 'Farmácia', area: 'Saúde & Biológicas', icon: '💊', defaultTargetHours: 350 },
  { id: 'psicologia', name: 'Psicologia', area: 'Humanas & Sociais', icon: '🧠', defaultTargetHours: 300 },
  { id: 'direito', name: 'Direito', area: 'Humanas & Sociais', icon: '⚖️', defaultTargetHours: 300 },
  { id: 'eng-software', name: 'Engenharia de Software / T.I.', area: 'Exatas & Tecnologia', icon: '💻', defaultTargetHours: 200 },
  { id: 'eng-civil', name: 'Engenharia Civil', area: 'Exatas & Tecnologia', icon: '🏗️', defaultTargetHours: 250 },
  { id: 'administracao', name: 'Administração', area: 'Humanas & Sociais', icon: '📊', defaultTargetHours: 200 },
  { id: 'odontologia', name: 'Odontologia', area: 'Saúde & Biológicas', icon: '🦷', defaultTargetHours: 350 },
  { id: 'fisioterapia', name: 'Fisioterapia', area: 'Saúde & Biológicas', icon: '🏃', defaultTargetHours: 300 },
  { id: 'nutricao', name: 'Nutrição', area: 'Saúde & Biológicas', icon: '🥗', defaultTargetHours: 250 },
  { id: 'veterinaria', name: 'Medicina Veterinária', area: 'Saúde & Biológicas', icon: '🐾', defaultTargetHours: 350 },
  { id: 'arquitetura', name: 'Arquitetura & Urbanismo', area: 'Exatas & Tecnologia', icon: '📐', defaultTargetHours: 250 },
  { id: 'pedagogia', name: 'Pedagogia', area: 'Humanas & Sociais', icon: '📚', defaultTargetHours: 200 },
  { id: 'outro', name: 'Outro Curso Personalizado', area: 'Outro', icon: '🎓', defaultTargetHours: 200 },
];
