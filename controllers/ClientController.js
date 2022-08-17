module.exports = class ClientController {
    static async homeTable (req, res) {

        const idTable = req.params.id

        console.log('mesa ' + idTable +  ' conectada!')
        res.render('client', {idTable})
    }
}