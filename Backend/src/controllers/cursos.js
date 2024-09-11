const db = require('../config/db');

exports.obtenerCursosAprobados = (req, res) => {
  const carnet = parseInt(req.params.carnet);

  if (isNaN(carnet)) {
    return res.status(400).json({ mensaje: 'Carnet inválido' });
  }

  const sql = `
    SELECT c.id_curso, c.nombre_curso, ca.fecha_aprobacion
    FROM cursos_aprobados ca
    JOIN cursos c ON ca.id_curso = c.id_curso
    WHERE ca.carnet = ?
  `;

  db.query(sql, [carnet], (err, results) => {
    if (err) {
      console.error('Error al obtener cursos aprobados:', err);
      return res.status(500).json({ mensaje: 'Error al obtener cursos aprobados' });
    }

    const totalCreditosSql = `
      SELECT SUM(c.creditos) as total_creditos
      FROM cursos_aprobados ca
      JOIN cursos c ON ca.id_curso = c.id_curso
      WHERE ca.carnet = ?
    `;

    db.query(totalCreditosSql, [carnet], (err, creditoResults) => {
      if (err) {
        console.error('Error al obtener créditos totales:', err);
        return res.status(500).json({ mensaje: 'Error al obtener créditos totales' });
      }

      res.status(200).json({
        cursos: results,
        totalCreditos: creditoResults[0].total_creditos || 0
      });
    });
  });
};
