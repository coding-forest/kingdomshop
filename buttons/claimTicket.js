require('dotenv').config()
CLIENT_ID = process.env.CLIENT_ID
const unclaimTicketEmbed = require('../embeds/unclaimTicketEmbed')
const getGuild = require('../helpers/getGuild')
const Ticket = require('../models/Ticket')

module.exports = {
    name: 'claimTicket',
    execute: async (interaction , args) => {
       const {config} = await getGuild(interaction.channel.guild.id)
       const {sellerRole} = config
       const username = interaction.user.username
       const userId = interaction.user.id
       if(!interaction.member.roles.cache.find(r => r.id === sellerRole)) return await interaction.reply({content: '**أنت لا تمتلك role seller**',  ephemeral: true}).catch(err=> console.log('err during reply.'))
    interaction.channel.setName(`${username}`).catch(err => console.log(err))

    await interaction.reply({content:`**هذه التذكرة مأخوذة من طرف <@${userId}>, المرجو عدم التدخل  !**@everyone`}).catch(err=> console.log('err during reply.'))
        var ticket =await Ticket
        .findOne({ guildId: interaction.channel.guild.id, channelId: interaction.channel.id})
        var responsibles = ticket.responsibles
        if(responsibles.length) return await interaction.reply({
            content: `**<@${userId}>! هذه التذكرة تمتلك مسؤلا مسبقا **`,
            ephemeral: true
          }).catch(err=> console.log('err during reply.'))
        responsibles.push(userId)
       ticket
       .update({responsibles}).then(async(tckt) => {
          interaction.channel.permissionOverwrites.edit(interaction.member, {
            SEND_MESSAGES: true,
        });
        let role = interaction.message.guild.roles.cache.find(r => r.id === sellerRole);
         interaction.channel.permissionOverwrites.edit(role, {
            SEND_MESSAGES: false,
        });
        interaction.message.edit({
            embeds: [unclaimTicketEmbed()],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 4,
                            label: "إعادة",
                            custom_id: "unclaimTicket"
                        }
                    ]
                }
            ],
        })
        if(responsibles) return await interaction.reply({
            content: `**<@${userId}>! أنت الأن مسؤول هته التذكرة **`,
          }).catch(err=> console.log('err during reply.'))
       }).catch(err=>{
        console.log(err)
       })

       

    }
}