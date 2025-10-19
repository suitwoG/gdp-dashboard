const versionOrder = ['v2', 'v3', 'v4'];

const mascotSvgs = {
  lexOwl: `
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <ellipse cx="110" cy="206" rx="70" ry="14" fill="#d5e2d9" opacity="0.7" />
      <path d="M52 160 C30 150 26 118 40 96 C56 70 98 64 110 96 L110 166 Z" fill="#f4b144" stroke="#ba7a24" stroke-width="5" stroke-linejoin="round" />
      <path d="M168 160 C190 150 194 118 180 96 C164 70 122 64 110 96 L110 166 Z" fill="#f4b144" stroke="#ba7a24" stroke-width="5" stroke-linejoin="round" />
      <ellipse cx="110" cy="124" rx="78" ry="72" fill="#fff3d4" stroke="#ba7a24" stroke-width="5" />
      <path d="M54 118 Q70 90 96 92 Q84 112 86 134 Z" fill="#f9d680" stroke="#ba7a24" stroke-width="4" stroke-linejoin="round" />
      <path d="M166 118 Q150 90 124 92 Q136 112 134 134 Z" fill="#f9d680" stroke="#ba7a24" stroke-width="4" stroke-linejoin="round" />
      <circle cx="82" cy="118" r="26" fill="#ffffff" stroke="#ba7a24" stroke-width="4" />
      <circle cx="138" cy="118" r="26" fill="#ffffff" stroke="#ba7a24" stroke-width="4" />
      <circle cx="90" cy="122" r="12" fill="#1e2a2f" />
      <circle cx="130" cy="122" r="12" fill="#1e2a2f" />
      <circle cx="94" cy="118" r="4" fill="#ffffff" />
      <circle cx="134" cy="118" r="4" fill="#ffffff" />
      <path d="M106 138 Q110 146 114 138" stroke="#ba7a24" stroke-width="6" stroke-linecap="round" />
      <path d="M92 150 L110 170 L128 150" fill="#f47a4d" stroke="#b95a2a" stroke-width="4" stroke-linejoin="round" />
      <path d="M70 82 C70 52 98 34 110 34 C122 34 150 52 150 82" stroke="#ba7a24" stroke-width="6" stroke-linecap="round" />
      <path d="M84 72 C86 56 100 48 110 48 C120 48 134 56 136 72" stroke="#ba7a24" stroke-width="4" stroke-linecap="round" />
      <path d="M44 166 C60 158 84 166 110 190 C136 166 160 158 176 166 C156 206 64 206 44 166 Z" fill="#1f7c5b" stroke="#145c4c" stroke-width="5" stroke-linejoin="round" />
    </svg>
  `,
  muzaCowPhone: `
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <ellipse cx="112" cy="206" rx="64" ry="14" fill="#d2d9ec" opacity="0.6" />
      <path d="M62 148 Q112 118 162 148 L162 188 C162 208 138 214 112 214 C86 214 62 208 62 188 Z" fill="#c63f3d" stroke="#8f2d2f" stroke-width="4" stroke-linejoin="round" />
      <path d="M78 160 H146 C150 168 152 176 152 186 C152 198 134 206 112 206 C90 206 72 198 72 186 C72 176 74 168 78 160 Z" fill="#ad3336" stroke="#8f2d2f" stroke-width="3" stroke-linejoin="round" />
      <path d="M82 150 C60 142 44 122 48 102 C52 84 70 82 82 100 L82 150 Z" fill="#c63f3d" stroke="#8f2d2f" stroke-width="4" stroke-linejoin="round" />
      <path d="M50 96 C38 108 36 134 54 144 C68 152 84 142 84 126 C84 108 66 90 50 96 Z" fill="#f6d3a4" stroke="#d1904c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M142 150 C166 142 182 122 178 102 C174 84 156 82 144 100 L144 150 Z" fill="#c63f3d" stroke="#8f2d2f" stroke-width="4" stroke-linejoin="round" />
      <circle cx="170" cy="126" r="16" fill="#f6d3a4" stroke="#d1904c" stroke-width="4" />
      <rect x="128" y="170" width="32" height="36" rx="6" fill="#f6c75d" stroke="#8f2d2f" stroke-width="3" />
      <text x="144" y="191" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="700" font-size="10" fill="#8f2d2f">МОСКВА</text>
      <circle cx="112" cy="92" r="60" fill="#fce5b6" stroke="#8f2d2f" stroke-width="4" />
      <path d="M70 50 C72 32 92 24 112 24 C132 24 152 32 154 50 C156 68 140 82 112 82 C84 82 68 68 70 50 Z" fill="#f8d788" stroke="#d18f4d" stroke-width="4" stroke-linejoin="round" />
      <path d="M72 44 C60 30 40 36 44 60 C48 82 64 96 70 92" fill="#d59b45" stroke="#8f2d2f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M152 44 C164 30 184 36 180 60 C176 82 160 96 154 92" fill="#d59b45" stroke="#8f2d2f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M66 90 C58 70 64 56 82 56 C96 56 102 66 108 84" fill="#f8d788" stroke="#8f2d2f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M158 90 C166 70 160 56 142 56 C128 56 122 66 116 84" fill="#f8d788" stroke="#8f2d2f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M76 116 C76 100 92 88 112 88 C132 88 148 100 148 116 C148 140 134 156 112 156 C90 156 76 140 76 116 Z" fill="#f6d3a4" stroke="#d1904c" stroke-width="4" />
      <ellipse cx="96" cy="120" rx="6" ry="8" fill="#8f2d2f" />
      <ellipse cx="128" cy="120" rx="6" ry="8" fill="#8f2d2f" />
      <path d="M100 136 Q112 144 124 136" stroke="#d77d4f" stroke-width="4" stroke-linecap="round" />
      <circle cx="92" cy="102" r="10" fill="#2f2f2f" />
      <circle cx="132" cy="102" r="10" fill="#2f2f2f" />
      <circle cx="89" cy="99" r="4" fill="#ffffff" />
      <circle cx="129" cy="99" r="4" fill="#ffffff" />
      <circle cx="96" cy="148" r="6" fill="#f5b567" opacity="0.85" />
      <circle cx="128" cy="148" r="6" fill="#f5b567" opacity="0.85" />
      <rect x="60" y="170" width="28" height="44" rx="6" fill="#243b6b" stroke="#1b2f52" stroke-width="4" />
      <rect x="66" y="176" width="16" height="32" rx="3" fill="#0f172a" />
      <circle cx="74" cy="202" r="2" fill="#96a2c7" />
    </svg>
  `,
  muzaCowWave: `
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <ellipse cx="112" cy="208" rx="66" ry="16" fill="#d9e2d7" opacity="0.65" />
      <path d="M58 148 Q112 116 166 148 L166 192 C166 212 138 218 112 218 C86 218 58 212 58 192 Z" fill="#c8473e" stroke="#8e2d2b" stroke-width="4" stroke-linejoin="round" />
      <path d="M78 162 H146 C150 170 152 178 152 188 C152 202 134 210 112 210 C90 210 72 202 72 188 C72 178 74 170 78 162 Z" fill="#ad3732" stroke="#8e2d2b" stroke-width="3" stroke-linejoin="round" />
      <path d="M70 152 C50 140 38 118 44 98 C48 84 66 82 80 98 L80 148 Z" fill="#c8473e" stroke="#8e2d2b" stroke-width="4" stroke-linejoin="round" />
      <path d="M54 96 C40 110 40 136 58 146 C72 154 88 144 88 126 C88 108 70 90 54 96 Z" fill="#f7d7a6" stroke="#d38f4c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M154 152 C174 140 186 118 180 98 C176 84 158 82 144 98 L144 148 Z" fill="#c8473e" stroke="#8e2d2b" stroke-width="4" stroke-linejoin="round" />
      <path d="M168 104 C182 104 188 126 176 138 C166 148 150 142 148 128" fill="#f7d7a6" stroke="#d38f4c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M166 86 C174 64 166 52 148 54 C132 56 126 70 122 92" fill="#f8d788" stroke="#8e2d2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M58 72 C50 50 58 38 76 40 C92 42 98 56 102 78" fill="#f8d788" stroke="#8e2d2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="112" cy="96" r="64" fill="#fce7c2" stroke="#8e2d2b" stroke-width="4" />
      <path d="M70 46 C72 28 92 20 112 20 C132 20 152 28 154 46 C156 66 140 82 112 82 C84 82 68 66 70 46 Z" fill="#f9df9a" stroke="#d9a154" stroke-width="4" stroke-linejoin="round" />
      <path d="M80 38 C66 20 44 26 46 52 C48 72 62 86 72 84" fill="#d9a154" stroke="#8e2d2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M144 38 C158 20 180 26 178 52 C176 72 162 86 152 84" fill="#d9a154" stroke="#8e2d2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M86 112 C86 96 98 86 112 86 C126 86 138 96 138 112 C138 138 126 156 112 156 C98 156 86 138 86 112 Z" fill="#f7d7a6" stroke="#d38f4c" stroke-width="4" />
      <ellipse cx="98" cy="118" rx="7" ry="9" fill="#8e2d2b" />
      <ellipse cx="126" cy="118" rx="7" ry="9" fill="#8e2d2b" />
      <path d="M100 136 Q112 146 124 136" stroke="#d78250" stroke-width="4" stroke-linecap="round" />
      <circle cx="90" cy="102" r="10" fill="#2f2f2f" />
      <circle cx="134" cy="102" r="10" fill="#2f2f2f" />
      <circle cx="87" cy="98" r="4" fill="#ffffff" />
      <circle cx="131" cy="98" r="4" fill="#ffffff" />
      <path d="M86 160 H138 C140 170 134 178 122 182 C114 184 110 184 102 182 C90 178 84 170 86 160 Z" fill="#b03a32" stroke="#8e2d2b" stroke-width="3" stroke-linejoin="round" />
      <path d="M92 170 H132" stroke="#872b27" stroke-width="4" stroke-linecap="round" />
      <path d="M134 150 C134 132 144 118 158 110 L166 118 C156 128 150 144 150 160" fill="#c8473e" stroke="#8e2d2b" stroke-width="4" stroke-linejoin="round" />
      <path d="M64 152 C62 132 60 120 48 110 L40 118 C50 130 54 144 56 162" fill="#c8473e" stroke="#8e2d2b" stroke-width="4" stroke-linejoin="round" />
      <path d="M150 64 C160 54 168 56 170 68 C172 80 166 88 154 92" fill="#fce7c2" stroke="#8e2d2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M74 64 C64 54 56 56 54 68 C52 80 58 88 70 92" fill="#fce7c2" stroke="#8e2d2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M128 170 H150 L150 190 C150 200 134 206 112 206 C90 206 74 200 74 190 L74 170 H96" fill="none" stroke="#8e2d2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M116 178 C116 174 120 172 124 172 C128 172 132 174 132 178" stroke="#f7d7a6" stroke-width="4" stroke-linecap="round" />
      <path d="M92 178 C92 174 96 172 100 172 C104 172 108 174 108 178" stroke="#f7d7a6" stroke-width="4" stroke-linecap="round" />
      <path d="M126 164 L140 164 L140 186 C140 194 126 200 112 200 C98 200 84 194 84 186 L84 164 L98 164" fill="#b03a32" />
      <rect x="126" y="176" width="28" height="30" rx="6" fill="#f6c75d" stroke="#8e2d2b" stroke-width="3" />
      <path d="M128 178 L152 178 L152 198 Q140 202 134 196 Q128 190 128 178 Z" fill="#d85e30" opacity="0.35" />
      <text x="140" y="194" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="700" font-size="9" fill="#8e2d2b">МОСКВА</text>
      <path d="M138 186 L142 182 L146 186" stroke="#8e2d2b" stroke-width="2" stroke-linecap="round" />
      <path d="M84 108 C84 86 96 72 112 72 C128 72 140 86 140 108" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.35" />
    </svg>
  `
};

