const mongoose = require('mongoose')
require('colors')

mongoose.connect(process.env.URLMONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}, (err) => {
    if (err) throw err
    console.log('Base de datos conectada'.green);
})