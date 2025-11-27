export type LessonStatus = "completed" | "in-progress" | "locked";

export interface LessonNodeProps {
  title: string;
  icon: string;
  status: LessonStatus;
  description?: string;
}

export function LessonNode({ title, icon, status, description }: LessonNodeProps) {
  const statusStyles = {
    completed: "bg-emerald-500 text-white shadow-lg",
    "in-progress": "bg-white text-slate-900 border border-emerald-500 shadow-md",
    locked: "bg-slate-200 text-slate-500 border border-slate-200",
  } as const;

  return (
    <div
      className={`flex w-full max-w-xs flex-col items-center justify-center gap-2 rounded-2xl px-4 py-5 text-center transition ${statusStyles[status]}`}
    >
      <div className="text-2xl">{status === "locked" ? "🔒" : icon}</div>
      <div className="text-sm font-semibold">{title}</div>
      {description ? <p className="text-xs text-slate-600">{description}</p> : null}
      {status === "in-progress" && (
        <span className="text-xs font-semibold text-emerald-700">Continue</span>
      )}
      {status === "completed" && (
        <span className="text-xs font-semibold text-white/80">Completed</span>
      )}
      {status === "locked" && <span className="text-xs font-semibold text-slate-500">Locked</span>}
    </div>
  );
}
