const db = require('../config/db');
const jwt = require('jsonwebtoken');
const secretKey = 'clave';

exports.buscarUsuario = (req, res) => {
  const carnet = parseInt(req.params.carnet);

  if (isNaN(carnet)) {
    return res.status(400).json({ mensaje: 'Carnet inválido' });
  }

  const sql = `
    SELECT * FROM usuarios WHERE carnet = ?
  `;

  db.query(sql, [carnet], (err, results) => {
    if (err) {
      console.error('Error al buscar el usuario:', err);
      return res.status(500).json({ mensaje: 'Error al buscar el usuario' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ usuario: results[0] });
  });
};

exports.obtenerUsuario = (req, res) =>{
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido' });
    }

    const carnet = decoded.carnet; // Obtener el carnet desde el token
    console.log(carnet)
    const sql = `
      SELECT u.carnet, u.name, u.lname, u.email
      FROM usuarios u
      WHERE u.carnet = ?
    `;

    db.query(sql, [carnet], (err, results) => {
      if (err) {
        console.error('Error al obtener el usuario:', err);
        return res.status(500).json({ mensaje: 'Error al obtener el usuario' });
      }
      res.json({ datos: results });
    });
    
  });

};
