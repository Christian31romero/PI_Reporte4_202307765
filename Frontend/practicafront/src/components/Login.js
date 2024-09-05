import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import '../Styles/Styles.css'
function Login() {
    const [carnet, setCarnet] = useState('')
    const [password, setPassword] = useState('')

    const [cookies, setCookies] = useCookies(['usuario'])

    const Navegador = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        if(carnet==="202307765" && password==="admin"){
            Navegador('/admin') // opción para iniciar como admin (pendiente)
        }else{
            
            const dataJson = {
                carnet: carnet,
                password: password
            }
            //-+-+-+-+-+-+-+-+-FETCH
            fetch(`http://localhost:5000/login`, {
                method: "POST", // Utiliza el método POST
                body: JSON.stringify(dataJson), // Convierte el objeto 'data' a formato JSON y lo envía en el cuerpo de la solicitud
                headers: {
                    "Content-Type": "application/json", // Establece el tipo de contenido de la solicitud como JSON
                },
            })
    
                .then((response) => response.json())
                .then((res) => {
                    if (res.encontrado === true) {
                        const dataUser = res.datos
                        console.log(dataUser)
                        alert(`Bienvenido ${dataUser.nombre}`)
                        setCookies('usuario', dataUser)
                        Navegador('/home')
                    } else {
                        alert("Credenciales incorrectas")
                    }
    
                })
                .catch((error) => console.error(error))
        }
        
        //-+-++-+-+--+-+-+-+--+-+
    }


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
    )
}


export default Login;