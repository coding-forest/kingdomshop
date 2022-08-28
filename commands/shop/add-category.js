const Category = require('../../models/Category')
const convertUnit = require('../../helpers/convertUnit')
const logAction = require('../../helpers/logAction')
module.exports = {
    name: 'add-category',
    options: ['name','price'],
    permissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
    description: 'add a category to the stock ',
    execute: async (message, args) => {
        if(args.length <= 1) return
        const name = args[0]
        const price = convertUnit(args[1])

        const category =  Category
        .findOne({ guildId: message.guild.id, name: name })
        const newCat = new Category({
            guildId: message.guild.id,
            name: name,
            price: price
        })
        newCat.save()
        message.channel.send({
            content: `You've created a category, name:`+ '`' +name+ '`',
        }).then(async(msg) => {
            await logAction(message, null, `Created new category named ${name}`)
        }).catch(err => console.log(err)) 

    }
}