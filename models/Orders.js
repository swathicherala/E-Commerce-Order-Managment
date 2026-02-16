const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User is required'],
        ref: "User"
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
        },
        priceAtPurchase: {
            type: Number,
            required: [true, 'Price of amount is required']
        }
    }],
    totalAmount: {
        type: Number,
        required: [true, 'Total Amount is required']
    },
    status: {
        type: String,
        enum: ["placed","shipped","delivered","cancelled"],
        default: "placed"
    }
},{timestamps: true})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order