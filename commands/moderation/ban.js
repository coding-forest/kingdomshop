

module.exports = {
    name: 'ban',
    category: ['admins'],
    permissions:['BAN_MEMBERS'],
    execute: async (message, args) => {
        if(!args.length) return
      try{
        let channel = message.channel
        const member = message.mentions.members.first() ||message.guild.members.cache.get(args[0])  
        
        if(!member){
            return channel.send(`**:rolling_eyes: - I can't find this member**`).catch(err => console.log(err))
        }

        member.ban().then(mem => {
            return channel.send(`**:white_check_mark: ${member.user.username} banned from the server! :airplane:**`)
        }).catch(err => console.log(err))
      }catch(err){
        console.log(err)
      }
    }
}