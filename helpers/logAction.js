const {MessageEmbed} = require('discord.js')
const getGuild = require('./getGuild')
const logEmbed = require('../embeds/logEmbed')

module.exports = async(message, products, description) => {
    const {config} = await getGuild(message.guild.id)
    const {logsRoom} = config
    
    if(logsRoom !== '' && logsRoom !== null){
        var channel = message.guild.channels.cache.get(logsRoom)
    
        return channel.send({
            embeds: [logEmbed(message, products, description)]
        }).catch(err => {
            console.log("coudn't log the logs!")
        })
    }
}