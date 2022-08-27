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


io.on('connection', socket => {
        // Recebendo chamada do cli
        socket.on('chamada', chamada => {
            socket.broadcast.emit('chamadaCli', chamada)
        })

        socket.on('retorno', retorno => {
            socket.broadcast.emit('retornoAdm', retorno)
        })

})

// Rotas
app.use('/admin' ,adminRoutes)
app.use('/client' ,clientRoutes)



server.listen('https://pizzaatendimento.herokuapp.com/', () => console.log('Servidor de pé em: http://localhost:3000'))
