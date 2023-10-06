-- Crea la base de datos si no existe
DROP DATABASE IF EXISTS trailerflix;
CREATE DATABASE IF NOT EXISTS trailerflix;

-- Selecciona la base de datos recién creada
USE trailerflix;

-- Crea la tabla `generos`
CREATE TABLE IF NOT EXISTS `generos` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(30) NOT NULL
);

-- Crea la tabla `categorias`
CREATE TABLE IF NOT EXISTS `categorias` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(20) NOT NULL
);

-- Crea la tabla `actor_actriz`
CREATE TABLE IF NOT EXISTS `actores_actrizes` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_completo` varchar(100) NOT NULL,
    `es_principal` BOOLEAN NOT NULL
);

-- Crea la tabla `catalogo`
CREATE TABLE IF NOT EXISTS `catalogo` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `poster` varchar(255) DEFAULT NULL,
    `titulo` varchar(255) NOT NULL,
    `categoria_id` INT NOT NULL,
    `resumen` text DEFAULT NULL,
    `temporadas` varchar(25) DEFAULT 'N/A',
    `trailer` varchar(500) DEFAULT NULL,
    FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`)
);

-- Crea la tabla `catalogos_actores`
CREATE TABLE IF NOT EXISTS `catalogos_actores` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `contenido_id` INT NOT NULL,
    `actor_id` INT NOT NULL,
    FOREIGN KEY (`contenido_id`) REFERENCES `catalogo`(`id`),
    FOREIGN KEY (`actor_id`) REFERENCES `actores_actrizes`(`id`)
);

-- Crea la tabla `Temporadas`
CREATE TABLE IF NOT EXISTS `temporadas` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `contenido_id` INT NOT NULL,
    `numero_temporada` INT NOT NULL,
    `resumen` varchar(765),
    FOREIGN KEY (`contenido_id`) REFERENCES `catalogo`(`id`)
);

-- Crea la tabla `generos_catalogos`
CREATE TABLE IF NOT EXISTS `generos_catalogos` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `catalogo_id` INT NOT NULL,
    `genero_id` INT NOT NULL,
    FOREIGN KEY (`catalogo_id`) REFERENCES `catalogo`(`id`),
    FOREIGN KEY (`genero_id`) REFERENCES `generos`(`id`)
);

CREATE VIEW mostrar AS 
SELECT
    c.id,
    c.poster,
    c.titulo,
    cat.nombre AS categoria,
    GROUP_CONCAT(g.nombre SEPARATOR ", ") AS generos,
    c.resumen,
    (SELECT COUNT(*) FROM temporadas AS temp WHERE temp.contenido_id = c.id) AS temporadas,
    GROUP_CONCAT(a.nombre_completo SEPARATOR ", ") AS reparto,
    c.trailer
FROM catalogo AS c
LEFT JOIN categorias AS cat ON cat.id = c.categoria_id
LEFT JOIN generos_catalogos AS gc ON c.id = gc.catalogo_id
LEFT JOIN generos AS g ON gc.genero_id = g.id
LEFT JOIN catalogos_actores AS ca ON ca.contenido_id = c.id
LEFT JOIN actores_actrizes AS a ON a.id = ca.actor_id AND a.es_principal = true
GROUP BY c.id, c.poster, c.titulo, cat.nombre, c.resumen, c.trailer;

USE trailerflix;
SELECT * from catalogo;