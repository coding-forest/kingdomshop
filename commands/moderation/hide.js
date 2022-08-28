

module.exports = {
    name: 'hide',
    category: ['admins'],
    permissions:['ADMINISTRATOR'],
    execute: async (message, args) => {
        let channel = message.channel
        const role = message.guild.roles.cache.find(r => r.name === '@everyone')
        channel.permissionOverwrites.edit(role, {
            VIEW_CHANNEL: false,
        }).then(chan => {
            channel.send(`**👀 <#${channel.id}> لقد تم أخفاء .**`)
        })
    }
}