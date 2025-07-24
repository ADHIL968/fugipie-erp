const Work = require('../model/Work')
const Employee = require('../model/Employee')
const Client = require('../model/Client')

exports.getWorks = async (req, res) => {
    try {
        const work = await Work.find().sort({ createdAt: -1 })
        return res.render('works', { work })
    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}

exports.viewWork = async (req, res) => {
    try {
        const { workid } = req.params
        const work = await Work.findOne({ id: workid })
        const employee = await Employee.find()
        return res.render('viewWork', { work, employee })
    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}

exports.editWork = async (req, res) => {
    try {
        const { workid } = req.params
        const { date, amount, time } = req.body
        const [year, month, day] = date.split('-')
        const work = await Work.findOne({ id: workid })
        work.amount = amount
        work.time = time
        work.completion.date = `${day}-${month}-${year}`
        work.completion.day = day
        work.completion.month = month
        work.completion.year = year
        work.completed = true
        work.status = "completed"
        await work.save()
        const client = await Client.findOne({ id: work.client.id })
        if (client.credit > amount) client.credit -= amount
        else {
            let difference = parseFloat(amount) - parseFloat(client.credit)
            client.credit = 0
            client.pendingBalance += parseFloat(difference)
        }
        await client.save()
        return res.redirect(`/admin/works/${workid}/view`)
    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}

exports.assignEmployee = async (req, res) => {
    try {
        const { workid } = req.params
        const { employee } = req.body
        const [employeeId, employeeName] = employee.split("-")
        const finder = await Work.findOne({ id: workid })
        finder.assignedEmployee.name = employeeName
        finder.assignedEmployee.id = employeeId
        finder.status = "assigned"
        await finder.save()
        return res.redirect(`/admin/works/${workid}/view`)
    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}

exports.test = (req, res) => {
    return res.render('test')
}