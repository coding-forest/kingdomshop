

module.exports = {
    name: 'kick',
    category: ['admins'],
    permissions:['KICK_MEMBERS'],
    execute: async (message, args) => {
        let channel = message.channel
        const member = message.mentions.members.first() ||message.guild.members.cache.get(args[0])
        
        if(!member){
            return channel.send(`:rolling_eyes: - I can't find this member`)
        }
        if(!member.kickable) return message.reply("I cannot kick this member!");

        member.kick().then(mem => {
            return channel.send(`**:white_check_mark: ${member.user.username} kicked from the server! :airplane:**`)
        }).catch(err => console.log(err))
    }
}