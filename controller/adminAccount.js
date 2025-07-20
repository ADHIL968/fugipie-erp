const generateid = require('../utils/generateId')
const Transaction = require('../model/Transaction')

exports.getAccount = async (req, res) => {
    try {
        const transaction = await Transaction.find().sort({ createdAt: -1 })
        return res.render('account', { transaction })
    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}

exports.addTransaction = async (req, res) => {
    try {
        const { type, description, amount, date, creditDebit } = req.body
        const [year, month, day] = date.split("-")
        let iscredit = creditDebit == "iscredit"
        let isdebit = creditDebit == "isdebit"
        let obj = {
            id: generateid(),
            type,
            amount,
            description,
            date: `${day}-${month}-${year}`,
            day,
            month,
            year,
            iscredit,
            isdebit
        }
        await Transaction.create(obj)
        return res.redirect('/admin/account')
    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}