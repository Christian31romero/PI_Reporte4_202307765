const db = require('../config/db'); 

// Obtener todos los cursos
exports.getCursos = (req, res) => {
    const sql = 'SELECT * FROM cursos';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener cursos:', err);
            return res.status(500).json({ mensaje: 'Error al obtener cursos' });
        }
        res.status(200).json({ cursos: results });
    });
};

// Obtener todos los catedráticos
exports.getCatedraticos = (req, res) => {
    const sql = 'SELECT * FROM catedratico';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener catedráticos:', err);
            return res.status(500).json({ mensaje: 'Error al obtener catedráticos' });
        }
        res.status(200).json({ catedraticos: results });
    });
};
