const Category = require('../../models/Category')
const Product = require('../../models/Product')
const waitEmbed = require('../../embeds/waitEmbed')
const fs = require('fs')
const { MessageEmbed, MessageAttachment } = require('discord.js')
module.exports = {
    name: 'see-all-products',
    permissions: ['ADMINISTRATOR'],
    execute: async (message, args) => {
        const guildId = message.guild.id
        var categories;
        if(args.length === 1) {
            categories = await Category.find({guildId: guildId, name: args[0]})
        }
        else{
            categories = await Category.find({guildId: guildId})
        }

        const seeAllProductsEmbed= new  MessageEmbed()
        .setTitle('All products : ')
        .setDescription('see all products')
        .setColor("#dc3545")
        .setAuthor({ name: message.author.username, iconURL:message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setFooter({ text: 'Developed By clappy#1111', iconURL: 'https://cdn.discordapp.com/avatars/715982102935371926/59e9519f4b87e64b93cc125a2e72aa52.webp' });

        const  chunkSubstr = (str, size) =>{
            const numChunks = Math.ceil(str.length / size)
            const chunks = new Array(numChunks)
          
            for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
              chunks[i] = str.substr(o, size)
            }
          
            return chunks
          }
    
        var ct = ''
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
                var buyer_username = ''
                if(product.buyed_by) {
                    buyer_username = product.buyed_by.buyer_username
                }
                prcts += prts + `${product.value} | ${product.status === 'selled' ?'✔️ selled' : '❌ not selled'}\n`
            }
            ct += `${category.name} :\n` + prcts 
        }
        message.channel.send({
            embeds: [await waitEmbed(`Please wait until the categories are loaded completely.`,message.author.username, message.author.displayAvatarURL({ dynamic: true }), message.guild)],
        }).then((msg) => {
            var attachment = new MessageAttachment(Buffer.from(ct, 'utf-8'),'all-products.txt')
            msg.edit({
                embeds: [new MessageEmbed().setDescription("**>>> :white_check_mark: Here is all the products!**").setColor("#dc3545")],
                files : [attachment]
            })
           
        } )
       
    }
}