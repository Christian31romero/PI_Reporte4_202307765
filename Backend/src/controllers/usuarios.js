const db = require('../config/db');

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
