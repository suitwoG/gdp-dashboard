interface Achievement {
  title: string;
  description: string;
  icon: string;
}

interface AchievementsCardProps {
  achievements: Achievement[];
}

export function AchievementsCard({ achievements }: AchievementsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Achievements</h3>
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Keep going!</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-center shadow-sm"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="text-sm font-semibold text-slate-800">{item.title}</div>
            <p className="text-xs text-slate-600 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
