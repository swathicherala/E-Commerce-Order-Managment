const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("./models/User")
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" })
    if (existingAdmin) {
      console.log("Admin already exists")
      process.exit()
    }

    const hashedPassword = await bcrypt.hash("admin123", 10)

    await User.create({
      name: "Super Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    })

    console.log("Admin created successfully")
    process.exit()

  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

seedAdmin()