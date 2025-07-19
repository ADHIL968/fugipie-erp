const generateid = require('../utils/generateId')
const Admin = require('../model/Admin')

exports.getDashboard = async (req, res) => {
    try {
        return res.render('dashboard')
    } catch (error) {
        console.log(error)
    }
}