const { MessageEmbed } = require('discord.js')

module.exports = (message, products, description) => {
    var logEmbed =  new MessageEmbed()
    .setDescription(`**<@${message.author.id}> ${description}**`)
    .setAuthor({ name: message.author.username, iconURL:message.author.displayAvatarURL({ dynamic: true }) })
    .setColor("BLACK")
    .addField(`Executed command:`, '```'+message.content+'```')

   if(products !== null){
    var products_str = ''
    for(product of products){
        products_str += `${product.value} \n`
    }

    logEmbed.addField('Products', '>>> num of items:`' + products.length +  '` \n```'+products_str+'```')
   }

    return logEmbed
}
