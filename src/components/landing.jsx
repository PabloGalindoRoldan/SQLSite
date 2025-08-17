export default function LandingPage() {
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
      <section className="bg-white rounded-2xl shadow p-4 mb-6">
        <h2 className="text-lg text-gray-700 font-semibold mb-2">
          Database Schema
        </h2>
        <pre className="text-sm text-gray-700">
          {`films(id, title, year, director_id)
directors(id, name, birth_year)`}
        </pre>
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
            placeholder="Aca va el query de SQL..."
            className="flex-1 border border-gray-300 rounded-md p-2 font-mono text-sm text-black placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />

          <button className="mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Manda el Query
          </button>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
          <h2 className="text-lg text-gray-700 font-semibold mb-2">Consola</h2>
          <div className="flex-1 overflow-auto border-none rounded-md p-2 bg-gray-150 font-mono text-sm text-gray-600">
            Aca aparecen los resultados...
          </div>
          <div className="mt-3 text-red-600 font-mono text-sm">
            Aca te llegan los errores...
          </div>
        </div>
      </div>
    </div>
  );
}
