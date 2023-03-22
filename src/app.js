const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const connect = require('./config/database');
const {PORT} = require('./config/index');
const ApiRoutes = require('./routes/index');
const Collection = require('./repository/collectionRepo');
const collectionRepo = new Collection();


const setUpAndStartServer = async()=> {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',ApiRoutes);
    await connect();

    app.listen(PORT, async() => {
        console.log(`Server Started at ${PORT}`);
      
    })
}

setUpAndStartServer();