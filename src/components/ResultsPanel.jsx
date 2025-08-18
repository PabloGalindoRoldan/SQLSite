import React from "react";

export default function ResultsPanel({ results }) {
  if (!results) {
    return (
      <div className="flex-1 p-3 text-gray-500 bg-gray-50 rounded-md">
        No results yet...
      </div>
    );
  }

  const { columns, values } = results[0]; // sql.js returns this structure

  return (
    <div className="overflow-auto border rounded-md p-3 bg-gray-50 shadow-sm">
      <table className="table-auto border-collapse w-full text-sm">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="border px-2 py-1 bg-gray-200">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((row, i) => (
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
    </div>
  );
}