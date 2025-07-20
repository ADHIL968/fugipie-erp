const generateid = require('../utils/generateId')
const Salary = require('../model/Salary')
const Transaction = require('../model/Transaction')
const Employee = require('../model/Employee')

exports.getSalary = async (req, res) => {
    try {
        const salary = await Salary.find().sort({ createdAt: -1 })
        const employee = await Employee.find()
        return res.render('salary', { salary, employee })
    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}

exports.addSalary = async (req, res) => {
    try {
        const { employee, amount, note, date } = req.body
        const [employeeId, employeeName, designation] = employee.split("-")
        const [year, month, day] = date.split("-")
        await Salary.create({
            id: generateid(),
            employeeName,
            employeeId,
            designation,
            amount,
            note: note || "no remark",
            date: `${day}-${month}-${year}`,
            day,
            month,
            year
        })

        await Transaction.create({
            id: generateid(),
            type: "salary",
            amount,
            description: "salary deployment",
            date: `${day}-${month}-${year}`,
            day,
            month,
            year,
            isdebit: true
        })
        return res.redirect('/admin/salary')
    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}