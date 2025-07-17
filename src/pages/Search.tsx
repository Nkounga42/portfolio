import { Search } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../hooks/useTheme";

import bgDark from "../assets/bg-dark.png";
import bgLight from "../assets/bg-light.png";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const { theme } = useTheme();

  const backgroundImage = theme === "dark" ? bgDark : bgLight;
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Résultats simulés
    setResults([
      `Résultat pour "${query}" - lien 1`,
      `Résultat pour "${query}" - lien 2`,
      `Résultat pour "${query}" - lien 3`,
    ]);
  };

  return (
    <div
      className="min-h-[70vh] bg-base-100 flex flex-col items-center justify-start pt-24 px-4" 
    >
      {/* Logo */}
      <h1 className="text-5xl font-bold text-content-base mb-8">Recherche</h1>

      {/* Champ de recherche */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-xl flex items-center justify-between border border-base-content/10 rounded-full pl-4 p-2 shadow-md bg-base-200"
      >
        <input
          type="text"
          placeholder="Rechercher"
          className="flex-1 bg-transparent outline-none text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary btn-circle ml-2"
        >
          <Search size={16} />
        </button>
      </form>

      {/* Résultats */}
      {results.length > 0 && (
        <div className="mt-10 w-full max-w-2xl space-y-4">
          {results.map((res, idx) => (
            <div
              key={idx}
              className="p-4 bg-base-200 rounded-xl hover:bg-base-300 transition"
            >
              <a href="#" className="text-blue-500 hover:underline">
                {res}
              </a>
              <p className="text-sm text-base-content/60">
                Extrait fictif correspondant à la recherche.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
