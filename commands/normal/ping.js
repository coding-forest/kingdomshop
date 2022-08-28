
const basicEmbed = require('../../embeds/basicEmbed')
module.exports = {
    name: 'ping',
    category: ['normal'],
    execute: async (message, args) => {
        message.channel.send({
            embeds: [basicEmbed('Loading data', `Ping command`)]
        }).then(async(msg) => {
                msg.edit({
                    embeds: [basicEmbed('The bot ping is: `'  +`${msg.createdTimestamp - message.createdTimestamp}ms` +'`', `Ping command`)]
                })
        }).catch(err => console.log(err))
    }
}