const { MessageEmbed } = require('discord.js')
const getGuild = require('../helpers/getGuild')
module.exports =  async(item, num_items, final_price, reciever_id, author_name, icon_url, guild) => {
    var {config} = await getGuild(guild.id)
var {embedColor} = config
    return new MessageEmbed()
    .setColor(embedColor || "#dc3545")
    .setTimestamp()
    .setAuthor({ name: author_name, iconURL:icon_url })
    .setTimestamp()
    .addField(`** Buying ${item} item : **`, `
            **>>> ・Number of items: ` + '`'+num_items+'`' + 
            `\n ・Final price: ` + '`' +final_price +'`' +
           `\n ・make sure your DM is open! ⚠️
           ・You have 50 seconds to transfer⚠️**
    `)
    .addField(`
    
    **To buy, execute this command :**`,'```#credits <@'+reciever_id +'> '+ final_price+ '```')
    .setFooter({ text: 'Developed By clappy#1111', iconURL: 'https://cdn.discordapp.com/avatars/715982102935371926/59e9519f4b87e64b93cc125a2e72aa52.webp' });
}
