export default function LeaderboardPage() {
  const rows = [
    { name: "Alexei", xp: 12450, rank: 12 },
    { name: "Maria", xp: 13200, rank: 10 },
    { name: "Diego", xp: 9800, rank: 18 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Community</p>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-sm text-slate-600">Climb the Lex League by finishing lessons and practice drills.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
        <div className="grid grid-cols-[60px,1fr,100px] text-xs font-medium uppercase tracking-wide text-slate-500">
          <span>Rank</span>
          <span>Student</span>
          <span className="text-right">XP</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.rank}
            className="grid grid-cols-[60px,1fr,100px] items-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800"
          >
            <span className="text-slate-500">#{row.rank}</span>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                {row.name[0]}
              </span>
              {row.name}
            </div>
            <span className="text-right">{row.xp.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