const defaultMascotProfile = {
  shortName: 'Наставник',
  messages: {
    intro: ({ shortName, courseName }) => `${shortName} сопровождает вас в курсе «${courseName}».`,
    zero: ({ shortName, courseName }) => `${shortName} приветствует вас в курсе «${courseName}»!`,
    low: ({ shortName, percentLabel }) => `${shortName} отмечает хороший старт — уже ${percentLabel} позади.`,
    mid: ({ shortName }) => `${shortName} уверяет: финиш близко — осталось совсем чуть-чуть!`,
    complete: ({ shortName }) => `${shortName} аплодирует завершению курса!`
  },
  tips: {
    intro: ({ course }) => course.description,
    zero: () => 'Начните с первого урока, чтобы открыть новые главы.',
    low: ({ course }) => `Подсказка: ${course.description}`,
    mid: () => 'Повторите теорию и закройте оставшиеся задания.',
    complete: () => 'Попробуйте другую дисциплину или режим тренировки для закрепления.'
  }
};

const versionConfigs = {
  v2: {
    id: 'v2',
    label: 'Версия 2 — зелёная с Лексом',
    description: 'Мягкая зелёная тема и наставник Лекс, как во втором прототипе.',
    tagline: 'Юридические приключения',
    highlights: [
      'Семейство карточек в мягкой зелёной палитре.',
      'Оригинальный совёнок Лекс сопровождает путь по курсам.',
      'Классическая дорожка уроков и ежедневные цели.'
    ],
    theme: {
      '--bg': '#f2f7f4',
      '--bg-gradient-mid': '#f8fbf9',
      '--bg-gradient-end': '#ffffff',
      '--bg-card': '#ffffff',
      '--bg-muted': '#e4f3ec',
      '--bg-muted-rgb': '228, 243, 236',
      '--primary': '#2d9d78',
      '--primary-rgb': '45, 157, 120',
      '--primary-dark': '#1f7c5b',
      '--accent': '#145c4c',
      '--accent-rgb': '20, 92, 76',
      '--text': '#1e2a2f',
      '--text-muted': '#53636a',
      '--border': '#c6ded1',
      '--reward-accent': '#b65a11',
      '--status-available-bg': 'rgba(20, 92, 76, 0.18)',
      '--status-complete-bg': 'rgba(45, 157, 120, 0.25)',
      '--status-excellent-bg': 'rgba(255, 196, 108, 0.28)',
      '--status-reward-bg': 'rgba(255, 210, 120, 0.35)',
      '--status-locked-bg': 'rgba(184, 206, 195, 0.4)',
      '--reward-soft-bg': 'rgba(255, 210, 120, 0.22)',
      '--reward-soft-border': 'rgba(255, 196, 108, 0.45)'
    },
    mascot: {
      name: 'Лекс',
      shortName: 'Лекс',
      title: 'Лекс — ваш наставник',
      svg: mascotSvgs.lexOwl,
      messages: {
        low: ({ shortName, percentLabel }) => `${shortName} доволен стартом — уже ${percentLabel} пути пройдено.`,
        mid: ({ shortName }) => `${shortName} подсказывает: осталось совсем немного до следующего раздела!`,
        complete: ({ shortName }) => `${shortName} гордится — курс закрыт на отлично!`
      },
      tips: {
        zero: () => 'Начните с первого урока — дорожка сама подскажет следующий шаг.',
        low: ({ course }) => `Лекс советует перечитать конспект: ${course.description}`,
        mid: () => 'Вернитесь к теориям, чтобы закрыть оставшиеся уроки без ошибок.',
        complete: () => 'Продолжайте практику и переходите к следующей дисциплине.'
      }
    }
  },
  v3: {
    id: 'v3',
    label: 'Версия 3 — красно-синяя с Музой',
    description: 'Контрастная красно-синяя палитра и Муза с планшетом из третьей версии.',
    tagline: 'Игровой курс для юристов',
    highlights: [
      'Красно-синяя тема и акцентные градиенты.',
      'Муза с планшетом напоминает о ежедневных заданиях.',
      'Карточки магазина и лидеров подчёркнуты контрастными рамками.'
    ],
    theme: {
      '--bg': '#f6f8ff',
      '--bg-gradient-mid': '#fff5f6',
      '--bg-gradient-end': '#ffffff',
      '--bg-card': '#ffffff',
      '--bg-muted': '#ecf1ff',
      '--bg-muted-rgb': '236, 241, 255',
      '--primary': '#ff5c61',
      '--primary-rgb': '255, 92, 97',
      '--primary-dark': '#d94b57',
      '--accent': '#243b6b',
      '--accent-rgb': '36, 59, 107',
      '--text': '#1c2437',
      '--text-muted': '#566079',
      '--border': '#d5dff3',
      '--reward-accent': '#d4692f',
      '--status-available-bg': 'rgba(36, 59, 107, 0.18)',
      '--status-complete-bg': 'rgba(255, 92, 97, 0.25)',
      '--status-excellent-bg': 'rgba(255, 196, 140, 0.32)',
      '--status-reward-bg': 'rgba(255, 188, 150, 0.35)',
      '--status-locked-bg': 'rgba(198, 206, 230, 0.45)',
      '--reward-soft-bg': 'rgba(255, 188, 150, 0.25)',
      '--reward-soft-border': 'rgba(255, 162, 125, 0.45)'
    },
    mascot: {
      name: 'Муза',
      shortName: 'Муза',
      title: 'Муза — ваш наставник',
      svg: mascotSvgs.muzaCowPhone,
      messages: {
        intro: ({ shortName, courseName }) => `${shortName} подключилась и следит за курсом «${courseName}».`,
        low: ({ shortName, percentLabel }) => `${shortName} пишет заметки: уже ${percentLabel} позади — отличная динамика!`,
        mid: ({ shortName }) => `${shortName} напоминает в планшете: доведите модуль до конца и заберите награду.`,
        complete: ({ shortName }) => `${shortName} фиксирует результат — курс завершён!`
      },
      tips: {
        zero: () => 'Муза советует открыть первый урок — так появятся новые задания.',
        low: ({ course }) => `Сделайте пару заметок и перечитайте: ${course.description}`,
        mid: () => 'Сконцентрируйтесь на оставшихся уроках и используйте теорию из подсказок.',
        complete: () => 'Запланируйте повторение и взгляните на ежедневные квесты.'
      }
    }
  },
  v4: {
    id: 'v4',
    label: 'Версия 4 — зелёная Муза без телефона',
    description: 'Актуальная версия: зелёная палитра v2 и Муза в красной худи, приветствующая без телефона.',
    tagline: 'Юридические приключения',
    highlights: [
      'Возвращённая спокойная зелёная тема.',
      'Муза в красной худи машет копытцем и мотивирует без гаджетов.',
      'Обновлённые тексты для статуса уроков и наград.'
    ],
    theme: {
      '--bg': '#f2f7f4',
      '--bg-gradient-mid': '#f8fbf9',
      '--bg-gradient-end': '#ffffff',
      '--bg-card': '#ffffff',
      '--bg-muted': '#e3f4ed',
      '--bg-muted-rgb': '227, 244, 237',
      '--primary': '#2d9d78',
      '--primary-rgb': '45, 157, 120',
      '--primary-dark': '#1f7c5b',
      '--accent': '#145c4c',
      '--accent-rgb': '20, 92, 76',
      '--text': '#1e2a2f',
      '--text-muted': '#53636a',
      '--border': '#c6ded1',
      '--reward-accent': '#b65a11',
      '--status-available-bg': 'rgba(20, 92, 76, 0.18)',
      '--status-complete-bg': 'rgba(45, 157, 120, 0.25)',
      '--status-excellent-bg': 'rgba(255, 196, 108, 0.28)',
      '--status-reward-bg': 'rgba(255, 210, 120, 0.35)',
      '--status-locked-bg': 'rgba(184, 206, 195, 0.4)',
      '--reward-soft-bg': 'rgba(255, 210, 120, 0.22)',
      '--reward-soft-border': 'rgba(255, 196, 108, 0.45)'
    },
    mascot: {
      name: 'Муза',
      shortName: 'Муза',
      title: 'Муза — ваша наставница',
      svg: mascotSvgs.muzaCowWave,
      messages: {
        intro: ({ shortName, courseName }) => `${shortName} сопровождает вас в курсе «${courseName}».`,
        low: ({ shortName, percentLabel }) => `${shortName} улыбается: уже ${percentLabel} пути позади.`,
        mid: ({ shortName }) => `${shortName} машет копытцем — осталось совсем чуть-чуть до трофея!`,
        complete: ({ shortName }) => `${shortName} аплодирует завершению и предлагает выбрать новый вызов.`
      },
      tips: {
        zero: () => 'Муза просит начать первый урок, чтобы открыть следующие модули.',
        low: ({ course }) => `Совет Музы: ${course.description}`,
        mid: () => 'Подсмотрите в теорию, чтобы закрыть оставшиеся задания без ошибок.',
        complete: () => 'Переключитесь на другой курс или повторите избранные уроки.'
      }
    }
  }
};

