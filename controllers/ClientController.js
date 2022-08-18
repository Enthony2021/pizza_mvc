module.exports = class ClientController {
    static async homeTable (req, res) {
        
        const idTable = req.params.id
        
        res.render('client', {idTable})
    }
}