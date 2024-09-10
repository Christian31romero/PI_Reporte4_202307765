
CREATE DATABASE datos;


USE datos;


CREATE TABLE usuarios (
    carnet INT  PRIMARY KEY, -- Identificador único, se incrementa automáticamente
    name VARCHAR(255) NOT NULL, -- Nombre del usuario
    lname VARCHAR(255) NOT NULL, -- Apellido del usuario
    password VARCHAR(255) NOT NULL, -- Contraseña del usuario (considera usar un hash para seguridad)
    email VARCHAR(255) NOT NULL UNIQUE -- Correo electrónico del usuario (debe ser único)
);

 -- ******************
CREATE TABLE cursos(
    id_curso INT PRIMARY KEY NOT NULL,
    nombre_curso VARCHAR(200) NOT NULL,
    creditos INT NOT NULL --se ganan al aprobar el curso 
 );

CREATE TABLE catedratico(
    id_catedratico INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre_catedratico VARCHAR(250) NOT NULL
);
--cada catedrático pertenece a uno o más departamentos
CREATE TABLE departamento(
    id_depa INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre_depa VARCHAR(150) NOT NULL
);

--cate_depa = catedratico_departamento
CREATE TABLE cate_depa(
    id_catedratico INT,
    id_depa INT,
    PRIMARY KEY (id_catedratico, id_depa),
    FOREIGN KEY (id_catedratico) REFERENCES catedratico(id_catedratico),
    FOREIGN KEY (id_depa) REFERENCES departamento(id_depa)
);

CREATE TABLE publicaciones(
    id_publicacion INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    carnet INT,
    tipo_publicación ENUM('Curso', 'Catedratico') NOT NULL,
    id_curso INT,
    id_catedratico INT,
    mensaje TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (carnet) REFERENCES usuarios(carnet),
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso),
    FOREIGN KEY (id_catedratico) REFERENCES catedratico(id_catedratico)
);

CREATE TABLE comentarios(
    id_comentario INT PRIMARY KEY AUTO_INCREMENT,
    id_publicacion INT,
    carnet INT,
    comentario TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (carnet) REFERENCES usuarios(carnet),
    FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id_publicacion)
);

CREATE TABLE cursos_aprobados(
    carnet INT,
    id_curso INT,
    fecha_aprobacion DATE NOT NULL,
    PRIMARY KEY (carnet, id_curso),
    FOREIGN KEY (carnet) REFERENCES usuarios(carnet),
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
);

-- Verificar los datos en la tabla usuarios
SELECT * FROM usuarios;
