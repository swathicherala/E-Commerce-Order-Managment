const express = require('express')
const router = express.Router()
const {createProducts, getProducts, getProductById, updateProduct, deleteProduct} = require('../controllers/productController')
const authentication = require('../middlewares/auth')
const adminMiddleware = require('../middlewares/admin')

//Public route
router.get('/', getProducts)
router.get('/:id', getProductById)

//Private route
router.post('/', authentication,adminMiddleware,createProducts)
router.put('/:id', authentication,adminMiddleware,updateProduct)
router.delete('/:id', authentication,adminMiddleware,deleteProduct)

module.exports = router
