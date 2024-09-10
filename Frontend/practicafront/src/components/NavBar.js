import React from "react";
import '../Styles/Styles.css'
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from "react-router-dom";

function NavBar() {

    //const [cookies, setCookies, removeCookie] = useCookies(['usuario'])

    const navigate = useNavigate();

    const handleLogout = () => {
        //removeCookie('usuario');
        navigate('/login');
    };

    //PENDIENTE POR HACER
    const handlePerfil = () => {
        navigate('/');
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
                <button className="btn btn-outline-info " onClick={handleLogout}>
                    Logout
                </button>
                <h1>.</h1>
                <button className="btn btn-outline-info logout-btn" onClick={handlePerfil}>
                    Perfil
                </button>
            </div>
        </div>
    )
}

export default NavBar;