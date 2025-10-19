'use client';

import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import {
  FiBookOpen,
  FiCheckCircle,
  FiStar,
  FiLock,
  FiGift,
  FiTrendingUp,
  FiArrowUpRight,
  FiArrowDownRight,
  FiArrowRight
} from 'react-icons/fi';
import clsx from 'clsx';
import type { VersionConfig } from '../data/mock-data';
import {
  courses,
  dailyGoals,
  leagueStandings,
  profileSnapshot,
  shopItems,
  versionConfigs,
  VersionKey
} from '../data/mock-data';
import { resolveMascot } from '../components/MascotIllustrations';

type LessonStatus = 'available' | 'in-progress' | 'completed' | 'mastered' | 'locked' | 'reward';

const lessonStatusMeta: Record<LessonStatus, { icon: JSX.Element; label: string }> = {
  available: { icon: <FiBookOpen className="text-lg" />, label: 'Доступен' },
  'in-progress': { icon: <FiBookOpen className="text-lg" />, label: 'В процессе' },
  completed: { icon: <FiCheckCircle className="text-lg" />, label: 'Завершён' },
  mastered: { icon: <FiStar className="text-lg" />, label: 'Отлично' },
  locked: { icon: <FiLock className="text-lg" />, label: 'Закрыт' },
  reward: { icon: <FiGift className="text-lg" />, label: 'Награда' }
};

const trendIcon = {
  up: <FiArrowUpRight className="text-emerald-500" aria-hidden />,
  down: <FiArrowDownRight className="text-rose-500" aria-hidden />,
  stay: <FiArrowRight className="text-slate-400" aria-hidden />
};

