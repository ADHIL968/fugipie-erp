const jwt = require('jsonwebtoken')
const validateClient = (req, res, next) => {
    try {
        const token = req.cookies.clientToken
        if (!token) {
            return res.clearCookie('clientToken').redirect('/login')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        return next()
    } catch (error) {
        console.log(error)
        return res.clearCookie('clientToken').redirect('/login')
    }
}

module.exports = validateClient