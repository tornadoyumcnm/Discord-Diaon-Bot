const Discord = require("discord.js")
module.exports.execute = async(client, interaction) => {

const user = interaction.options.getUser('kullanıcı') || interaction.user;
const gizli = interaction.options.getBoolean("gizli");
let avatarURL = user.displayAvatarURL({size: 1024, dynamic: true}).replace('webp', 'png').replace('gif', 'png');
let avatarURL2 = user.displayAvatarURL({size: 2048, dynamic: true}).replace('webp', 'png').replace('gif', 'png');

const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setLabel('2048 Avatar')
.setEmoji('<:siyahnokta:1172333763783569469>')
.setStyle(Discord.ButtonStyle.Link)
.setURL(avatarURL2),
new Discord.ButtonBuilder()
.setLabel('1024 Avatar')
.setEmoji('<:siyahnokta:1172333763783569469>')
.setStyle(Discord.ButtonStyle.Link)
.setURL(avatarURL),
)

if (gizli) {
const embed = new Discord.EmbedBuilder()
.setColor(Discord.Colors.DarkOrange)
.setDescription(`### <:kisi:1171551935615213688> ${user.username} Adlı Kullanıcının Avatarı`)
.setImage(`${avatarURL2}`)
.setFooter({ text: `©️ ${interaction.client.user.username} ${new Date().getFullYear()}`, iconURL: interaction.client.user.avatarURL({ size: 2048 }) })
.setTimestamp();
interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
} else {
const embed = new Discord.EmbedBuilder()
.setColor(Discord.Colors.DarkOrange)
.setDescription(`### <:kisi:1171551935615213688> ${user.username} Adlı Kullanıcının Avatarı`)
.setImage(`${avatarURL2}`)
.setFooter({ text: `©️ ${interaction.client.user.username} ${new Date().getFullYear()}`, iconURL: interaction.client.user.avatarURL({ size: 2048 }) })
.setTimestamp();
interaction.reply({ embeds: [embed], components: [row] })
}

},

module.exports.config = {
name: "avatar",
description: "👔 Avatarına Bakarsınız | Avatarlara Bakarsınız",
options: [
{
name: 'kullanıcı',
description: 'Kullanıcı Yazınız.',
type: 6,
required: false
},
{
name: 'gizli',
description: 'Gizli yapmak istersen True yapmak İstemezsen False yap!',
type: 5,
required: false
}
]
}