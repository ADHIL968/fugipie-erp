const generateid = require('../utils/generateId')
const generateDate = require('../utils/generateDate')
const Client = require('../model/Client')
const Work = require('../model/Work')


exports.getHome = async (req, res) => {
    try {
        const { id } = req.user
        const client = await Client.findOne({ id })
        const work = await Work.find({ 'client.id': id }).sort({ createdAt: -1 })
        return res.render('client/home', { client, work })
    } catch (error) {
        console.log(error)
    }
}

exports.addWork = async (req, res) => {
    try {
        const { subject, description, urgency, attachment } = req.body
        const { id, name } = req.user
        const date = generateDate()
        const [day, month, year] = date.split('-')
        await Work.create({
            id: generateid(),
            client: {
                id,
                name
            },
            subject,
            description,
            urgency,
            attachment: attachment,
            date,
            day,
            month,
            year
        })
        return res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

exports.deleteWork = async (req, res) => {
    try {
        const { workid } = req.params
        const work = await Work.findOne({ id: workid })
        work.deleted = true
        await work.save()
        return res.redirect(`/${workid}/viewwork`)
    } catch (error) {
        console.log(error)
    }
}

exports.viewWork = async (req, res) => {
    try {
        const { workid } = req.params
        const work = await Work.findOne({ id: workid })
        return res.render('client/viewWork', { work })
    } catch (error) {
        console.log(error)
    }
}
