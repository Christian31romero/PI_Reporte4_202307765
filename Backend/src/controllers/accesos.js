const { list_users } = require('../DataList/DataList')
const { Usuario } = require('../objects/Usuario')


function SignUp(req, res) {
    try {
        const {carnet, nombre, apellido, correo, password } = req.body
        

        const usuarioExiste = list_users.find(x_user => x_user.carnet === carnet)

        if (usuarioExiste) {
            return res.json({ error: "El usuario ya está registrado" })
        }

        const newUser = new Usuario(carnet, nombre, apellido, correo, password)
        

        list_users.push(newUser)

        return res.json({ mensaje: "Usuario agregado correctamente con el carnet: " + carnet })


    } catch (error) {
        console.log(error)
        return res.json(
            {
                error: "Ocurrió un error en el registro"
            }
        )
    }
}



function Login(req, res) {
    try {
        const carnetR = req.body.carnet
        const passwordR = req.body.password
        const usuarioEncontrado = list_users.find(x_user => x_user.carnet === carnetR && x_user.password === passwordR)
        if (usuarioEncontrado) {
            const userFind = {
                carnet: usuarioEncontrado.carnet,
                nombre: usuarioEncontrado.nombre,
                apellido: usuarioEncontrado.apellido,
                correo: usuarioEncontrado.correo

            }

            res.json({
                encontrado: true,
                datos: userFind

            })
        } else {
            res.json({
                encontrado: false,
                error: "Credenciales incorrectas"
            })
        }
    } catch (error) {
        console.log(error)
        return res.json(
            {
                error: "Ocurrió un error en el login"
            }
        )
    }
}


module.exports = {
    SignUp,
    Login
}

