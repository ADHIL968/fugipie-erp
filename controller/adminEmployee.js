const generateid = require('../utils/generateId')
const Employee = require('../model/Employee')
const Work = require('../model/Work')

exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.find()
        return res.render('employee', { employee })
    } catch (error) {
        console.log(error)
    }
}

exports.addEmployee = async (req, res) => {
    try {
        const { name, contactNumber, designation, date, username, password } = req.body
        const [year, month, day] = date.split('-')
        await Employee.create({
            id: generateid(),
            name,
            contactNumber,
            designation,
            date: `${day}-${month}-${year}`,
            username,
            password
        })
        return res.redirect('/admin/employee')
    } catch (error) {
        console.log(Error)
    }
}

exports.viewEmployeeProfile = async (req, res) => {
    try {
        const { employeeid } = req.params
        const employee = await Employee.findOne({ id: employeeid })
        const work = await Work.find({ 'assignedEmployee.id': employeeid })
        return res.render('employeeProfile', { employee, work })
    } catch (error) {
        console.log(error)
    }
}

exports.editEmployeeProfile = async (req, res) => {
    try {
        const { employeeid } = req.params
        const { contactNumber, designation, workingHour, payPerHour, remarks, password } = req.body
        const finder = await Employee.findOne({ id: employeeid })
        finder.contactNumber = contactNumber
        finder.designation = designation
        finder.workingHour = workingHour
        finder.payPerHour = payPerHour
        if (remarks) finder.remarks.push(remarks)
        if (password) finder.password = password
        await finder.save()
        return res.redirect(`/admin/employee/${employeeid}/profile`)
    } catch (error) {
        console.log(error)
    }
}

