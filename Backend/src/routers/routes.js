const express = require('express')

const router = express.Router()


const {SignUp, Login,} = require('../controllers/accesos')

//GET


//Post
router.post('/registro', SignUp)
router.post('/login', Login)



//Put


//DELETE


module.exports= router 