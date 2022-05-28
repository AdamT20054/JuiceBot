const item = require('../Inventory/item');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Data/JuiceEconomy.db');

module.exports = {
    name: "list",
    userPerms: [`SEND_MESSAGE`],
    clientPerms: [`SEND_MESSAGE`],
    ownerOnly: false,
    aliases: ["shoplist"],
    run: async(client, message, args) => {
        
       // Check to see if all the arguments are valid and return error if they are not
       function checkargs(itemName, value) {
        console.log(`checkargs`);
           if (itemName.length > 50) {
              message.reply(`Please enter a valid itemName.`);
              return false;
           }
           if (isNaN(value)) {
             message.reply(`Please enter a valid juice value.`);
             return false;
          }
           
    }

    // Generate a random itemID
    function generateID() {
        console.log(`generateID`);
        let itemID = Math.floor(Math.random() * 1000000);
        checkID(itemID);
    }

    // Check to see if the itemID is already in the shop table
    function checkID(itemID) {
        console.log(`checkID`);
        let sql = `SELECT * FROM Shop WHERE itemID = "${itemID}"`;
        db.get(sql, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            if (row) {
                genereateID();
            }
            if (!row) {
                checkName(itemID, a1);
            }
        });
    }


    
    // Check to see if the itemName is already in the shop table
    function checkName(itemID, itemName) {
        console.log(`checkName`);
        let sql = `SELECT * FROM Shop WHERE itemName = "${itemName}" OR itemID = "${itemName}"`;
        db.get(sql, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            if (row) {
                if(row.sale == "0") {
                    editSale(itemID, itemName);
                }
                if(row.sale == "1") {
                    editValue(itemID, itemName);
                }
                else {
                    message.reply(`${itemName} has an error in the Database. Please fix UwU`);
                }
            }
            if (!row) {
                addItem(itemID, a1, args[2]);

            }
        });


        // If the item has a sale value of 0 then edit the sale value to 1 and update the value with args[1]
        function editSale(itemID, itemName) {
            console.log(`editSale`);
            let sql = `UPDATE Shop SET sale = "1", value = "${a2}" WHERE itemID = "${itemID}" OR itemName = "${itemName}"`;
            db.run(sql, (err) => {
                if (err) {
                    console.error(err.message);
                }
                message.channel.send(`${itemName} has been re-listed in the shop.`);
            });
        }

        // If the item has a sale value of 1 then edit the value with args[1]
        function editValue(itemID, itemName) {
            console.log(`editValue`);
            let sql = `UPDATE Shop SET value = "${a2}" WHERE itemID = "${itemID}" OR itemName = "${itemName}"`;
            db.run(sql, (err) => {
                if (err) {
                    console.error(err.message);
                }
                message.channel.send(`${itemName} has been updated in the shop.`);
            });
        }


    }


    // Take an itemIF and value and itemName and create a new row in the shop table
    function addItem(itemID, itemName, value) {
        console.log(`addItem`);
        let sql = `INSERT INTO Shop (itemID, itemName, value, sale) VALUES ("${parseInt(itemID)}", "${itemName.toString()}", "${parseInt(a2)}", "1")`;
        db.run(sql, (err) => {
            if (err) {
                console.error(err.message);
            }
            message.channel.send(`${itemName} has been added to the shop.`);
        });

    }


    a1 = args[0]
    a2 = args[1]

    if(checkargs(a1, a2) != false) {
        generateID();

    }


    }
}