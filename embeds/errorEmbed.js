const { MessageEmbed } = require('discord.js')

module.exports =  (description) => {
    return new MessageEmbed()
    .setColor('#dd2e44')
    .setDescription(`Error :x: : ` + description)
}
