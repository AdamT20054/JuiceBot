const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Data/JuiceEconomy.db');
const { PREFIX } = require('../../Data/config.json');

module.exports = {
    name: "giveaway",
    userPerms: [`SEND_MESSAGES`],
    clientPerms: [`MANAGE_MESSAGES`],
    ownerOnly: false,
    aliases: [`joingiveaway`],
    description: "join giveaways.",
    async run(client, message, args) { // cleaner syntax
        
        //JOIN GIVEAWAY

        // Create a giveaway table and allow users to join giveaways by sending a message with the giveawayID
        function createGiveawayTable() {
            let sql = `CREATE TABLE IF NOT EXISTS giveaways (guildID TEXT, active INTEGER, giveawayID INTEGER, Description TEXT, PRIMARY KEY (giveawayID))`;
            db.run(sql, (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
        }
        createGiveawayTable();
        // Create a user table and allow users to join giveaways by sending a message with the giveawayID
        function createUserTable() {
            let sql = `CREATE TABLE IF NOT EXISTS uGiveaway (guildID INTEGER, userID TEXT, giveawayID INTEGER)`;
            db.run(sql, (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
        }
        createUserTable();
        
        // Enter userID into a giveaway if giveawayID exists in giveaways table
        function enterGiveaway(giveawayID) {
            let sql = `SELECT * FROM giveaways WHERE giveawayID = ${giveawayID}`;
            db.get(sql, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row) {
                    // Check if user is already in the giveaway
                    let sql = `SELECT * FROM uGiveaway WHERE userID = ${message.author.id} AND giveawayID = ${giveawayID}`;
                    db.get(sql, (err, row) => {
                        if (err) {
                            console.error(err.message);
                        }
                        if (row) {
                            message.channel.send(`You are already in this giveaway.`);
                        } else {
                            // Add user to giveaway
                            let sql = `INSERT INTO uGiveaway (guildID, userID, giveawayID) VALUES (${message.guild.id}, ${message.author.id}, ${giveawayID})`;
                            db.run(sql, (err) => {
                                if (err) {
                                    console.error(err.message);
                                } else {
                                    message.channel.send(`You have entered the giveaway.`);
                                }
                            }
                            );

                            
        } 
                    });  
                } else {
                    message.channel.send(`This giveaway does not exist; see active giveaways with \`${PREFIX}giveaway list\``);
                }
            });
        }

        
        //CREATE GIVEAWAY
        
        
        function generateGiveawayID() {
            console.log("Generating giveaway ID...");
            let id = Math.floor(Math.random() * 1000000);
            return id;
        }



        // Join args into a string with spaces
        function joinArgs(args) {
            console.log("Joining args...");
            let str = "";
            for (let i = 1; i < args.length; i++) {
                str += args[i] + " ";
            }
            return str;
        }
        




        let GiveawayID = generateGiveawayID();
        // Create entry with giveaway ID and endTime in the giveaways table
        function createGiveawayEntry(GiveawayID, args) {
            console.log("Creating giveaway entry...");
            let sql = `INSERT INTO Giveaways (guildID, active, GiveawayID, Description) VALUES (${message.guild.id}, "1", ${GiveawayID}, "${args}")`;
            db.run(sql, (err) => {
                console.log(`running SQL call`)
                if (err) {
                    console.error(err.message);
                    return
                } else {
                    return
                }
            });
        }
        
        

        
        //LIST GIVEAWAYS

        // List current giveaways where active = 1
        function listGiveaways() {
            console.log("Listing giveaways...");
            let sql = `SELECT * FROM giveaways WHERE guildID = ${message.guild.id} AND active = 1`;
            db.all(sql, (err, rows) => {
                if (err) {
                    console.error(err.message);
                }
                if (rows.length > 0) {
                    let giveaways = [];
                    rows.forEach((row) => {
                        giveaways.push(`(ID:${row.giveawayID}) - ${row.Description} `);
                    });                 
                    //message.channel.send(`Current giveaways:\n \`${giveaways.join(",\n ")}\`.`);
                } else {
                    message.channel.send(`You have no active giveaways.`);
                }
            });
        }


        // Check what giveaways the user is in
        function checkUserGiveaways() {
            console.log("Checking user giveaways...");            
            let sql = `SELECT * FROM uGiveaway WHERE userID = ${message.author.id}`;
            db.all(sql, (err, rows) => {
                if (err) {
                    console.error(err.message);
                }
                if (rows.length > 0) {
                    let giveaways = [];
                    rows.forEach((row) => {
                        giveaways.push(`ID: ${row.giveawayID}`);
                    });
                    message.channel.send(`You are in the following giveaways:\n \`${giveaways.join(",\n ")}\`.`);
                } else {
                    message.channel.send(`You are not in any giveaways.`);
                }
            });
        }


        // End a giveaway by setting active = 0 in the giveaways table and picking a winner from the uGiveaway table and sending a message with the winner's userID and the giveawayID of the giveaway they won
        function endGiveaway(giveawayID) {
            console.log("Ending giveaway...");
            let sql6 = `SELECT * FROM giveaways WHERE giveawayID = ${giveawayID}`;
            db.get(sql6, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row) {
                    let sql7 = `UPDATE giveaways SET active = 0 WHERE giveawayID = ${giveawayID}`;
                    db.run(sql7, (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                    let sql8 = `SELECT * FROM uGiveaway WHERE giveawayID = ${giveawayID}`;
                    db.all(sql8, (err, rows) => {
                        if (err) {
                            console.error(err.message);
                        }
                        if (rows.length > 0) {
                            let winner = rows[Math.floor(Math.random() * rows.length)];
                            let sql9 = `DELETE FROM uGiveaway WHERE userID = ${winner.userID} AND giveawayID = ${giveawayID}`;
                            db.run(sql9, (err) => {
                                console.log(`Winner: ${winner.userID}`);
                                if (err) {
                                    console.error(err.message);
                                }
                            });
                            // Send message with winner's userID and giveawayID
                            message.channel.send({
                                content:`Congratulations <@${winner.userID}> ! You won the giveaway with ID: ${giveawayID}`, 
                                allowedMentions:{ users: [`${winner.userID}`] }});

                            //message.channel.send(`Congratulations <@${winner.userID}>! You won the giveaway with ID: ${giveawayID}`);
                        } else {
                            message.channel.send(`There are no winners for this giveaway.`);
                        }
                    });
                } else {
                    message.channel.send(`This giveaway does not exist; see active giveaways with \`${PREFIX}giveaway list\``);
                }
            });
            
        }


        // Delete a giveaway from the giveaways table and the uGiveaway table where the giveawayID matches the one passed in the args of the command 
        function deleteGiveaway(giveawayID) {
            console.log("Deleting giveaway...");
            let sql = `SELECT * FROM giveaways WHERE giveawayID = ${giveawayID}`;
            db.get(sql, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row) {
                    let sql2 = `DELETE FROM giveaways WHERE giveawayID = ${giveawayID}`;
                    db.run(sql2, (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                    let sql3 = `DELETE FROM uGiveaway WHERE giveawayID = ${giveawayID}`;
                    db.run(sql3, (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                    message.channel.send(`Giveaway with ID: ${giveawayID} has been deleted.`);
                } else {
                    message.channel.send(`This giveaway does not exist; see active giveaways with \`${PREFIX}giveaway list\``);
                }
            });
        }
















        if(args[0] == "join") {
            console.log("join")
            enterGiveaway(args[1]);
        }

        if(args[0] == "create") {
            console.log("create")
            createGiveawayEntry(GiveawayID, joinArgs(args));
            return
        }
        if(args[0] == "list") {
            console.log("list")
            listGiveaways();
        }
        if(args[0] == "entered") {
            console.log("entered")
            checkUserGiveaways();
        }
        if(args[0] == "end") {
            console.log("end")
            endGiveaway(args[1]);
        }
        if(args[0] == "delete") {
            console.log("delete")
            deleteGiveaway(args[1]);
        }
        arr = ["join", "create", "list", "entered", "end", "delete"];
        if(!arr.includes(args[0])) {
            if(args[0] == "help" || args[0] == "h" || args[0] == "?" || (!args[0])) {
                help();
            }
            else {
                message.channel.send(`Invalid command.`);
            }
        }
        // create a help command that lists all the commands
        function help() {
            message.channel.send(`\`${PREFIX}giveaway create <description>\` - Create a giveaway.\n\`${PREFIX}giveaway join <giveawayID>\` - Join a giveaway.\n\`${PREFIX}giveaway list\` - List all active giveaways.\n\`${PREFIX}giveaway entered\` - Check what giveaways you are in.\n\`${PREFIX}giveaway end <giveawayID>\` - End a giveaway.\n\`${PREFIX}giveaway delete <giveawayID>\` - Delete a giveaway.`);
        }
        
        
            
            
        
	}
}