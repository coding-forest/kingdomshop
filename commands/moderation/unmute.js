

module.exports = {
    name: 'unmute',
    category: ['admins'],
    permissions:['BAN_MEMBERS'],

    execute: async (message, args) => {
        let channel = message.channel
        const member = message.mentions.members.first() ||message.guild.members.cache.get(args[0])
        const role = message.guild.roles.cache.find(r => r.id === "1008125716338053211")
        if(!member){
            return chanenl.send(`:rolling_eyes: - I can't find this member`)
        }

        member.roles.remove(role).then(res => {
            return channel.send(`**:white_check_mark: ${member.user.username} unmuted from chat! **`)
        }).catch(err => console.log(err))

    }
}