module.exports = {
    name: "shard",
    userPerms: [`ADMINISTRATOR`],
    clientPerms: [`MANAGE_GUILD`],
    ownerOnly: false,
    aliases: [``],
    description: "manage guild",
    async run(client, message, args, prefix) { // cleaner syntax
        if(!message.content.startsWith(prefix)) return;
        const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
			client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
            client.shard.fetchClientValues('guilds.cache.size'),
		];

		return Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                const shardArray = results[2];
				return message.reply(`Total shards: [\`${shardArray}\`]\n\nServer count: \`${totalGuilds}\`\nMember count: \`${totalMembers}\``);
			})
			.catch(console.error);
	}
}