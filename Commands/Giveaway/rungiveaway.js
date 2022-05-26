module.exports = {
    name: "rungiveaway",
    userPerms: [`SEND_MESSAGES`],
    clientPerms: [`MANAGE_MESSAGES`],
    ownerOnly: false,
    aliases: [``],
    description: "Run giveaways.",
    async run(client, message, args) { // cleaner syntax
        // run a giveaway
        let sql = `SELECT * FROM giveaways WHERE guildID = ${message.guild.id}`;
        db.get(sql, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            if (row) {
                if (row.active == 1) {
                    message.channel.send(`There is already an active giveaway.`);
                } else {
                    let sql = `UPDATE giveaways SET active = 1 WHERE guildID = ${message.guild.id}`;
                    db.run(sql, (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                    message.channel.send(`Giveaway started!`);
                }
            } else {
                let sql = `INSERT INTO giveaways (guildID, active) VALUES (${message.guild.id}, 1)`;
                db.run(sql, (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                });
                message.channel.send(`Giveaway started!`);
            }
        });
        
	}
}