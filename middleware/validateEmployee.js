const jwt = require('jsonwebtoken')
const validateEmployee = (req, res, next) => {
    try {
        const token = req.cookies.employeeToken
        if (!token) {
            return res.clearCookie('employeeToken').redirect('/employee/login')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        return next()
    } catch (error) {
        console.log(error)
        return res.clearCookie('employeeToken').redirect('/employee/login')
    }
}

module.exports = validateEmployee