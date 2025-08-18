import React from "react";

export default function QueryEditor({ query, setQuery, onRunQuery }) {
    return (
        <div className="w-full border rounded-md p-3 bg-white shadow-sm flex flex-col">
            <textarea
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                placeholder="Aca va el Query de SQL..."
                className="flex-1 p2 font-mono text-sm text-black border rounded-md mb-2"
            />
            <button
                onClick={onRunQuery}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Manda el Query
            </button>
        </div>
    );
}