export default function HomePage() {
  const [activeVersion, setActiveVersion] = useState<VersionKey>('v4');
  const [activeCourseId, setActiveCourseId] = useState<string>(courses[0].id);

  const version = versionConfigs[activeVersion];
  const activeCourse = useMemo(() => courses.find((course) => course.id === activeCourseId) ?? courses[0], [activeCourseId]);

  const themeStyle = useMemo<CSSProperties>(() => ({
    '--theme-canvas': version.theme.canvas,
    '--theme-surface': version.theme.surface,
    '--theme-accent': version.theme.accent,
    '--theme-accent-soft': version.theme.accentSoft,
    '--theme-border': version.theme.border,
    '--theme-text': version.theme.text,
    '--theme-chip': version.theme.chip
  }), [version]);

  return (
    <main
      className="min-h-screen pb-20"
      style={{ background: version.theme.canvas, transition: 'background 0.4s ease' }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pt-10" style={themeStyle}>
        <Header activeVersion={activeVersion} onChangeVersion={setActiveVersion} />

        <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <LearningColumn
            versionKey={activeVersion}
            onCourseChange={setActiveCourseId}
            activeCourse={activeCourse}
          />
          <SideColumn versionKey={activeVersion} />
        </section>

        <VersionGallery activeVersion={activeVersion} onSelect={setActiveVersion} />
      </div>
    </main>
  );
}

function Header({ activeVersion, onChangeVersion }: { activeVersion: VersionKey; onChangeVersion: (key: VersionKey) => void }) {
  const version = versionConfigs[activeVersion];

  return (
    <header className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg backdrop-blur">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
            <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ background: version.theme.accent }} />
            LexiQuest Demo · {version.tagline}
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Обучение праву с геймификацией</h1>
            <p className="max-w-2xl text-base text-slate-600">
              Демонстрационный дашборд повторяет ключевые экраны Duolingo: дорожка уроков, ежедневные цели,
              рейтинги лиг и магазин наград. Выберите версию интерфейса, чтобы увидеть разные визуальные подходы.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            {version.palette.map((swatch) => (
              <span
                key={swatch}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 shadow-sm"
              >
                <span className="inline-flex h-3 w-3 rounded-full" style={{ background: swatch }} />
                {swatch}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute -top-6 right-6 flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
            <FiTrendingUp className="text-emerald-500" />
            {version.tagline}
          </div>
          <div className="w-56">{resolveMascot(version.mascot, 'w-full')}</div>
          <div className="mt-4 w-full rounded-2xl bg-white/70 p-4 text-center text-sm text-slate-600 shadow">
            {version.guidance}
          </div>
          <div className="mt-4 flex gap-2">
            {(Object.keys(versionConfigs) as VersionKey[]).map((key) => (
              <button
                key={key}
                onClick={() => onChangeVersion(key)}
                className={clsx(
                  'h-2.5 w-10 rounded-full transition-opacity',
                  key === activeVersion ? 'opacity-100' : 'opacity-30 hover:opacity-70'
                )}
                style={{ background: versionConfigs[key].theme.accent }}
                aria-label={`Переключить на ${versionConfigs[key].name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function LearningColumn({
  activeCourse,
  onCourseChange,
  versionKey
}: {
  activeCourse: (typeof courses)[number];
  onCourseChange: (id: string) => void;
  versionKey: VersionKey;
}) {
  const version = versionConfigs[versionKey];

  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap gap-3 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-md">
        {courses.map((course) => {
          const isActive = course.id === activeCourse.id;
          return (
            <button
              key={course.id}
              onClick={() => onCourseChange(course.id)}
              className={clsx(
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium shadow-sm transition-all',
                isActive
                  ? 'bg-white text-slate-900 ring-2'
                  : 'bg-white/60 text-slate-500 hover:bg-white'
              )}
              style={isActive ? { borderColor: version.theme.accent, color: version.theme.text } : undefined}
            >
              <span className="text-lg">{course.icon}</span>
              <span>
                <span className="block text-base font-semibold">{course.name}</span>
                <span className="text-xs font-normal text-slate-500">{Math.round(course.progress * 100)}% курса</span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="space-y-4 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{activeCourse.name}</h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">{activeCourse.summary}</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-medium text-slate-600">Прогресс курса</span>
            <span className="inline-flex h-10 min-w-[120px] items-center justify-center rounded-full bg-white/80 px-4 text-base font-semibold text-slate-700 shadow-inner">
              {Math.round(activeCourse.progress * 100)}%
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {activeCourse.modules.map((module) => (
            <div key={module.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">{module.title}</h3>
                <span className="text-sm text-slate-500">{module.lessons.length} шагов</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {module.lessons.map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} accent={version.theme.accent} accentSoft={version.theme.accentSoft} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg md:grid-cols-3">
        {dailyGoals.map((goal) => {
          const ratio = Math.min(goal.progress / goal.target, 1);
          return (
            <div key={goal.id} className="space-y-3 rounded-2xl bg-white/80 p-4 shadow">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-700">{goal.label}</span>
                <span className="text-slate-500">{goal.progress}/{goal.target}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${ratio * 100}%`, background: version.theme.accent }}
                />
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-600">
                  +{goal.rewardXP} XP
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-600">
                  +{goal.rewardCoins} мон.
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LessonCard({
  lesson,
  accent,
  accentSoft
}: {
  lesson: { title: string; status: LessonStatus };
  accent: string;
  accentSoft: string;
}) {
  const meta = lessonStatusMeta[lesson.status];

  const classes = clsx(
    'relative flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all',
    lesson.status === 'completed' && 'border-transparent shadow-md',
    lesson.status === 'mastered' && 'ring-2 shadow-md',
    lesson.status === 'locked' && 'opacity-60',
    lesson.status === 'reward' && 'shadow-lg'
  );

  const style: CSSProperties = (() => {
    switch (lesson.status) {
      case 'available':
        return { borderColor: accent + '33', background: 'rgba(255,255,255,0.92)' };
      case 'completed':
        return { background: accentSoft, borderColor: accent + '20' };
      case 'mastered':
        return { borderColor: accent, background: 'linear-gradient(120deg, #ffffff 0%, ' + accentSoft + ' 100%)' };
      case 'locked':
        return { borderColor: '#e2e8f0', background: '#f8fafc' };
      case 'reward':
        return { borderColor: '#f59e0b33', background: '#fef9c3' };
      default:
        return { borderColor: '#e2e8f0', background: '#ffffff' };
    }
  })();

  return (
    <button className={classes} style={style} aria-label={`${lesson.title}, статус ${meta.label}`}>
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-emerald-500 shadow"
        style={{ color: accent }}
      >
        {meta.icon}
      </span>
      <div className="flex-1">
        <p className="font-semibold text-slate-800">{lesson.title}</p>
        <p className="text-xs text-slate-500">{meta.label}</p>
      </div>
    </button>
  );
}

function SideColumn({ versionKey }: { versionKey: VersionKey }) {
  const version = versionConfigs[versionKey];
  return (
    <aside className="space-y-6">
      <div className="space-y-4 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Лига недели</h2>
          <span className="badge-chip">{profileSnapshot.league}</span>
        </div>
        <p className="text-sm text-slate-500">Топ-10 переходят вверх · последние 3 выбывают</p>
        <div className="space-y-2">
          {leagueStandings.map((row) => {
            const isYou = row.name === 'Вы';
            return (
              <div
                key={row.id}
                className={clsx(
                  'flex items-center justify-between rounded-2xl border border-slate-100 bg-white/80 px-3 py-2 text-sm shadow-sm',
                  isYou && 'ring-2 ring-offset-2'
                )}
                style={isYou ? { borderColor: version.theme.accent, color: version.theme.text } : undefined}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-600">
                    {row.avatar}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-700">{row.rank}. {row.name}</p>
                    <p className="text-xs text-slate-500">{row.xp} XP</p>
                  </div>
                </div>
                <span className="text-base">{trendIcon[row.trend]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Магазин</h2>
          <span className="badge-chip">Баланс: {profileSnapshot.coins} монет</span>
        </div>
        <div className="space-y-3">
          {shopItems.map((item) => (
            <div key={item.id} className="space-y-2 rounded-2xl bg-white/90 p-4 shadow">
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold text-slate-800">{item.name}</p>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: version.theme.accent }}
                >
                  {item.price} монет
                </span>
              </div>
              <p className="text-sm text-slate-500">{item.description}</p>
              <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Профиль</h2>
          <span className="badge-chip">{profileSnapshot.rankLabel}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-lg font-semibold text-slate-600">
            {profileSnapshot.avatar}
          </div>
          <div>
            <p className="text-base font-semibold text-slate-800">{profileSnapshot.name}</p>
            <p className="text-sm text-slate-500">{profileSnapshot.role}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <StatPill label="Опыт" value={`${profileSnapshot.xp} XP`} accent={version.theme.accent} />
          <StatPill label="Неделя" value={`+${profileSnapshot.weeklyXP} XP`} accent={version.theme.accent} />
          <StatPill label="Серия" value={`${profileSnapshot.streak} дн.`} accent={version.theme.accent} helper={`Рекорд ${profileSnapshot.bestStreak}`} />
          <StatPill label="Монеты" value={`${profileSnapshot.coins}`} accent={version.theme.accent} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-600">Достижения</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {profileSnapshot.achievements.map((achievement) => (
              <span
                key={achievement.id}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 text-xs font-medium text-slate-600 shadow"
              >
                <span className="text-lg">{achievement.icon}</span>
                <span>
                  {achievement.name}
                  <span className="block text-[11px] text-slate-400">{achievement.description}</span>
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2 text-sm text-slate-500">
          {profileSnapshot.stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between rounded-xl bg-slate-50/80 px-3 py-2">
              <span>{stat.label}</span>
              <span className="font-semibold text-slate-700">
                {stat.value}
                {stat.helper && <span className="ml-2 text-xs text-slate-400">{stat.helper}</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function StatPill({
  label,
  value,
  accent,
  helper
}: {
  label: string;
  value: string;
  helper?: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl bg-white/80 p-3 text-sm shadow ring-1 ring-white/60"
      style={{ borderLeft: `4px solid ${accent}` }}
    >
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <div className="mt-1 text-lg font-semibold text-slate-800">{value}</div>
      {helper && <div className="text-xs text-slate-400">{helper}</div>}
    </div>
  );
}

function VersionGallery({ activeVersion, onSelect }: { activeVersion: VersionKey; onSelect: (key: VersionKey) => void }) {
  const versions = Object.values(versionConfigs) as VersionConfig[];
  return (
    <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Просмотр версий</h2>
          <p className="text-sm text-slate-500">
            Сравните разные визуальные подходы и нажмите на карточку, чтобы применить тему к демо-интерфейсу.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {versions.map((version) => {
          const isActive = version.id === activeVersion;
          return (
            <button
              key={version.id}
              onClick={() => onSelect(version.id)}
              className={clsx(
                'version-card-gradient flex flex-col gap-3 rounded-2xl border border-transparent p-4 text-left shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl',
                isActive && 'ring-2 ring-offset-2'
              )}
              style={isActive ? { borderColor: version.theme.accent } : undefined}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{version.name}</p>
                  <p className="text-lg font-semibold text-slate-800">{version.description}</p>
                </div>
                <div className="flex gap-1">
                  {version.palette.map((swatch) => (
                    <span key={swatch} className="h-8 w-8 rounded-full border border-white shadow" style={{ background: swatch }} />
                  ))}
                </div>
              </div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                {version.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="relative mt-2 flex items-end gap-2">
                <div className="w-32">
                  {resolveMascot(version.mascot, 'w-full')}
                </div>
                <p className="text-xs text-slate-500">{version.guidance}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
