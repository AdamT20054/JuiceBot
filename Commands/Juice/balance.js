module.exports = {
    name: "balance",
    userPerms: [`SEND_MESSAGES`],
    clientPerms: [`MANAGE_MESSAGES`],
    ownerOnly: false,
    aliases: [`seejuice`],
    description: "Enter giveaways.",
    async run(client, message, args) { // cleaner syntax		
		message.reply(`You have //Juice//`)
		
	}
}