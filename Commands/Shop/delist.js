const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Data/JuiceEconomy.db');
module.exports = {
    name: "delist",
    userPerms: [`SEND_MESSAGE`],
    clientPerms: [`SEND_MESSAGE`],
    ownerOnly: false,
    aliases: ["remove"],
    run: async(client, message, args) => {
        checkargs(args);

       // Edit the sale value of an itemID in the shop table to 0
       function delist(itemID) {
           console.log(`delist`);
                let sql = `UPDATE Shop SET sale = "0" WHERE itemID = "${itemID}"`;
                db.run(sql, (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    message.channel.send(`${itemID} has been delisted from the shop.`);
                });
       }

       // edit the sale value of an itemName in the shop table to 0
         function delistName(itemName) {
             console.log(`delistName`);
                let sql = `UPDATE Shop SET sale = "0" WHERE itemName = "${itemName}"`;
                db.run(sql, (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    message.channel.send(`${itemName} has been delisted from the shop.`);
                });
       }

       // Check to see if args is an itemID or itemName
         function checkargs(args) {
             console.log(`checkargs`);
                let sql = `SELECT * FROM Shop WHERE itemID = "${args}"`;
                db.get(sql, (err, row) => {
                    if (err) {
                        console.error(err.message);
                    }
                    if (row) {
                        delist(args);
                    }
                    else {
                        let sql2 = `SELECT * FROM Shop WHERE itemName = "${args}"`;
                        db.get(sql2, (err, row) => {
                            if (err) {
                                console.error(err.message);
                            }
                            if (row) {
                                delistName(args);
                            }
                            else {
                                message.channel.send(`Please enter a valid itemID or itemName.`);
                            }
                        });
                    }
                });
         }


    }
}