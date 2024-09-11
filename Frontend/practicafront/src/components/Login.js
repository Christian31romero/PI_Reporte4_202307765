import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Styles.css';

function Login() {
    const [carnet, setCarnet] = useState('');
    const [password, setPassword] = useState('');

    const Navegador = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Verificación de datos de administrador
        if (carnet === "202307765" && password === "admin") {
            
            alert("Inicio de sesión como administrador exitoso");
            Navegador('/admin'); // Redirige a la página de admin
            return; 
        }

        // Datos del usuario
        const dataJson = {
            carnet: carnet,
            password: password
        };

        fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify(dataJson),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.mensaje === 'Login exitoso') {
                localStorage.setItem('token', data.token);
                console.log(data.datos);
                alert(`Bienvenido`);
                Navegador('/home');
            } else {
                alert(data.mensaje);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Hubo un problema con el inicio de sesión');
        });
    };

    return (
        <div className="login-background">
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Inicio de sesión</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatInput"
                                            placeholder="Ingrese su carnet"
                                            onChange={(e) => setCarnet(e.target.value)}
                                            value={carnet}
                                        />
                                        <label>Carnet</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="floatInput"
                                            placeholder="Ingrese su contraseña"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        />
                                        <label>Contraseña</label>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                                        <h6><Link className="link text-skyblue" to="/register"> Registrarse </Link></h6>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

