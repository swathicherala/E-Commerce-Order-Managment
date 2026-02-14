const express = require('express')
const router = express.Router()
const {registration} = require('../controllers/userController')

router.post('/', registration)

module.exports = router
