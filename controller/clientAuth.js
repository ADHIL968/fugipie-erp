const generateid = require('../utils/generateId')
const Client = require('../model/Client')

exports.getLogin = (req, res) => {
    try {
        return res.render('client/login', { msg: '' })
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const finder = await Client.findOne({ username })
        if (!finder) {
            return res.render('client/login', { msg: 'invalid username' })
        }
        const validate = await finder.validateClientPassword(password)
        if (!validate) {
            return res.render('client/login', { msg: 'incorrect password' })
        }
        const token = finder.createClientToken()
        return res.cookie('clientToken', token, { httpOnly: true }).redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

exports.logout = (req, res) => {
    try {
        return res.clearCookie('clientToken').redirect('/login')
    } catch (error) {
        console.log(error)
    }
}