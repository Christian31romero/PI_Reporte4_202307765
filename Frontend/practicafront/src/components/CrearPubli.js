import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CrearPublicacion() {
  const [tipoPublicacion, setTipoPublicacion] = useState('');
  const [idCurso, setIdCurso] = useState('');
  const [idCatedratico, setIdCatedratico] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cursos, setCursos] = useState([]);
  const [catedraticos, setCatedraticos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch de cursos
    fetch('http://localhost:5000/getCursos')
      .then((res) => res.json())
      .then((data) => setCursos(data.cursos))
      .catch((err) => console.error(err));

    // Fetch de catedraticos
    fetch('http://localhost:5000/getCatedraticos')
      .then((res) => res.json())
      .then((data) => setCatedraticos(data.catedraticos))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const publicacionData = {
      tipo_publicacion: tipoPublicacion,
      id_curso: tipoPublicacion === 'Curso' ? idCurso : null,
      id_catedratico: tipoPublicacion === 'Catedratico' ? idCatedratico : null,
      mensaje,
    };

    const token = localStorage.getItem('token'); // Obtener el token desde localStorage

    try {
      const response = await fetch('http://localhost:5000/crearPubli', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, //Bearer por si no funciona
        },
        body: JSON.stringify(publicacionData),
      });

      const result = await response.json();
      if (response.ok) {
        navigate('/home'); 
      } else {
        setError(result.mensaje);
      }
    } catch (error) {
      setError('Error al crear la publicación');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="tipoPublicacion">Tipo de Publicación</label>
        <select
          id="tipoPublicacion"
          value={tipoPublicacion}
          onChange={(e) => setTipoPublicacion(e.target.value)}
          className="form-control"
          required
        >
          <option value="">Selecciona un tipo</option>
          <option value="Curso">Curso</option>
          <option value="Catedratico">Catedrático</option>
        </select>
      </div>

      {tipoPublicacion === 'Curso' && (
        <div className="form-group">
          <label htmlFor="idCurso">Curso</label>
          <select
            id="idCurso"
            value={idCurso}
            onChange={(e) => setIdCurso(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Selecciona un curso</option>
            {cursos.map((curso) => (
              <option key={curso.id_curso} value={curso.id_curso}>
                {curso.nombre_curso}
              </option>
            ))}
          </select>
        </div>
      )}

      {tipoPublicacion === 'Catedratico' && (
        <div className="form-group">
          <label htmlFor="idCatedratico">Catedrático</label>
          <select
            id="idCatedratico"
            value={idCatedratico}
            onChange={(e) => setIdCatedratico(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Selecciona un catedrático</option>
            {catedraticos.map((catedratico) => (
              <option key={catedratico.id_catedratico} value={catedratico.id_catedratico}>
                {catedratico.nombre_catedratico}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="form-control"
          required
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit" className="btn btn-primary">
        Crear Publicación
      </button>
    </form>
  );
}

export default CrearPublicacion;
