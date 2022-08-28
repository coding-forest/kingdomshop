require('dotenv').config();
const getGuild = require('../helpers/getGuild')
const claimTicketEmbed = require('../embeds/claimTicketEmbed')
const Ticket = require('../models/Ticket')

module.exports = {
    name: 'channelCreate',
    execute: async (channel, client) => {
        const {config} = await getGuild(channel.guild.id) 
        const {ticketsCategory} = config
        const parent_Id = channel.parentId
        if(!parent_Id) return 
        if(ticketsCategory.includes(parent_Id)){
            channel.send({
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
            }).then((result) => {
                const newTicket = new Ticket({
                    guildId: channel.guild.id,
                    channelId: channel.id,
                    originalName: channel.name
                }).save()
            }).catch((err) => {
                console.log("coudn't save new record to the d")
            });
        }
      
    }
}