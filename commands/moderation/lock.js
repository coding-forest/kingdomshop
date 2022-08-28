
module.exports = {
    name: 'lock',
    category: ['admins'],
    permissions:['ADMINISTRATOR'],
    execute: async (message, args) => {
        let channel = message.channel
        const role = message.guild.roles.cache.find(r => r.name === '@everyone')
        const reason = args.join(' ') || 'بدون سبب!'
        channel.permissionOverwrites.edit(role, {
            SEND_MESSAGES: false,
        }).then(chan => {
            channel.send(`**🔒 <#${channel.id}> لقد تم قفل.\n >>> السبب: ${reason}**`)
        }).catch(err => {
            console.log(err)
        })
    }
}