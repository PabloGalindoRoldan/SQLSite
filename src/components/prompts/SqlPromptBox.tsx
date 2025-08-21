import { useState } from "react";
import { RotateCw } from "lucide-react";

export default function SqlPromptBox({ selectedDb }: { selectedDb: string }) {
  const sqlPrompts: Record<string, string[]> = {
    Sakila: [
      "(EXAMEN) Mostrar un listado de títulos de films y nombres completos de los actores que participan en el film para aquellos films en inglés almacenados en el almacen 1 (store_id = 1). El listado deberá estar ordenado por título del film y luego por apellido (last_name) y nombre (first_name) del actor (todos ascendentes).",
      "(EXAMEN) Mostrar los nombres de las categorías que tengan más de 20 films.",
      "(EXAMEN) Mostrar título del film y cuántos actores actúan en él de cada film de categoría 'Action'.",
      "(EXAMEN) Muestre los títulos, descripción y categoría de los films en los que no participa la actriz SANDRA KILMER.",
      "(FÁCIL) Mostrar todos los títulos de películas.",
      "(FÁCIL) Listar todos los actores con sus nombres y apellidos.",
      "(FÁCIL) Contar cuántos films hay en total.",
      "(FÁCIL) Mostrar los nombres de todas las categorías.",
      "(FÁCIL) Mostrar todos los clientes activos.",
      "(FÁCIL) Listar los idiomas disponibles.",
      "(FÁCIL) Mostrar los títulos de las películas con duración menor a 60 minutos.",
      "(FÁCIL) Listar todas las ciudades registradas.",
      "(FÁCIL) Mostrar los nombres de todos los países.",
      "(FÁCIL) Mostrar los nombres de todas las tiendas con su ID.",
      "(INTERMEDIO) Mostrar cuántas películas hay por categoría.",
      "(INTERMEDIO) Listar el nombre de cada cliente junto con la cantidad de rentas que realizó.",
      "(INTERMEDIO) Mostrar las películas y el idioma en el que están grabadas.",
      "(INTERMEDIO) Listar los actores que aparecen en más de 20 películas.",
      "(INTERMEDIO) Mostrar el nombre y apellido de los empleados junto con la tienda en la que trabajan.",
      "(INTERMEDIO) Listar los clientes junto con la cantidad total que han pagado.",
      "(INTERMEDIO) Mostrar las películas con más de 3 actores.",
      "(INTERMEDIO) Mostrar todas las rentas junto con el nombre del cliente que las realizó.",
      "(INTERMEDIO) Listar las películas y las categorías a las que pertenecen.",
      "(INTERMEDIO) Mostrar las películas alquiladas más de 30 veces.",
      "(DIFÍCIL) Listar las 5 películas más rentadas junto con la cantidad de rentas.",
      "(DIFÍCIL) Mostrar el top 5 de clientes que más dinero gastaron en rentas.",
      "(DIFÍCIL) Mostrar las películas que no han sido alquiladas nunca.",
      "(DIFÍCIL) Listar los actores que actuaron en películas de la categoría 'Comedy' y 'Action'.",
      "(DIFÍCIL) Mostrar las películas rentadas en la tienda 1 que nunca se devolvieron.",
      "(DIFÍCIL) Mostrar los ingresos totales de cada tienda.",
      "(DIFÍCIL) Listar el promedio de duración de películas por categoría.",
      "(DIFÍCIL) Mostrar los 3 actores que más veces aparecen en películas alquiladas.",
      "(DIFÍCIL) Encontrar los clientes que alquilaron todas las películas de la categoría 'Horror'.",
      "(DIFÍCIL) Mostrar los países en los que más clientes realizaron rentas.",
    ],
    World: [
      "(FÁCIL) Mostrar todos los países.",
      "(FÁCIL) Mostrar todas las ciudades de Argentina.",
      "(FÁCIL) Mostrar los idiomas oficiales de México.",
      "(FÁCIL) Mostrar los países del continente 'South America'.",
      "(FÁCIL) Contar cuántos países hay en la tabla.",
      "(FÁCIL) Listar las ciudades con población mayor a 1 millón.",
      "(FÁCIL) Mostrar el país con mayor población.",
      "(FÁCIL) Mostrar los países de Europa ordenados por nombre.",
      "(FÁCIL) Mostrar las ciudades de Brasil.",
      "(FÁCIL) Listar todos los continentes distintos.",
      "(INTERMEDIO) Mostrar los 10 países con mayor superficie.",
      "(INTERMEDIO) Listar los países junto con el número de ciudades que tienen registradas.",
      "(INTERMEDIO) Mostrar el promedio de población por continente.",
      "(INTERMEDIO) Listar los idiomas hablados en más de 5 países.",
      "(INTERMEDIO) Mostrar el país con mayor esperanza de vida.",
      "(INTERMEDIO) Mostrar el total de población por región.",
      "(INTERMEDIO) Listar los países cuya independencia fue después de 1950.",
      "(INTERMEDIO) Mostrar los países de Asia con población mayor a 50 millones.",
      "(INTERMEDIO) Mostrar las 5 ciudades más pobladas del mundo.",
      "(INTERMEDIO) Listar el idioma más hablado por continente (en porcentaje).",
      "(DIFÍCIL) Encontrar los países con más de 3 idiomas oficiales.",
      "(DIFÍCIL) Mostrar el top 10 de países con mayor densidad poblacional (población/superficie).",
      "(DIFÍCIL) Mostrar el idioma más hablado del mundo (por porcentaje total).",
      "(DIFÍCIL) Encontrar los continentes con más de 500 millones de habitantes.",
      "(DIFÍCIL) Mostrar las ciudades capitales con mayor población.",
      "(DIFÍCIL) Encontrar los países donde la expectativa de vida es menor a 50 años.",
      "(DIFÍCIL) Mostrar la suma del GNP de todos los países de Europa.",
      "(DIFÍCIL) Listar los países que no tienen idiomas oficiales.",
      "(DIFÍCIL) Mostrar los países con más de 100 millones de habitantes y menos de 500.000 km² de superficie.",
      "(DIFÍCIL) Mostrar las ciudades cuya población es más del 20% de la población de su país.",
    ],
    Film: [
      "(FÁCIL) Listar todos los films.",
      "(FÁCIL) Mostrar los nombres de todos los actores.",
      "(FÁCIL) Mostrar todas las categorías de películas.",
      "(FÁCIL) Listar todos los films con su duración.",
      "(FÁCIL) Contar el número total de películas.",
      "(FÁCIL) Mostrar las películas con duración mayor a 120 minutos.",
      "(FÁCIL) Mostrar los films ordenados por título.",
      "(FÁCIL) Listar los idiomas disponibles.",
      "(FÁCIL) Mostrar todos los actores cuyo apellido empiece con 'A'.",
      "(FÁCIL) Mostrar los films y el ID de inventario correspondiente.",
      "(INTERMEDIO) Contar cuántos films hay por categoría.",
      "(INTERMEDIO) Listar los actores junto con las películas en las que participaron.",
      "(INTERMEDIO) Mostrar las películas y el idioma en que fueron filmadas.",
      "(INTERMEDIO) Mostrar las categorías que tienen más de 5 películas.",
      "(INTERMEDIO) Listar los actores que actuaron en más de 10 films.",
      "(INTERMEDIO) Mostrar las películas con más de 2 categorías.",
      "(INTERMEDIO) Mostrar los films cuya duración es mayor al promedio.",
      "(INTERMEDIO) Listar los actores que trabajaron en al menos un film de categoría 'Drama'.",
      "(INTERMEDIO) Mostrar las películas junto con las tiendas en las que están disponibles.",
      "(INTERMEDIO) Mostrar los films con títulos que contienen la palabra 'Love'.",
      "(DIFÍCIL) Mostrar las 5 películas con mayor cantidad de actores.",
      "(DIFÍCIL) Listar los actores que trabajaron juntos en al menos 3 films.",
      "(DIFÍCIL) Mostrar los films que no pertenecen a ninguna categoría.",
      "(DIFÍCIL) Mostrar las películas que aparecen en todas las tiendas.",
      "(DIFÍCIL) Listar las películas más largas de cada idioma.",
      "(DIFÍCIL) Mostrar las películas que tienen actores con el mismo apellido.",
      "(DIFÍCIL) Encontrar la categoría con mayor número de films.",
      "(DIFÍCIL) Mostrar las películas que comparten exactamente el mismo elenco de actores.",
      "(DIFÍCIL) Mostrar los 5 actores más frecuentes en películas del año 2006.",
      "(DIFÍCIL) Listar las películas cuya duración es superior a la de todas las películas de categoría 'Comedy'.",
    ],
  };

  const prompts = sqlPrompts[selectedDb] ?? [];

  // Utility to get a random prompt
  const getRandomPrompt = (exclude?: string): string | null => {
    if (prompts.length === 0) return null;

    // If only one prompt, just return it
    if (prompts.length === 1) return prompts[0];

    let newPrompt: string;
    do {
      newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    } while (newPrompt === exclude);

    return newPrompt;
  };

  const [currentPrompt, setCurrentPrompt] = useState<string | null>(
    getRandomPrompt()
  );

  const refreshPrompt = () => {
    const newPrompt = getRandomPrompt(currentPrompt ?? undefined);
    if (newPrompt) setCurrentPrompt(newPrompt);
  };

  return (
    <div className="relative text-gray-600 mb-4">
      <div className="flex items-start justify-between">
        {/* Espaciador izquierdo con el mismo ancho que el botón */}
        <div className="flex-shrink-0 w-6"></div>

        {/* Texto centrado */}
        <p className="text-sm text-center flex-1 px-2">
          {currentPrompt ?? "No hay prompts disponibles"}
        </p>

        {/* Botón de refrescar */}
        <div className="flex-shrink-0 w-6">
          <button
            onClick={refreshPrompt}
            className="p-1 rounded-md hover:bg-gray-200 transition w-full"
            title="Nuevo Problema"
          >
            <RotateCw className="h-4 w-4 text-gray-600 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
