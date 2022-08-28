const getGuild = require('../../helpers/getGuild')
const Config = require('../../models/Config')
const doneEmbed = require('../../embeds/doneEmbed')

module.exports = {
    name: 'del-tickets-cat',
    permissions: ['ADMINISTRATOR'],
    description: 'remove claim from all category channels',
    options: ['category id'],
    execute: async (message, args) => {
        if(!args.length) return message.channel.send('**Please add the categories you want to add the claim feature?**')
        const {config, _id} = await getGuild(message.guild.id)
        var {ticketsCategory} = config

        const deletedCategories = []
        for(arg of args){
            if(ticketsCategory.includes(arg)) deletedCategories.push(arg)
        }

        for(delCat of deletedCategories){
            var index = ticketsCategory.findIndex((cat) => cat === delCat)
            ticketsCategory.splice(index, 1)
        }


        var CategoriesStr = ''
        for(lineCat of ticketsCategory){ 
            CategoriesStr += `${lineCat} \n\n`  
        }


        Config
        .findOne({ guild: _id })
        .update({ticketsCategory}).then(config => {
         message.channel.send({
            embeds: [doneEmbed(`**You have deleted ${deletedCategories.length}  categories from claim categories : ** __all categories__:
            ` + '`' + ticketsCategory  + '`')]
         })
        }).catch(err => message.channel.send('**Something went wrong when I tried to update the config!**'))


    }
}