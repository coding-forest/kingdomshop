require('dotenv').config();
mongo_uri = process.env.MONGO_URI
const mongoose = require('mongoose');


module.exports = {
    name: 'ready',
    once: true,
    execute: async (client) => {
        mongoose.connect(mongo_uri, {
            keepAlive: true,
        })
        console.log('boy is finally running!')
        client.user.setPresence(
            { 
                activities: [
                    { 
                        name: process.env.STATUS_TEXT , 
                        type: 'PLAYING' 
                    }
                ], 
                status: "dnd"
            }
        ) 
    }
}