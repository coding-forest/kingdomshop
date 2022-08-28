

module.exports = {
    name: 'unban',
    category: ['admins'],
    permissions:['BAN_MEMBERS'],
    execute: async (message, args) => {
        if(!args.length) return
        let channel = message.channel
        const member = message.mentions.members.first() ||message.guild.members.cache.get(args[0])
        
        if(!member){
            return channel.send(`:rolling_eyes: - I can't find this member`)
        }

        member.ban().then(mem => {
            return channel.send(`**:white_check_mark: ${member.user.username} unbanned from the server! 🛬**`)
        }).catch(err => console.log(err))
    }
}