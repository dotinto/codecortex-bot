const {
	AttachmentBuilder,
	SlashCommandBuilder
} = require("discord.js")
const Canvas = require("canvas");
const { request } = require("undici")

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');

	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);
	return context.font;
};

module.exports = {
	data: new SlashCommandBuilder()
	.setName("profile")
	.setDescription("Getting user's profile stats"),
	async execute(interaction) {
		var canvas = Canvas.createCanvas(700, 250);
		var context = canvas.getContext("2d");
		var background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1093211437989646426/1095438769139761193/canvas.jpg");

		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		context.strokeStyle = "#0099ff";
		context.strokeRect(0, 0, canvas.width, canvas.height);

		var member = interaction.member;
		var avatar = await Canvas.loadImage("https://cdn.discordapp.com/avatars/" + member.id + "/" + member.avatar + ".jpg")

		context.drawImage(avatar, 25, 25, 200, 200);

		context.beginPath();
		context.arc(125, 125, 100, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();

		context.font = applyText(canvas, interaction.member.displayName);
		context.fillStyle = '#ffffff';
		context.fillText(interaction.member.displayName, canvas.width / 2.5, canvas.height / 1.8);

		context.font = '28px sans-serif';
		context.fillStyle = '#ffffff';
		context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);
							
		var attachment = new AttachmentBuilder(await canvas.encode("png"), {
			name: "profile-image.png"
		})

		interaction.reply({files: [attachment]})
		
	}	
}
