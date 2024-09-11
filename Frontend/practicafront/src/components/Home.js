import '../Styles/Styles.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';

function Home() {

    const [listaObjetos, setListaObjetos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        //logica para mostrar notificaciones (PENDIENTE)
    }, [navigate]);


    return (
        <div>
            <NavBar />
            
        </div>
    )
}

export default Home;
