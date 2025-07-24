const generateid = require('../utils/generateId')
const Employee = require('../model/Employee')
const Work = require('../model/Work')
const Transaction = require('../model/Transaction')

exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.find()
        return res.render('employee', { employee })
    } catch (error) {
        console.log(error)
        return res.render('error')
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
        return res.render('error')
    }
}

exports.viewEmployeeProfile = async (req, res) => {
    try {
        const { employeeid } = req.params
        const employee = await Employee.findOne({ id: employeeid })
        const work = await Work.find({ 'assignedEmployee.id': employeeid })
        const unpaidSalary = employee.salary.filter((i) => {
            return !i.paid
        })
        return res.render('employeeProfile', { employee, work, unpaidSalary })
    } catch (error) {
        console.log(error)
        return res.render('error')
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
        return res.render('error')
    }
}

exports.addSalary = async (req, res) => {
    try {
        const { employeeid } = req.params
        const { salary, amount } = req.body
        const finder = await Employee.findOne({ id: employeeid })
        finder.salary.push({
            id: generateid(),
            salary,
            amount
        })
        await finder.save()
        return res.redirect(`/admin/employee/${employeeid}/profile`)
    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}

exports.distributeSalary = async (req, res) => {
    try {
        const { employeeid } = req.params
        const { salary, date } = req.body
        const [salaryId, salaryName] = salary.split("-")
        const [year, month, day] = date.split('-')
        const finder = await Employee.findOne({ id: employeeid })
        const findSalary = finder.salary.find((i) => {
            return i.id == salaryId
        })
        findSalary.paymentDate = `${day}-${month}-${year}`
        findSalary.paid = true
        await finder.save()
        await Transaction.create({
            id: generateid(),
            type: "salary",
            amount: findSalary.amount,
            description: `${finder.name} ${salaryName} salary`,
            date: `${day}-${month}-${year}`,
            day: day,
            month: month,
            year: year,
            isdebit: true
        })
        return res.redirect(`/admin/employee/${employeeid}/profile`)
    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}
