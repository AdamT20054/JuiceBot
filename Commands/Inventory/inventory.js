module.exports = {
    name: "inventory",
    userPerms: [`SEND_MESSAGES`],
    clientPerms: [`MANAGE_MESSAGES`],
    ownerOnly: false,
    aliases: [``],
    description: "see whats in your inventory.",
    async run(client, message, args) { // cleaner syntax		
		// query sqlite3 database for items in users inventory
        function checkInventory() {
            let sql = `SELECT * FROM inventory WHERE userID = ${message.author.id}`;
            db.all(sql, (err, rows) => {
                if (err) {
                    console.error(err.message);
                }
                if (rows.length > 0) {
                    let inventory = [];
                    rows.forEach((row) => {
                        inventory.push(row.item);
                    });
                    message.channel.send(`You have ${inventory.join(", ")}.`);
                } else {
                    message.channel.send(`You have nothing.`);
                }
            });
        }
	
		
	}
}
