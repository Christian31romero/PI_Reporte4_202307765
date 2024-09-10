import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CrearPublicacion() {
    const [tipoPublicacion, setTipoPublicacion] = useState('Curso');
    const [cursos, setCursos] = useState([]);
    const [catedraticos, setCatedraticos] = useState([]);
    const [idCurso, setIdCurso] = useState('');
    const [idCatedratico, setIdCatedratico] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener cursos
        fetch('http://localhost:5000/getCursos')
            .then((response) => response.json())
            .then((data) => setCursos(data.cursos))
            .catch((error) => console.error('Error al obtener cursos:', error));
        
        // Obtener catedráticos
        fetch('http://localhost:5000/getCatedraticos')
            .then((response) => response.json())
            .then((data) => setCatedraticos(data.catedraticos))
            .catch((error) => console.error('Error al obtener catedráticos:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            tipo_publicacion: tipoPublicacion,
            id_curso: tipoPublicacion === 'Curso' ? idCurso : null,
            id_catedratico: tipoPublicacion === 'Catedratico' ? idCatedratico : null,
            mensaje: mensaje
        };

        fetch('http://localhost:5000/crearPubli', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data.mensaje);
            navigate('/home');
        })
        .catch((error) => console.error('Error al crear publicación:', error));
    };

    return (
        <div className="container">
            <h2 className="my-4">Crear Publicación</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="tipoPublicacion">Tipo de Publicación</label>
                    <select
                        id="tipoPublicacion"
                        className="form-control"
                        value={tipoPublicacion}
                        onChange={(e) => setTipoPublicacion(e.target.value)}
                    >
                        <option value="Curso">Curso</option>
                        <option value="Catedratico">Catedrático</option>
                    </select>
                </div>

                {tipoPublicacion === 'Curso' && (
                    <div className="form-group">
                        <label htmlFor="idCurso">Curso</label>
                        <select
                            id="idCurso"
                            className="form-control"
                            value={idCurso}
                            onChange={(e) => setIdCurso(e.target.value)}
                        >
                            <option value="">Selecciona un curso</option>
                            {cursos.map(curso => (
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
                            className="form-control"
                            value={idCatedratico}
                            onChange={(e) => setIdCatedratico(e.target.value)}
                        >
                            <option value="">Selecciona un catedrático</option>
                            {catedraticos.map(catedratico => (
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
                        className="form-control"
                        rows="3"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Crear Publicación</button>
            </form>
        </div>
    );
}

export default CrearPublicacion;
