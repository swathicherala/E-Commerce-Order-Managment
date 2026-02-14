const mongoose = require('mongoose')

const connection = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL)
        console.log('Mongodb is connected successfully')
    } catch (error) {
        console.log('MongoDB connection failed:', error.message)
        process.exit(1)
    }
}

module.exports = connection