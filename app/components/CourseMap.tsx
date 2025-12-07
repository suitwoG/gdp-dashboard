import { LessonNode, LessonNodeProps } from "./LessonNode";

interface CourseMapProps {
  modules: {
    id: string;
    title: string;
    lessons: LessonNodeProps[];
  }[];
}

export function CourseMap({ modules }: CourseMapProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Course path</h2>
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Lex Civil Basics</span>
      </div>
      <div className="space-y-6">
        {modules.map((module) => (
          <div key={module.id} className="space-y-3">
            <div className="text-sm font-semibold text-slate-700">{module.title}</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              {module.lessons.map((lesson) => (
                <LessonNode key={lesson.title} {...lesson} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
