const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Data/JuiceEconomy.db');
module.exports = {
    name: "balance",
    userPerms: [`SEND_MESSAGES`],
    clientPerms: [`MANAGE_MESSAGES`],
    ownerOnly: false,
    aliases: [`seejuice`],
    description: "Enter giveaways.",
    async run(client, message, args) { // cleaner syntax		
		// query sqlite3 database for user's juice
		// If user does not exist in database, create user and set juice to 0
		let sql = `SELECT * FROM Balance WHERE UserID = ${message.author.id}`;
		db.get(sql, (err, row) => {
			if (err) {
				console.error(err.message);
			}
			if (row) {
				message.channel.send(`You have ${row.Juice} juice.`);
			} else {
				let sql = `INSERT INTO Balance (UserID, juice) VALUES (${message.author.id}, 0)`;
				db.run(sql, (err) => {
					if (err) {
						console.error(err.message);
					}
				});
				message.channel.send(`You have 0 juice.`);
			}
		});
		
		
	}
}
