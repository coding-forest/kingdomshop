const { MessageEmbed } = require('discord.js')

module.exports =  () => {
    return new MessageEmbed()
    .setTitle('🎫 اعادة التذكرة : ')
    .setColor('#F32013')
    .setDescription('إضغط على الزر لتعيد التذكرة')
}
