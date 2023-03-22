const mongoose = require('mongoose');
const { DBPASS ,DBUSER, DBNAME } = require('./index');


const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${DBUSER}:${DBPASS}@cluster0.i2tedho.mongodb.net/${DBNAME}?retryWrites=true&w=majority`);
    } catch (err) {
        console.log(`Error in connecting the database ${err}`);
    }
}

module.exports = connect;