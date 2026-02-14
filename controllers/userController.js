const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//Registration based on admin or user
const registration = async(req,res) => {
    const {name, email, password} = req.body
    //Check if the user already exists
    const user = await User.findOne({email})
    if(user){
        res.status(400).json({message:'User already exists'})
    }

    const newUser = await User.create({
        name, email, password
    })
    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        })
    }else{
        res.status(400).json({message:'User not created'})
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Verify password
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Generate token (after verification)
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role   // include role for RBAC
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    )

    // Send response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    })

  } catch (error) {
    console.log('Errrororor')
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
    registration,
    login
}