const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Data/JuiceEconomy.db');
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
            let sql = `SELECT * FROM Inventory WHERE UserID = ${message.author.id}`;
            db.all(sql, (err, rows) => {
                if (err) {
                    console.error(err.message);
                }
                if (rows.length > 0) {
                    let inventory = [];
                    rows.forEach((row) => {
                        inventory.push(`(ID:${row.ItemID}) - ${row.ItemName} `);
                    });
                    message.channel.send(`You have:\n \`${inventory.join(",\n ")}\`.`);
                } else {
                    message.channel.send(`You have nothing in your inventory..`);
                }
            });
        }
	
	checkInventory();
	}
}
