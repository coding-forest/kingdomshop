

module.exports = {
    name: 'mute',
    category: ['admins'],
    permissions:['BAN_MEMBERS'],
    execute: async (message, args) => {
        let channel = message.channel
        const member = message.mentions.members.first() ||message.guild.members.cache.get(args[0])
        const role = message.guild.roles.cache.find(r => r.name === 'muted')
        if(!member){
            return channel.send(`:rolling_eyes: - I can't find this member`)
        }
        if(!role){
           return channel.send(`**No role called muted.**`)
        }

        member.roles.add(role).then(res => {
            return channel.send(`**:white_check_mark: ${member.user.username} muted from chat! **`)
        }).catch(err => console.log(err))

    }
}