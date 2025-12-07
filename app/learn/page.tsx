import { CourseMap } from "../components/CourseMap";

const modules = [
  {
    id: "module-1",
    title: "Foundations",
    lessons: [
      { title: "Legal Alphabet", icon: "📚", status: "completed" },
      { title: "Courtroom 101", icon: "⚖️", status: "completed" },
      { title: "Key Phrases", icon: "🗣️", status: "in-progress", description: "Role-play drills" },
    ],
  },
  {
    id: "module-2",
    title: "Civil Procedure",
    lessons: [
      { title: "Filing basics", icon: "📝", status: "in-progress" },
      { title: "Deadlines", icon: "⏰", status: "locked" },
      { title: "Evidence intro", icon: "📂", status: "locked" },
    ],
  },
  {
    id: "module-3",
    title: "Advocacy",
    lessons: [
      { title: "Objections", icon: "🙋", status: "locked" },
      { title: "Closing", icon: "🎯", status: "locked" },
      { title: "Appeals", icon: "🛤️", status: "locked" },
    ],
  },
];

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Lex Moscua</p>
          <h1 className="text-3xl font-bold tracking-tight">Your learning path</h1>
        </div>
        <button className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition">
          Continue course
        </button>
      </div>
      <CourseMap modules={modules} />
    </div>
  );
}
