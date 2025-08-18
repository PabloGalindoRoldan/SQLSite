import React, { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import FilmSeedSQL from "./seeds/FilmSeedSQL";

export default function LandingPage() {
  const [db, setDb] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null); // store a single result set
  const [error, setError] = useState<string | null>(null);

  // Load DB on mount
  useEffect(() => {
    const loadDb = async () => {
      const SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      });
      const database = new SQL.Database();

      database.run(FilmSeedSQL);

      setDb(database);
    };
    loadDb();
  }, []);

  // Run query on button click
  const runQuery = () => {
    if (!db) return;
    try {
      const res = db.exec(query); // returns array of result sets
      setError(null);
      setResults(res.length > 0 ? res[0] : null); // null if no results
    } catch (err) {
      setResults(null);
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    }
  };

  return (
    <div className="min-h-screen bg-black-50 p-6">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">SQLSite</h1>
        <p className="text-gray-600">
          Aver si estudiamos para el parcial de esta manera...
        </p>
      </header>

      {/* Database Schema */}
      <section className="bg-white rounded-2xl shadow p-4 mb-6 flex justify-center">
        <div className="max-w-full overflow-x-auto">
          <h2 className="text-lg text-gray-700 font-semibold mb-2 text-center">
            Esquema de la Base de Datos
          </h2>
          <pre className="text-sm text-gray-700 text-left whitespace-pre">
            {`actor         = (actor_id, first_name, last_name)
film          = (film_id, title, description, release_year, language_id, length)
film_actor    = (actor_id, film_id)
film_category = (film_id, category_id)
inventory     = (inventory_id, film_id, store_id)
language      = (language_id, name)
store         = (store_id, manager_staff_id, address_id)
category      = (category_id, name)`}
          </pre>
        </div>
      </section>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
          <h2 className="text-lg text-gray-700 font-semibold mb-2">Problema</h2>
          <p className="text-gray-600 mb-4">
            Example: Select all films released after the year 2000.
          </p>

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

        {/* Right Panel */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
          <h2 className="text-lg text-gray-700 font-semibold mb-2">Consola</h2>
          <div className="flex-1 overflow-auto border-none rounded-md p-2 font-mono text-sm text-gray-600">
            {results ? (
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr>
                    {results.columns.map((col, i) => (
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
                  {results.values.map((row, i) => (
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
