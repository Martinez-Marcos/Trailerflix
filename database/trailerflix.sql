-- Crea la base de datos si no existe
DROP DATABASE IF EXISTS trailerflix;
CREATE DATABASE IF NOT EXISTS trailerflix;
SET CHARACTER SET utf8mb4;

-- Selecciona la base de datos recién creada
USE trailerflix;

-- Crea la tabla `generos`
CREATE TABLE IF NOT EXISTS `generos` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL
);

-- Crea la tabla `categorias`
CREATE TABLE IF NOT EXISTS `categorias` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL
);

-- Crea la tabla `actor_actriz`
CREATE TABLE IF NOT EXISTS `actores_actrices` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_completo` VARCHAR(255) NOT NULL,
    `es_principal` BOOLEAN NOT NULL
);

-- Crea la tabla `catalogo`
CREATE TABLE IF NOT EXISTS `catalogo` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `poster` VARCHAR(255) DEFAULT NULL,
    `titulo` VARCHAR(255) NOT NULL,
    `categoria_id` INT NOT NULL,
    `resumen` TEXT DEFAULT NULL,
    `trailer` TEXT DEFAULT NULL,
    FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`)
);

-- Crea la tabla `catalogos_actores`
CREATE TABLE IF NOT EXISTS `catalogos_actores` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `contenido_id` INT NOT NULL,
    `actor_actriz_id` INT NOT NULL,
    FOREIGN KEY (`contenido_id`) REFERENCES `catalogo`(`id`),
    FOREIGN KEY (`actor_actriz_id`) REFERENCES `actores_actrices`(`id`)
);

-- Crea la tabla `Temporadas`
CREATE TABLE IF NOT EXISTS `temporadas` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `contenido_id` INT NOT NULL,
    `titulo` VARCHAR(255) NOT NULL,
    `resumen` VARCHAR(765),
    FOREIGN KEY (`contenido_id`) REFERENCES `catalogo`(`id`)
);

-- Crea la tabla `generos_catalogos`
CREATE TABLE IF NOT EXISTS `catalogos_generos` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `contenido_id` INT NOT NULL,
    `genero_id` INT NOT NULL,
    FOREIGN KEY (`contenido_id`) REFERENCES `catalogo`(`id`),
    FOREIGN KEY (`genero_id`) REFERENCES `generos`(`id`)
);


CREATE VIEW mostrar AS 
SELECT
    c.id,
    c.poster,
    c.titulo,
    cat.nombre AS categoria,
    (SELECT GROUP_CONCAT(g.nombre SEPARATOR ", ") 
		FROM catalogos_generos AS cg 
        JOIN generos AS g 
        ON cg.genero_id = g.id 
        WHERE cg.contenido_id = c.id)
	AS generos,
    c.resumen,
    CASE
        WHEN (SELECT COUNT(*) FROM temporadas AS temp WHERE temp.contenido_id = c.id) = 0 THEN 'N/A'
        ELSE (SELECT COUNT(*) FROM temporadas AS temp WHERE temp.contenido_id = c.id)
	END AS temporadas,
    (SELECT GROUP_CONCAT(a.nombre_completo SEPARATOR ", ") 
		FROM catalogos_actores AS ca 
        JOIN actores_actrices AS a 
        ON ca.actor_actriz_id = a.id 
        WHERE ca.contenido_id = c.id AND a.es_principal = true) 
	AS reparto,
    c.trailer
FROM catalogo AS c
LEFT JOIN categorias AS cat ON cat.id = c.categoria_id;