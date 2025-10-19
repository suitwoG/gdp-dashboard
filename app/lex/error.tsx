"use client";

import Link from "next/link";

export default function LexError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page-shell">
      <div className="lex-card" style={{ textAlign: "center" }}>
        <h1 className="header-title">Ошибка раздела LEX</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
          {error.message || "Не получилось загрузить карту."}
        </p>
        <div className="footer-actions" style={{ justifyContent: "center" }}>
          <button className="button" onClick={reset}>
            Повторить
          </button>
          <Link href="/" className="button secondary">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
