const client = require(`../../index.js`);

module.exports = new Event("guildDelete", async (client, guild) => {
    console.log(`[EVENT] Left ${guild.name}`)
    // Log event to channel ID 760238792568864819 AS AN EMBED
    function logLeave() {
        const channel = client.channels.cache.get('760238792568864819');
        const embed = new MessageEmbed()
            .setTitle(`Left ${guild.name}`)
            .setDescription(`Left ${guild.name}`)
            .setColor(0xFF0000)
            .setTimestamp()
            .setFooter(`${client.user.username}`, client.user.avatarURL());
        channel.send(embed);
    }

});



