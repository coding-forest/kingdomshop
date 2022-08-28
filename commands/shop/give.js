const Category = require('../../models/Category')
const Product = require('../../models/Product')
const doneEmbed = require('../../embeds/doneEmbed')
const errorEmbed = require('../../embeds/errorEmbed')
const purchaseCompletedEmbed = require('../../embeds/purchaseCompletedEmbed')
const getGuild = require('../../helpers/getGuild')
const logAction = require('../../helpers/logAction')
module.exports = {
    name: 'give',
    permissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
    options: ['name', 'quantity', 'user'],
    description: 'give a product to a user',
    execute: async (message, args) => {
        if(args.length === 0) return


        const {config, guildId} = await getGuild(message.guild.id)
        const {feedbackRoom} = config

        const categoryName = args[0]
        const numOfProducts = parseInt(args[1]) || 1
        const user =message.mentions.users.first()
        var category = await Category.find({name: categoryName, guildId: message.guild.id})
        if (!category.length) return message.channel.send('**Item not found!**')
        category = category[0]
        var randomProducts = []
        const products = await Product.find({category: category._id, status: 'notSelled'})
        if (!products.length) return message.channel.send('**The stock for this item is off this moment!**')
        if (products.length < numOfProducts) return message.channel.send(`**There is only`+'`' +products.length+ '`' + '`' +categoryName  + '`')

        for(var i = 0; i < numOfProducts; i++){
            var randomIndex = Math.floor(Math.random() * products.length)
            randomProd = products[randomIndex];
            products.splice(randomIndex, 1)
            randomProducts.push(randomProd)
        }

        user.send(
            {embeds: [purchaseCompletedEmbed(category.name, (Math.round((category.price * 20) / 19 + 1)) * numOfProducts,numOfProducts,user.username, `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`, randomProducts,categoryName, feedbackRoom)]}
        ).then(async(res) => {
            
            message.channel.send({
                embeds:[doneEmbed(`<@${user.id}> have recieved ${numOfProducts} of ${category.name} products. enjoy (: from <@${message.author.id}>`)]
            })

            await logAction(message, randomProducts, `gave ${numOfProducts} of ${categoryName} to <@${user.id}>`)

            for(randomProd of randomProducts){
                Product
                .findOne({ _id: randomProd._id })
                .update({status: 'selled', buyed_by: {buyer_id: user.id, buyer_username:user.username}, buyChannel: message.channel.id, buyedAt:new Date().toLocaleDateString()})
                .exec()
            }
        }).catch(err => {
            message.channel.send({
                embeds:[errorEmbed(`<@${user.id}> coudn't DM you, either you blocked me or closed your DM!`)]
            })
        })
        // .catch(err => message.channel.send('Something went wrong when I tried to send you a DM!'))

    }
}