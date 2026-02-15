const express = require('express')
const router = express.Router()
const {addToCart, incrementQuantity, decrementQuantity, removeItemFromCart, viewCart} = require('../controllers/cartController')
const authentication = require('../middlewares/auth')
// const adminMiddleware = require('../middlewares/admin')

//Public route
// router.get('/:id', getProductById)

//Private route
router.get('/',authentication, viewCart)
router.post('/', authentication,addToCart)
router.put('/increment/:id', authentication,incrementQuantity)
router.put('/decrement/:id', authentication,decrementQuantity)
router.delete('/:id', authentication,removeItemFromCart)

module.exports = router
