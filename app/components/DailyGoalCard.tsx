interface DailyGoalCardProps {
  targetXp: number;
  completedXp: number;
  message: string;
}

export function DailyGoalCard({ targetXp, completedXp, message }: DailyGoalCardProps) {
  const progress = Math.min(100, Math.round((completedXp / targetXp) * 100));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Daily goal</h3>
        <span className="text-sm font-medium text-slate-500">{progress}%</span>
      </div>
      <p className="text-sm text-slate-600">
        {completedXp} / {targetXp} XP today
      </p>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-sm text-slate-700">{message}</p>
      <button className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition">
        Start a practice
      </button>
    </div>
  );
}
