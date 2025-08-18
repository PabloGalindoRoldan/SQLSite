const FilmSeedSQL = `
CREATE TABLE actor (actor_id INTEGER, first_name TEXT, last_name TEXT);
CREATE TABLE film (id INTEGER, title TEXT, description TEXT, release_year INTEGER, language_id INTEGER, length INTEGER);
CREATE TABLE film_actor (actor_id INTEGER, film_id INTEGER);
CREATE TABLE film_category (film_id INTEGER, category_id INTEGER);
CREATE TABLE inventory (inventory_id INTEGER, film_id INTEGER, store_id INTEGER);
CREATE TABLE language (language_id INTEGER, name TEXT);
CREATE TABLE store (store_id, manager_staff_id, address_id INTEGER);
CREATE TABLE category (category_id, name TEXT);

-- Actors
INSERT INTO actor (actor_id, first_name, last_name) VALUES
(1, 'Robert', 'Downey'),
(2, 'Scarlett', 'Johansson'),
(3, 'Chris', 'Evans'),
(4, 'Natalie', 'Portman'),
(5, 'Morgan', 'Freeman'),
(6, 'Tom', 'Hanks'),
(7, 'Emma', 'Stone'),
(8, 'Brad', 'Pitt'),
(9, 'Leonardo', 'DiCaprio'),
(10, 'Jennifer', 'Lawrence'),
(11, 'Sandra', 'Kilmer');

-- Films (language_id = 1 for English, length in minutes)
INSERT INTO film (id, title, description, release_year, language_id, length) VALUES
(1, 'Iron Man', 'Un ingeniero multimillonario se convierte en un superhéroe con un traje potenciado.', 2008, 1, 126),
(2, 'Avengers', 'Los superhéroes se unen para salvar al mundo de una invasión alienígena.', 2012, 1, 143),
(3, 'Thor', 'El dios del trueno enfrenta desafíos en la Tierra y Asgard.', 2011, 1, 115),
(4, 'Inception', 'Un ladrón roba secretos a través de la tecnología de compartir sueños.', 2010, 1, 148),
(5, 'The Dark Knight', 'Batman enfrenta al Joker que amenaza Gotham City.', 2008, 1, 152),
(6, 'Forrest Gump', 'Un hombre con un bajo coeficiente intelectual es testigo de eventos históricos.', 1994, 1, 142),
(7, 'La La Land', 'Un músico de jazz y una actriz se enamoran en Los Ángeles.', 2016, 1, 128),
(8, 'Fight Club', 'Un insomne forma un club de lucha clandestino.', 1999, 1, 139),
(9, 'Interstellar', 'Exploradores viajan a través de un agujero de gusano para salvar a la humanidad.', 2014, 1, 169),
(10, 'Hunger Games', 'Una chica lucha por sobrevivir en un juego de muerte televisado.', 2012, 1, 142),
(11, 'Midnight Shadows', 'Una mujer descubre oscuros secretos en su pequeño pueblo.', 2020, 1, 110),
(12, 'Ocean Secrets', 'Los misterios ocultos se despliegan bajo las olas.', 2019, 1, 118),
(13, 'The Hidden Path', 'Un viaje de autodescubrimiento en un bosque encantado.', 2021, 1, 125);

-- Film-Actor relationships
INSERT INTO film_actor (actor_id, film_id) VALUES
(1, 1), (1, 2),
(2, 2),
(3, 2), (3, 3),
(4, 3),
(5, 6),
(6, 6),
(7, 7),
(8, 8),
(9, 4), (9, 9),
(10, 10),
(11, 11), (11, 12), (11, 13);  -- Sandra Kilmer films

-- Film categories
INSERT INTO film_category (film_id, category_id) VALUES
(1, 1), (2, 1), (3, 1), -- Action
(4, 2), (5, 2), (9, 2), -- Sci-Fi
(6, 3), (7, 3), -- Drama/Romance
(8, 4), -- Thriller
(10, 5), -- Adventure
(11, 6), (12, 7), (13, 3); -- Sandra Kilmer's films

-- Inventory
INSERT INTO inventory (inventory_id, film_id, store_id) VALUES
(1, 1, 1), (2, 2, 1),
(3, 3, 2), (4, 4, 2),
(5, 5, 1), (6, 6, 3),
(7, 7, 3), (8, 8, 2),
(9, 9, 1), (10, 10, 3),
(11, 11, 2), (12, 12, 3), (13, 13, 1);

-- Languages
INSERT INTO language (language_id, name) VALUES
(1, 'English'),
(2, 'Spanish'),
(3, 'French'),
(4, 'German'),
(5, 'Italian'),
(6, 'Mandarin'),
(7, 'Japanese'),
(8, 'Korean'),
(9, 'Portuguese'),
(10, 'Russian');

-- Stores
INSERT INTO store (store_id, manager_staff_id, address_id) VALUES
(1, 101, 1001),
(2, 102, 1002),
(3, 103, 1003),
(4, 104, 1004),
(5, 105, 1005),
(6, 106, 1006),
(7, 107, 1007),
(8, 108, 1008),
(9, 109, 1009),
(10, 110, 1010);

-- Categories
INSERT INTO category (category_id, name) VALUES
(1, 'Action'),
(2, 'Sci-Fi'),
(3, 'Drama'),
(4, 'Thriller'),
(5, 'Adventure'),
(6, 'Comedy'),
(7, 'Horror'),
(8, 'Romance'),
(9, 'Fantasy'),
(10, 'Animation');
`;

export default FilmSeedSQL;
