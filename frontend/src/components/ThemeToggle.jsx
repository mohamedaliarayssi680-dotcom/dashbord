import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-9 w-16 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
    >
      <span className="absolute left-2 text-sm">🌞</span>
      <span className="absolute right-2 text-sm">🌙</span>
      <span
        className={`absolute h-7 w-7 rounded-full bg-white dark:bg-gray-900 shadow transform transition-transform duration-300
          ${isDark ? "translate-x-7" : "translate-x-1"}`}
      />
    </button>
  );
}
