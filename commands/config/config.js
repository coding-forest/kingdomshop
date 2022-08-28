const getGuild = require('../../helpers/getGuild')
const Config = require('../../models/Config')
module.exports = {
    name: 'config',
    description: 'configure the guild',
    permissions: ['ADMINISTRATOR'],
    options: ['prefix', 'bank_id' ,'buy_channel'],
    execute: async (message, args) => {
       if(!args.length) return message.channel.send('**Invalid arguments!**')
       const {config, _id} = await getGuild(message.guild.id)
       var {prefix, bankId, buyChannelId, lineCategories, lineImageLink, ticketsCategory} = config

        prefix = args[0] || prefix
        bankId = args[1] || bankId
        buyChannelId = args[2] || buyChannelId

        if(prefix.length > 1) return message.channel.send('**The prefix is one character length!**')

       Config
       .findOne({ guild: _id })
       .update({prefix, bankId, buyChannelId}).then(config => {
        message.channel.send('**You have updated your config successfuly!**')
       }).catch(err => message.channel.send('**Something went wrong when I tried to update the config!**'))

    }
}