import React from "react";

export default function DatabaseViex({ schema }){
    return(
        <div className="w-full border rounded-md p-3 bg-white shadow-sm">
            <h2 className="font-bold mb-2">Diagrama de la Base de Datos</h2>
            <pre className="text-sm text-gray-700 font-mono whitespace-pre-wrap">{JSON.stringify(schema, null, 2)}</pre>
        </div>
    )
}