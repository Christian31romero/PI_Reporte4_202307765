const db = require('../config/db'); 


exports.crearPublicacion = (req, res) => {
  const { carnet, tipo_publicación, id_curso, id_catedratico, mensaje } = req.body;
  
  // Verificacion de campos
  if (!tipo_publicación || !mensaje) {
    return res.status(400).json({ mensaje: 'Tipo de publicación y mensaje son obligatorios' });
  }

  // Validar si el tipo de publicación es valido
  if (!['Curso', 'Catedratico'].includes(tipo_publicación)) {
    return res.status(400).json({ mensaje: 'Tipo de publicación inválido' });
  }

  // consulta SQL para insertar la nueva publicación
  const sql = 'INSERT INTO publicaciones (carnet, tipo_publicación, id_curso, id_catedratico, mensaje) VALUES (?, ?, ?, ?, ?)';
  
  
  db.query(sql, [carnet, tipo_publicación, id_curso || null, id_catedratico || null, mensaje], (err, results) => {
    if (err) {
      console.error('Error al crear la publicación:', err);
      return res.status(500).json({ mensaje: 'Error al crear la publicación' });
    }
    
    const id_publicacion = results.insertId; 
    res.status(201).json({ mensaje: `Publicación creada exitosamente con ID: ${id_publicacion}` });
  });
};
