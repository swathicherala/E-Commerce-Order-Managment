const jwt = require('jsonwebtoken')

const authentication = async (req,res,next) => {
    try {
        let authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "Authorization token required" })
        }
        let token = authHeader.split(" ")[1]
        let decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

module.exports = authentication