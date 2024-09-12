const db = require('../config/db');
const jwt = require('jsonwebtoken');
const secretKey = 'clave';

// Función para crear un comentario
exports.crearComentario = (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido' });
    }

    const carnet = decoded.carnet; // Obtener el carnet desde el token
    const { id_publicacion, comentario } = req.body;

    if (!id_publicacion || !comentario) {
      return res.status(400).json({ mensaje: 'ID de la publicación y comentario son obligatorios' });
    }

    const sql = 'INSERT INTO comentarios (id_publicacion, carnet, comentario) VALUES (?, ?, ?)';
    db.query(sql, [id_publicacion, carnet, comentario], (err, results) => {
      if (err) {
        console.error('Error al crear el comentario:', err);
        return res.status(500).json({ mensaje: 'Error al crear el comentario' });
      }

      res.status(201).json({ mensaje: 'Comentario creado exitosamente' });
    });
  });
};

// Función para obtener los comentarios de una publicación
exports.obtenerComentarios = (req, res) => {
    const { id_publicacion } = req.params;
  
    if (!id_publicacion) {
      return res.status(400).json({ mensaje: 'ID de la publicación es obligatorio' });
    }
  
    const sql = `
      SELECT c.comentario, c.fecha_creacion, c.carnet
      FROM comentarios c
      WHERE c.id_publicacion = ?
      ORDER BY c.fecha_creacion ASC
    `;
  
    db.query(sql, [id_publicacion], (err, results) => {
      if (err) {
        console.error('Error al obtener los comentarios:', err);
        return res.status(500).json({ mensaje: 'Error al obtener los comentarios' });
      }
      res.json({ comentarios: results });
    });
  };
  