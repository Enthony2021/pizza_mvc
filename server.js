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

// Client Connection middleware
const clientConnection = (req, res, next) => {
    io.on('connection', socket => {   

        socket.broadcast.emit('mesaId', `${req.params.id}`)
    })

    next()
}

const adminConnection = (req, res, next) => {
    io.on('connection', socket => {
        console.log('Admin connectado!')
    })

    next()
}


// Rotas
app.use('/admin', adminConnection,adminRoutes)
app.use('/client', clientConnection, clientRoutes)



server.listen(3000, () => console.log('Servidor de pé em: http://localhost:3000'))
