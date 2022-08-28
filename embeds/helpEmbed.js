const { MessageEmbed } = require('discord.js')
const getGuild = require('../helpers/getGuild')
module.exports =  async(guild) => {
    var {config} = await getGuild(guild.id)
    var {embedColor} = config
    let members = await guild.members.fetch()
    let membersCount =  guild.memberCount
    let vioceChannelsCount = guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size
    let textChannelsCount = guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size
    return new MessageEmbed()
    .setTitle("Help Command")
    .setDescription('**اضغط على `Select from the menu`لاختيار نوع الأوامر التي تريدها **\n >>> <:bot:1008406579009298553> **| معلومات البوت : **')
    .addField(`:speech_balloon: | Channels (${textChannelsCount + vioceChannelsCount}) :`,
    '>>> `'+textChannelsCount+'` Text | ' + '`'+vioceChannelsCount+ '` Voice ',  true
    )    .addField(`:busts_in_silhouette: | Members`,
    `>>> ${membersCount} member`, true
    ).addField(`:crown: Owned by`, `>>> <@${guild.ownerId}>`, true)
    .setColor(embedColor || "#dc3545")
    .setThumbnail(guild.iconURL({dynamic: true}))
}
