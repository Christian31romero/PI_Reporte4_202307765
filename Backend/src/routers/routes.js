const express = require('express')
const router = express.Router()
const {login, registro,} = require('../controllers/accesos')
const {crearPublicacion} = require('../controllers/publicaciones')
const { getCursos, getCatedraticos } = require('../controllers/gets');

//GET
router.get('/getCursos', getCursos);
router.get('/getCatedraticos', getCatedraticos);

//Post
router.post('/registro', registro)
router.post('/login', login)
router.post('/crearPubli', crearPublicacion)



//Put


//DELETE


module.exports= router 