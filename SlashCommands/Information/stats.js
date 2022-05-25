module.exports = {
    name: "stats",
    description: "See the bot stats!",
    aliases: [""],
    async run(client, interaction, guild, args) {
        const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
			client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
            client.shard.fetchClientValues('guilds.cache.size'),
            client.shard.id
		];

		return Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                const shardArray = results[2];
				return interaction.followUp({
					content: `Total shards: \`[${shardArray}]\`\n\nServer count: \`${totalGuilds}\`\nMember count: \`${totalMembers}\``,
					empheral: false
				});
			})
			.catch(console.error);
    }
}