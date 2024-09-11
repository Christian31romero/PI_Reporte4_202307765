const db = require('../config/db');
const jwt = require('jsonwebtoken');
const secretKey = 'clave'

// Maneja el registro de usuario
exports.registro = (req, res) => {
  const { name, lname, password, email } = req.body;
  const sql = 'INSERT INTO usuarios (name, lname, password, email) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, lname, password, email], (err, results) => {
    if (err) {
      console.error('Error al registrar el usuario:', err);
      return res.status(500).json({mensaje: 'Error al registrar el usuario'});
    }
    const carnet = results.insertId; 
    res.status(201).json({ mensaje: `Usuario registrado exitosamente con carnet: ${carnet}` });
  });
};

// Maneja el inicio de sesión
exports.login = (req, res) => {
  const { carnet, password } = req.body;

  // Verificar usuario en la base de datos (esto ya lo tienes)
  const sql = 'SELECT * FROM usuarios WHERE carnet = ? AND password = ?';
  db.query(sql, [carnet, password], (err, results) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
    if (results.length > 0) {
      // Generar el token JWT con el carnet del usuario
      const token = jwt.sign({ carnet }, secretKey, { expiresIn: '1h' });
      return res.status(200).json({ mensaje: 'Login exitoso', token });
    } else {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  });
};