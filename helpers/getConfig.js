const Config = require('../models/Config')
module.exports = async (id) => {
    var config = await Config.find({guild: id})
   return config[0]
}