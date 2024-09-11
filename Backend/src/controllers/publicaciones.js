const db = require('../config/db');
const jwt = require('jsonwebtoken');
const secretKey = 'clave' 


exports.crearPublicacion = (req, res) => {
  console.log('Encabezados:', req.headers); 
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  console.log('Token:', token); // Verifica el token recibido

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  //TOKEN
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido' });
    }

    const carnet = decoded.carnet; // Obtener el carnet desde el token
    const { tipo_publicación, id_curso, id_catedratico, mensaje } = req.body;

    /*if (!tipo_publicación || !mensaje) {
      return res.status(400).json({ mensaje: 'Tipo de publicación y mensaje son obligatorios ' });
    }*/

    /*if (!['Curso', 'Catedratico'].includes(tipo_publicación)) {
      return res.status(400).json({ mensaje: 'Tipo de publicación inválido' });
    }*/

    const idCurso = id_curso ? Number(id_curso) : null;
    const idCatedratico = id_catedratico ? Number(id_catedratico) : null;

    const sql = 'INSERT INTO publicaciones (carnet, tipo_publicación, id_curso, id_catedratico, mensaje) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [carnet, tipo_publicación, idCurso || null, idCatedratico || null, mensaje], (err, results) => {
      if (err) {
        console.error('Error al crear la publicación:', err);
        return res.status(500).json({ mensaje: 'Error al crear la publicacion' });
      }

      const id_publicacion = results.insertId;
      res.status(201).json({ mensaje: `Publicación creada exitosamente con ID: ${id_publicacion}` });
    });
  });
};

exports.obtenerPublicaciones = (req, res) => {
  const { filtroCurso, filtroCatedratico, nombreCurso, nombreCatedratico } = req.query;

  let sql = `
      SELECT p.carnet, p.tipo_publicación, p.id_curso, p.id_catedratico, p.mensaje, p.fecha_creacion, c.nombre_curso, cat.nombre_catedratico
      FROM publicaciones p
      LEFT JOIN cursos c ON p.id_curso = c.id_curso
      LEFT JOIN catedratico cat ON p.id_catedratico = cat.id_catedratico
      WHERE 1=1
  `;

  let params = [];

  // Filtrar por curso (tiene que recibir id)
  if (filtroCurso) {
      sql += " AND p.id_curso = ?";
      params.push(filtroCurso);
  }

  // Filtrar por catedrático (tiene que recibir id)
  if (filtroCatedratico) {
      sql += " AND p.id_catedratico = ?";
      params.push(filtroCatedratico);
  }

  // Filtrar por nombre del curso
  if (nombreCurso) {
      sql += " AND c.nombre_curso LIKE ?";
      params.push(`%${nombreCurso}%`);
  }

  // Filtrar por nombre del catedrático
  if (nombreCatedratico) {
      sql += " AND cat.nombre_catedratico LIKE ?";
      params.push(`%${nombreCatedratico}%`);
  }

  // Ordenar por fecha de creación (más recientes primero)
  sql += " ORDER BY p.fecha_creacion DESC";

  db.query(sql, params, (err, results) => {
      if (err) {
          console.error('Error al obtener publicaciones:', err);
          return res.status(500).json({ mensaje: 'Error al obtener las publicaciones' });
      }

      res.json({ publicaciones: results });
  });
};
