const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Data/JuiceEconomy.db');
module.exports = {
    name: "delete",
    userPerms: [`SEND_MESSAGE`],
    clientPerms: [`SEND_MESSAGE`],
    ownerOnly: false,
    aliases: [""],
    run: async(client, message, args) => {
        function deleteShopItem(itemID) {
            console.log(`delete`);
            let sql = `DELETE FROM Shop WHERE itemID = "${itemID}" or itemName = "${itemID}"`;
            db.run(sql, (err) => {
                if (err) {
                    console.error(err.message);
                }
                message.channel.send(`${itemID} has been deleted from the shop.`);
            });
        }


       // Delete all entries in the Inventory table where the itemID is equal to the args
         function deleteItem(itemID) {
             console.log(`deleteItem`);
                let sql = `DELETE FROM Inventory WHERE itemID = "${itemID}" OR itemName = "${itemID}"`;
                db.run(sql, (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    message.channel.send(`${itemID} has been deleted from everybodys inventory; removing from shop...`);
                    // delete item from the shop
                    deleteShopItem(itemID);
                });
         }

         deleteItem(args[0])
       

    }
}