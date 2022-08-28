
const basicEmbed = require('../../embeds/basicEmbed')
module.exports = {
    name: 'clear',
    category: ['admins'],
    permissions:['MANAGE_MESSAGES'],
    cooldown: 10,
    execute: async (message, args) => {
        let channel = message.channel
        const num = parseInt(args[0]) || 50
        if(num > 50){
            return channel.send(`**أنت لا تسطيع المسح أكثر من 50 رسالة**`)
        }
        if(message){
            await message.delete()
        }
        channel.send('```'+'مسح الرسائل ...```').then(async(msg) => {
            const {size} = await channel.bulkDelete(num + 1, false)

            channel.send('```js\n'+`تم مسح  من الرسائل ${size}\n`+'```').then(msgg => {
                setTimeout(() => {
                    msgg.delete()
                    return
                },1000)
            })
        })
    }
}