
require('dotenv').config();

const errEmbed = require('../../embeds/errorEmbed')
const buyEmbed = require('../../embeds/buyEmbed')
const timeoutEmbed = require('../../embeds/timeoutEmbed')
const purchaseCompletedEmbed = require('../../embeds/purchaseCompletedEmbed')
const doneEmbed = require('../../embeds/doneEmbed')
const Category = require('../../models/Category')
const Product = require('../../models/Product')
const getGuild = require('../../helpers/getGuild')
const logAction = require('../../helpers/logAction')


 

module.exports = {
    name: 'buy',
    cooldown: 60,
    options: ['name','quantity'],
    description: 'buy a product from the stock',
    execute: async (message, args) => {
        const {config, guildId} = await getGuild(message.guild.id)
        const {bankId, buyChannelId, prefix, feedbackRoom, logsRoom} = config

        
        BANK_ID = bankId
        BUY_CHANNEL = buyChannelId
        if(BUY_CHANNEL === "" && BANK_ID === "") return message.channel.send({embeds: [errEmbed('The server has no configurations! `' + prefix +'config` to configure the server')]})
        if(!args.length) return message.reply({embeds: [errEmbed('Must specify an item!')]})
        if(message.channel.id !== BUY_CHANNEL) return message.reply({content:`There is the right place to buy : <#${BUY_CHANNEL}>`,embeds: [errEmbed('This is not the right place to buy!')]}) 
        var done = false
        var category = await Category.find({name: args[0], guildId:guildId})
        const numItems = args[1] || 1

        if(!category.length) return message.reply({embeds: [errEmbed('This item does not exist in our stock!')]})
        category = category[0]
        const products = await Product.find({category: category._id, status: 'notSelled'})
        
        if(products.length === 0) return message.reply('**This item is out of stock now, please check our stock later time!**')
        if (products.length < numItems) return message.reply(`**There is only`+'`' +products.length+ '`' + '`' +categoryName  + '`')
        finalPrice = (Math.round((category.price * 20) / 19 + 1)) * numItems;
        message.reply({embeds: [await buyEmbed(category.name,numItems,finalPrice,BANK_ID, message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`, message.guild)]})

        var transferCommands = [
            `#credits <@`+BANK_ID+`> ${finalPrice}`,
            `#credits ${BANK_ID} ${finalPrice}`,
            `#credit <@`+BANK_ID+`> ${finalPrice}`,
            `#credit ${BANK_ID} ${finalPrice}`,
            `#c <@`+BANK_ID+`> ${finalPrice}`,
            `#c ${BANK_ID} ${finalPrice}`,
            `c <@`+BANK_ID+`> ${finalPrice}`,
            `c ${BANK_ID} ${finalPrice}`
        ]

        const filter = (m) => m.author.id === message.author.id && transferCommands.includes(m.content.toLowerCase())
        const fullValueToUser = Math.floor(
            finalPrice - (finalPrice * 5) / 100
          );
        const transfterFilter = (m) => m.author.bot && m.author.id === "282859044593598464" && m.content.startsWith(`**:moneybag: | ${message.author.username}, has transferred ` +'`$'+`${fullValueToUser}`+'`' + ' to <@!'+BANK_ID+'> **')
        message.channel.awaitMessages({filter:filter, max:1, time: 50000, errors:['time']}).then(collected => {
            message.channel.awaitMessages({filter: transfterFilter, max: 1, time: 50000, errors:['time']}).then(collected => {
            var randomProducts = []
            for(var j = 0; j < numItems; j++){
                var randomIndex = Math.floor(Math.random() * products.length)
                randomProd = products[randomIndex];
                products.splice(randomIndex, 1)
                randomProducts.push(randomProd)
            }
            message.author.send(
                {embeds: [purchaseCompletedEmbed(category.name, finalPrice,numItems,message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`, randomProducts,  args[0], feedbackRoom)]}
            ).then(async(res) => {
                message.reply({
                    embeds:[doneEmbed(`You have recieved ${numItems} of ${category.name} products. enjoy (:\ndon't forget your feedback here <#${feedbackRoom}>`,)]
                })
                for(randomProd of randomProducts){
                    Product
                    .findOne({ _id: randomProd._id })
                    .update({status: 'selled', buyed_by: {buyer_id: message.author.id, buyer_username:message.author.username}, buyChannel: message.channel.id, buyedAt:new Date().toLocaleDateString()})
                    .exec()
                }
                
                await logAction(message, randomProducts, `bought ${numItems} of ${category.name}`).catch(err => console.log(err))
            }).catch(err => {
                console.log(err)
                message.reply('Something went wrong when I tried to send you a DM!');
            })
            }).catch(err => message.reply({embeds:[timeoutEmbed('The operation is cancelled due to the delay!')]}))

        }).catch(err => message.reply({embeds:[timeoutEmbed('The operation is cancelled due to the delay!')]}))

    }
}   