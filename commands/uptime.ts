const {
	SlashCommandBuilder,
	EmbedBuilder
} = require("discord.js");
const client = require("../index.js")
var uptime = ((Date.now() - client.readyTimestamp) / 1000 / 60 / 60 );
module.exports = {
	data: new SlashCommandBuilder()
		.setName("uptime")
		.setDescription("Сколько часов работает бот"),
	async execute(interaction) {
		interaction.reply("Аптайм: " + uptime)
	}
}
