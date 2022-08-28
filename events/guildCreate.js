const Guild = require('../models/Guild')
const Config = require('../models/Config')
const LisenceKey = require('../models/LisenceKey') 
const {generateSeed, generateKey} = require('../helpers/lisenceGen')

module.exports = {
    name: 'guildCreate',
    execute: async (guild) => {
        const newGuild = new Guild({
            guildId: guild.id,
            guildOwnerId: guild.ownerId,
	    guildName: guild.name,
        }).save().then(guildObj => {
		const member = guild.members.cache.get(process.env.CLIENT_ID)
        member.setNickname(guild.name)
            const netConfig = new Config({
                guild: guildObj._id
            }).save().then(config => {
                guild.channels.create('stock-logs', {
                    type: 'GUILD_TEXT',
                    permissionsOverwrites: [{
                        id: guild.id,
                        deny: ['VIEW_CHANNEL']
                    }]
                }).then(channel => {
                    config
                    .findOne({ guild: guildObj._id })
                    .update({logsRoom: guildObj.id}).then(config => {
                        channel.send('**This channel is created for the admins so they can see the logs for every actions someone did!**')
                    }).catch(err => message.channel.send('**Something went wrong when I tried to update the config!**'))
                })
            })

            const seed = generateSeed()
            const key = generateKey(seed)
            const newLisenceKey = new LisenceKey({
                guildId: guild.id,
                key: key    
            }).save()

        }).catch(err => {
            console.log('Already joined guild!')
        })
    }
}