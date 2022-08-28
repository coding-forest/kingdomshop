const { MessageEmbed } = require('discord.js')

module.exports =  ({member, avatar}) => {
    return new MessageEmbed()
         .setTitle(`${member.user.username}'s Avatar`)
         .setImage(avatar)
         .setColor("#7926b2")
         .setFooter({text: `${member.user.tag}`, iconURL: avatar})
}
