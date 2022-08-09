const express = require('express')
const router = express.Router()
const ClientController = require('../controllers/ClientController')

router.get('/', ClientController.home)
router.get('/:id', ClientController.homeTable)

module.exports = router