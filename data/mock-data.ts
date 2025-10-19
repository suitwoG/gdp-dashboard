export type VersionKey = 'v2' | 'v3' | 'v4';

type LessonStatus = 'available' | 'in-progress' | 'completed' | 'mastered' | 'locked' | 'reward';

export interface Lesson {
  id: string;
  title: string;
  status: LessonStatus;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  name: string;
  icon: string;
  progress: number;
  summary: string;
  modules: CourseModule[];
}

export interface DailyGoal {
  id: string;
  label: string;
  progress: number;
  target: number;
  rewardXP: number;
  rewardCoins: number;
}

export interface LeagueStanding {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  rank: number;
  trend: 'up' | 'down' | 'stay';
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tag: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ProfileSnapshot {
  name: string;
  role: string;
  avatar: string;
  xp: number;
  weeklyXP: number;
  streak: number;
  bestStreak: number;
  league: string;
  rankLabel: string;
  coins: number;
  achievements: Achievement[];
  stats: Array<{ label: string; value: string; helper?: string }>;
}

export interface VersionConfig {
  id: VersionKey;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  guidance: string;
  palette: string[];
  theme: {
    canvas: string;
    surface: string;
    accent: string;
    accentSoft: string;
    border: string;
    text: string;
    chip: string;
  };
  mascot: 'lex' | 'tablet-cow' | 'hoodie-cow';
}

export const courses: Course[] = [
  {
    id: 'constitutional-law',
    name: 'Конституционное право',
    icon: '🏛',
    progress: 0.65,
    summary: 'Основы государственного устройства, права и свободы граждан, взаимодействие ветвей власти.',
    modules: [
      {
        id: 'foundations',
        title: 'Основы конституции',
        lessons: [
          { id: 'prelude', title: 'Конституция как основной закон', status: 'completed' },
          { id: 'principles', title: 'Принципы конституционного строя', status: 'mastered' },
          { id: 'citizenship', title: 'Гражданство и правовой статус', status: 'completed' },
          { id: 'rights-intro', title: 'Категории прав и свобод', status: 'available' }
        ]
      },
      {
        id: 'rights',
        title: 'Права человека',
        lessons: [
          { id: 'personal-rights', title: 'Личные права и свободы', status: 'locked' },
          { id: 'political-rights', title: 'Политические права', status: 'locked' },
          { id: 'social-rights', title: 'Социально-экономические права', status: 'locked' },
          { id: 'bonus-chest', title: 'Сундук наград', status: 'reward' }
        ]
      },
      {
        id: 'institutions',
        title: 'Государственные органы',
        lessons: [
          { id: 'parliament', title: 'Федеральное собрание', status: 'locked' },
          { id: 'president', title: 'Президент и администрация', status: 'locked' },
          { id: 'courts', title: 'Судебная система', status: 'locked' },
          { id: 'federation', title: 'Федеративное устройство', status: 'locked' }
        ]
      }
    ]
  },
  {
    id: 'civil-law',
    name: 'Гражданское право',
    icon: '📜',
    progress: 0.32,
    summary: 'Сделки и договоры, субъекты гражданского права, ответственность и защита интересов.',
    modules: [
      {
        id: 'basics',
        title: 'Общие положения',
        lessons: [
          { id: 'concepts', title: 'Понятие и принципы', status: 'completed' },
          { id: 'subjects', title: 'Субъекты гражданского права', status: 'completed' },
          { id: 'objects', title: 'Объекты гражданских прав', status: 'available' },
          { id: 'transactions', title: 'Сделки и формы', status: 'locked' }
        ]
      },
      {
        id: 'contracts',
        title: 'Обязательства и договоры',
        lessons: [
          { id: 'obligations', title: 'Возникновение обязательств', status: 'locked' },
          { id: 'performance', title: 'Исполнение и прекращение', status: 'locked' },
          { id: 'liability', title: 'Ответственность за нарушение', status: 'locked' },
          { id: 'bonus', title: 'Кейс: договор подряда', status: 'reward' }
        ]
      }
    ]
  }
];

export const dailyGoals: DailyGoal[] = [
  {
    id: 'lessons',
    label: 'Пройдите 3 урока',
    progress: 2,
    target: 3,
    rewardXP: 15,
    rewardCoins: 3
  },
  {
    id: 'xp',
    label: 'Заработайте 60 XP',
    progress: 48,
    target: 60,
    rewardXP: 20,
    rewardCoins: 4
  },
  {
    id: 'perfect',
    label: 'Завершите урок без ошибок',
    progress: 0,
    target: 1,
    rewardXP: 25,
    rewardCoins: 5
  }
];

export const leagueStandings: LeagueStanding[] = [
  { id: '1', name: 'Алексей', avatar: 'A', xp: 320, rank: 1, trend: 'up' },
  { id: '2', name: 'Мария', avatar: 'M', xp: 305, rank: 2, trend: 'up' },
  { id: '3', name: 'Дмитрий', avatar: 'D', xp: 276, rank: 3, trend: 'stay' },
  { id: '4', name: 'Вы', avatar: 'В', xp: 250, rank: 4, trend: 'up' },
  { id: '5', name: 'София', avatar: 'S', xp: 220, rank: 5, trend: 'stay' },
  { id: '6', name: 'Ирина', avatar: 'I', xp: 205, rank: 6, trend: 'down' },
  { id: '7', name: 'Олег', avatar: 'O', xp: 198, rank: 7, trend: 'stay' },
  { id: '8', name: 'Фарида', avatar: 'F', xp: 176, rank: 8, trend: 'down' }
];

export const shopItems: ShopItem[] = [
  {
    id: 'streak-freeze',
    name: 'Заморозка серии',
    description: 'Сохраните стрик, если пропустите один день. Активируется автоматически.',
    price: 30,
    tag: 'Пауэрапы'
  },
  {
    id: 'double-xp',
    name: 'Удвоитель XP (24 часа)',
    description: 'Все заработанные очки удваиваются в течение суток после активации.',
    price: 100,
    tag: 'Пауэрапы'
  },
  {
    id: 'judge-outfit',
    name: 'Образ судьи для Музы',
    description: 'Нарядите наставницу в строгую мантию и парик – отличный повод отметить прогресс.',
    price: 55,
    tag: 'Кастомизация'
  },
  {
    id: 'golden-frame',
    name: 'Золотая рамка профиля',
    description: 'Редкая рамка вокруг аватара в рейтингах и профиле.',
    price: 45,
    tag: 'Кастомизация'
  }
];

export const profileSnapshot: ProfileSnapshot = {
  name: 'Дарья Соколова',
  role: 'Студентка-юрист',
  avatar: 'ДС',
  xp: 1820,
  weeklyXP: 240,
  streak: 18,
  bestStreak: 42,
  league: 'Изумрудная лига',
  rankLabel: '4 место на этой неделе',
  coins: 215,
  achievements: [
    { id: 'first-steps', name: 'Первый пройденный урок', description: 'Начало положено!', icon: '🌱' },
    { id: 'streak-7', name: 'Серия 7 дней', description: 'Неделя без пропусков.', icon: '🔥' },
    { id: 'league-top3', name: 'Призёр лиги', description: 'Войти в топ-3 рейтинга.', icon: '🥉' },
    { id: 'course-finish', name: 'Конституционное право', description: 'Закрыт базовый курс.', icon: '🎓' }
  ],
  stats: [
    { label: 'Уроков завершено', value: '54', helper: '+6 за неделю' },
    { label: 'Средний результат', value: '92%', helper: 'викторины' },
    { label: 'Монет заработано', value: '1 240', helper: 'за всё время' }
  ]
};

export const versionConfigs: Record<VersionKey, VersionConfig> = {
  v2: {
    id: 'v2',
    name: 'Версия 2',
    tagline: 'Классическая зелёная тема',
    description: 'Мягкая градиентная палитра, маскот Лекс и знакомые акценты LexiQuest.',
    highlights: [
      'Градиентные карточки и мягкие тени',
      'Лекс сопровождает обучение',
      'Уютные бирюзовые акценты'
    ],
    guidance: 'Лекс напоминает: делайте хотя бы один урок в день, чтобы серия росла и открылся сундук недели!',
    palette: ['#0f766e', '#34d399', '#f0fdfa'],
    theme: {
      canvas: '#edf9f6',
      surface: '#ffffff',
      accent: '#0f766e',
      accentSoft: '#def7ec',
      border: '#0f766e1a',
      text: '#0f172a',
      chip: '#0d9488'
    },
    mascot: 'lex'
  },
  v3: {
    id: 'v3',
    name: 'Версия 3',
    tagline: 'Красно-синяя геймификация',
    description: 'Динамичные контрастные цвета и планшет Музы подчеркивают соревновательный дух.',
    highlights: [
      'Акцент на рейтингах и челленджах',
      'Карточки с выразительными рамками',
      'Тёплые градиенты и искры прогресса'
    ],
    guidance: 'Муза советует: завершите ещё один урок, чтобы попасть в топ-3 и открыть платиновый сундук.',
    palette: ['#ef4444', '#1d4ed8', '#e0f2fe'],
    theme: {
      canvas: '#f2f5ff',
      surface: '#ffffff',
      accent: '#ef4444',
      accentSoft: '#fee2e2',
      border: '#1d4ed81a',
      text: '#0f172a',
      chip: '#1d4ed8'
    },
    mascot: 'tablet-cow'
  },
  v4: {
    id: 'v4',
    name: 'Версия 4',
    tagline: 'Муза в красной худи',
    description: 'Обновлённая наставница и свежие бирюзовые акценты поддерживают игривое настроение.',
    highlights: [
      'Худи Музы и анимированная рука',
      'Градиенты на карточках прогресса',
      'Подсветка активного курса и версий'
    ],
    guidance: 'Муза машет лапой: продолжайте серию, и специальный кейс по гражданскому праву откроется раньше времени!',
    palette: ['#0ea5e9', '#0f766e', '#f0fdfa'],
    theme: {
      canvas: '#eefaf8',
      surface: '#ffffff',
      accent: '#0ea5e9',
      accentSoft: '#cffafe',
      border: '#0ea5e91a',
      text: '#0f172a',
      chip: '#0f766e'
    },
    mascot: 'hoodie-cow'
  }
};
