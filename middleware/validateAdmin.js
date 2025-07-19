const jwt = require('jsonwebtoken')
const validateAdmin = (req, res, next) => {
    try {
        const token = req.cookies.adminToken
        if (!token) {
            return res.clearCookie('adminToken').redirect('/admin/login')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        return next()
    } catch (error) {
        console.log(error)
        return res.clearCookie('adminToken').redirect('/admin/login')
    }
}

module.exports = validateAdmin