require('dotenv').config();
const fs = require('fs')
const {Client, Intents, Collection} = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
const giveawayModel = require('./models/Giveaway')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,   
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
});



const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    // This function is called when the manager needs to get all giveaways which are stored in the database.
    async getAllGiveaways() {
        // Get all giveaways from the database. We fetch all documents by passing an empty condition.
        return await giveawayModel.find().lean().exec();
    }

    // This function is called when a giveaway needs to be saved in the database.
    async saveGiveaway(messageId, giveawayData) {
        // Add the new giveaway to the database
        await giveawayModel.create(giveawayData);
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be edited in the database.
    async editGiveaway(messageId, giveawayData) {
        // Find by messageId and update it
        await giveawayModel.updateOne({ messageId }, giveawayData).exec();
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageId) {
        // Find by messageId and delete it
        await giveawayModel.deleteOne({ messageId }).exec();
        // Don't forget to return something!
        return true;
    }
};

// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

const config = require('./config.json');
client.config = config;

const buttonFiles = fs.readdirSync('./buttons');
client.buttons = new Collection()

for(const file of buttonFiles){
    const button = require(`./buttons/${file}`)
    client.buttons.set(button.name, button)
}


const embedFiles = fs.readdirSync('./embeds');
client.embeds = new Collection()

for(const file of embedFiles){
    const embed = require(`./embeds/${file}`)
    client.embeds.set(file, embed)
}


client.commands = new Collection()

var handlers = ["command"]
for(handler of handlers){
    require(`./handlers/${handler}`)(client);
}


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for(const file of eventFiles){
    const event = require(`./events/${file}`);
    if(event.once){
        client.once(event.name, (...args) => {
            event.execute(...args, client)
        })
    }
    else{
        client.on(event.name, (...args) => {
            event.execute(...args, client)
            
        })
    }
}


const selectFiles = fs.readdirSync('./selects').filter(file => file.endsWith('.js'))
client.selects = new Collection()

for(const selectFile of selectFiles){
    const select = require(`./selects/${selectFile}`);
    client.selects.set(select.name, select)
}





client.login(process.env.TOKEN);
 

