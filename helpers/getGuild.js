const Guild = require('../models/Guild')
const getConfig = require('../helpers/getConfig')
module.exports = async (guildId) => {
   var guild =  await Guild.find({guildId:guildId})
   guild = guild[0]
   var config = await getConfig(guild._id)
   guild.config = config
   return guild
}