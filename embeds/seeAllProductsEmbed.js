const { MessageEmbed, Message } = require('discord.js')
const Category = require('../models/Category')
const Product = require('../models/Product')
module.exports = async (message, categories) => {
   const seeAllProductsEmbed= new  MessageEmbed()
    .setTitle('All products : ')
    .setDescription('see all products')
    .setColor("#dc3545")
    .setAuthor({ name: message.author.username, iconURL:message.author.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
    .setFooter({ text: 'Developed By clappy#1111', iconURL: 'https://cdn.discordapp.com/avatars/715982102935371926/59e9519f4b87e64b93cc125a2e72aa52.webp' });



    for(category of categories){
        var name = '`⇣ '+ category.name  +' ⇣`'
        var num_hyphens = 22 - name.length
        for(var i = 0; i < Math.floor(num_hyphens/2); i++){
            name = '-' + name
        }
        for(var j = 0; j < Math.floor(num_hyphens/2); j++){
            name += '-'
        }

        var products = await Product.find({category: category._id})
        var prcts  = ''
        for(product of products) {
            var properties = product.properties
            var prts = ''
            Object.keys(properties).forEach(key => {
                prts += `${properties[key]}:`
            })
            prcts += prts + '\n'
        }
        seeAllProductsEmbed.addField(
            name, 
            "```"+prcts+"```"
        )
    }
    return seeAllProductsEmbed
}


