import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    //Determinar variables para almacenar en el apartado
    const [carnet, setCarnet] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')

    //Definir la variable para navegar
    const Navegador = useNavigate()

    //Realizar la variable para los eventos del boton
    const handleSubmit = (event) => {
        //Definir qué es lo que almacenará al presionar el botón (se almacena todo en un json)
        event.preventDefault();
        
        const dataJson = {
            carnet: carnet,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            password: password
        }
        

        //-------FETCH
        fetch(`http://localhost:5000/registro`, {
            method: "POST", // Utiliza el método POST
            body: JSON.stringify(dataJson), // Convierte el objeto 'data' a formato JSON y lo envía en el cuerpo de la solicitud
            headers: {
                "Content-Type": "application/json", // Establece el tipo de contenido de la solicitud como JSON
            },
        })

            .then((response) => response.json())
            .then((res) => {
                const dataUser = res.mensaje
                console.log(dataUser)
                alert(dataUser)
                

                Navegador('/login')


            })
            .catch((error) => console.error(error))

            
    }

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
                                        placeholder="Ingrese su  carnet"
                                        onChange={(e) => setCarnet(e.target.value)}
                                        value={carnet}
                                    />
                                    <label>Carnet</label>
                                </div>
                                
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
                                <h6>Ya tienes una cuenta?</h6>
                                <h6><Link className="link text-skyblue" to="/login"> Inicia sesión </Link></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;