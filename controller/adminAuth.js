const Admin = require('../model/Admin')
const generateid = require('../utils/generateId')

exports.getLogin = (req, res) => {
    try {
        return res.render('login', { msg: '' })
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const finder = await Admin.findOne({ email })
        if (!finder) {
            return res.render('login', { msg: 'invalid email' })
        }
        const validate = await finder.validateAdminPassword(password)
        if (!validate) {
            return res.render('login', { msg: 'incorrect password' })
        }
        const token = finder.createAdminToken()
        return res.cookie('adminToken', token, { httpOnly: true }).redirect('/admin')
    } catch (error) {
        console.log(error)
    }
}

exports.logout = (req, res) => {
    return res.clearCookie('adminToken').redirect('/admin/login')
}