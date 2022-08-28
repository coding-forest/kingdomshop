const {MessageEmbed} = require('discord.js')


module.exports = {
    name: 'embed',
    permissions: ['MANAGE_MESSAGES'],
    execute: async (message, args) => {
        if (!args.length) return message.channel.send('**Invalid arguments!**')
        const title = args[0]
        const description = args.join(' ')
        
        return message.channel.send({
            embeds:[
                new MessageEmbed()
                    .setTitle(title)
                    .setDescription(description)
                    .setColor('#ff0000')
                    .setAuthor({ name:message.author.username, iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp` })
                    .setTimestamp()
            ]
        })
    }
}