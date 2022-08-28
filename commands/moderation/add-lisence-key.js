const LisenceKey = require('../../models/LisenceKey')
const Guild = require('../../models/Guild')

module.exports = {
    name: 'add-lisence-key',
    permissions: ['ADMINISTRATOR'],
    no_lisence: true,
    options: ['lisence key'],
    description: 'enter lisence key',
    execute: async (message, args) => {
       if(!args.length) return message.channel.send('**Please enter the lisence key!**')
       const inputLisenceKey = args[0]
       var lisenceKey = await LisenceKey.findOne({guildId: message.guild.id, key:inputLisenceKey})
       if(!lisenceKey) return message.channel.send('**Invalid lisence key please reenter a valid lisence key!**')

       Guild
       .findOne({ guildId: message.guild.id })
       .update({lisenced: true}).then(config => {
        message.channel.send('**Congratulations You have got the lisence version of the bot! now you can use all bot features!**')
       }).catch(err => message.channel.send('**Something went wrong!**'))

    }
}