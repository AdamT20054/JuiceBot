module.exports = {
    name: "giveaway",
    userPerms: [`SEND_MESSAGES`],
    clientPerms: [`MANAGE_MESSAGES`],
    ownerOnly: false,
    aliases: [``],
    description: "Enter giveaways.",
    async run(client, message, args) { // cleaner syntax
        // Check DB to see last redeem time
        // compare to current time
        // If difference large enough --> Update last redeemed time --> increase the users total by one.
        // If difference not large enough ---> Do nothing//reply with time remaining.
        // If no row in DB --> Create new row with current time and one juice.
        function getJuice() {
            let sql = `SELECT * FROM juice WHERE userID = ${message.author.id}`;
            db.get(sql, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row) {
                    let now = new Date();
                    let lastRedeemed = new Date(row.lastRedeemed);
                    let diff = now - lastRedeemed;
                    if (diff > 3600000) {
                        let sql = `UPDATE juice SET lastRedeemed = ${now}, juice = juice + 1 WHERE userID = ${message.author.id}`;
                        db.run(sql, (err) => {
                            if (err) {
                                console.error(err.message);
                            }
                        });
                    }
                } else {
                    let now = new Date();
                    let sql = `INSERT INTO juice (userID, lastRedeemed, juice) VALUES (${message.author.id}, ${now}, 1)`;
                    db.run(sql, (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                }
            });
        }
        
        
	}
}