

module.exports = {
    name: 'unlock',
    category: ['admins'],
    permissions:['ADMINISTRATOR'],
    execute: async (message, args) => {
        let channel = message.channel
        const role = message.guild.roles.cache.find(r => r.name === '@everyone')
        const reason = args.join(' ') || 'بدون سبب!'
        channel.permissionOverwrites.edit(role, {
            SEND_MESSAGES: true,
        }).then(chan => {
            channel.send(`**🔒 <#${channel.id}> لقد تم فتح.\n >>> السبب: ${reason}**`)
        }).catch(err => console.log(err))
    }
}