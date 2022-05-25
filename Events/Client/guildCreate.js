const client = require('../../index.js');

module.exports = new Event("guildCreate", async (client, guild) => {
    console.log(`[EVENT] Joined ${guild.name}`)
    

});


