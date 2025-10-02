const Header = ({ title, logoUrl, theme, setTheme }) => {
  const isDark = theme === "dark";

  return (
    <header className="relative bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
      {/* Titre (à gauche) */}
      <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>

      <div className="flex items-center space-x-4">
        {/* 🔹 Bouton Toggle */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        >
          {isDark ? "🌞 Clair" : "🌙 Sombre"}
        </button>

        {/* Logo (à droite) */}
        {logoUrl && (
          <img src={logoUrl} alt="Logo" className="w-13 h-16 rounded-full" />
        )}
      </div>
    </header>
  );
};

export default Header;
