const getGuild = require('../../helpers/getGuild')

module.exports = {
    name: 'line',
    cooldown: 60,
    execute: async (message, args) => {
        const guildId = message.guild.id
        const {config} = await getGuild(guildId) 
        const {lineImageLink} = config
        message.delete()
        message.channel.send(lineImageLink)
    }
}