const errEmbed = require('../../embeds/errorEmbed')
const getTax = require('../../helpers/getTax')
const taxEmbed = require('../../embeds/taxEmbed')
module.exports = {
    name: 'tax',
    description: 'calculate the tax of credits',
    options: ['credits'],
    execute: async (message, args) => {
      if(!args.length) return message.channel.send({embeds: [errEmbed('This command require the amount of credits!')]})
    //  message.delete()
      message.reply({
        embeds:[await taxEmbed(args[0], message.guild)]
      })
    }
}