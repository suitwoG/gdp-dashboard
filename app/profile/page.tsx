import { AchievementsCard } from "../components/AchievementsCard";
import { DailyGoalCard } from "../components/DailyGoalCard";
import { LearnerSummaryCard } from "../components/LearnerSummaryCard";
import { WeeklyXPCard } from "../components/WeeklyXPCard";

const achievements = [
  { title: "7-day streak", description: "Consistency pays off", icon: "🔥" },
  { title: "Module master", description: "Finished Civil Basics", icon: "🎓" },
  { title: "Lightning round", description: "Completed 3 speed drills", icon: "⚡" },
  { title: "Helpful peer", description: "Answered 5 forum questions", icon: "🤝" },
];

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[2fr,1.2fr] gap-6">
        <LearnerSummaryCard
          name="Alexei Ivanov"
          subtitle="Joined Jan 2024 • Lex League"
          streakDays={7}
          totalXp={12450}
          course="Civil Law"
        />
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <div className="text-xl font-semibold">Rank & XP</div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-sm font-semibold">Bronze League</div>
            <div className="text-sm text-slate-600">#12 of 50</div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <div className="text-lg font-semibold text-slate-900">12,450</div>
              <div className="text-xs text-slate-500">Total XP</div>
            </div>
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <div className="text-lg font-semibold text-slate-900">320</div>
              <div className="text-xs text-slate-500">This week</div>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Stay above the cutoff to move up to Silver League. Keep completing lessons and practice drills to earn more XP.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeeklyXPCard currentXp={220} targetXp={500} status="On track for promotion" />
        <DailyGoalCard targetXp={20} completedXp={12} message="Finish one more drill to meet today’s goal." />
      </div>

      <AchievementsCard achievements={achievements} />
    </div>
  );
}
