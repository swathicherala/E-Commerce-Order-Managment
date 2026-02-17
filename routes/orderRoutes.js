const express = require('express')
const router = express.Router()
const {createSelectedProductsOrder, getOrders} = require('../controllers/orderController')
const authentication = require('../middlewares/auth')
const adminMiddleware = require('../middlewares/admin')

//Public route
router.get('/', authentication, getOrders)

//Private route
router.post('/', authentication,createSelectedProductsOrder)

module.exports = router
