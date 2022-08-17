const express = require('express')
const exphbs = require('express-handlebars')
const app = express()


// WebSocket
const server = require('http').createServer(app)
const io = require('socket.io')(server)


// Importe de Rotas
const adminRoutes = require('./routes/adminRoutes')
const clientRoutes = require('./routes/clientRoutes')


// Template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


// Respostas do body
app.use(express.urlencoded({extended: true}))
app.use(express.json())


// Public Path
app.use(express.static('public'))


const conexaoCli =  (req, res, next) => {
    io.on('connection', async socket => {
        const id = req.params
        socket.broadcast.emit('mesaId', id)

        // Recebendo chamada do cli
        socket.on('chamada', chamada => {
            socket.broadcast.emit('chamadaCli', chamada)
        })

    })

    next()
}

const conexaoAdm =  (req, res, next) => {
    io.on('connection', socket => {
        console.log('Adm conectado!')
    })

    next()
}

// Rotas
app.use('/admin', conexaoAdm ,adminRoutes)
app.use('/client', conexaoCli ,clientRoutes)



server.listen(3000, () => console.log('Servidor de pé em: http://localhost:3000'))
