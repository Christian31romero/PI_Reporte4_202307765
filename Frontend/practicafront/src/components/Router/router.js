import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login'
import Register from '../Register';
import Home from '../Home';
import CrearPublicacion from '../CrearPubli';
import PerfilUsuario from '../PerfilUsuario'
import Comentarios from '../Comentarios';

function Router(){
    return(
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Navigate to="/login"/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/crearP' element={<CrearPublicacion/>} />
                <Route path='/perfil/:carnet' element={<PerfilUsuario/>} />
                <Route path='/comentarios/:id_publicacion' element={<Comentarios/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;