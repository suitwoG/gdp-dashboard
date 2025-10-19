"use client";

import { useState } from "react";

type NodeState = "locked" | "available" | "not-passed" | "done" | "current";
type NodeKind = "material" | "lesson";

type PathNode =
  | {
      id: string;
      kind: "material";
      state: Extract<NodeState, "available" | "done">;
      label: string;
      materialSlug: string;
    }
  | {
      id: string;
      kind: "lesson";
      state: NodeState;
      label: string;
    };

type Screen = "map" | "material" | "lesson";

type QuestionOption = {
  id: string;
  label: string;
};

const demoNodes: PathNode[] = [
  { id: "m1", kind: "material", state: "available", label: "Материал: Понятие права", materialSlug: "tgp-1" },
  { id: "l1", kind: "lesson", state: "not-passed", label: "Урок 1" },
  { id: "l2", kind: "lesson", state: "done", label: "Урок 2" },
  { id: "l3", kind: "lesson", state: "current", label: "Урок 3" },
  { id: "l4", kind: "lesson", state: "locked", label: "Урок 4" }
];

const offsets = ["branch-offset-center", "branch-offset-left", "branch-offset-right", "branch-offset-left", "branch-offset-right"];

const question = {
  title: "Что такое право?",
  options: [
    { id: "a", label: "Совокупность общественных норм, обеспеченных силой государства" },
    { id: "b", label: "Система моральных установок, регулирующих поведение" },
    { id: "c", label: "Совокупность религиозных запретов" },
    { id: "d", label: "Личные взгляды конкретного человека" }
  ] satisfies QuestionOption[],
  correctOptionId: "a"
};

function BookIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 5.5C4 4.11929 5.11929 3 6.5 3H18C18.5523 3 19 3.44772 19 4V19C19 19.5523 18.5523 20 18 20H6.75C5.23122 20 4 18.7688 4 17.25V5.5Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M6 4.5C6 4.22386 6.22386 4 6.5 4H17V18H6.75C6.33579 18 6 17.6642 6 17.25V4.5Z"
        fill="rgba(96, 165, 250, 0.25)"
      />
      <path
        d="M8 7H15"
        stroke="#60A5FA"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 10H13"
        stroke="#60A5FA"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="paint0_linear" x1="4" y1="3" x2="19.5" y2="20.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function StarIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.0489 2.92705C11.3483 2.00574 12.6517 2.00574 12.9511 2.92705L14.4008 7.36918C14.534 7.78036 14.9142 8.06353 15.3458 8.06353H20.0513C21.021 8.06353 21.4239 9.30145 20.6387 9.86918L16.833 12.6423C16.4759 12.9023 16.3251 13.3619 16.4583 13.773L17.908 18.2152C18.2074 19.1365 17.1533 19.8986 16.3681 19.3309L12.5624 16.5577C12.2053 16.2977 11.7947 16.2977 11.4376 16.5577L7.63194 19.3309C6.84674 19.8986 5.7926 19.1365 6.09201 18.2152L7.54168 13.773C7.67493 13.3619 7.52409 12.9023 7.167 12.6423L3.36134 9.86918C2.57613 9.30145 2.97901 8.06353 3.9487 8.06353H8.65421C9.08578 8.06353 9.46602 7.78036 9.59927 7.36918L11.0489 2.92705Z"
        fill={color}
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="#22C55E" />
      <path d="M8.5 12.5L11 15L16 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="14" height="11" rx="3" fill="#3A4159" />
      <path
        d="M12 6C13.6569 6 15 7.34315 15 9V10H9V9C9 7.34315 10.3431 6 12 6Z"
        stroke="#C7D2FE"
        strokeWidth="1.5"
        fill="#1F2937"
      />
      <circle cx="12" cy="14" r="1.5" fill="#C7D2FE" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.5 2C13.5 5 18 6.5 18 12.5C18 16.6421 14.6421 20 10.5 20C6.35786 20 3 16.6421 3 12.5C3 8 6 5.5 8.5 3C9 6.5 11 8 12.5 2Z"
        fill="#F87171"
      />
      <path
        d="M10.5 9C11.5 11 14 12 14 15C14 16.933 12.433 18.5 10.5 18.5C8.567 18.5 7 16.933 7 15C7 12.5 8.5 11 9.5 9C10 11 11 11.5 10.5 9Z"
        fill="#FEE2E2"
      />
    </svg>
  );
}

function NodeIcon({ node }: { node: PathNode }) {
  if (node.kind === "material") {
    return <BookIcon />;
  }

  switch (node.state) {
    case "done":
      return <CheckIcon />;
    case "locked":
      return <LockIcon />;
    case "current":
      return <FlameIcon />;
    case "not-passed":
      return <StarIcon color="#FACC15" />;
    case "available":
    default:
      return <StarIcon color="#F97316" />;
  }
}

