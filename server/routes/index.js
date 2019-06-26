const app = require('express')()

app.use(require('./usuario'))
app.use(require('./login'))

module.exports = app