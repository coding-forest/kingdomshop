const http = require('https');
const LineByLineReader = require('line-by-line')
const Category = require('../../models/Category')
const Product = require('../../models/Product')

module.exports = {
    name: 'seed-products',
    permissions: ['ADMINISTRATOR'],
    execute: async (message, args) => {
        if(!args.length) return message.channel.send("**Invalid arguments**")
        const catName = args[0]
        var category = await Category.find({name: catName, guildId:message.guild.id})
        if(!category.length) return message.channel.send('Category not found!')
        category = category[0]
        var seed;
        var attachment = message.attachments.first()
        const url = attachment ? attachment.url : null;

        const addProduct = (value) => {
            const newProduct = new Product({
                value: value,
                category: category._id,
                addedAt: new Date().toLocaleDateString()
            }).save()
        }

        if(!attachment) {
            if (args.length >= 2) {
                seed = args.splice(1, args.length)
                seed = seed[0].split('\n')
                var c = 0
                for(product of seed){
                    addProduct(product)
                    message.channel.send(`**Added a product to the category` +'`'+catName+'`' + `**`)
                    c++
                }
                return message.channel.send(`**Done added ${c} new products to the category ` +'`'+catName+'`' + `**`)
            }else{
                return message.channel.send("**Please attach a seed file. or add it to the message**")
            }
        }else{
            var url_options = new URL(url)
            var options = {
                host: url_options.hostname,
                path: url_options.pathname,
                method: 'GET',
            }
            var count = 0
            var msg = await message.channel.send(`**Adding products...**`)
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
              
                lr = new LineByLineReader(res);
              

                lr.on('error', function (err) {
                  console.log('err reading file', err);
                });
              

                lr.on('line', function (line) {
                  count++
                  addProduct(line)
                  msg.edit(`**:white_check_mark: Added new ` +'`'+count+'`' + `to the category` +'`'+catName+'`' + `**`)
                });
              
                // lr.on('end', function () {
                //     return message.channel.send(`**:white_check_mark: Done added ${count} new products to the category ` +'`'+catName+'`' + `**`)
            // });
              
              });
              req.on('error', (e) => {
                console.log('problem with request', e);
                req.abort();
              });
              req.end();
        }
    }
}