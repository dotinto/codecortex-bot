const {
	SlashCommandBuilder,
	EmbedBuilder
} = require("discord.js");
const { spawn } = require("child_process");

var s = spawn("npm", ["-v"])
var node_ver = "";
s.stdout.on("data", data => {
	node_ver = data
})
s.on("close", code => {
	console.log("Exit: " + code)
})

module.exports = {
	data: new SlashCommandBuilder()
	.setName("info")
	.setDescription("Информация о боте"),
	async execute(interaction) {
		var response = new EmbedBuilder()
		.setColor(0x323338)
		.setTitle("Информация о боте")
		.setThumbnail("https://cdn.discordapp.com/avatars/1086602163750449194/b138daf0a65d1cd160dc7811097dd995.png?size=512")
		.addFields(
			{
				name: "Разработчик", 
				value: '<:dotinto:1095637019633393794> dotinto#2140'
			},
			{
				name: "Сборка", 
				value: `${require("../package.json").version} (\`12.04.2023\`)`
			},
			{
				name: "\u200B",
				value: "\u200B"
			},
			{
				name: "Разработано на:",
				value: `NodeJS ${node_ver} (TypeScript)`
			},
			{
				name: "Полезные ссылки:",
				value: `
				[Open-source](https:\/\/github.com/dotinto/codecortex-bot)	
				`
			}
		)
		interaction.reply({embeds: [response]})
	}
}
