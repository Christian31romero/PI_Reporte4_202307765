const db = require('../config/db');
const jwt = require('jsonwebtoken');
const secretKey = 'clave'

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

exports.agregarCursoAprobado = (req, res) => {
  const { id_curso } = req.body;
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido' });
    }

    const carnet = decoded.carnet; // Obtener el carnet desde el token
    const fecha_aprobacion = new Date(); // Fecha actual

    const sql = `
      INSERT INTO cursos_aprobados (carnet, id_curso, fecha_aprobacion)
      VALUES (?, ?, ?)
    `;

    db.query(sql, [carnet, id_curso, fecha_aprobacion], (err, results) => {
      if (err) {
        console.error('Error al agregar curso aprobado:', err);
        return res.status(500).json({ mensaje: 'Error al agregar curso aprobado' });
      }
      res.json({ mensaje: 'Curso aprobado agregado exitosamente' });
    });
  });
};

// Función para obtener cursos aprobados y créditos totales del usuario
exports.obtenerCursosAprobadosYCreditos = (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido' });
    }

    const carnet = decoded.carnet; // Obtener el carnet desde el token

    const sqlCursos = `
      SELECT c.id_curso, c.nombre_curso, ca.fecha_aprobacion
      FROM cursos c
      JOIN cursos_aprobados ca ON c.id_curso = ca.id_curso
      WHERE ca.carnet = ?
      ORDER BY ca.fecha_aprobacion ASC
    `;

    db.query(sqlCursos, [carnet], (err, cursos) => {
      if (err) {
        console.error('Error al obtener cursos aprobados:', err);
        return res.status(500).json({ mensaje: 'Error al obtener cursos aprobados' });
      }

      const sqlCreditos = `
        SELECT SUM(c.creditos) AS total_creditos
        FROM cursos c
        JOIN cursos_aprobados ca ON c.id_curso = ca.id_curso
        WHERE ca.carnet = ?
      `;

      db.query(sqlCreditos, [carnet], (err, resultados) => {
        if (err) {
          console.error('Error al obtener créditos totales:', err);
          return res.status(500).json({ mensaje: 'Error al obtener créditos totales' });
        }

        res.json({
          cursos: cursos,
          total_creditos: resultados[0].total_creditos
        });
      });
    });
  });
};

