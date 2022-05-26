module.exports = {
    name: "giveaway",
    userPerms: [`SEND_MESSAGES`],
    clientPerms: [`MANAGE_MESSAGES`],
    ownerOnly: false,
    aliases: [`joingiveaway`],
    description: "join giveaways.",
    async run(client, message, args) { // cleaner syntax
        // Let user join a giveaway
        function joinGiveaway() {
            // query sqlite3 database for user's juice
            let sql = `SELECT * FROM giveaways WHERE guildID = ${message.guild.id}`;
            db.get(sql, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row) {
                    if (row.active == 1) {
                        let sql = `UPDATE giveaways SET userIDs = ${message.author.id} WHERE guildID = ${message.guild.id}`;
                        db.run(sql, (err) => {
                            if (err) {
                                console.error(err.message);
                            }
                        });
                        message.channel.send(`You have joined the giveaway!`);
                    } else {
                        message.channel.send(`There is no active giveaway.`);
                    }
                } else {
                    message.channel.send(`There is no active giveaway.`);
                }
            });

        }
        
	}
}