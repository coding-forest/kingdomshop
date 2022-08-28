const fs = require('fs')
require('dotenv').config()
const {MessageEmbed} = require('discord.js')
const getGuild = require('../helpers/getGuild')
module.exports = {
    name: 'help-select',
    execute: async(interaction)=> {
        const {config} = await getGuild(interaction.guild.id) 
        const {prefix, embedColor} = config
        var value = interaction.values[0]
        var folder_name = value.split('_')[0]
        var commands_str = ''
        fs.readdirSync("./commands/").forEach(dir => {
            if(dir === folder_name){
                const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
                for (let file of commands) {
                    let pull = require(`../commands/${dir}/${file}`);
                    commands_str += `${prefix}${pull.name}, \n`
                }
            }
        });

        let message = interaction.message

        message.edit({
            embeds: [
                new MessageEmbed()  
                .setTitle(`**Help Command ( ${folder_name} )**`)
                .setDescription(`> **🤖 ${folder_name} | commands**\n\n `+ '`'+commands_str+'`')
                .setFooter({text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
                .setThumbnail(interaction.guild.iconURL({dynamic: true}))
                .setColor(embedColor || '#7926b2')
            ]
        })
        interaction.deferUpdate()
    }
}