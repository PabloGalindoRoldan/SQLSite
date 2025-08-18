const FilmSeedSQL = `
CREATE TABLE actor (actor_id INTEGER, first_name TEXT, last_name TEXT);
CREATE TABLE film (id INTEGER, title TEXT, year INTEGER, director_id INTEGER);
CREATE TABLE film_actor (actor_id INTEGER, film_id INTEGER);
CREATE TABLE film_category (film_id INTEGER, category_id INTEGER);
CREATE TABLE inventory (inventory_id INTEGER, film_id INTEGER, store_id INTEGER);
CREATE TABLE language (language_id INTEGER, name TEXT);
CREATE TABLE store (store_id INTEGER, manager_staff_id INTEGER, address_id INTEGER);
CREATE TABLE category (category_id INTEGER, name TEXT);

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
(10, 'Jennifer', 'Lawrence');

INSERT INTO film (id, title, year, director_id) VALUES
(1, 'Iron Man', 2008, 1),
(2, 'Avengers', 2012, 1),
(3, 'Thor', 2011, 2),
(4, 'Inception', 2010, 3),
(5, 'The Dark Knight', 2008, 3),
(6, 'Forrest Gump', 1994, 4),
(7, 'La La Land', 2016, 5),
(8, 'Fight Club', 1999, 6),
(9, 'Interstellar', 2014, 3),
(10, 'Hunger Games', 2012, 7);

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
(10, 10);

INSERT INTO film_category (film_id, category_id) VALUES
(1, 1), (2, 1), (3, 1), -- Action
(4, 2), (5, 2), (9, 2), -- Sci-Fi
(6, 3), (7, 3), -- Drama/Romance
(8, 4), -- Thriller
(10, 5); -- Adventure

INSERT INTO inventory (inventory_id, film_id, store_id) VALUES
(1, 1, 1), (2, 2, 1),
(3, 3, 2), (4, 4, 2),
(5, 5, 1), (6, 6, 3),
(7, 7, 3), (8, 8, 2),
(9, 9, 1), (10, 10, 3);

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