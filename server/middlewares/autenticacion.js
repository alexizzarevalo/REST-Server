const jwt = require('jsonwebtoken')

//Verificar Token

let verificaToken = (req, res, next) => {
    let token = req.get('Authorization')
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.usuario = decoded.data
        next()
    }) 
}

let verificaAdmin = (req, res, next) => {
    let usuario = req.usuario
    if(usuario.rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            ok: false,
            err: 'El usuario no es un administrador'
        })
    }else{
        next()
    }
}

module.exports = {
    verificaToken,
    verificaAdmin
}