const Employee = require('../model/Employee')
const Work = require('../model/Work')

exports.getHome = async (req, res) => {
    try {
        const { id } = req.user
        const employee = await Employee.findOne({ id })
        const work = await Work.find({ 'assignedEmployee.id': id })
        return res.render('employee/home', { work, employee })
    } catch (error) {
        console.log(error)
        return res.render('employee/error')
    }
}

exports.viewWork = async (req, res) => {
    try {
        const { workid } = req.params
        const work = await Work.findOne({ id: workid })
        return res.render('employee/viewWork', { work })
    } catch (error) {
        console.log(error)
        return res.render('employee/error')
    }
}