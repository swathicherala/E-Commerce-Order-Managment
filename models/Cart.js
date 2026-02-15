const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User is required'],
        ref: "User",
        unique: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Product is required"],
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }]
},{timestamps: true})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart