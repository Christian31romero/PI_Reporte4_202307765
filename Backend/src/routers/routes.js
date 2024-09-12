const express = require('express')
const router = express.Router()
const {login, registro,} = require('../controllers/accesos')
const {crearPublicacion, obtenerPublicaciones} = require('../controllers/publicaciones')
const { getCursos, getCatedraticos } = require('../controllers/gets');
const {buscarUsuario} = require('../controllers/usuarios')
const {obtenerCursosAprobados} = require('../controllers/cursos')
const {crearComentario, obtenerComentarios} = require('../controllers/comentarios')

//GET
router.get('/getCursos', getCursos);
router.get('/getCatedraticos', getCatedraticos);
router.get('/getPublicaciones' , obtenerPublicaciones)
router.get('/buscarUsuario/:carnet', buscarUsuario)
router.get('/cursosAprobados/:carnet', obtenerCursosAprobados)
router.get('/obtenerComentarios/:id_publicacion' , obtenerComentarios)

//Post
router.post('/registro', registro)
router.post('/login', login)
router.post('/crearPubli', crearPublicacion)
router.post('/crearComentario' , crearComentario)



//Put


//DELETE


module.exports= router 