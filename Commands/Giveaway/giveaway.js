module.exports = {
    name: "shard",
    userPerms: [`SEND_MESSAGES`],
    clientPerms: [`MANAGE_MESSAGES`],
    ownerOnly: false,
    aliases: [``],
    description: "manage guild",
    async run(client, message, args) { // cleaner syntax
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
				return message.reply(`Server count: \`${totalGuilds}\`\nMember count: \`${totalMembers}\``);
			})
			.catch(console.error);
	}
}