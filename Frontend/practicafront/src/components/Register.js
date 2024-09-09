import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    // Determinar variables para almacenar los datos del formulario
    const [carnet, setCarnet] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    // Definir la variable para la navegación
    const Navegador = useNavigate();

    // Manejar el evento de envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();

        const dataJson = {
            //carnet: carnet,
            name: nombre,
            lname: apellido,
            email: correo,
            password: password
        };

        // Enviar la solicitud al backend
        fetch('http://localhost:5000/registro', {
            method: "POST", 
            body: JSON.stringify(dataJson), 
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.json();
            })
            .then((res) => {
                const mensaje = res.mensaje;
                console.log(mensaje);
                alert(mensaje); // Mostrar el mensaje de registro exitoso

                // Redirigir al usuario a la página de inicio de sesión
                Navegador('/login');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Hubo un problema con el registro.');
            });
    };

    return (
        <div className="container-fluid h-100">
            <div className="row align-items-center h-100">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Registrarse</h2>
                            <form onSubmit={handleSubmit}>
                                
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatInput"
                                        placeholder="Ingrese su nombre"
                                        onChange={(e) => setNombre(e.target.value)}
                                        value={nombre}
                                    />
                                    <label>Nombre</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatInput"
                                        placeholder="Ingrese su apellido"
                                        onChange={(e) => setApellido(e.target.value)}
                                        value={apellido}
                                    />
                                    <label>Apellido</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatInput"
                                        placeholder="Ingrese su correo"
                                        onChange={(e) => setCorreo(e.target.value)}
                                        value={correo}
                                    />
                                    <label>Correo</label>
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
                                    <button type="submit" className="btn btn-success">Registrarse</button>
                                </div>
                            </form>
                            <div>
                                <h6>¿Ya tienes una cuenta?</h6>
                                <h6><Link className="link text-skyblue" to="/login">Inicia sesión</Link></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
