const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'avatar-server',
    category: ['normal'],
    execute: async (message, args) => {
        let guild = message.guild
        let member = message.member
        let avatar = guild.iconURL({dynamic: true})
        message.channel.send({embeds: [
            new MessageEmbed()
         .setTitle(`Server's Avatar`)
         .setImage(avatar)
         .setColor("#7926b2")
         .setFooter({text: `${member.user.tag}`, iconURL: member.displayAvatarURL({dynamic: true})})
        ]}).catch(err => console.log(err))
    }
}