const Category = require('../../models/Category')
const Product = require('../../models/Product')
const stockEmbed = require('../../embeds/stockEmbed')
const getGuild = require('../../helpers/getGuild')
const getConfig = require('../../helpers/getConfig')
const waitEmbed = require('../../embeds/waitEmbed')

require('dotenv').config();




module.exports = {
    name: 'stock',
    description: 'see all products in stock',
    execute: async (message, args) => {
        
        const guildId = message.guild.id
        const {config} = await getGuild(guildId) 
        const {prefix} = config
        
        stock_embed = await stockEmbed(message.author.username, message.author.displayAvatarURL({ dynamic: true }), message.guild)

        const {id} = message.reply({
            embeds: [await waitEmbed(`Please wait until the categories are loaded completely.`,message.author.username, message.author.displayAvatarURL({ dynamic: true }), message.guild)],
        }).then(async (msg) => {

            Category.find({guildId: guildId}).then(async(categories) => {
                for(category of categories){
                    const stock = await Product.countDocuments({category: category._id, status: 'notSelled'})
                    var name = '`⇣ '+ category.name  +' ⇣`'
                    var num_hyphens = 22 - name.length
                    for(var i = 0; i < Math.floor(num_hyphens/2); i++){
                        name = '-' + name
                    }
                    for(var j = 0; j < Math.floor(num_hyphens/2); j++){
                        name += '-'
                    }
                    stock_embed.addField(name, 
                        `>>> Price: ${category.price}\nStock: ${stock}\nTo buy:` + '`' + prefix  + 'buy ' + category.name +'`', true
                        )
                }
    
                msg.edit({
                    embeds: [stock_embed]
                })
            })

        })


        

    }
}