module.exports = {
    name: "ping",
    description: "pong!",
    aliases: [""],
    async run(client, interaction, guild, args) {
        interaction.followUp("pong!")
    }
}