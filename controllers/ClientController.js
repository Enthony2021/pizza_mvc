module.exports = class ClientController {
    static home (req, res) {
        res.render('client/home')
    }

    static homeTable (req, res) {
        const idTable = req.params.id

        console.log('mesa ' + idTable +  ' conectada!')
        res.render('client/home', {idTable})
    }
}