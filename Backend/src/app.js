const express = require('express')
const cors = require('cors')

const MyApp = express();

const bodyParser = require('body-parser'); 
MyApp.use(bodyParser.json({ limit: '15mb' }));

MyApp.use(express.json())
MyApp.use(cors()) 

//--------
const Router = require('./routers/routes')
MyApp.use(Router)
//--------

const port = 5000;

MyApp.listen(port, () =>{
    console.log(`The API is listening at http://localhost:${port}`);
});