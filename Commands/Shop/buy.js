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
               let sql = `SELECT * FROM shop WHERE guildID = ${message.guild.id} AND item = "${args[0]}"`;
                  db.get(sql, (err, row) => {
                 if (err) {
                        console.error(err.message);
                 }
                 if (row) {
                        let sql2 = `SELECT * FROM juice WHERE userID = ${message.author.id}`;
                        db.get(sql2, (err, row2) => {
                              if (err) {
                                 console.error(err.message);
                              }
                              if (row2) {
                                 if (row2.juice >= row.price) {
                                        let sql3 = `UPDATE juice SET juice = ${row2.juice - row.price} WHERE userID = ${message.author.id}`;
                                        db.run(sql3, (err) => {
                                          if (err) {
                                                 console.error(err.message);
                                          }
                                          message.channel.send(`You have successfully purchased ${row.item} for ${row.price} juice.`);
                                        });
                                        let sql4 = `INSERT INTO inventory (userID, item) VALUES (${message.author.id}, "${row.item}")`;
                                        db.run(sql4, (err) => {
                                          if (err) {
                                                 console.error(err.message);
                                          }
                                          message.channel.send(`You have successfully purchased ${row.item} for ${row.price} juice.`);
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
    }
}