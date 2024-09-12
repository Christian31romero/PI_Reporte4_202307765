import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from './NavBar';

function Comentarios() {
    const { id_publicacion } = useParams();
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        obtenerComentarios(); 
    }, [id_publicacion]);

    // Función para obtener los comentarios desde el backend
    const obtenerComentarios = () => {
        fetch(`http://localhost:5000/obtenerComentarios/${id_publicacion}`)
            .then((res) => res.json())
            .then((data) => {
                setComentarios(data.comentarios);
            })
            .catch((err) => {
                console.error('Error al obtener comentarios:', err);
                setError('Error al obtener los comentarios');
            });
    };

    // Función para enviar un comentario
    const enviarComentario = () => {
        const token = localStorage.getItem('token');  // Suponiendo que el token está en localStorage
        fetch(`http://localhost:5000/crearComentario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_publicacion, comentario: nuevoComentario })
        })
        .then(res => res.json())
        .then(() => {
            obtenerComentarios();  // Actualizar los comentarios después de enviar uno nuevo
            setNuevoComentario('');  // Limpiar el campo de texto
        })
        .catch(err => {
            console.error('Error al enviar comentario:', err);
        });
    };

    return (
        <div>
            <NavBar />

            <div className="container mt-5">
                <h2>Comentarios</h2>

                {error && <p className="text-danger">{error}</p>}

                <textarea
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    placeholder="Escribe un comentario..."
                    className="form-control mb-2"
                />
                <button onClick={enviarComentario} className="btn btn-primary">Enviar comentario</button>

                <div className="list-group mt-4">
                    {comentarios.map((comentario, index) => (
                        <div key={index} className="list-group-item">
                            <p>{comentario.comentario}</p>
                            <small className="text-muted">Publicado por: {comentario.carnet}, Fecha: {new Date(comentario.fecha_creacion).toLocaleString()}</small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Comentarios;
