const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    description: {
        type: String,
        minlength: [5, 'Product must be at least 10 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    category: {
        type: String,
        required: [true, 'Price is required'],
        enum: {
            values: ['Men', 'Women', 'Electronics', 'Children', 'Home'],
            message: 'Invalid category'
        }
    },
},{timestamps: true})

const Product = mongoose.model('Product', productSchema)
module.exports = Product