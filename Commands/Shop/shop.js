const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Data/JuiceEconomy.db');
module.exports = {
    name: "shop",
    userPerms: [`SEND_MESSAGE`],
    clientPerms: [`SEND_MESSAGE`],
    ownerOnly: false,
    aliases: [""],
    run: async(client, message, args) => {
       // Display all the items in a guilds shop database with it's price
       function shop() {
              let sql = `SELECT * FROM Shop WHERE sale = "1"`;
              db.all(sql, (err, rows) => {
                if (err) {
                     console.error(err.message);
                }
                if (rows) {
                     message.channel.send(`Here are the items in the shop:`);
                     for (let i = 0; i < rows.length; i++) {
                          message.channel.send(`${rows[i].itemID} | ${rows[i].itemName} | ${rows[i].value} juice`);
                     }
                }
              });
       }

       shop();

    }
}