const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Data/JuiceEconomy.db');
module.exports = {
    name: "getjuice",
    userPerms: [`SEND_MESSAGES`],
    clientPerms: [`MANAGE_MESSAGES`],
    ownerOnly: false,
    aliases: [`redeem`],
    description: "Enter giveaways.",
    async run(client, message, args) { // cleaner syntax
        // Query sqlite database for users juice
        // If user does not exist in database, create user and set juice to 0
        function checkBalance() {
            let sql = `SELECT * FROM Balance WHERE UserID = ${message.author.id}`;
            db.get(sql, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row) {
                    // check the lastRedeemed value to see if user has redeemed in the last 8 hours
                    let lastRedeemed = row.lastRedeemed;
                    let now = new Date();
                    let nowTime = now.getTime();
                    let lastRedeemedTime = new Date(lastRedeemed).getTime();
                    let timeDiff = nowTime - lastRedeemedTime;
                    let timeDiffHours = timeDiff / 1000 / 60 / 60;
                    if (timeDiffHours < 8) {
                        message.channel.send(`Please wait ${8 - timeDiffHours} hours before redeeming again.`);
                    } else {
                        // add one juice to users balance
                        let sql = `UPDATE Balance SET Juice = Juice + 1, lastRedeemed = '${now}' WHERE UserID = ${message.author.id}`;
                        db.run(sql, (err) => {
                            if (err) {
                                console.error(err.message);
                            }
                        });
                        message.channel.send(`You have been given 1 juice.`);
                    }
                                      
                    




                } else {
                    let sql = `INSERT INTO Balance (UserID, juice) VALUES (${message.author.id}, 1)`;
                    db.run(sql, (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                    message.channel.send(`You have redeemed 1 juice.`);
                }
            });
        }
        
    
        
        
	}
}