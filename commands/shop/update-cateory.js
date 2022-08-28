const Category = require('../../models/Category')
const convertUnit = require('../../helpers/convertUnit')
module.exports = {
    name: 'update-category',
    options: ['name','new name','new price'],
    permissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
    description: 'update a category from the stock',
    execute: async (message, args) => {
        if(args.length <= 1) return message.channel.send('**Please set arguments**')

        const name = args[0]
      
        const category =  Category
        .findOne({ guildId: message.guild.id, name: name })
        if (!category) return message.channel.send('**Category Not found!**')
        const newName = args[1] || category.name
        const newPrice = convertUnit(args[2]) || category.price
        category
        .update({name: newName, price:newPrice}).then(cat => {
         message.channel.send(`**You have updated the category ${cat.name} successfuly!**`)
        }).catch(err => message.channel.send('**Something went wrong when I tried to update the category!**'))



    }
}