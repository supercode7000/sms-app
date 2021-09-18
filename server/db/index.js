const mongoose = require('mongoose')
const Data = require('../models/data-model')
// import the json file
const datas = require('../data/data')

mongoose
    .connect('mongodb://mongo:27017/sms', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })
// Seed the Database sms with the json file
Data.collection.drop();
Data.create(datas)
    .then(() => console.log("Database Seeded"))
    .catch((error) => console.log(`Database not Seeded: ${error}`));
const db = mongoose.connection

module.exports = db