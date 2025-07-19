const generateid = require('../utils/generateId')
const Client = require('../model/Client')
const Work = require('../model/Work')

exports.getAdminClients = async (req, res) => {
    try {
        const client = await Client.find()
        return res.render('clients', { client })
    } catch (error) {
        console.log(error)
    }
}

exports.addClients = async (req, res) => {
    try {
        const { name, username, password, contactPerson, contactNumber } = req.body
        await Client.create({
            id: generateid(),
            name,
            username,
            password,
            contactPerson,
            contactNumber
        })
        return res.redirect('/admin/clients')
    } catch (error) {
        console.log(error)
    }
}

exports.getClientProfile = async (req, res) => {
    try {
        const { clientid } = req.params
        const client = await Client.findOne({ id: clientid })
        const work = await Work.find({ 'client.id': client.id })
        return res.render('clientProfile', { client, work })
    } catch (error) {
        console.log(error)
    }
}

exports.editClientProfile = async (req, res) => {
    try {
        const { clientid } = req.params
        const { name, contactPerson, contactNumber, username, password } = req.body
        const finder = await Client.findOne({ id: clientid })
        finder.contactPerson = contactPerson
        finder.contactNumber = contactNumber
        finder.username = username
        if (password) finder.password = password
        await finder.save()
        return res.redirect(`/admin/clients/${clientid}/profile`)
    } catch (error) {
        console.log(error)
    }
}

exports.addWork = async (req, res) => {
    try {
        const { subject, description, urgency, attachment, date } = req.body
        const { clientid } = req.params
        const [year, month, day] = date.split('-')
        const finder = await Client.findOne({ id: clientid })
        await Work.create({
            id: generateid(),
            client: {
                id: finder.id,
                name: finder.name
            },
            subject,
            description,
            urgency,
            attachment,
            date: `${day}-${month}-${year}`,
            day,
            month,
            year
        })
        return res.redirect(`/admin/clients/${clientid}/profile`)
    } catch (error) {
        console.log(error)
    }
}