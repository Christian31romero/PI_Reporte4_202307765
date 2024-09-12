import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [idCurso, setIdCurso] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch('http://localhost:5000/obtenerUsuario', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const result = await response.json();
          setUsuario(result.datos[0]); // Suponiendo que hay un solo usuario
        } else {
          alert('No se pudo obtener la información del usuario');
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUsuario();
  }, []);

  const handleAgregarCurso = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/agregarCursoAprobado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ id_curso: idCurso })
      });
      if (response.ok) {
        setMensaje('Curso aprobado agregado exitosamente');
        setIdCurso(''); // Limpiar el campo de entrada
      } else {
        alert('Error al agregar curso aprobado');
      }
    } catch (error) {
      console.error('Error al agregar curso aprobado:', error);
      alert('Error al agregar curso aprobado');
    }
  };

  if (!usuario) return <div className="alert alert-info">Cargando...</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Perfil de {usuario.name} {usuario.lname}</h1>
      <div className="card mb-4">
        <div className="card-body">
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Carnet:</strong> {usuario.carnet}</p>
        </div>
      </div>
      <form onSubmit={handleAgregarCurso} className="mb-4">
        <div className="form-group">
          <label htmlFor="idCurso">ID del Curso</label>
          <input
            type="text"
            id="idCurso"
            className="form-control"
            placeholder="Ingrese el ID del curso"
            value={idCurso}
            onChange={(e) => setIdCurso(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Agregar Curso Aprobado</button>
      </form>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
    </div>
  );
}

export default Perfil;

