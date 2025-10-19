import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="lex-card" style={{ textAlign: "center" }}>
        <h1 className="header-title">LEX MOSCUA</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
          Мини-приложение с путём уроков. Перейдите к карте, чтобы начать обучение.
        </p>
        <Link href="/lex" className="button">
          Открыть карту
        </Link>
      </div>
    </main>
  );
}