export default function LexPage() {
  const [screen, setScreen] = useState<Screen>("map");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const handleNodeClick = (node: PathNode) => {
    if (node.kind === "material") {
      setScreen("material");
      return;
    }

    if (node.state === "locked") {
      return;
    }

    setScreen("lesson");
    setSelectedOption(null);
    setChecked(false);
  };

  const handleGoToLesson = () => {
    const nextLesson = demoNodes.find((item) => item.kind === "lesson" && item.state !== "locked");
    if (nextLesson) {
      setScreen("lesson");
      setSelectedOption(null);
      setChecked(false);
    }
  };

  const renderMap = () => (
    <div className="screen-card">
      <div className="header-bar">
        <div>
          <div className="header-title">LEX MOSCUA</div>
          <div style={{ color: "var(--text-secondary)", marginTop: "6px" }}>Выбирай урок</div>
        </div>
        <div className="header-badge">серия: 5</div>
      </div>
      <div className="map-wrapper">
        <div className="path-column">
          <span className="path-spine" aria-hidden />
          {demoNodes.map((node, index) => {
            const offsetClass = offsets[index % offsets.length] ?? "branch-offset-center";
            const isLocked = node.kind === "lesson" && node.state === "locked";
            const buttonClasses = ["lesson-node", node.kind, node.state].join(" ");
            const wrapperClasses = ["node-wrapper", offsetClass].join(" ");

            return (
              <div key={node.id} className={wrapperClasses}>
                <button
                  type="button"
                  className={buttonClasses}
                  onClick={() => handleNodeClick(node)}
                  disabled={isLocked}
                  aria-label={`${node.label}. Статус: ${node.state}`}
                >
                  <span className="lesson-ring" aria-hidden />
                  <span className="icon-wrapper">
                    <NodeIcon node={node} />
                  </span>
                  <span className="lesson-label">{node.label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderMaterial = () => (
    <div className="screen-card">
      <div className="badge">Материал к уроку</div>
      <div>
        <h1 className="header-title" style={{ marginBottom: "12px" }}>
          Понятие права
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "720px" }}>
          Право — это система общеобязательных норм, установленных или санкционированных государством
          и обеспеченных возможностью государственного принуждения. Оно определяет рамки поведения,
          защищает свободы граждан и обеспечивает справедливость. Материал служит введением к ключевым
          понятиям для дальнейшего изучения.
        </p>
      </div>
      <div className="footer-actions">
        <button className="button" onClick={handleGoToLesson}>
          Перейти к уроку
        </button>
        <button className="button secondary" onClick={() => setScreen("map")}>К карте</button>
      </div>
    </div>
  );

  const renderLesson = () => (
    <div className="screen-card">
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <span className="badge">
          <BookIcon /> Понятие права
        </span>
        <span className="badge red">MCQ</span>
      </div>
      <div>
        <h1 className="header-title" style={{ marginBottom: "12px" }}>
          Проверка знаний
        </h1>
        <div className="card-panel">
          <strong style={{ display: "block", marginBottom: "12px", color: "var(--text-primary)" }}>
            {question.title}
          </strong>
          <div className="lesson-options">
            {question.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isCorrect = checked && option.id === question.correctOptionId;
              const isIncorrect = checked && isSelected && option.id !== question.correctOptionId;

              const borderColor = isCorrect
                ? "rgba(34, 197, 94, 0.65)"
                : isIncorrect
                ? "rgba(225, 29, 46, 0.65)"
                : isSelected
                ? "rgba(96, 165, 250, 0.65)"
                : "rgba(255, 255, 255, 0.08)";

              return (
                <button
                  key={option.id}
                  type="button"
                  className="option-button"
                  style={{ borderColor }}
                  onClick={() => {
                    setSelectedOption(option.id);
                    if (checked) {
                      setChecked(false);
                    }
                  }}
                >
                  <span>{option.label}</span>
                  {isCorrect && <span style={{ color: "var(--accent-green)", fontWeight: 600 }}>Верно</span>}
                  {isIncorrect && <span style={{ color: "var(--brand-red)", fontWeight: 600 }}>Неверно</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="footer-actions">
        <button
          className="button secondary"
          onClick={() => {
            if (selectedOption) {
              setChecked(true);
            }
          }}
        >
          Проверить
        </button>
        <button
          className="button"
          onClick={() => {
            setScreen("map");
            setSelectedOption(null);
            setChecked(false);
          }}
        >
          Завершить
        </button>
      </div>
    </div>
  );

  return (
    <main className="page-shell">
      <section className="lex-card">
        {screen === "map" && renderMap()}
        {screen === "material" && renderMaterial()}
        {screen === "lesson" && renderLesson()}
      </section>
    </main>
  );
}
