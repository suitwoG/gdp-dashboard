interface WeeklyXPCardProps {
  currentXp: number;
  targetXp: number;
  status: string;
}

export function WeeklyXPCard({ currentXp, targetXp, status }: WeeklyXPCardProps) {
  const progress = Math.min(100, Math.round((currentXp / targetXp) * 100));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Weekly XP</h3>
        <span className="text-sm font-medium text-slate-500">{progress}%</span>
      </div>
      <p className="text-sm text-slate-600">
        {currentXp} / {targetXp} XP this week
      </p>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{status}</p>
    </div>
  );
}