const courses = [
  {
    id: 'state-law',
    name: 'Теория государства и права',
    icon: '📘',
    description: 'Основы правовой системы, источники и принципы.',
    modules: [
      {
        id: 'basics',
        title: 'Основы государства',
        lessons: [
          { id: '1', title: 'Понятие государства', status: 'complete' },
          { id: '2', title: 'Признаки государства', status: 'complete' },
          { id: '3', title: 'Формы правления', status: 'excellent' },
          { id: 'reward-1', title: 'Сундук наград', status: 'reward' }
        ]
      },
      {
        id: 'law',
        title: 'Система права',
        lessons: [
          { id: '4', title: 'Нормы права', status: 'available' },
          { id: '5', title: 'Правотворчество', status: 'available' },
          { id: '6', title: 'Правосознание', status: 'locked' }
        ]
      }
    ]
  },
  {
    id: 'constitutional',
    name: 'Конституционное право',
    icon: '🏛️',
    description: 'Основной закон, разделение властей и права граждан.',
    modules: [
      {
        id: 'constitution',
        title: 'Конституционный строй',
        lessons: [
          { id: '1', title: 'Принципы строя', status: 'complete' },
          { id: '2', title: 'Права и свободы', status: 'excellent' },
          { id: '3', title: 'Федеративное устройство', status: 'available' }
        ]
      },
      {
        id: 'branches',
        title: 'Ветви власти',
        lessons: [
          { id: '4', title: 'Законодательная власть', status: 'locked' },
          { id: '5', title: 'Исполнительная власть', status: 'locked' },
          { id: '6', title: 'Судебная власть', status: 'locked' }
        ]
      }
    ]
  },
  {
    id: 'civil',
    name: 'Гражданское право',
    icon: '📜',
    description: 'Сделки, договоры и защита прав собственности.',
    modules: [
      {
        id: 'subjects',
        title: 'Субъекты права',
        lessons: [
          { id: '1', title: 'Правоспособность', status: 'complete' },
          { id: '2', title: 'Дееспособность', status: 'complete' },
          { id: '3', title: 'Юридические лица', status: 'complete' }
        ]
      },
      {
        id: 'contracts',
        title: 'Договорное право',
        lessons: [
          { id: '4', title: 'Виды договоров', status: 'excellent' },
          { id: '5', title: 'Заключение договоров', status: 'available' },
          { id: '6', title: 'Исполнение обязательств', status: 'available' },
          { id: 'reward-2', title: 'Бонусный сундук', status: 'reward' }
        ]
      }
    ]
  }
];

