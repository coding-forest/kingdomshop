const {MessageEmbed} = require('discord.js')
const helpEmbed = require('../../embeds/helpEmbed')
const fs = require('fs')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'help',


    
    execute: async (message, args) => {
       let channel = message.channel
       var commandFolders = fs.readdirSync('./commands')
       var options = []
       for(folder of commandFolders){
           var cmds_emoji = message.guild.emojis.cache.find(emoji => emoji.name == folder)
           if(!cmds_emoji) {
            // emoji = `🎉`
           }else{
            // emoji = `<:${folder}:${cmds_emoji.id}>`
           }
           options.push({
               label: folder, 
               description: `These are ${folder} commands.`,
               value:  `${folder}_commands`,
               emoji: '🤖'
           })
       }
       const row = new MessageActionRow()
       .addComponents(
           new MessageSelectMenu()
               .setCustomId('help-select')
               .setPlaceholder('Nothing selected')
               .addOptions(options)
       );
       channel.send({
            embeds: [
                await helpEmbed(message.guild)
            ],
            components: [row]
       }).catch(err => console.log(err))
    }
}