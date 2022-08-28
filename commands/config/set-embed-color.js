const getGuild = require('../../helpers/getGuild')
const Config = require('../../models/Config')

module.exports = {
    name: 'set-embed-color',
    permissions: ['ADMINISTRATOR'],
    execute: async (message, args) => {
        if(!args.length) return 
        const color = args[0]
        const {_id} = await getGuild(message.guild.id)

        Config
        .findOne({ guild: _id })
        .update({embedColor: color}).then(config => {
         message.channel.send('**You have updated your config successfuly!**')
        }).catch(err => message.channel.send('**Something went wrong when I tried to update the config!**'))
    }
}