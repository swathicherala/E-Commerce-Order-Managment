const Product = require('../models/Products')

//Create products
const createProducts = async (req,res) => { 
   try {
    const {name,description,price,stock,category} = req.body
    if (!name || !price || !category) {
     return res.status(400).json({ message: "Required fields missing" })
    }
    const product = await Product.create({
        name, description, price, stock, category
    })
    res.status(201).json({
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category
    })
   } catch (error) {
    res.status(500).json({ message: error.message })
   }
}

//Get products 
const getProducts = async (req,res) => { 
   try {
    const products = await Product.find()
    if(!products){
        return res.status(404).json({message:'Products not found'})
    }
    res.status(201).json(products)
   } catch (error) {
    res.status(500).json({ message: error.message })
   }
}

// Get products by id
const getProductById = async (req,res) => { 
   try {
    const id = req.params.id
    const product = await Product.findById(id)
    if(!product){
        return res.status(404).json({message:'Product not found'})
    }
    res.status(201).json(product)
   } catch (error) {
    res.status(500).json({ message: error.message })
   }
}

//Update product by id only by admin
const updateProduct = async (req,res) => { 
   try {
    const id = req.params.id
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body }, 
      { new: true, runValidators: true }
    )
    if(!updatedProduct){
        return res.status(404).json({message:"Product not found"})
    }
    res.status(200).json(updatedProduct)
   } catch (error) {
    res.status(500).json({ message: error.message })
   }
}

//Delete product by id only by admin
const deleteProduct = async (req,res) => { 
   try {
    const id = req.params.id
    const deletedProduct = await Product.findByIdAndDelete(id)
    if(!deletedProduct){
        return res.status(404).json({message:"Product not found"})
    }
    res.status(200).json({message:"Product deleted successfully"})
   } catch (error) {
    res.status(500).json({ message: error.message })
   }
}

module.exports = { 
    createProducts,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
 }