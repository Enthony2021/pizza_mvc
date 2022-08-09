const express = require('express')
const exphbs = require('express-handlebars')
const app = express()


module.exports = class AdminController {
    static home(req, res) {
        
        res.render('admin/home')
    }
}