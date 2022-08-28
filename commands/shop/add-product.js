const Category = require('../../models/Category')
const Product = require('../../models/Product')
const logAction = require('../../helpers/logAction')
module.exports = {
    name: 'add-product',
    options: ['category','properties'],
    permissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
    description: 'add a product to a category',
    execute: async (message, args) => {
        if(args.length <= 1) return
        const catName  = args[0]
        var value = args.splice(1, args.length).join(' ')
        // var stringProperties = ''

        // for(var i = 1 ; i < args.length; i++){
        //     const property = args[i].split("|")[0]
        //     const value = args[i].split("|")[1]
        //     if(i === args.length-1) {
        //         stringProperties += '"'+property+'":' + '"'+value+'"'
        //     }else{
        //         stringProperties += '"'+property+'":' + '"'+value+'",'
        //     }
        // }

        // const properties = JSON.parse(`{${stringProperties}}`)
        
        var category = await Category.find({name: catName, guildId:message.guild.id})
        if(!category.length) return message.channel.send('Category not found!')
        category = category[0]

        const newProduct = new Product({
            value: value,
            category: category._id,
            addedAt: new Date().toLocaleDateString()
        })
        newProduct.save()

   
        message.channel.send(`You have added an account to the category ` + "`" + catName + "`").then(async(msg) => {
            await logAction(message,[newProduct] , `Added new product!`)
        }).catch(err => console.log(err))

    }
}