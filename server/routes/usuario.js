const { Router } = require('express')
const router = Router()
const User = require('../models/Usuario')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const { verificaToken, verificaAdmin } = require('../middlewares/autenticacion')

router.get('/usuario', verificaToken, (req, res) => {
    let desde = req.query.desde || 0
    desde = Number(desde)

    let limite = req.query.limite || 5
    limite = Number(limite)

    User.find({ estado: true }, 'nombre email estado rol google img')
        .skip(desde)
        .limit(limite)
        .exec((err, docs) => {
            if (err)
                return res.status(400).json({ ok: false, err })
            User.countDocuments({ estado: true }, (err, count) => {
                if (err)
                    return res.status(400).json({ ok: false, err })
                res.json({
                    ok: true,
                    count,
                    usuarios: docs
                });
            })
        })
})

router.post('/usuario', verificaToken, verificaAdmin, (req, res) => {
    let body = req.body
    let user = new User({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        rol: body.rol,
        estado: body.estado,
        google: body.google
    })
    user.save((err, doc) => {
        if (err)
            return res.json({ ok: false, err })
        res.json({ ok: true, usuario: doc })
    })
})

router.delete('/usuario/:id', verificaToken, verificaAdmin, (req, res) => {
    let id = req.params.id
    User.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, doc) => {
        if (err)
            return res.status(400).json({ ok: false, err })
        res.json({ ok: true, usuario: doc })
    })
})

router.put('/usuario/:id', verificaToken,verificaAdmin, (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'rol', 'estado'])
    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, doc) => {
        if (err)
            return res.status(400).json({ ok: false, err })
        res.json({ ok: true, usuario: doc })
    })
})

module.exports = router