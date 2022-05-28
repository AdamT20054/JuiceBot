const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Data/JuiceEconomy.db');
module.exports = {
    name: "item",
    userPerms: [`SEND_MESSAGES`],
    clientPerms: [`MANAGE_MESSAGES`],
    ownerOnly: false,
    aliases: [`checkitem`],
    description: "see whats in your inventory.",
    async run(client, message, args) { // cleaner syntax		
		// Return the itemName and itemDescription and value of the item from the shop table
        function getItemIDInfo(itemID) {
            let sql = `SELECT * FROM Shop WHERE itemID = "${itemID}"`;
            db.get(sql, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row) {
                    message.channel.send(`(${row.itemID}) ${row.itemName} costs ${row.value} juice.`);
                } else {
                    message.channel.send(`${itemID} is not in the shop.`);
                }
            });
        }
        
        		// Return the ItemID and value of the item from the shop table
        function getItemNameInfo(itemName) {
            let sql = `SELECT * FROM Shop WHERE itemName = "${itemName}"`;
            db.get(sql, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row) {
                    message.channel.send(`(${row.itemID}) ${row.itemName} costs ${row.value} juice.`);
                } else {
                    message.channel.send(`${itemName} is not in the shop.`);
                }
            });
        }

        
        // Create a help command for the user to see what they can do with the command
        function help() {
            message.channel.send(`You can use the following commands:\n \`item <itemID>\` - get info about an item.\n \`item <itemName>\` - get info about an item.\n`);
        }

        if (args.length === 0) {
            help();
        } else if (args.length === 1) {
            if (args[0] === "help") {
                help();
            } else {
                getItemIDInfo(args[0]);
            }
        } else {
            getItemNameInfo(args[0]);
        }
		
	}
}
