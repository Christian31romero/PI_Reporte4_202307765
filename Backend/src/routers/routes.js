const express = require('express')

const router = express.Router()


const {login, registro,} = require('../controllers/accesos')

//GET


//Post
router.post('/registro', registro)
router.post('/login', login)



//Put


//DELETE


module.exports= router 