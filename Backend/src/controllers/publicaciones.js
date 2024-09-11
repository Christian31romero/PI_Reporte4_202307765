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

    if (!tipo_publicación || !mensaje) {
      return res.status(400).json({ mensaje: 'Tipo de publicación y mensaje son obligatorios' });
    }

    if (!['Curso', 'Catedratico'].includes(tipo_publicación)) {
      return res.status(400).json({ mensaje: 'Tipo de publicación inválido' });
    }

    const sql = 'INSERT INTO publicaciones (carnet, tipo_publicación, id_curso, id_catedratico, mensaje) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [carnet, tipo_publicación, id_curso || null, id_catedratico || null, mensaje], (err, results) => {
      if (err) {
        console.error('Error al crear la publicación:', err);
        return res.status(500).json({ mensaje: 'Error al crear la publicación' });
      }

      const id_publicacion = results.insertId;
      res.status(201).json({ mensaje: `Publicación creada exitosamente con ID: ${id_publicacion}` });
    });
  });
};