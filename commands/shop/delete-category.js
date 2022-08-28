const Category = require('../../models/Category')
const Product = require('../../models/Product')
const logAction = require('../../helpers/logAction')
module.exports = {
    name: 'delete-category',
    permissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
    description: 'delete a category',
    options: ['name'],
    execute: async (message, args) => {
        if(args.length === 0) return
        const name = args[0]
        var category = await Category.find({name: name,  guildId: message.guild.id})
        category = category[0]
        Category.findByIdAndDelete({_id: category._id, guildId: message.guild.id}).then(async(category) => {
            if(!category){
                return message.channel.send(`**This category was not found**`)
            }
            Product.deleteMany({category: category._id})
            await logAction(message, null, `deleted the category ${name} and all it's products `).catch(err => console.log(err))
            return message.channel.send(`**The category ${name} has been deleted and all its products**`)
        })   
    }
}