const getGuild = require('../../helpers/getGuild')
const Config = require('../../models/Config')
const doneEmbed = require('../../embeds/doneEmbed')

module.exports = {
    name: 'add-tickets-cat',
    options: ['category id'],
    permissions: ['ADMINISTRATOR'],
    description: 'add claim feature to all tickets',
    execute: async (message, args) => {
        if(!args.length) return message.channel.send('**Please add the categories you want to add the claim feature?**')
        const {config, _id} = await getGuild(message.guild.id)
        var {ticketsCategory} = config

        const newCategories = []
        for(arg of args){
            if(!ticketsCategory.includes(arg)) newCategories.push(arg)
        }

        ticketsCategory = [...ticketsCategory,...newCategories]

        var CategoriesStr = ''
        for(lineCat of ticketsCategory){ 
            CategoriesStr += `${lineCat} \n\n`  
        }

        Config
        .findOne({ guild: _id })
        .update({ticketsCategory}).then(config => {
         message.channel.send({
            embeds: [doneEmbed(`**You have added ${newCategories.length} new categories to claim ticket categories : ** __all categories__:
            ` + '`' + ticketsCategory  + '`')]
         })
        }).catch(err => message.channel.send('**Something went wrong when I tried to update the config!**'))


    }
}