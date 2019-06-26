//Puerto donde se levantara el servidor
process.env.PORT = process.env.PORT || 3000

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//URL Base de datos
let urlDB
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
}else{
    urlDB = process.env.mongo_URI
}

process.env.URLMONGODB = urlDB

//TOKEN-CADUCIDAD
process.env.CADUCIDAD = 60 * 60 * 24

//TOKEN-SECRET
process.env.SEED = process.env.SEED || 'mi-secreto-desarrollo'