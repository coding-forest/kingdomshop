

module.exports = {
    name: 'show',
    category: ['admins'],
    permissions:['ADMINISTRATOR'],
    execute: async (message, args) => {
        let channel = message.channel
        const role = message.guild.roles.cache.find(r => r.name === '@everyone')
        channel.permissionOverwrites.edit(role, {
            VIEW_CHANNEL: true,
        }).then(chan => {
            channel.send(`**👀 <#${channel.id}> لقد تم إضهار .**`)
        })
    }
}