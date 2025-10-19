"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body className="page-shell">
        <div className="lex-card" style={{ textAlign: "center" }}>
          <h1 className="header-title">Что-то пошло не так</h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
            {error.message || "Попробуйте обновить страницу."}
          </p>
          <div className="footer-actions" style={{ justifyContent: "center" }}>
            <button className="button" onClick={reset}>
              Попробовать снова
            </button>
            <Link href="/" className="button secondary">
              На главную
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
