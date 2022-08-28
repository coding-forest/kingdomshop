

module.exports = {
    name: 'role-give',
    category: ['admins'],
    permissions:['MANAGE_ROLES'],
    execute: async (message, args) => {
        try{
            const role = message.mentions.roles.first() || message.guild.roles.cache.filter(r => r.name === args[1]) || message.guild.roles.cache.get(args[1])
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            if(!member){
                return channel.send(`**:rolling_eyes: - I can't find this member**`).catch(err => console.log(err))
            }
            if(!role){
                return channel.send(`**:rolling_eyes: - I can't find this role**`).catch(err => console.log(err))
            }
            
            member.roles.add(role).then(role => {
                return message.reply(`**<@${message.author.id}> gave a role to <@${member.id}> **`)
            }).catch(err => {
                return message.reply(`**I can't do that, my role is in a lower level than this role.**`)
            })
        }catch(err){
            console.log(err)
        }
    }
}