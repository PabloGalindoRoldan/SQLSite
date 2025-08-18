import React, { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import FilmSeedSQL from "./seeds/FilmSeedSQL";
import SqlPromptBox from "./prompts/SqlPromptBox";

export default function LandingPage() {
  const [db, setDb] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Cargar la BDD cuando se inicializa el sitio
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

  // Ejecutar el Query al hacer click
  const runQuery = () => {
    if (!db) return;
    try {
      const res = db.exec(query); // devuelve un array de conjuntos de resultados
      setError(null);
      setResults(res.length > 0 ? res[0] : null); // null si no hay resultados
    } catch (err) {
      setResults(null);
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido");
    }
  };

  return (
    <div className="min-h-screen bg-black-50 p-6">
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

      {/* Esquema de la Base de Datos */}
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

      {/* Área principal de trabajo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel izquierdo */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col relative">
          {/* Encabezado con botón de refrescar */}
          <div className="mb-2 relative">
            <h2 className="text-lg text-gray-700 font-semibold text-center">
              Problema
            </h2>
          </div>

          {/* Componente de prompt */}
          <SqlPromptBox />

          {/* Entrada de consulta */}
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
