INSERT INTO user_type
(user_type)
VALUES ('admin'),('common_user')


INSERT INTO country
(country)
VALUES ('Argentina'), ('Colombia'), ('Chile'), ('Belgium'), ('France'), ('Spain')

INSERT INTO user
(id, first_name, last_name, password, email, image, registered_date, user_type_id, country_id)
VALUES
(1, 'Miguel Ángel', 'Vargas Navarro', '$2a$10$qOXjMZlLURip7CodLiLi/Oc1RY.hv4zIotSPZgv0lm5xwm3Ju6WSC' , 'mvargasnavarro19@gmail.com','user-1709673238622.png','2005-01-14', 1, 2),
(2, 'Alvaro', 'Ramirez Rojas', '$2a$10$DZFCIljx6ix.BaKCq5uCiuACFeJrCcfJMts15gR5xVhMyIWOwd0BG', 'alvarorr@gmail.com', 'user-1709672545109.jpg','2024-03-05', 2, 1),
(3, 'Melena ', 'Gomez Pereira', '$2a$10$wcMyhj31oIqjUBVpMfphOObChOAJGgdnva.l0d/9RwkviQBIdA7I2', 'muchopelo@gmail.com', 'user-1709672662977.jpg', '2024-03-05', 2, 2),
(4, 'Camila', 'Bautista Fosh', '$2a$10$Tgwp3HaDp.BlhT552Al3N.KvBUuXLXYpHJrChe96IgHmxR8E.et76', 'camilabf@gmail.com', 'user-1709672783164.jpg', '2024-03-05', 2, 2),
(5, 'Mateo', 'Armando Cazasa', '$2a$10$4gZTx3g67fhcPINv7bED6exD.JZg621lJgvZs5JD0RXdWqjrGXpFO', 'javierac@gmail.com', 'user-1709672844054.jpg',  '2024-03-05', 2, 1),
(6, 'Phonix', 'Alvares Capullo', '$2a$10$m0HHT0Oz8f4hrqlTMWRhs.2I65kimtZt1s/9lSqsrmkhfGzNb8ta6', 'mateoac@gmail.com', 'user-1709672974782.jpg',  '2024-03-05', 2, 2),
(7, 'Francisco', 'Espejo Castro', '$2a$10$wiVOwFOWyX.dlWrHnjttDurhNjXIfsWB3myCk8/Gq1.g9I4gweKhG', 'phonixec@gmail.com', 'user-1709673066028.jpg',  '2024-03-05', 2, 2)


--------------------> PRODUCTOS  <----------------------


INSERT INTO brand 
(brand_name)
VALUES ('McDonald'),('Tomasso'),('Dean and Dennis'),('Shawarmi')


INSERT INTO category
(category_name)
VALUES ('Pizzas'),('Burguers'),('Noodles'),('Coffes'),('Ramen'),('Ice creams'), ('Meal'), ('Beers'), ('Alcohol'), ('restaurant')

INSERT INTO state
(location)
VALUES ('Belgium'),('Spain'),('France'),('Argentina'),('Italy')

INSERT INTO address (location) VALUES ('Location 1'), ('Location 2'), ('Location 3'), ('Location 4'), ('Location 5'), ('Location 6')

INSERT INTO product
(id, name, description, image, quantity, price, discount, brand_id, category_id, location_id, address_id)
VALUES
(1,'Pizza marguerita','tomatoes, cheese, olives','IMG_DEFAULT.svg', 20, 50, 25, 2, 1, 5, 5),
(2,'Spicy burguer','150gr- meal, eggs, french bread, lettuce and olives','IMG_DEFAULT.svg', 70, 15 , 0, 3, 2, 1, 1),
(3,'Ramen','noodles, meal, eggs, soup, lettuce and olives','IMG_DEFAULT.svg',50,45, 10, 4, 5, 3, 3),
(4,'Latte expresso','More milk than coffe','IMG_DEFAULT.svg',20,35, 0, 1, 4, 2, 2),
(5,'Chocolate','70% black chocolate ice cream 500gr','IMG_DEFAULT.svg',25,25, 15, 1, 6, 3, 3),
(6,'spaghetti with meat balls','noodles, 100gr-meal, neapolitan sauce','IMG_DEFAULT.svg',15,5, 45, 4, 3, 5, 5),
(7,'Estrella Galicia 250ml','Spanish lager beer','IMG_DEFAULT.svg',50,10, 5, 4, 8, 2, 2),
(8,'Gin Tonic 500ml','Gin Aconcagua, annis, strawberry','IMG_DEFAULT.svg',100,15, 50, 2, 9, 4, 4);