const dailyGoals = [
  { id: 'lessons', title: 'Пройдите 3 урока', target: 3, progress: 2 },
  { id: 'xp', title: 'Заработайте 60 XP', target: 60, progress: 45 },
  { id: 'perfect', title: 'Урок без ошибок', target: 1, progress: 1 }
];

const leagueData = {
  name: 'Сапфировая лига',
  description: 'Топ-5 переходят выше, последние 3 — понижаются.',
  rows: [
    { position: 1, name: 'Иван Петров', xp: 420, trend: 'up' },
    { position: 2, name: 'Мария Иванова', xp: 395, trend: 'up' },
    { position: 3, name: 'Chen Liu', xp: 360, trend: 'up' },
    { position: 4, name: 'Carla Mendes', xp: 340, trend: 'up' },
    { position: 5, name: 'Benito Rosa', xp: 310, trend: 'neutral' },
    { position: 6, name: 'Вы', xp: 305, trend: 'up', isUser: true },
    { position: 7, name: 'Марк Рейн', xp: 290, trend: 'down' },
    { position: 8, name: 'Сара Ким', xp: 275, trend: 'down' },
    { position: 9, name: 'Alex Johnson', xp: 250, trend: 'down' },
    { position: 10, name: 'Laura West', xp: 210, trend: 'down' }
  ]
};

