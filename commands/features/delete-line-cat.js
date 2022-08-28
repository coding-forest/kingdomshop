const getGuild = require('../../helpers/getGuild')
const Config = require('../../models/Config')
const doneEmbed = require('../../embeds/doneEmbed')

module.exports = {
    name: 'delete-line-cat',
    permissions: ['ADMINISTRATOR'],
    description: 'remove line from all category channels',
    options: ['category id'],
    execute: async (message, args) => {
        if(!args.length) return message.channel.send('**Please add the categories you want to add the line feature?**')
        const {config, _id} = await getGuild(message.guild.id)
        var {lineCategories} = config

        const deletedCategories = []
        for(arg of args){
            if(lineCategories.includes(arg)) deletedCategories.push(arg)
        }

        for(delCat of deletedCategories){
            var index = lineCategories.findIndex((cat) => cat === delCat)
            lineCategories.splice(index, 1)
        }


        var lineCategoriesStr = ''
        for(lineCat of lineCategories){ 
            lineCategoriesStr += `${lineCat} \n\n`  
        }


        Config
        .findOne({ guild: _id })
        .update({lineCategories}).then(config => {
         message.channel.send({
            embeds: [doneEmbed(`**You have deleted ${deletedCategories.length}  categories from line categories : ** __all categories__:
            ` + '`' + lineCategoriesStr  + '`')]
         })
        }).catch(err => message.channel.send('**Something went wrong when I tried to update the config!**'))


    }
}