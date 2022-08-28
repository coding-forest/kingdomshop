require('dotenv').config()
CLIENT_ID = process.env.CLIENT_ID
const getGuild = require('../helpers/getGuild')
const Ticket = require('../models/Ticket')
const claimTicketEmbed = require('../embeds/claimTicketEmbed')
module.exports = {
    name: 'unclaimTicket',
    execute: async (interaction , args) => {
        const {config} = await getGuild(interaction.channel.guild.id)
        const {sellerRole} = config
       const username = interaction.user.username
       const userId = interaction.user.id
       if(!interaction.member.roles.cache.find(r => r.id === sellerRole)) return await interaction.reply({content: '**أنت لا تمتلك role seller**',  ephemeral: true}).catch(err=> console.log('err during reply.'))
       var ticket =await Ticket
    .findOne({ guildId: interaction.channel.guild.id, channelId: interaction.channel.id})

      var responsibles = ticket.responsibles

      if(responsibles.length && !responsibles.includes(userId)) return await interaction.reply({
        content: `**<@${userId}> هذه التذكرة تمتلك مسؤلا مسبقا **`,
        ephemeral: true
      }).catch(err=> console.log('err during reply.'))

      var index = responsibles.findIndex((responsible) => responsible === userId)
      responsibles.splice(index,1)

      ticket
      .update({responsibles}).then(async(ticket) => {
        interaction.channel.setName(ticket.originalName)
        interaction.channel.permissionOverwrites.edit(interaction.member, {
            SEND_MESSAGES: true,
        });
        let role = interaction.message.guild.roles.cache.find(r => r.id === sellerRole);
         interaction.channel.permissionOverwrites.edit(role, {
            SEND_MESSAGES: true,
        });
         interaction.message.edit({
            embeds: [claimTicketEmbed()],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 3,
                            label: "جني",
                            custom_id: "claimTicket"
                        }
                    ]
                }
            ],
        })
        await interaction.reply({
            content: `**<@${userId}>! أنت لست مسؤول هته التذكرة بعد الإن **`,
        }).catch(err=> console.log('err during reply.'))
      })



    }
}