const shopData = [
  {
    id: 'boosts',
    title: 'Бонусы обучения',
    items: [
      { icon: '❄️', name: 'Заморозка серии', description: 'Сохраните стрик при пропуске одного дня.', price: 30 },
      { icon: '⚡', name: 'Удвоитель XP (24 часа)', description: 'x2 очков опыта на сутки.', price: 100 },
      { icon: '⏱️', name: 'Блиц-тренировка', description: 'Откройте режим быстрых вопросов на 15 минут.', price: 20 }
    ]
  },
  {
    id: 'style',
    title: 'Стиль и украшения',
    items: [
      { icon: '🎓', name: 'Костюм выпускника', description: 'Наряд для маскота Музы.', price: 45 },
      { icon: '👑', name: 'Премиальная рамка профиля', description: 'Золотое обрамление аватара.', price: 60 },
      { icon: '🌙', name: 'Ночная тема', description: 'Комфортный тёмный режим интерфейса.', price: 35 }
    ]
  }
];

const profileData = {
  name: 'Алина Правова',
  role: 'Юрист-стажёр',
  stats: [
    { label: 'Всего XP', value: 2860, icon: '⭐' },
    { label: 'Серия дней', value: 12, icon: '🔥' },
    { label: 'Завершено уроков', value: 58, icon: '📘' },
    { label: 'Монеты', value: 185, icon: '💰' }
  ],
  achievements: [
    { icon: '🏅', title: 'Первые шаги', description: 'Пройдены первые 10 уроков.' },
    { icon: '📚', title: 'Теоретик', description: 'Изучена вся теория по курсу.' },
    { icon: '🔥', title: 'Неугасимый', description: 'Серия 10 дней подряд.' },
    { icon: '🏆', title: 'Лидер недели', description: 'Топ-3 в лиге.' }
  ],
  activity: [
    { time: 'Сегодня, 10:24', description: 'Пройден урок «Правосознание» с 100% результатом.' },
    { time: 'Вчера, 21:05', description: 'Получен сундук — +25 монет и +40 XP.' },
    { time: 'Вчера, 18:12', description: 'Поднятие в Сапфировую лигу.' }
  ]
};

