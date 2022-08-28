require('dotenv').config()

module.exports = {
    name: 'nickname',
    description: 'change the nickname of the bot',
    permissions: ['ADMINISTRATOR'],
    options: ['nickname'],
    execute: async (message, args) => {
       const nickname = args.join(' ')
       const member = message.guild.members.cache.get(process.env.CLIENT_ID)
       member.setNickname(nickname)
    //    member.avatar = "https://www.kindpng.com/picc/m/277-2770706_bot-logo-discord-hd-png-download.png"
    }
}