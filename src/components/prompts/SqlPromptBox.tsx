import { useState } from "react";
import { RotateCw } from "lucide-react"; // icon

export default function SqlPromptBox() {
  const prompts = [
    "(EXAMEN) Mostrar  un listado de títulos de films y nombres completos de los actores que participan en el film para aquellos films en ingles almacenados en el almacen 1 (store_id = 1). El listado deberá estar ordenado por título del film y luego por  apellido (last_name) y nombre (first_name) del actor (todos  ascendentes)",
    "(EXAMEN) Mostrar los nombres de las categorías que tengan más de 20 films.",
    "(EXAMEN) Mostrar  título del film y cuantos  actores actúan en él de cada film de categoría 'Action'.",
    "(EXAMEN) Muestre los títulos, descripción y categoría de los films en los que no participa la actriz SANDRA KILMER.",
    "(FACIL) Contar el número de films por categoría.",
    "(FACIL) Obtener el conteo de inventario por tienda.",
    "(FACIL) Mostrar todos los films que duren más de 2 horas.",
    "(FACIL) Listar todos los films y sus idiomas.",
    "(FACIL) Encontrar todos los actores que actuaron en 'Inception'.",
    "(FACIL) Obtener todas las categorías disponibles en la base de datos.",
    "(FACIL) Listar todas las tiendas con sus IDs y direcciones.",
    "(FACIL) Encontrar films dirigidos por Christopher Nolan."
  ];

  const [currentPrompt, setCurrentPrompt] = useState(
    prompts[Math.floor(Math.random() * prompts.length)]
  );

  const refreshPrompt = () => {
    let newPrompt;
    do {
      newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    } while (newPrompt === currentPrompt);
    setCurrentPrompt(newPrompt);
  };

  return (
    <div className="relative text-gray-600 mb-4">
      <div className="flex items-start justify-between">
        {/* Left spacer with same width as the button */}
        <div className="flex-shrink-0 w-6"></div>

        {/* Centered text */}
        <p className="text-sm text-center flex-1 px-2">
          {currentPrompt}
        </p>

        {/* Refresh button */}
        <div className="flex-shrink-0 w-6">
          <button
            onClick={refreshPrompt}
            className="p-1 rounded-md hover:bg-gray-200 transition w-full"
            title="New Problem"
          >
            <RotateCw className="h-4 w-4 text-gray-600 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}