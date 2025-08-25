export type PromptItem = {
  prompt: string;
  expected: (string | RegExp)[];
};

export const sqlPrompts: Record<string, PromptItem[]> = {
  Sakila: [
    {
      prompt:
        "(EXAMEN) Mostrar un listado de títulos de films y nombres completos de los actores...",
      expected: [
        /SELECT/i,
        /FROM\s+film/i,
        /JOIN\s+film_actor/i,
        /JOIN\s+actor/i,  
      ],
    },
    {
      prompt:
        "(EXAMEN) Mostrar los nombres de las categorías que tengan más de 20 films.",
      expected: [
        /SELECT/i,
        /FROM\s+category/i,
        /JOIN\s+film_category/i,
        /GROUP BY/i,
        /HAVING/i,
        />\s*20/,
      ],
    },
    {
      prompt:
        "(EXAMEN) Mostrar título del film y cuántos actores actúan en él de cada film de categoría 'Action'.",
      expected: [
        /SELECT/i,
        /FROM\s+film/i,
        /JOIN\s+film_actor/i,
        /JOIN\s+category/i,
        /Action/i,
        /COUNT/i,
        /GROUP BY/i,
      ],
    },
    {
      prompt:
        "(EXAMEN) Muestre los títulos, descripción y categoría de los films en los que no participa la actriz SANDRA KILMER.",
      expected: [
        /SELECT/i,
        /FROM\s+film/i,
        /JOIN\s+category/i,
        /NOT IN/i,
        /SANDRA/i,
        /KILMER/i,
      ],
    },
    {
      prompt: "(FÁCIL) Mostrar todos los títulos de películas.",
      expected: [/SELECT/i, /title/i, /FROM\s+film/i],
    },
    {
      prompt: "(FÁCIL) Listar todos los actores con sus nombres y apellidos.",
      expected: [/SELECT/i, /first_name/i, /last_name/i, /FROM\s+actor/i],
    },
    {
      prompt: "(FÁCIL) Contar cuántos films hay en total.",
      expected: [/SELECT/i, /COUNT/i, /FROM\s+film/i],
    },
    {
      prompt: "(FÁCIL) Mostrar los nombres de todas las categorías.",
      expected: [/SELECT/i, /name/i, /FROM\s+category/i],
    },
    {
      prompt: "(FÁCIL) Mostrar todos los clientes activos.",
      expected: [/SELECT/i, /FROM\s+customer/i, /active/i],
    },
    {
      prompt: "(FÁCIL) Listar los idiomas disponibles.",
      expected: [/SELECT/i, /FROM\s+language/i],
    },
    {
      prompt:
        "(FÁCIL) Mostrar los títulos de las películas con duración menor a 60 minutos.",
      expected: [/SELECT/i, /title/i, /FROM\s+film/i, /WHERE/i, /length/i, /</],
    },
    {
      prompt: "(FÁCIL) Listar todas las ciudades registradas.",
      expected: [/SELECT/i, /FROM\s+city/i],
    },
    {
      prompt: "(FÁCIL) Mostrar los nombres de todos los países.",
      expected: [/SELECT/i, /FROM\s+country/i],
    },
    {
      prompt: "(FÁCIL) Mostrar los nombres de todas las tiendas con su ID.",
      expected: [/SELECT/i, /store_id/i, /FROM\s+store/i],
    },
    {
      prompt: "(INTERMEDIO) Mostrar cuántas películas hay por categoría.",
      expected: [
        /SELECT/i,
        /COUNT/i,
        /FROM\s+film_category/i,
        /JOIN\s+category/i,
        /GROUP BY/i,
      ],
    },
    {
      prompt:
        "(INTERMEDIO) Listar el nombre de cada cliente junto con la cantidad de rentas que realizó.",
      expected: [
        /SELECT/i,
        /FROM\s+customer/i,
        /JOIN\s+rental/i,
        /COUNT/i,
        /GROUP BY/i,
      ],
    },
    {
      prompt:
        "(INTERMEDIO) Mostrar las películas y el idioma en el que están grabadas.",
      expected: [/SELECT/i, /FROM\s+film/i, /JOIN\s+language/i],
    },
    {
      prompt:
        "(INTERMEDIO) Listar los actores que aparecen en más de 20 películas.",
      expected: [
        /SELECT/i,
        /actor/i,
        /JOIN\s+film_actor/i,
        /COUNT/i,
        /GROUP BY/i,
        /HAVING/i,
        />\s*20/,
      ],
    },
    {
      prompt:
        "(INTERMEDIO) Mostrar el nombre y apellido de los empleados junto con la tienda en la que trabajan.",
      expected: [/SELECT/i, /FROM\s+staff/i, /JOIN\s+store/i],
    },
    {
      prompt:
        "(INTERMEDIO) Listar los clientes junto con la cantidad total que han pagado.",
      expected: [/SELECT/i, /SUM/i, /payment/i, /GROUP BY/i],
    },
    {
      prompt: "(INTERMEDIO) Mostrar las películas con más de 3 actores.",
      expected: [/SELECT/i, /JOIN\s+film_actor/i, /COUNT/i, /HAVING/i, />\s*3/],
    },
    {
      prompt:
        "(INTERMEDIO) Mostrar todas las rentas junto con el nombre del cliente que las realizó.",
      expected: [/SELECT/i, /FROM\s+rental/i, /JOIN\s+customer/i],
    },
    {
      prompt:
        "(INTERMEDIO) Listar las películas y las categorías a las que pertenecen.",
      expected: [/SELECT/i, /FROM\s+film/i, /JOIN\s+category/i],
    },
    {
      prompt: "(INTERMEDIO) Mostrar las películas alquiladas más de 30 veces.",
      expected: [/SELECT/i, /JOIN\s+rental/i, /COUNT/i, /HAVING/i, />\s*30/],
    },
    {
      prompt:
        "(DIFÍCIL) Listar las 5 películas más rentadas junto con la cantidad de rentas.",
      expected: [
        /SELECT/i,
        /JOIN\s+rental/i,
        /COUNT/i,
        /GROUP BY/i,
        /ORDER BY/i,
        /LIMIT\s*5/,
      ],
    },
    {
      prompt:
        "(DIFÍCIL) Mostrar el top 5 de clientes que más dinero gastaron en rentas.",
      expected: [
        /SELECT/i,
        /SUM/i,
        /payment/i,
        /GROUP BY/i,
        /ORDER BY/i,
        /LIMIT\s*5/,
      ],
    },
    {
      prompt:
        "(DIFÍCIL) Mostrar las películas que no han sido alquiladas nunca.",
      expected: [
        /SELECT/i,
        /FROM\s+film/i,
        /(NOT\s+IN|LEFT\s+JOIN)/i,
        /rental/i,
      ],
    },
    {
      prompt:
        "(DIFÍCIL) Listar los actores que actuaron en películas de la categoría 'Comedy' y 'Action'.",
      expected: [/SELECT/i, /actor/i, /JOIN\s+category/i, /Comedy/i, /Action/i],
    },
    {
      prompt:
        "(DIFÍCIL) Mostrar las películas rentadas en la tienda 1 que nunca se devolvieron.",
      expected: [
        /SELECT/i,
        /FROM\s+rental/i,
        /store_id\s*=\s*1/i,
        /return_date/i,
        /IS NULL/i,
      ],
    },
    {
      prompt: "(DIFÍCIL) Mostrar los ingresos totales de cada tienda.",
      expected: [/SELECT/i, /SUM/i, /payment/i, /JOIN\s+store/i, /GROUP BY/i],
    },
    {
      prompt:
        "(DIFÍCIL) Listar el promedio de duración de películas por categoría.",
      expected: [/SELECT/i, /AVG/i, /length/i, /JOIN\s+category/i, /GROUP BY/i],
    },
    {
      prompt:
        "(DIFÍCIL) Mostrar los 3 actores que más veces aparecen en películas alquiladas.",
      expected: [
        /SELECT/i,
        /actor/i,
        /JOIN\s+rental/i,
        /COUNT/i,
        /ORDER BY/i,
        /LIMIT\s*3/,
      ],
    },
    {
      prompt:
        "(DIFÍCIL) Encontrar los clientes que alquilaron todas las películas de la categoría 'Horror'.",
      expected: [
        /SELECT/i,
        /customer/i,
        /JOIN/i,
        /category/i,
        /Horror/i,
        /(NOT\s+EXISTS|ALL)/i,
      ],
    },
    {
      prompt:
        "(DIFÍCIL) Mostrar los países en los que más clientes realizaron rentas.",
      expected: [
        /SELECT/i,
        /country/i,
        /JOIN\s+customer/i,
        /JOIN\s+rental/i,
        /COUNT/i,
        /ORDER BY/i,
      ],
    },
  ],
  World: [
    {
      prompt: "(FÁCIL) Mostrar los países por nombre.",
      expected: [/SELECT/i, /name/i, /country/i, /FROM\s+country/i],
    },
    {
      prompt: "(FÁCIL) Mostrar todas las ciudades de Argentina.",
      expected: [
        /SELECT/i,
        /city/i,
        /FROM\s+city/i,
        /WHERE.*countrycode.*ARG/i,
      ],
    },
    {
      prompt: "(FÁCIL) Mostrar los idiomas oficiales de México.",
      expected: [
        /SELECT/i,
        /language/i,
        /FROM\s+countrylanguage/i,
        /WHERE.*countrycode/i,
        /MEX/,
        /isOfficial/i,
        /T/
      ],
    },
    {
      prompt: "(FÁCIL) Mostrar los países del continente 'South America'.",
      expected: [
        /SELECT/i,
        /country/i,
        /FROM\s+country/i,
        /WHERE.*continent.*South America/i,
      ],
    },
    {
      prompt: "(FÁCIL) Contar cuántos países hay en la tabla.",
      expected: [/SELECT/i, /COUNT/i, /FROM\s+country/i],
    },
    {
      prompt: "(FÁCIL) Listar las ciudades con población mayor a 1 millón.",
      expected: [/SELECT/i, /city/i, /FROM\s+city/i, /population.*>.*1000000/i],
    },
    {
      prompt: "(FÁCIL) Mostrar el país con mayor población.",
      expected: [
        /SELECT/i,
        /country/i,
        /FROM\s+country/i,
        /ORDER BY.*population.*DESC/i,
      ],
    },
    {
      prompt: "(FÁCIL) Mostrar los países de Europa ordenados por nombre.",
      expected: [
        /SELECT/i,
        /country/i,
        /FROM\s+country/i,
        /WHERE.*continent.*Europe/i,
        /ORDER BY.*name/i,
      ],
    },
    {
      prompt: "(FÁCIL) Mostrar las ciudades de Brasil.",
      expected: [
        /SELECT/i,
        /city/i,
        /FROM\s+city/i,
        /WHERE.*countrycode.*BRA/i,
      ],
    },
    {
      prompt: "(FÁCIL) Listar todos los continentes distintos.",
      expected: [/SELECT/i, /DISTINCT/i, /continent/i, /FROM\s+country/i],
    },
    {
      prompt: "(INTERMEDIO) Mostrar los 10 países con mayor superficie.",
      expected: [
        /SELECT/i,
        /country/i,
        /FROM\s+country/i,
        /ORDER BY.*surfacearea.*DESC/i,
        /LIMIT 10/i,
      ],
    },
    {
      prompt:
        "(INTERMEDIO) Listar los países junto con el número de ciudades que tienen registradas.",
      expected: [/SELECT/i, /country/i, /COUNT/i, /city/i, /GROUP BY/i],
    },
    {
      prompt: "(INTERMEDIO) Mostrar el promedio de población por continente.",
      expected: [/SELECT/i, /continent/i, /AVG/i, /population/i, /GROUP BY/i],
    },
    {
      prompt: "(INTERMEDIO) Listar los idiomas hablados en más de 5 países.",
      expected: [
        /SELECT/i,
        /language/i,
        /COUNT/i,
        /countrycode/i,
        /GROUP BY/i,
        /HAVING.*>.*5/i,
      ],
    },
    {
      prompt: "(INTERMEDIO) Mostrar el país con mayor esperanza de vida.",
      expected: [
        /SELECT/i,
        /country/i,
        /FROM\s+country/i,
        /ORDER BY.*lifeexpectancy.*DESC/i,
        /LIMIT 1/i,
      ],
    },
    {
      prompt: "(INTERMEDIO) Mostrar el total de población por región.",
      expected: [/SELECT/i, /region/i, /SUM/i, /population/i, /GROUP BY/i],
    },
    {
      prompt:
        "(INTERMEDIO) Listar los países cuya independencia fue después de 1950.",
      expected: [
        /SELECT/i,
        /country/i,
        /FROM\s+country/i,
        /WHERE.*indepyear.*>.*1950/i,
      ],
    },
    {
      prompt:
        "(INTERMEDIO) Mostrar los países de Asia con población mayor a 50 millones.",
      expected: [
        /SELECT/i,
        /country/i,
        /FROM\s+country/i,
        /WHERE.*continent.*Asia/i,
        /population.*>.*50000000/i,
      ],
    },
    {
      prompt: "(INTERMEDIO) Mostrar las 5 ciudades más pobladas del mundo.",
      expected: [
        /SELECT/i,
        /city/i,
        /FROM\s+city/i,
        /ORDER BY.*population.*DESC/i,
        /LIMIT 5/i,
      ],
    },
    {
      prompt:
        "(INTERMEDIO) Listar el idioma más hablado por continente (en porcentaje).",
      expected: [
        /SELECT/i,
        /countrylanguage/i,
        /MAX/i,
        /percentage/i,
        /GROUP BY.*continent/i,
      ],
    },
    {
      prompt: "(DIFÍCIL) Encontrar los países con más de 3 idiomas oficiales.",
      expected: [
        /SELECT/i,
        /countrycode/i,
        /COUNT/i,
        /language/i,
        /WHERE.*isofficial.*=.*T/i,
        /GROUP BY/i,
        /HAVING.*>.*3/i,
      ],
    },
    {
      prompt:
        "(DIFÍCIL) Mostrar el top 10 de países con mayor densidad poblacional (población/superficie).",
      expected: [
        /SELECT/i,
        /country/i,
        /population.*\/.*surfacearea/i,
        /ORDER BY.*DESC/i,
        /LIMIT 10/i,
      ],
    },
    {
      prompt:
        "(DIFÍCIL) Mostrar el idioma más hablado del mundo (por porcentaje total).",
      expected: [
        /SELECT/i,
        /language/i,
        /SUM/i,
        /percentage/i,
        /GROUP BY/i,
        /ORDER BY.*DESC/i,
        /LIMIT 1/i,
      ],
    },
    {
      prompt:
        "(DIFÍCIL) Encontrar los continentes con más de 500 millones de habitantes.",
      expected: [
        /SELECT/i,
        /continent/i,
        /SUM/i,
        /population/i,
        /GROUP BY/i,
        /HAVING.*>.*500000000/i,
      ],
    },
    {
      prompt: "(DIFÍCIL) Mostrar las ciudades capitales con mayor población.",
      expected: [
        /SELECT/i,
        /city/i,
        /FROM\s+city/i,
        /capital/i,
        /ORDER BY.*population.*DESC/i,
      ],
    },
    {
      prompt:
        "(DIFÍCIL) Encontrar los países donde la expectativa de vida es menor a 50 años.",
      expected: [
        /SELECT/i,
        /country/i,
        /FROM\s+country/i,
        /lifeexpectancy.*<.*50/i,
      ],
    },
    {
      prompt:
        "(DIFÍCIL) Mostrar la suma del GNP de todos los países de Europa.",
      expected: [
        /SELECT/i,
        /SUM/i,
        /GNP/i,
        /FROM\s+country/i,
        /WHERE.*continent.*Europe/i,
      ],
    },
    {
      prompt: "(DIFÍCIL) Listar los países que no tienen idiomas oficiales.",
      expected: [
        /SELECT/i,
        /country/i,
        /LEFT JOIN/i,
        /countrylanguage/i,
        /WHERE.*isofficial.*=.*F/i,
      ],
    },
    {
      prompt:
        "(DIFÍCIL) Mostrar los países con más de 100 millones de habitantes y menos de 500.000 km² de superficie.",
      expected: [
        /SELECT/i,
        /country/i,
        /population.*>.*100000000/i,
        /surfacearea.*<.*500000/i,
      ],
    },
    {
      prompt:
        "(DIFÍCIL) Mostrar las ciudades cuya población es más del 20% de la población de su país.",
      expected: [
        /SELECT/i,
        /city/i,
        /population.*>.*0\.2.*\*.*country\.population/i,
      ],
    },
  ],
  Film: [
    {
      prompt: "(FÁCIL) Listar todos los films.",
      expected: ["SELECT", "FROM film"],
    },
    {
      prompt: "(INTERMEDIO) Contar cuántos films hay por categoría.",
      expected: ["SELECT", "COUNT", "FROM film_category"],
    },
  ],
};