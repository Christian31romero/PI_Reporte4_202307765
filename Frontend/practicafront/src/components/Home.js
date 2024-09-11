import '../Styles/Styles.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';

function Home() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [filtroCurso, setFiltroCurso] = useState('');
    const [filtroCatedratico, setFiltroCatedratico] = useState('');
    const [nombreCurso, setNombreCurso] = useState('');
    const [nombreCatedratico, setNombreCatedratico] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        obtenerPublicaciones(); 
    }, []);

    // Función para obtener las publicaciones desde el backend
    const obtenerPublicaciones = () => {
        let query = `?filtroCurso=${filtroCurso}&filtroCatedratico=${filtroCatedratico}&nombreCurso=${nombreCurso}&nombreCatedratico=${nombreCatedratico}`;
        
        fetch(`http://localhost:5000/getPublicaciones${query}`)
            .then((res) => res.json())
            .then((data) => {
                setPublicaciones(data.publicaciones);
            })
            .catch((err) => {
                console.error('Error al obtener publicaciones:', err);
                setError('Error al obtener las publicaciones');
            });
    };

    // Función para aplicar filtros
    const aplicarFiltros = (e) => {
        e.preventDefault();
        obtenerPublicaciones();
    };

    return (
        <div>
            <NavBar />

            <div className="container mt-5">
                <h2>Publicaciones</h2>
                
                <form onSubmit={aplicarFiltros} className="mb-4">
                    <div className="form-group">
                        <label>Filtrar por Curso</label>
                        <input
                            type="text"
                            className="form-control"
                            value={filtroCurso}
                            onChange={(e) => setFiltroCurso(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Filtrar por Catedrático</label>
                        <input
                            type="text"
                            className="form-control"
                            value={filtroCatedratico}
                            onChange={(e) => setFiltroCatedratico(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Buscar por nombre del curso</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nombreCurso}
                            onChange={(e) => setNombreCurso(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Buscar por nombre del catedrático</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nombreCatedratico}
                            onChange={(e) => setNombreCatedratico(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Aplicar Filtros</button>
                </form>

                {error && <p className="text-danger">{error}</p>}

                <div className="list-group">
                    {publicaciones.map((pub) => (
                        <div key={pub.id_publicacion} className="list-group-item">
                            <h5>{pub.tipo_publicación === 'Curso' ? pub.nombre_curso : pub.nombre_catedratico}</h5>
                            <p>Publicación de: {pub.carnet}</p>
                            <p>{pub.mensaje}</p>
                            <small className="text-muted">Fecha de creación: {new Date(pub.fecha_creacion).toLocaleString()}</small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
