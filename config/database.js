const mongoose = require('mongoose')

const connectMongoose = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        return console.log('database connected')
    } catch (error) {
        console.log(error)
        return console.log('database connection failed')
    }
}

module.exports = connectMongoose