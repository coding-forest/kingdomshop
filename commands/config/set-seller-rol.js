const getGuild = require('../../helpers/getGuild')
const Config = require('../../models/Config')

module.exports = {
    name: 'set-seller-role',
    permissions: ['ADMINISTRATOR'],
    execute: async (message, args) => {
        if(!args.length) return 
        const id = args[0]
        const {_id} = await getGuild(message.guild.id)

        Config
        .findOne({ guild: _id })
        .update({sellerRole: id}).then(config => {
         message.channel.send('**You have updated your config successfuly!**')
        }).catch(err => message.channel.send('**Something went wrong when I tried to update the config!**'))
    }
}