module.exports = {
    name: "ping",
    userPerms: [`SEND_MESSAGE`],
    clientPerms: [`SEND_MESSAGE`],
    ownerOnly: false,
    aliases: [""],
    run: async(client, message, args) => {
        message.reply("pong!")
    }
}