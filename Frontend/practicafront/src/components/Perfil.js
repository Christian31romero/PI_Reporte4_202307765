import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [totalCreditos, setTotalCreditos] = useState(0);
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

    const fetchCursosAprobadosYCreditos = async () => {
      try {
        const response = await fetch('http://localhost:5000/cursosAprobadosYCreditos', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const result = await response.json();
          setCursos(result.cursos);
          setTotalCreditos(result.total_creditos);
        } else {
          alert('No se pudo obtener los cursos aprobados y créditos totales');
        }
      } catch (error) {
        console.error('Error al obtener cursos aprobados y créditos:', error);
      }
    };

    fetchUsuario();
    fetchCursosAprobadosYCreditos();
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
        // Volver a obtener los cursos aprobados y créditos totales
        const result = await fetch('http://localhost:5000/cursosAprobadosYCreditos', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await result.json();
        setCursos(data.cursos);
        setTotalCreditos(data.total_creditos);
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
      <h2 className="mb-4">Cursos Aprobados</h2>
      {cursos.length === 0 ? (
        <div className="alert alert-info">No tiene cursos aprobados.</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID del Curso</th>
              <th>Nombre del Curso</th>
              <th>Fecha de Aprobación</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id_curso}>
                <td>{curso.id_curso}</td>
                <td>{curso.nombre_curso}</td>
                <td>{new Date(curso.fecha_aprobacion).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3 className="mt-4">Créditos Totales</h3>
      <p>{totalCreditos} créditos</p>
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
