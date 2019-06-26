const mongoose = require('mongoose')
const {Schema} = mongoose
var uniqueValidator = require('mongoose-unique-validator')

let roles = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es necesario']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.methods.toJSON = function(){
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

usuarioSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Usuario',usuarioSchema)