const convertUnit = require('./convertUnit')
    module.exports = (value) => {
        const amount = convertUnit(value)
        const howMuchToSend = Math.round((amount * 20) / 19 + 1)
        return howMuchToSend
    }