const { MessageEmbed } = require('discord.js')

module.exports =  (description) => {
    return new MessageEmbed()
    .setTitle('DONE :white_check_mark:')
    .setColor('#4BB543')
    .setDescription(description)
}
