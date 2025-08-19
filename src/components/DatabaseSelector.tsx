import React, { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import FilmSeedSQL from "./seeds/FilmSeedSQL";
import WorldSeedSql from "./seeds/WorldSeedSql";
import runSeed from "./seeds/RunSeed";
import SakilaSeedSQL from "./seeds/SakilaSeedSQL";

type Props = {
  setDb: (db: any) => void;
};

const schemaMap: Record<string, string> = {
  Film: `
actor         = (actor_id, first_name, last_name)
film          = (film_id, title, description, release_year, language_id, length)
film_actor    = (actor_id, film_id)
film_category = (film_id, category_id)
inventory     = (inventory_id, film_id, store_id)
language      = (language_id, name)
store         = (store_id, manager_staff_id, address_id)
category      = (category_id, name)
  `,
  World: `
city            = (ID, Name, CountryCode, District, Population)
country         = (Code, Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital, Code2)
countrylanguage = (CountryCode, Language, IsOfficial, Percentage)
  `,
  Sakila: `
actor          = (actor_id, first_name, last_name, last_update)
film           = (film_id, title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features, last_update)
film_actor     = (actor_id, film_id, last_update)
category       = (category_id, name, last_update)
film_category  = (film_id, category_id, last_update)
language       = (language_id, name, last_update)
inventory      = (inventory_id, film_id, store_id, last_update)
store          = (store_id, manager_staff_id, address_id, last_update)
customer       = (customer_id, store_id, first_name, last_name, email, address_id, active, create_date, last_update)
staff          = (staff_id, first_name, last_name, address_id, picture, email, store_id, active, username, password, last_update)
address        = (address_id, address, address2, district, city_id, postal_code, phone, last_update)
city           = (city_id, city, country_id, last_update)
country        = (country_id, country, last_update)
rental         = (rental_id, rental_date, inventory_id, customer_id, return_date, staff_id, last_update)
payment        = (payment_id, customer_id, staff_id, rental_id, amount, payment_date, last_update)
film_text      = (film_id, title, description)
  `,
};

const DatabaseSelector: React.FC<Props> = ({ setDb }) => {
  const [selectedDb, setSelectedDb] = useState("World");
  const [schemaPreview, setSchemaPreview] = useState(schemaMap[selectedDb]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dbName = e.target.value;
    setSelectedDb(dbName);
    setSchemaPreview(schemaMap[dbName]);

    const SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    });

    const database = new SQL.Database();
    if (dbName === "Film") runSeed(database, FilmSeedSQL);
    else if (dbName === "World") runSeed(database, WorldSeedSql);
    else if (dbName === "Sakila") runSeed(database, SakilaSeedSQL);

    setDb(database);
  };

  return (
    <div className="relative w-full">
        {/* Header */}
        <div className="flex justify-center relative mb-3">
            <h2 className="text-lg text-gray-700 font-semibold text-center">
            Esquema de la Base de Datos
            </h2>

            {/* Dropdown in top-right corner */}
            <div className="absolute right-0 top-0">
            <select
                className="border border-gray-300 text-blue-700 rounded-md p-1 text-sm"
                value={selectedDb}
                onChange={handleChange}
            >
                <option value="" disabled>
                    Elegí la BDD
                </option>
                <option value="Film">Film</option>
                <option value="World">World</option>
                <option value="Sakila">Sakila</option>
            </select>
            </div>
        </div>

        {/* Schema text */}
        <div className="max-w-full overflow-x-auto rounded-md p-3 border border-gray-200 flex justify-center">
            <pre className="text-sm text-gray-700 text-left whitespace-pre-wrap">
            {schemaPreview}
            </pre>
        </div>
    </div>
  );
};

export default DatabaseSelector;
