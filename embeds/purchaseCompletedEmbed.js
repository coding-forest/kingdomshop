const { MessageEmbed } = require('discord.js')

module.exports =  (item, final_price, num_items, author_name, icon_url, data, categoryName, feedbackRoom) => {
   
    const purchaseComplete =  new MessageEmbed()
    .setColor('#dc3545')
    .setTimestamp()
    .setAuthor({ name: author_name, iconURL:icon_url })
    .addField(`**Wassup ${author_name}, There is your order of `+'`'+categoryName+ '`'+`:**`, '>>> Final Price: '+ '`'+final_price+'`\nNumber of Items:'+'`'+num_items+'`\n Do not forget your feedback here <#'+feedbackRoom+'>')
 
    // var count = 1
    // for(props of data){
    //     var properties = ''
    //     Object.keys(props.properties).forEach((key) => {
    //         properties += `__**${key}**__:` + '```' + props.properties[key] + '``` \n' 
    //     })
    //     purchaseComplete.addField(`** Item Number ${count} :**`, properties)
    //     count++
    // }

    var products_string = ''

    for(product of data){
        products_string += `${product.value}\n`
    }

    purchaseComplete.addField('**Your accounts :**','```'+ products_string  +'```')

    return purchaseComplete

}
