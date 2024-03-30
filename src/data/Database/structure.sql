
-- estas dos lineas de codigo son las que crean el schema
-- y la que sobre ese eschema itera  para insertar los registros.
-- (siempre que uno de doble click en el schema se esta iterando alli)

-- CREATE DATABASE foodfunnel;
-- USE foodfunnel;




-- esta es la estructura de la base de datos pero sin poblar!
-- (eso está en el archivo data.sql)


CREATE TABLE `user_type` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `user-type` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `address` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `address` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `country` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `country` VARCHAR(75) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `state` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `location` VARCHAR(150) NOT NULL,
   PRIMARY KEY (`id`)
);



CREATE TABLE `brand` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `brand_name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `category` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `category_name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `first_name` VARCHAR(155) NOT NULL,
   `last_name` VARCHAR(155) NOT NULL,
   `password` TEXT NOT NULL,
   `email` VARCHAR(155) NOT NULL,
   `image` VARCHAR(255),
   `registered_date` DATE NOT NULL,
   `user_type_id` INT NOT NULL,
   `country_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `product` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   `quantity` INT NOT NULL,
   `price` INT NOT NULL DEFAULT 0,
   `discount` INT DEFAULT 0,
   `brand_id` INT NOT NULL,
   `address_id` INT NOT NULL,
   `category_id` INT NOT NULL,
   `location_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `product` ADD CONSTRAINT `FK_c88f7132-e120-454c-a61a-0c4289a4a20b` FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`)  ;

ALTER TABLE `product` ADD CONSTRAINT `FK_31cdc9bf-d49d-491a-a3ce-f4da7727989a` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`)  ;

ALTER TABLE `product` ADD CONSTRAINT `FK_76128baf-04ed-43f6-8357-aaa2ab5519fc` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`)  ;

ALTER TABLE `product` ADD CONSTRAINT `FK_dcd336f0-a255-46cc-a779-628fc02bd442` FOREIGN KEY (`location_id`) REFERENCES `state`(`id`)  ;

ALTER TABLE `user` ADD CONSTRAINT `FK_a09b65c7-e004-4628-b163-24db41eaee70` FOREIGN KEY (`user-type_id`) REFERENCES `user_type`(`id`)  ;

ALTER TABLE `user` ADD CONSTRAINT `FK_8346a9ce-dfae-4684-898c-48a7e7820992` FOREIGN KEY (`country_id`) REFERENCES `country`(`id`)  ;
