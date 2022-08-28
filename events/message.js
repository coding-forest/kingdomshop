const cooldowns = new Map()
const {Collection} = require('discord.js')
require('dotenv').config();
const Config = require('../models/Config')
const Ticket = require('../models/Ticket')
const getGuild = require('../helpers/getGuild')
const { MessageAttachment } = require('discord.js')
const taxEmbed = require('../embeds/taxEmbed')
const errorEmbed = require('../embeds/errorEmbed')
const feedbackEmbed = require('../embeds/feedbackEmbed')
const permissions = [
    'CREATE_INSTANT_INVITE', 'KICK_MEMBERS',
    'BAN_MEMBERS',           'ADMINISTRATOR',
    'MANAGE_CHANNELS',       'MANAGE_GUILD',
    'ADD_REACTIONS',         'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',      'STREAM',
    'VIEW_CHANNEL',          'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',     'MANAGE_MESSAGES',
    'EMBED_LINKS',           'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',  'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',   'VIEW_GUILD_INSIGHTS',
    'CONNECT',               'SPEAK',
    'MUTE_MEMBERS',          'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',          'USE_VAD',
    'CHANGE_NICKNAME',       'MANAGE_NICKNAMES',
    'MANAGE_ROLES',          'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS'
  ]
module.exports = {
    name: 'message',
    execute: async (message, client) => {
        const {config, lisenced} = await getGuild(message.guild.id) 
        const {prefix, lineCategories, lineImageLink, taxRoom, feedbackRoom} = config

        const parent_Id = message.channel.parentId

        // var logs_commands = ['buy', 'give', 'add-category', 'add-product', 'seed-products']

        // if(ticketsCategory.includes(parent_Id)) {
        //     const ticket = await Ticket
        //     .findOne({ guildId: message.channel.guild.id, channelId: message.channel.id})
        //     var responsibles = ticket.responsibles
        //     if(responsibles.length && message.author.id !== process.env.CLIENT_ID & !responsibles.includes(message.author.id)) message.delete()

        // }

        if(message.channel.id === taxRoom && message.author.id !== process.env.CLIENT_ID){
           if(isNaN(message.content.charAt(0))){
             return message.reply({
                embeds:[errorEmbed('must be a number!')]
             })
           }
           message.reply({
            embeds: [await taxEmbed(message.content, message.guild)]
           })
        }if(message.channel.id === feedbackRoom && message.author.id !== process.env.CLIENT_ID){
           message.reply({
            embeds: [await feedbackEmbed(message,lineImageLink)]
           })
        }
        if(lineCategories.includes(parent_Id) && parent_Id !== null && message.author.id !== process.env.CLIENT_ID || lineCategories.includes(message.channel.id) && message.author.id !== process.env.CLIENT_ID) return await message.channel.send(lineImageLink)

        if (!message.content.startsWith(prefix)) return
        const args = message.content.slice(prefix.length).split(/ +/)
        const commandName = args.shift().toLowerCase()
        const command = client.commands.get(commandName)
        if(!command) return
        if(!lisenced && !command.no_lisence) return message.channel.send('**You have got the unlisence version of the bot please enter the lisence key with ' + '`' + prefix+ 'add-lisence-key <key>`' + '**')
        if(command.permissions){
            const invalidPerms = []
            for (perm of command.permissions){
                if(!permissions.includes(perm)){
                    return console.log(`The command has invalid permission ${perm}`)
                }
                if(!message.member.permissions.has(perm)){
                    invalidPerms.push(perm)
                }
            }
            if(invalidPerms.length){
                message.channel.send('This command requires  `' + invalidPerms  +' `permissions'.replace(/(\r\n|\n|\r)/gm, ""))
                return 
            }
        }
        if(!cooldowns.has(command.name)){
            cooldowns.set(command.name, new Collection())
        }
        const current_time = Date.now();
        const time_stamp = cooldowns.get(command.name)
        const cooldown_amount = command.cooldown * 1000
        if(time_stamp.has(message.author.id)){
            const expiration_time = time_stamp.get(message.author.id) + cooldown_amount
            if(current_time < expiration_time){
                const time_left = (expiration_time - current_time) / 1000
                return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ` + '`'+prefix + command.name +'` again' ) 
            }
        }
        time_stamp.set(message.author.id, current_time)
        setTimeout(() => {
            time_stamp.delete(message.author.id)
        }, cooldown_amount);
        command.execute(message, args, client)
    }
}