const state = {
  currentCourseId: courses[0].id,
  wallet: 185,
  weeklyXp: leagueData.rows.find((row) => row.isUser)?.xp ?? 0,
  currentVersion: 'v4',
  mascotProfile: {
    shortName: versionConfigs.v4.mascot.shortName,
    messages: { ...defaultMascotProfile.messages, ...versionConfigs.v4.mascot.messages },
    tips: { ...defaultMascotProfile.tips, ...versionConfigs.v4.mascot.tips }
  }
};

const sectionButtons = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.page-section');
const versionCard = document.querySelector('.version-card');
const versionSelect = document.getElementById('version-select');
const versionDescription = document.getElementById('version-description');
const versionHighlights = document.getElementById('version-highlights');
const versionGallery = document.getElementById('version-gallery');
const logoSubtitle = document.querySelector('.logo-subtitle');
const courseSelect = document.getElementById('course-select');
const courseTrack = document.getElementById('course-track');
const courseProgress = document.getElementById('course-progress');
const mascotHeading = document.querySelector('.mascot .card-header h2');
const mascotIllustration = document.querySelector('.mascot-illustration');
const mascotMessage = document.getElementById('mascot-message');
const mascotTip = document.getElementById('mascot-tip');
const dailyGoalsList = document.getElementById('daily-goals-list');
const dailyReward = document.getElementById('daily-reward');
const headerWeeklyXp = document.getElementById('header-weekly-xp');
const headerStreak = document.getElementById('header-streak');
const leagueName = document.getElementById('league-name');
const leagueDescription = document.getElementById('league-description');
const leagueTableBody = document.getElementById('league-table-body');
const walletBalance = document.getElementById('wallet-balance');
const shopCategories = document.getElementById('shop-categories');
const profileName = document.getElementById('profile-name');
const profileRole = document.getElementById('profile-role');
const profileStats = document.getElementById('profile-stats');
const achievements = document.getElementById('achievements');
const activityFeed = document.getElementById('activity-feed');

sectionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.section;

    sectionButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    sections.forEach((section) => {
      section.classList.toggle('visible', section.id === target);
    });
  });
});

if (versionSelect) {
  versionSelect.addEventListener('change', (event) => {
    applyVersion(event.target.value);
  });
}

function renderVersionSelect() {
  if (!versionSelect) return;
  versionSelect.innerHTML = '';
  versionOrder.forEach((id) => {
    const config = versionConfigs[id];
    if (!config) return;
    const option = document.createElement('option');
    option.value = id;
    option.textContent = config.label;
    versionSelect.append(option);
  });
  versionSelect.value = state.currentVersion;
}

function renderVersionGallery(activeId = state.currentVersion) {
  if (!versionGallery) return;
  versionGallery.innerHTML = '';

  versionOrder.forEach((id) => {
    const config = versionConfigs[id];
    if (!config) return;

    const preview = document.createElement('button');
    preview.type = 'button';
    preview.className = 'version-preview';
    preview.dataset.versionId = id;
    preview.setAttribute('role', 'listitem');
    preview.setAttribute('aria-label', config.label);
    preview.setAttribute('aria-pressed', id === activeId ? 'true' : 'false');
    preview.title = config.label;

    if (id === activeId) {
      preview.classList.add('active');
    }

    const previewTheme = {
      card: config.theme['--bg-card'] ?? '#ffffff',
      muted: config.theme['--bg-muted'] ?? 'rgba(20, 92, 76, 0.08)',
      primary: config.theme['--primary'] ?? '#2d9d78',
      primaryRgb: config.theme['--primary-rgb'] ?? '45, 157, 120',
      accent: config.theme['--accent'] ?? '#145c4c',
      accentRgb: config.theme['--accent-rgb'] ?? '20, 92, 76',
      text: config.theme['--text'] ?? '#1e2a2f',
      textMuted: config.theme['--text-muted'] ?? '#53636a',
      border: config.theme['--border'] ?? 'rgba(0, 0, 0, 0.15)',
      background: config.theme['--bg'] ?? '#f5f5f5'
    };

    preview.style.setProperty('--preview-card', previewTheme.card);
    preview.style.setProperty('--preview-muted', previewTheme.muted);
    preview.style.setProperty('--preview-primary', previewTheme.primary);
    preview.style.setProperty('--preview-primary-rgb', previewTheme.primaryRgb);
    preview.style.setProperty('--preview-accent', previewTheme.accent);
    preview.style.setProperty('--preview-accent-rgb', previewTheme.accentRgb);
    preview.style.setProperty('--preview-text', previewTheme.text);
    preview.style.setProperty('--preview-text-muted', previewTheme.textMuted);
    preview.style.setProperty('--preview-border', previewTheme.border);

    const highlightMarkup = config.highlights
      .slice(0, 2)
      .map((point) => `<li>${point}</li>`)
      .join('');

    preview.innerHTML = `
      <div class="version-preview-header">
        <p class="version-preview-label">${config.label}</p>
        <p class="version-preview-tagline">${config.tagline}</p>
      </div>
      <div class="version-preview-visual">
        <div class="version-preview-mascot" aria-hidden="true">${config.mascot.svg}</div>
        <ul class="version-preview-points">${highlightMarkup}</ul>
      </div>
      <div class="version-swatches" role="list" aria-label="Цветовая палитра версии">
        <span role="listitem" aria-label="Основной цвет" style="--swatch-color: ${previewTheme.primary};"></span>
        <span role="listitem" aria-label="Акцент" style="--swatch-color: ${previewTheme.accent};"></span>
        <span role="listitem" aria-label="Фоновый оттенок" style="--swatch-color: ${previewTheme.background};"></span>
      </div>
    `;

    preview.addEventListener('click', () => {
      if (state.currentVersion !== id) {
        applyVersion(id);
      }
    });

    versionGallery.append(preview);
  });
}

