const getGuild = require('../../helpers/getGuild')
const Config = require('../../models/Config')
const doneEmbed = require('../../embeds/doneEmbed')

module.exports = {
    name: 'add-line-cat',
    options: ['category id'],
    permissions: ['ADMINISTRATOR'],
    description: 'add line to a all category channels',
    execute: async (message, args) => {
        if(!args.length) return message.channel.send('**Please add the categories you want to add the line feature? **')
        const {config, _id} = await getGuild(message.guild.id)
        var {lineCategories} = config

        const newCategories = []
        console.log(args)
        for(arg of args){
            if(!lineCategories.includes(arg)) newCategories.push(arg)
        }

        lineCategories = [...lineCategories,...newCategories]

        var lineCategoriesStr = ''
        for(lineCat of lineCategories){ 
            lineCategoriesStr += `${lineCat} \n\n`  
        }

        Config
        .findOne({ guild: _id })
        .update({lineCategories}).then(config => {
         message.channel.send({
            embeds: [doneEmbed(`**You have added ${newCategories.length} new categories to line categories : ** __all categories__:
            ` + '`' + lineCategoriesStr  + '`')]
         })
        }).catch(err => message.channel.send('**Something went wrong when I tried to update the config!**'))


    }
}