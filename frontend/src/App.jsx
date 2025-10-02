import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import ClientPage from "./pages/ClientPage";
import MecanicienPage from "./pages/MecanicienPage";
import ReparationPage from "./pages/ReparationPage";
import VehiculePage from "./pages/VehiculePage";
import HomePage from "./pages/HomePage";
import ReportingPage from "./pages/ReportingPage";

function App() {
  // 🔹 état du thème
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // 🔹 appliquer la classe dark sur <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div
      className="flex h-screen overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#111827" : "#f9fafb",
        color: isDark ? "#f9fafb" : "#111827",
      }}
    >
      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            isDark
              ? "from-gray-900 via-gray-800 to-gray-900"
              : "from-gray-200 via-gray-100 to-gray-200"
          } opacity-80`}
        />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header avec toggle */}
        <Header title="Mon App" theme={theme} setTheme={setTheme} />

        {/* Routes */}
        <main className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/mecanicien" element={<MecanicienPage />} />
            <Route path="/reparation" element={<ReparationPage />} />
            <Route path="/vehicule" element={<VehiculePage />} />
            <Route path="/reporting" element={<ReportingPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
