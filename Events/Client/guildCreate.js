const client = require('../../index.js');

module.exports = new Event("guildCreate", async (client, guild) => {
    console.log(`[EVENT] Joined ${guild.name}`)
    // log event to channel id 760238792568864819 as an embed
    function logjoin() {
        const channel = client.channels.cache.get('760238792568864819');
        const embed = new MessageEmbed()
            .setTitle(`Joined ${guild.name}`)
            .setDescription(`Joined ${guild.name}`)
            .setColor(0x00FF00)
            .setTimestamp()
            .setFooter(`${client.user.username}`, client.user.avatarURL());
        channel.send(embed);
    }

});


