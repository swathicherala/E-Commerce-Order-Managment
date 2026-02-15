const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
//Mongodb Connection
const dbConnection = require('./config/dbConnect')
dbConnection()
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const cartRouter = require('./routes/cartRoutes')
const PORT = process.env.PORT

app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.get('/',(req,res)=>{
    res.send('Welcome to Order Management')
})

app.listen(PORT,()=>{
    console.log(`Server runs on PORT ${PORT}`)
})