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
        // If difference large enough --> Update last redeemed time --> increase the users total by one 
        // If difference not large enough ---> Do nothing//reply
        
	}
}