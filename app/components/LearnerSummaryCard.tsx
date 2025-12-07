interface LearnerSummaryCardProps {
  name: string;
  subtitle: string;
  streakDays: number;
  totalXp: number;
  course: string;
}

export function LearnerSummaryCard({ name, subtitle, streakDays, totalXp, course }: LearnerSummaryCardProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 text-xl font-semibold">
          {initials}
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-slate-900">{name}</div>
          <div className="text-sm text-slate-600">{subtitle}</div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span aria-hidden>✨</span> {course}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center text-sm font-semibold text-slate-800">
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <div className="text-lg">🔥 {streakDays}d</div>
          <div className="text-xs text-slate-500">Streak</div>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <div className="text-lg">{totalXp.toLocaleString()}</div>
          <div className="text-xs text-slate-500">Total XP</div>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <div className="text-lg">Lex League</div>
          <div className="text-xs text-slate-500">Current league</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition">
          Continue course
        </button>
        <button className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
          Switch course
        </button>
      </div>
    </div>
  );
}
