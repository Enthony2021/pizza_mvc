const express = require('express')
const exphbs = require('express-handlebars')
const app = express()


// WebSocket
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// Import função socket para conecxão
const socketio = require('./public/js/socketioConnection')

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


// Rotas
app.use('/admin', adminRoutes)
app.use('/client', clientRoutes)


// Socket.io
io.on('connection', socket => {
    socketio(socket)
})

server.listen(3000, () => console.log('Servidor de pé em: http://localhost:3000'))
