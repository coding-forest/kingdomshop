const avatarEmbed = require('../../embeds/avatarEmbed')
module.exports = {
    name: 'avatar',
    category: ['normal'],
    execute: async (message, args) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let avatar = member.user.displayAvatarURL({ size: 1024, dynamic: true });
        
        message.channel.send({embeds: [avatarEmbed({member, avatar})]}).catch(err => console.log(err))
    }
}