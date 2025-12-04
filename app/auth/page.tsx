"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "lex-auth-user";

type StoredUser = {
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

type Mode = "login" | "register";

const inputClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [storedUser, setStoredUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as StoredUser;
        setStoredUser(parsed);
        setStatus(`Signed in as ${parsed.name}`);
      } catch (err) {
        console.error("Failed to parse stored user", err);
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const heading = useMemo(() => (mode === "register" ? "Create your account" : "Welcome back"), [mode]);

  const resetMessages = () => {
    setMessage(null);
    setError(null);
  };

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    resetMessages();

    if (!name.trim()) {
      setError("Введите имя, чтобы персонализировать ваш профиль.");
      return;
    }
    if (!email.trim()) {
      setError("Введите e-mail, чтобы продолжить.");
      return;
    }
    if (password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов.");
      return;
    }

    const user: StoredUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
    };

    setStoredUser(user);
    setStatus(`Signed in as ${user.name}`);
    setMessage("Регистрация завершена! Теперь вы можете входить с этими данными.");

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    resetMessages();

    if (!storedUser) {
      setError("Сначала зарегистрируйтесь — локальный аккаунт пока не создан.");
      return;
    }

    if (email.trim().toLowerCase() !== storedUser.email || password !== storedUser.password) {
      setError("Неверный e-mail или пароль. Попробуйте снова.");
      return;
    }

    setStatus(`Signed in as ${storedUser.name}`);
    setMessage("Вы успешно вошли. Приятного обучения!");
  };

  const handleSignOut = () => {
    resetMessages();
    setStatus(null);
    setStoredUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const onSubmit = mode === "register" ? handleRegister : handleLogin;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Lex Moscua</p>
          <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
          <p className="text-slate-600">Локальная авторизация без сервера — данные хранятся в вашем браузере.</p>
        </div>
        <div className="hidden md:flex items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-semibold">
            {storedUser?.name?.[0]?.toUpperCase() || "L"}
          </span>
          <div className="leading-tight">
            <div className="font-semibold text-slate-900">{storedUser?.name || "Гость"}</div>
            <div className="text-slate-500">{storedUser?.email || "Нет сохранённого входа"}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetMessages();
                setMode("register");
              }}
              className={`${
                mode === "register"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-slate-700 border border-slate-200"
              } inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition`}
            >
              Регистрация
            </button>
            <button
              onClick={() => {
                resetMessages();
                setMode("login");
              }}
              className={`${
                mode === "login"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-slate-700 border border-slate-200"
              } inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition`}
            >
              Вход
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Имя</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClassName}
                  placeholder="Введите имя"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClassName}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClassName}
                placeholder="••••••"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition"
            >
              {mode === "register" ? "Создать аккаунт" : "Войти"}
            </button>

            <p className="text-xs text-slate-500 text-center">
              Никаких запросов на сервер — данные сохраняются в localStorage вашего браузера.
            </p>
          </form>

          {message && <div className="rounded-xl bg-emerald-50 text-emerald-700 px-4 py-3 text-sm">{message}</div>}
          {error && <div className="rounded-xl bg-rose-50 text-rose-700 px-4 py-3 text-sm">{error}</div>}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Состояние</p>
          <h2 className="text-xl font-semibold text-slate-900">Быстро проверить подключение</h2>
          <p className="text-sm text-slate-600">
            Регистрация и вход работают локально. Это значит, что сброс кеша браузера удалит учётную запись.
            Если вам нужен полноценный бэкенд, подключите API и замените эту форму на реальные запросы.
          </p>

          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
            {status || "Вы ещё не вошли"}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition"
            >
              Перейти к курсам
            </Link>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              type="button"
            >
              Выйти и очистить данные
            </button>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Подсказки</p>
            <ul className="list-disc pl-4 text-sm text-slate-600 space-y-1">
              <li>Используйте тот же e-mail и пароль, что указали при регистрации.</li>
              <li>Если форма снова просит регистрацию, значит localStorage был очищен.</li>
              <li>Нажмите "Выйти", чтобы удалить текущие локальные данные и начать сначала.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
