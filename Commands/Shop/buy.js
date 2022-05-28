const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Data/JuiceEconomy.db');
module.exports = {
    name: "buy",
    userPerms: [`SEND_MESSAGE`],
    clientPerms: [`SEND_MESSAGE`],
    ownerOnly: false,
    aliases: ["buyshop"],
    run: async(client, message, args) => {


       // Check if user has enough juice to buy an item and then add it to the users inventory
       // and remove the juice from the users juice balance
       function purchase() {
               let sql = `SELECT * FROM Shop WHERE itemID = "${args[0]}" OR itemName ="${args[0]} AND sale = "1"`;
                  db.get(sql, (err, row) => {
                 if (err) {
                        console.error(err.message);
                 }
                 if (row) {
                     //console.log(row)
                        let sql2 = `SELECT * FROM Balance WHERE UserID = ${message.author.id}`;
                        db.get(sql2, (err, row2) => {
                              if (err) {
                                 console.error(err.message);
                              }
                              if (row2) {
                                 if ((row2.Juice >= row.value) && (row2.sale != 0)) {
                                        let sql3 = `UPDATE Balance SET Juice = ${row2.Juice - row.value} WHERE UserID = ${message.author.id}`;
                                        db.run(sql3, (err) => {
                                          if (err) {
                                                 console.error(err.message);
                                          }
                                          message.channel.send(`Ordering ${row.itemName} for ${row.value} juice...`);
                                        });
                                        let sql4 = `INSERT INTO Inventory (UserID, itemID, itemName, value, sale) VALUES (${message.author.id}, ${row.itemID}, "${row.itemName}", ${row.value}, ${row.sale})`;
                                        db.run(sql4, (err) => {
                                          if (err) {
                                                 console.error(err.message);
                                          }
                                          message.channel.send(`You have successfully purchased ${row.itemName} for ${row.value} juice.`);
                                        });
                                 } else {
                                        message.channel.send(`You do not have enough juice to buy this item.`);
                                 }
                              } else {
                                 message.channel.send(`You do not have enough juice to buy this item.`);
                              }
                        });
                 } else {
                        message.channel.send(`That item is not in the shop.`);
                 }
                  });         

       }

       // Generate a help command for the buy command
         function help() {
                message.channel.send(`To buy an item from the shop, use the command \`${prefix}buy <itemID or itemName>\`.`);
            }

        if(args[0] == "help") {
            help();
        } else {
            purchase();
        }
    }
}