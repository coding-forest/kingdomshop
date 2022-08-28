const { MessageEmbed } = require('discord.js')
const getTax = require('../helpers/getTax')
const getGuild = require('../helpers/getGuild')
module.exports = async (tax, guild) => {
    var {config} = await getGuild(guild.id)
    var {embedColor} = config
    return new MessageEmbed()
    .setDescription(`**>>> :white_check_mark: The tax is: ${getTax(tax)} 💰 **`)
    .setColor(embedColor||"#dc3545")
}