function applyVersion(versionId, options = {}) {
  const config = versionConfigs[versionId] ?? versionConfigs.v4;
  state.currentVersion = config.id;

  Object.entries(config.theme).forEach(([variable, value]) => {
    document.documentElement.style.setProperty(variable, value);
  });

  if (versionCard) {
    versionCard.dataset.version = config.id;
  }

  if (versionSelect) {
    versionSelect.value = config.id;
  }

  if (versionDescription) {
    versionDescription.textContent = config.description;
  }

  if (versionHighlights) {
    versionHighlights.innerHTML = '';
    config.highlights.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>✅</span><span>${item}</span>`;
      versionHighlights.append(li);
    });
  }

  renderVersionGallery(config.id);

  if (logoSubtitle) {
    logoSubtitle.textContent = config.tagline;
  }

  if (mascotHeading) {
    mascotHeading.textContent = config.mascot.title;
  }

  if (mascotIllustration) {
    mascotIllustration.innerHTML = config.mascot.svg;
  }

  state.mascotProfile = {
    shortName: config.mascot.shortName,
    messages: { ...defaultMascotProfile.messages, ...config.mascot.messages },
    tips: { ...defaultMascotProfile.tips, ...config.mascot.tips }
  };

  if (!options.skipTrack) {
    renderCourseTrack();
  } else {
    const course = courses.find((c) => c.id === state.currentCourseId);
    if (course) {
      const totalLessons = course.modules.flatMap((mod) => mod.lessons.filter((lesson) => lesson.status !== 'reward')).length;
      const completedLessons = course.modules
        .flatMap((mod) => mod.lessons)
        .filter((lesson) => lesson.status === 'complete' || lesson.status === 'excellent').length;
      updateMascot(course, completedLessons, totalLessons);
    }
  }
}

function renderCourseSelect() {
  courseSelect.innerHTML = '';
  courses.forEach((course) => {
    const option = document.createElement('option');
    option.value = course.id;
    option.textContent = `${course.icon} ${course.name}`;
    option.selected = course.id === state.currentCourseId;
    courseSelect.append(option);
  });
}

function describeStatus(status) {
  switch (status) {
    case 'complete':
      return 'Пройдено';
    case 'excellent':
      return 'С отличием';
    case 'reward':
      return 'Награда';
    case 'available':
      return 'Доступно';
    case 'locked':
    default:
      return 'Закрыто';
  }
}

function statusIcon(status) {
  switch (status) {
    case 'complete':
      return '✅';
    case 'excellent':
      return '🌟';
    case 'reward':
      return '🎁';
    case 'locked':
      return '🔒';
    case 'available':
    default:
      return '📘';
  }
}

function renderCourseTrack() {
  const course = courses.find((c) => c.id === state.currentCourseId);
  if (!course) return;

  const totalLessons = course.modules.flatMap((mod) => mod.lessons.filter((lesson) => lesson.status !== 'reward')).length;
  const completedLessons = course.modules
    .flatMap((mod) => mod.lessons)
    .filter((lesson) => lesson.status === 'complete' || lesson.status === 'excellent').length;

  courseProgress.textContent = `${completedLessons} / ${totalLessons} уроков выполнено`;

  courseTrack.innerHTML = '';

  course.modules.forEach((module, index) => {
    const moduleEl = document.createElement('div');
    moduleEl.className = 'module';

    const title = document.createElement('h3');
    title.className = 'module-title';
    title.innerHTML = `<span>${index + 1}.</span> ${module.title}`;
    moduleEl.append(title);

    const lessonsWrap = document.createElement('div');
    lessonsWrap.className = 'lessons';

    module.lessons.forEach((lesson) => {
      const lessonEl = document.createElement('button');
      lessonEl.className = `lesson lesson-${lesson.status}`;
      lessonEl.type = 'button';
      lessonEl.innerHTML = `
        <span class="badge status-${lesson.status}">${statusIcon(lesson.status)}</span>
        <p class="lesson-title">${lesson.title}</p>
        <p class="lesson-status">${describeStatus(lesson.status)}</p>
      `;

      const tooltip = lesson.status === 'locked'
        ? 'Завершите предыдущие уроки, чтобы разблокировать.'
        : lesson.status === 'reward'
        ? 'Откройте сундук и получите награду.'
        : 'Готов к прохождению!';
      lessonEl.title = tooltip;
      lessonsWrap.append(lessonEl);
    });

    moduleEl.append(lessonsWrap);
    courseTrack.append(moduleEl);
  });

  updateMascot(course, completedLessons, totalLessons);
}

function updateMascot(course, completedLessons, totalLessons) {
  const completionPercent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
  const profile = state.mascotProfile ?? defaultMascotProfile;
  const context = {
    course,
    courseName: course.name,
    percent: completionPercent,
    percentLabel: `${completionPercent}%`,
    shortName: profile.shortName ?? defaultMascotProfile.shortName
  };

  const messages = profile.messages ?? defaultMascotProfile.messages;
  const tips = profile.tips ?? defaultMascotProfile.tips;

  const pickMessage = (key) => (messages[key] ?? defaultMascotProfile.messages[key] ?? (() => ''))(context);
  const pickTip = (key) => (tips[key] ?? defaultMascotProfile.tips[key] ?? (() => ''))(context);

  let message;
  let tip;

  if (completionPercent === 0) {
    message = pickMessage('zero');
    tip = pickTip('zero');
  } else if (completionPercent < 50) {
    message = pickMessage('low');
    tip = pickTip('low');
  } else if (completionPercent < 100) {
    message = pickMessage('mid');
    tip = pickTip('mid');
  } else {
    message = pickMessage('complete');
    tip = pickTip('complete');
  }

  if (!message) {
    message = pickMessage('intro');
  }

  if (!tip) {
    tip = pickTip('intro');
  }

  mascotMessage.textContent = message;
  mascotTip.textContent = tip;
}

function renderDailyGoals() {
  dailyGoalsList.innerHTML = '';
  let completedCount = 0;

  dailyGoals.forEach((goal) => {
    const progress = Math.min(goal.progress, goal.target);
    const percent = Math.round((progress / goal.target) * 100);
    if (progress >= goal.target) completedCount += 1;

    const li = document.createElement('li');
    li.className = 'goal-item';
    li.innerHTML = `
      <div class="goal-header">
        <p class="goal-title">${goal.title}</p>
        <p class="goal-progress">${progress} / ${goal.target}</p>
      </div>
      <div class="progress-bar" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
        <span style="width: ${percent}%"></span>
      </div>
    `;
    dailyGoalsList.append(li);
  });

  if (completedCount === dailyGoals.length) {
    dailyReward.textContent = '🎉 Все задания выполнены! Получите сундук: +25 монет, +40 XP.';
    dailyReward.classList.add('visible');
  } else {
    dailyReward.classList.remove('visible');
  }
}

function renderLeague() {
  leagueName.textContent = leagueData.name;
  leagueDescription.textContent = leagueData.description;
  leagueTableBody.innerHTML = '';

  leagueData.rows.forEach((row) => {
    const tr = document.createElement('tr');
    if (row.isUser) tr.classList.add('highlight');

    const trendIcon = row.trend === 'up' ? '⬆️' : row.trend === 'down' ? '⬇️' : '⏺️';

    tr.innerHTML = `
      <td>${row.position}</td>
      <td>${trendIcon} ${row.name}</td>
      <td>${row.xp}</td>
    `;

    leagueTableBody.append(tr);
  });
}

function renderShop() {
  walletBalance.textContent = state.wallet;
  shopCategories.innerHTML = '';

  shopData.forEach((category) => {
    const section = document.createElement('section');
    section.className = 'shop-category';
    section.innerHTML = `<h2>${category.title}</h2>`;

    const itemsWrap = document.createElement('div');
    itemsWrap.className = 'shop-items';

    category.items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'shop-item';
      card.innerHTML = `
        <div class="shop-icon">${item.icon}</div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="shop-price">${item.price} монет</p>
        <button class="shop-action" type="button">Купить</button>
      `;

      const button = card.querySelector('button');
      button.addEventListener('click', () => handlePurchase(item.price, item.name));

      itemsWrap.append(card);
    });

    section.append(itemsWrap);
    shopCategories.append(section);
  });
}

function handlePurchase(price, itemName) {
  if (state.wallet < price) {
    alert('Недостаточно монет. Вернитесь к урокам и заработайте ещё!');
    return;
  }

  state.wallet -= price;
  walletBalance.textContent = state.wallet;
  alert(`Вы купили «${itemName}». Бонус добавлен в ваш инвентарь!`);
}

function renderProfile() {
  profileName.textContent = profileData.name;
  profileRole.textContent = profileData.role;

  profileStats.innerHTML = '';
  profileData.stats.forEach((stat) => {
    const li = document.createElement('li');
    li.className = 'stat';
    li.innerHTML = `<span>${stat.icon} ${stat.label}</span><span>${stat.value}</span>`;
    profileStats.append(li);
  });

  achievements.innerHTML = '';
  profileData.achievements.forEach((achievement) => {
    const card = document.createElement('article');
    card.className = 'achievement';
    card.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <p class="achievement-title">${achievement.title}</p>
      <p class="achievement-desc">${achievement.description}</p>
    `;
    achievements.append(card);
  });

  activityFeed.innerHTML = '';
  profileData.activity.forEach((activity) => {
    const li = document.createElement('li');
    li.className = 'activity-item';
    li.innerHTML = `
      <strong>${activity.time}</strong><br />
      <span>${activity.description}</span>
    `;
    activityFeed.append(li);
  });

  headerStreak.textContent = profileData.stats.find((stat) => stat.label === 'Серия дней')?.value ?? 0;
}

function init() {
  renderVersionSelect();
  applyVersion(state.currentVersion, { skipTrack: true });

  renderCourseSelect();
  renderCourseTrack();
  renderDailyGoals();
  renderLeague();
  renderShop();
  renderProfile();

  headerWeeklyXp.textContent = state.weeklyXp;

  courseSelect.addEventListener('change', (event) => {
    state.currentCourseId = event.target.value;
    renderCourseTrack();
  });
}

document.addEventListener('DOMContentLoaded', init);
