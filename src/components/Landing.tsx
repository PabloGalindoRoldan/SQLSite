import React, { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import FilmSeedSQL from "./seeds/FilmSeedSQL";
import WorldSeedSql from "./seeds/WorldSeedSql";
import SakilaSeedSQL from "./seeds/SakilaSeedSQL";
import SqlPromptBox from "./prompts/SqlPromptBox";
import { sqlPrompts, PromptItem } from "./prompts/SqlPrompts";
import runSeed from "./seeds/RunSeed";
import DatabaseSelector from "./DatabaseSelector";
import Confetti from "react-confetti";

export default function LandingPage() {
  const [db, setDb] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDb, setSelectedDb] = useState("World");
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeConfetti, setFadeConfetti] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState<PromptItem | null>(null);
  const [status, setStatus] = useState<"success" | "error" | "neutral">(
    "neutral"
  );

  // Cargar la BDD y prompt inicial
  useEffect(() => {
    const loadDb = async () => {
      const SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      });
      const database = new SQL.Database();
      if (selectedDb === "World") await runSeed(database, WorldSeedSql);
      else if (selectedDb === "Film") await runSeed(database, FilmSeedSQL);
      else if (selectedDb === "Sakila") await runSeed(database, SakilaSeedSQL);
      setDb(database);

      const prompts = sqlPrompts[selectedDb] ?? [];
      setCurrentPrompt(prompts.length > 0 ? prompts[0] : null);
    };
    loadDb();
  }, [selectedDb]);

  // Validación del query
  const validateAnswer = (userQuery: string, promptItem: PromptItem | null) => {
    if (!promptItem) return false;
    for (const pattern of promptItem.expected) {
      if (typeof pattern === "string") {
        if (!userQuery.toLowerCase().includes(pattern.toLowerCase()))
          return false;
      } else if (!pattern.test(userQuery)) return false;
    }
    return true;
  };

  // Ejecutar query
  const runQuery = () => {
    if (!db) return;

    try {
      const res = db.exec(query);
      setResults(res.length > 0 ? res[0] : null);

      if (!currentPrompt) {
        setError("No hay un prompt seleccionado.");
        setShowConfetti(false);
        setStatus("error");
        return;
      }

      const isValid = validateAnswer(query, currentPrompt);
      if (isValid) {
        setShowConfetti(true);
        setFadeConfetti(false);
        setError(null);
        setStatus("success");

        // Inicia fade out 8s después
        setTimeout(() => setFadeConfetti(true), 8000);
        // Eliminar confetti después del fade
        setTimeout(() => setShowConfetti(false), 9000);

        setTimeout(() => setStatus("neutral"), 8000);
      } else {
        setShowConfetti(false);
        setError("Tu consulta no cumple con los requisitos del prompt.");
        setStatus("error");
        setTimeout(() => setStatus("neutral"), 9000);
      }
    } catch (err) {
      setResults(null);
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido");
      setShowConfetti(false);
      setStatus("error");
      setTimeout(() => setStatus("neutral"), 9000);
    }
  };

  return (
    <div className="min-h-screen bg-black-50 p-6 relative overflow-hidden">
      {/* Confetti con fade out */}
      {showConfetti && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            transition: "opacity 1s ease-in-out",
            opacity: fadeConfetti ? 0 : 1,
          }}
        >
          <Confetti />
        </div>
      )}

      {/* Encabezado */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">SQLSite</h1>
        <p className="text-gray-600">
          A ver si estudiamos para el{" "}
          <a
            className="hover:text-orange-500"
            href="https://docs.google.com/document/d/1CNiyND1OtaTER7AgvOCYiBmClQGCjCp-Ed2W9JGBn5Y/edit?usp=sharing"
          >
            parcial
          </a>{" "}
          de esta manera...
        </p>
      </header>

      {/* Selector de DB */}
      <section className="bg-white rounded-2xl shadow p-4 mb-6">
        <DatabaseSelector
          setDb={setDb}
          selectedDb={selectedDb}
          setSelectedDb={setSelectedDb}
        />
      </section>

      {/* Área principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel izquierdo */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col relative">
          <h2 className="text-lg text-gray-700 font-semibold text-center mb-2">
            Problema
          </h2>

          <SqlPromptBox
            selectedDb={selectedDb}
            currentPrompt={currentPrompt}
            setCurrentPrompt={setCurrentPrompt}
          />

          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Aca va el query de SQL..."
            className="flex-1 border border-gray-300 rounded-md p-2 font-mono text-sm text-black placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />

          <button
            onClick={runQuery}
            className="mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Manda el Query
          </button>
        </div>

        {/* Panel derecho */}
        <div
          className="bg-white rounded-2xl shadow p-4 flex flex-col max-h-[100vh]"
          style={{
            boxShadow:
              status === "success"
                ? "0 0 10px 2px rgba(34,197,94,0.7), 0 0 20px 5px rgba(34,197,94,0.5)"
                : status === "error"
                ? "0 0 10px 2px rgba(239,68,68,0.7), 0 0 20px 5px rgba(239,68,68,0.5)"
                : "none",
            transition: "box-shadow 1.0s ease-in-out",
          }}
        >
          <h2 className="text-lg text-gray-700 font-semibold mb-2">Consola</h2>
          <div className="flex-1 overflow-auto border-none rounded-md p-2 font-mono text-sm text-gray-600 transition-shadow duration-500">
            {results ? (
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr>
                    {results.columns.map((col: string, i: number) => (
                      <th
                        key={i}
                        className="border px-2 py-1 text-left font-bold"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.values.map((row: any[], i: number) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className="border px-2 py-1">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-gray-500 italic text-center py-8">
                Aca aparecen los resultados...
              </div>
            )}
          </div>

          <div className="mt-3 text-red-600 font-mono text-sm">
            {error && `Error: ${error}`}
          </div>
        </div>
      </div>
    </div>
  );
}
