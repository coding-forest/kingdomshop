const { MessageEmbed } = require('discord.js')
const getGuild = require('../helpers/getGuild')
module.exports =  async(message, img) => {
    var {config} = await getGuild(message.guild.id)
    var {embedColor} = config
    return new MessageEmbed()
    .setDescription(`** >>> Thanks for Your FeedBack ❤️🔥 **`)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setColor(embedColor || "#dc3545")
    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
    .setImage(img)

}
