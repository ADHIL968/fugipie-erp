const Employee = require('../model/Employee')

exports.getLogin = (req, res) => {
    try {
        return res.render('employee/login', { msg: '' })
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const finder = await Employee.findOne({ username })
        if (!finder) {
            return res.render('employee/login', { msg: 'invalid username' })
        }
        const validate = await finder.validateEmployeePassword(password)
        if (!validate) {
            return res.render('employee/login', { msg: 'incorrect password' })
        }
        const token = finder.createEmployeeToken()
        return res.cookie('employeeToken', token, { httpOnly: true }).redirect('/employee')
    } catch (error) {
        console.log(error)
    }
}

exports.logout = (req, res) => {
    return res.clearCookie('employeeToken').redirect('/employee/login')
}