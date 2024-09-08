
CREATE DATABASE datos;


USE datos;


CREATE TABLE usuarios (
    carnet INT  PRIMARY KEY, -- Identificador único, se incrementa automáticamente
    name VARCHAR(255) NOT NULL, -- Nombre del usuario
    lname VARCHAR(255) NOT NULL, -- Apellido del usuario
    password VARCHAR(255) NOT NULL, -- Contraseña del usuario (considera usar un hash para seguridad)
    email VARCHAR(255) NOT NULL UNIQUE -- Correo electrónico del usuario (debe ser único)
);

-- Verificar los datos en la tabla usuarios
SELECT * FROM usuarios;
