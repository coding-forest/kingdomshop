const { MessageEmbed } = require('discord.js')

module.exports =  (description) => {
    return new MessageEmbed()
    .setTitle('Time is over:')
    .setColor('#F32013')
    .setDescription(description)
}
