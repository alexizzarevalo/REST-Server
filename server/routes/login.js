const { Router } = require('express')
const router = Router()
const User = require('../models/Usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
    let body = req.body
    User.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err)
            return res.status(500).json({ ok: false, err })
        if (!usuarioDB)
            return res.status(400).json({ ok: false, err: { message: '(Usuario) o contraseña incorrectos' } })
        if (!bcrypt.compareSync(body.password, usuarioDB.password))
            return res.status(400).json({ ok: false, err: { message: 'Usuario o (contraseña) incorrectos' } })

        let token = jwt.sign({
            data: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })
    })
})

module.exports = router