const jwt = require('jsonwebtoken')

const authentication = async (req,res,next) => {
    let authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(400).json({message: "Auth header is required"})
    }
    try {
        let token = authHeader.split(" ")[1]
        let decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        console.log('Req user', req.user)
        next()
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = authentication