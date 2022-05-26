module.exports = {
    name: "balance",
    userPerms: [`SEND_MESSAGES`],
    clientPerms: [`MANAGE_MESSAGES`],
    ownerOnly: false,
    aliases: [`seejuice`],
    description: "Enter giveaways.",
    async run(client, message, args) { // cleaner syntax		
		// query sqlite3 database for user's juice
		
		let sql = `SELECT * FROM juice WHERE userID = ${message.author.id}`;
		db.get(sql, (err, row) => {
			if (err) {
				console.error(err.message);
			}
			if (row) {
				message.channel.send(`You have \`${row.juice}\` juice.`);
			} else {
				message.channel.send(`You have \`0\` juice.`);
			}
		});
		
		
		message.reply(`You have //Juice//`)
		
	}
}
