

module.exports = {
    name: 'say',
    category: ['admins'],
    permissions: ['MANAGE_MESSAGES'],
    execute: async (message, args) => {
        if(!args.length) return
        return message.channel.send(`${args.join(' ')}`).then(msg => {
            message.delete()
        })
    }
}