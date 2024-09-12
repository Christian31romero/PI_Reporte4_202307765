// en NavBar.js
import React, { useState } from "react";
import '../Styles/Styles.css'
import { useNavigate, Link } from "react-router-dom";

function NavBar() {
    const [carnetBuscado, setCarnetBuscado] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleBuscarUsuario = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/buscarUsuario/${carnetBuscado}`);
            if (response.ok) {
                const result = await response.json();
                navigate(`/perfil/${carnetBuscado}`);
            } else {
                alert('Usuario no encontrado');
            }
        } catch (error) {
            console.error('Error al buscar usuario:', error);
            alert('Error al buscar usuario');
        }
    };

    return (
        <div className="container-navbar">
            <div className="left-container-navbar">
                <h1 style={{ color: "white" }}>USAC</h1>
                <h1>.</h1>
                <ul className="link-list">
                    <li className="link-list-item">
                        <Link className="link" to="/crearP"> Crear publicación</Link> 
                    </li>
                </ul>
            </div>
            <div className="right-container-navbar">
                <form onSubmit={handleBuscarUsuario} className="form-inline">
                    <input
                        type="text"
                        className="form-control mr-sm-2"
                        placeholder="Buscar usuario por carnet"
                        value={carnetBuscado}
                        onChange={(e) => setCarnetBuscado(e.target.value)}
                        required
                    />
                    <button className="btn btn-outline-info my-2 my-sm-0" type="submit">
                        Buscar
                    </button>
                </form>
                <button className="btn btn-outline-info" onClick={handleLogout}>
                    Logout
                </button>
                <h1>.</h1>
                <button className="btn btn-outline-info">
                    Perfil
                </button>
            </div>
        </div>
    )
}

export default NavBar;
