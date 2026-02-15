const User = require('../models/User')
const Product = require('../models/Products')
const Cart = require('../models/Cart')

//Product add to cart by user
const addToCart = async(req,res) => {
    try {
        const userId = req.user.id
        console.log('User', userId)
        const {productId, quantity} = req.body
        if(!quantity || quantity < 1){
            return res.status(400).json({message:"Quantity must at least 1"})
        }

        //Check if product exists
        const product = await Product.findById(productId)
        if(!product){
           return res.status(400).json({message:"Product not found"})
        }

        //Find user's cart
        let cart = await Cart.findOne({userId})

        //If cart does not exist -> create a new cart
        if(!cart){
            cart = await Cart.create({
                userId,
                items: [{productId, quantity}]
            })
            res.status(201).json(cart)
        }

        //Check if product already exist in cart
        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        )
        if(itemIndex > -1){
            //Product exist -> increase quantity
            cart.items[itemIndex].quantity += quantity
        }else{
            //Push new product in cart
            cart.items.push({productId, quantity})
        }
        await cart.save()
        await cart.populate("items.productId", "name price")
        return res.status(200).json(cart)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

//Increment the quantity
const incrementQuantity = async(req,res) => {
    try {
        const productId = req.params.id
        const userId = req.user.id
        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.status(404).json({message:"Cart not found"})
        }
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        if(itemIndex > -1){
            cart.items[itemIndex].quantity += 1
            await cart.save()
            await cart.populate("items.productId", "name price")
            return res.status(200).json(cart.items[itemIndex])
        }
        return res.status(404).json({message: "Quantity is not updated"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

//Decrement the quantity
const decrementQuantity = async(req,res) => {
    try {
        const productId = req.params.id
        const userId = req.user.id
        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.status(404).json({message:"Cart not found"})
        }
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        if(cart.items[itemIndex].quantity > 1){
            cart.items[itemIndex].quantity -= 1
        }else{
            // Remove item if quantity becomes 0
            cart.items.splice(itemIndex, 1)
        }
        await cart.save()
        await cart.populate("items.productId", "name price")
        return res.status(200).json(cart.items[itemIndex])
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

//Remove product from the cart
const removeItemFromCart = async(req,res) => {
    try {
        const userId = req.user.id
    if(!userId){
        return res.status(400).json({message:"User not found"})
    }

    //Find the cart from userId
    const cart = await Cart.findOne({userId})
    if(!cart){
        return res.status(404).json({message:"Cart not found"})
    }
    console.log('Cart', cart)
    const productId = req.params.id
    //Find the index of product want to remove
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
    //Check whether the index greater then -1 because array index starts from 0
    if(itemIndex > -1){
        cart.items.splice(itemIndex,1)
        await cart.save()
        return res.status(200).json({message:"Item removed successfully"})
    }else{
        return res.status(404).json({message:"Item not found"})
    }
    } catch (error) {
        return res.status(500).json({message:"Internal Serve Error"})
    }
}

//View cart
const viewCart = async(req,res) => {
    try{
        const userId = req.user.id
        const cart = await Cart.findOne({userId})
        .populate("items.productId", "name price")
        if(!cart){
            return res.status(404).json({message:"Cart not found"})
        }
        return res.status(200).json(cart)
    }catch(error){
        return res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItemFromCart,
    viewCart
}