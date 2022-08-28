require('dotenv').config();


module.exports = {
    name: 'interactionCreate',
    execute: async (interaction,client) => {
       if(interaction.isButton()){
            const button = client.buttons.get(interaction.customId)
            if(!button) return

            try {
                await button.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing the button script !', ephemeral: true});
            }
       } else if(interaction.isSelectMenu()){
            const select = client.selects.get(interaction.customId)
            if(!select) return

            try{
                await select.execute(interaction)
            }catch(error){
                console.log(error)
            }
    }
       
       else {
            return;
       }
    }
}