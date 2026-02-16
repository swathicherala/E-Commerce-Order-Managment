const Order = require('../models/Orders')
const User = require('../models/User')
const Product = require('../models/Products')
const Cart = require('../models/Cart')

//User create order
const createSelectedProductsOrder = async (req, res) => {
  try {
    const { productIds } = req.body
    const userId = req.user.id

    const cart = await Cart.findOne({ userId })
      .populate("items.productId", "name price stock")

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }
    console.log('ProductIddd', productIds)
    // Filter only selected products
    const selectedItems = cart.items.filter(item =>
      productIds.includes(item.productId._id.toString())
    )
    console.log('Selecteddd', selectedItems)

    if (selectedItems.length === 0) {
      return res.status(404).json({ message: "Selected products not found in cart" })
    }

    let totalAmount = 0

    const orderItems = selectedItems.map(item => {
      const price = item.productId.price
      totalAmount += price * item.quantity

      return {
        productId: item.productId._id,
        quantity: item.quantity,
        priceAtPurchase: price
      }
    })

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount
    })

    // Remove only ordered products from cart
    cart.items = cart.items.filter(item =>
      !productIds.includes(item.productId._id.toString())
    )

    await cart.save()

    return res.status(201).json(order)

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message })
  }
}

module.exports = {
    createSelectedProductsOrder,
}