const { MessageEmbed, Message } = require('discord.js')
const getGuild = require('../helpers/getGuild')
module.exports =  async(description,author_name, iconURL, guild) => {
    var {config} = await getGuild(guild.id)
    var {embedColor} = config
    return new MessageEmbed()
    // .setTitle('Wait : ')
    .setDescription(`>>> ${description}
    
        Almost done!.
    `)
    // .setThumbnail(guild.iconURL({ dynamic: true }))
    .setColor(embedColor||"#dc3545")
    // .setAuthor({ name: author_name, iconURL:iconURL })
    // .setTimestamp()
    // .setFooter({ text: 'Developed By clappy#1111', iconURL: 'https://cdn.discordapp.com/avatars/715982102935371926/59e9519f4b87e64b93cc125a2e72aa52.webp' });
}
