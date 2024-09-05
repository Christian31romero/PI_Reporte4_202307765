class Usuario{
    constructor(carnet, nombre, apellido, correo, password){
        this.carnet = carnet
        this.nombre = nombre
        this.apellido = apellido
        this.correo =correo
        this.password = password
    }

    probar(){
        console.log(`Hola soy ${this.nombre} de carnet ${this.carnet}`)
    }
}

module.exports = {
    Usuario
}