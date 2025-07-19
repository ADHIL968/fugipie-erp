const generateid = require('../utils/generateId')
const Invoice = require('../model/Invoice')
const Client = require('../model/Client')
const Transaction = require('../model/Transaction')

exports.getInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.find().sort({ createdAt: -1 })
        return res.render('invoice', { invoice })
    } catch (error) {
        console.log(error)
    }
}

exports.getAddInvoice = async (req, res) => {
    try {
        const client = await Client.find()
        const invoice = await Invoice.find()
        return res.render('addInvoice', { client, invoice })
    } catch (error) {
        console.log(error)
    }
}

exports.addInvoice = async (req, res) => {
    try {
        let { id, date, client, amount, t1, t2, t3, t4, t5, t6, t7, a1, a2, a3, a4, a5, a6, a7 } = req.body
        const [year, month, day] = date.split("-")
        const [clientid, clientName] = client.split("-")
        let data = []
        data.push({
            text: t1,
            amount: a1
        })
        if ((t2 != '') || a2 != '') {
            data.push({
                text: t2,
                amount: a2
            })
        }
        if ((t3 != '') || a3 != '') {
            data.push({
                text: t3,
                amount: a3
            })
        }
        if ((t4 != '') || a4 != '') {
            data.push({
                text: t4,
                amount: a4
            })
        }
        if ((t5 != '') || a5 != '') {
            data.push({
                text: t5,
                amount: a5
            })
        }
        if ((t6 != '') || a6 != '') {
            data.push({
                text: t6,
                amount: a6
            })
        }
        if ((t7 != '') || a7 != '') {
            data.push({
                text: t7,
                amount: a7
            })
        }
        await Invoice.create({
            id: id,
            date: `${day}-${month}-${year}`,
            client: {
                id: clientid,
                name: clientName
            },
            day,
            month,
            year,
            amount: parseFloat(amount),
            data: data,
        })
        return res.redirect('/admin/invoice')
    } catch (error) {
        console.log(error)
    }
}

exports.payment = async (req, res) => {
    try {
        const { invoiceid, date } = req.body
        const [year, month, day] = date.split("-")
        const finder = await Invoice.findOne({ id: invoiceid })
        const client = await Client.findOne({ id: finder.client.id })
        finder.ispaid = true
        finder.paidon = `${day}-${month}-${year}`
        await finder.save()
        await Transaction.create({
            id: generateid(),
            type: "work payment",
            amount: finder.amount,
            description: "work payment",
            date: `${day}-${month}-${year}`,
            day,
            month,
            year,
            iscredit: true,
        })
        client.pendingBalance = parseFloat(client.pendingBalance) - parseFloat(finder.amount)
        await client.save()
        return res.redirect('/admin/invoice')
    } catch (error) {
        console.log(error)
    }
}

exports.viewInvoice = async (req, res) => {
    try {
        const { invoiceid } = req.params
        const invoice = await Invoice.findOne({ id: invoiceid })
        return res.render('viewInvoice', { invoice })
    } catch (error) {
        console.log(error)
    }
}