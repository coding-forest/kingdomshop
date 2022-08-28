const getGuild = require('../../helpers/getGuild')
const Config = require('../../models/Config')

module.exports = {
    name: 'set-giveaways-reaction',
    permissions: ['ADMINISTRATOR'],
    execute: async (message, args) => {
        if(!args.length) return 
        const emojis = message.content.match(/<:.+?:\d+>/g)
        const {_id} = await getGuild(message.guild.id)
        
        var emoji = emojis[0]
        console.log(emojis, emoji)
        if(!emojis.length) return

        Config
        .findOne({ guild: _id })
        .update({giveAwaysReaction: emoji}).then(config => {
         message.channel.send('**You have updated your config successfuly!**')
        }).catch(err => message.channel.send('**Something went wrong when I tried to update the config!**'))
    }
}