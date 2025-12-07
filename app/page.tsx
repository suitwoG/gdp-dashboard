import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Lex Moscua</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Level up your legal skills with daily bite-sized lessons.
            </h1>
            <p className="text-base text-slate-600 max-w-2xl">
              A colorful, friendly learning path designed to help you practice case reading, courtroom vocabulary, and civil law
              fundamentals with quick, rewarding drills.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/learn"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition"
              >
                Start learning
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                View dashboard
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-2xl bg-emerald-500 text-white px-6 py-5 shadow-lg">
              <div className="text-2xl font-bold">12.5k</div>
              <div className="text-sm">Active learners</div>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-6 py-5 shadow-sm">
              <div className="text-2xl font-bold text-slate-900">98%</div>
              <div className="text-sm text-slate-600">Daily goal streaks</div>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-6 py-5 shadow-sm">
              <div className="text-2xl font-bold text-slate-900">4.8/5</div>
              <div className="text-sm text-slate-600">Learner rating</div>
            </div>
            <div className="rounded-2xl bg-emerald-100 text-emerald-700 px-6 py-5 shadow-sm">
              <div className="text-2xl font-bold">+220k</div>
              <div className="text-sm">Exercises completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
