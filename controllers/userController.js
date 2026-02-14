const User = require('../models/User')

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

module.exports = {
    registration
}