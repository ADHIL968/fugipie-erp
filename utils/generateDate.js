const dayjs = require('dayjs')

const currentDate = () => {
    try {
        const date = dayjs().format('DD-MM-YYYY')
        return date
    } catch (error) {
        return console.log(error)
    }
}

module.exports = currentDate
