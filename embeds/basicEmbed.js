const { MessageEmbed } = require('discord.js')

module.exports =  (description, title) => {
    var embed = new MessageEmbed()
    .setDescription(`${description}`)
    .setColor('#7926b2')

    if(title){
        embed.setTitle(`${title}`)
    }

    return embed
}
