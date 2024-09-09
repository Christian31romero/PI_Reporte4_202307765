const db = require('../config/db');  // Importa la conexión a la base de datos

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
    const sql = 'SELECT * FROM usuarios WHERE carnet = ? AND password = ?';  
    db.query(sql, [carnet, password], (err, results) => {
      if (err) {
        console.error('Error al iniciar sesión:', err);
        return res.status(500).json({ mensaje: 'Error al iniciar sesión' });
      }
      if (results.length === 0) {
        return res.status(401).json({ mensaje: 'Carnet o contraseña incorrecto' });
      }
      
      res.status(200).json({ mensaje: 'Inicio de sesión exitoso', datos: results[0] });
    });
  };