const Discord = require('discord.js');
const os = require('os');
module.exports.execute = async(client, interaction) => {
    let joinedGuilds = interaction.client.guilds.cache.size; 
      
          const emptyBar2 = '<:ram2:1173577467445907528>';
          const fullBar2 = '<:ram1:1173577423850323980>';
          
          const targetGuilds = 100;
          
          const percent = (joinedGuilds / targetGuilds) * 100;
          
          const targetBar = `${fullBar2.repeat(Math.floor(percent / 10))}${emptyBar2.repeat(Math.floor((100 - percent) / 10))}`;
          

          const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;

const totalMemory = os.totalmem() / 1024 / 1024;

const emptyBar = '<:ram2:1173577467445907528>';
const fullBar = '<:ram1:1173577423850323980>';

const barLength = 10;
   
const usedPercent = (usedMemory / totalMemory) * 100;
const emptyPercent = 100 - usedPercent;

const ramBar = `${fullBar.repeat(Math.floor(usedPercent / 10))}${emptyBar.repeat(Math.floor(emptyPercent / 10))}`;

let members = interaction.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
let startTime;
startTime = Date.now();

const açık = interaction.client.readyAt.getTime();
const uptime = `<t:${Math.floor(açık / 1000)}:R>`;

const embed = new Discord.EmbedBuilder()
.setColor(Discord.Colors.DarkOrange)
.setThumbnail('https://media4.giphy.com/media/tejYGL6hIQVnxNBUEO/giphy.gif')
.setDescription(`### <:website:1172333765243195402> ${interaction.client.user.username} Hakkında Bilgiler`)
.addFields(
{ name: '<:tac:1171438390206529547> <:siyahnokta:1172333763783569469> Bot Sahibi :', value: `**[Ryno?](https://discord.com/users/1162751824995037276)**`, inline: true },
{ name: "<:kisi:1171551935615213688> <:siyahnokta:1172333763783569469> Toplam Kullanıcılar :", value: `${members}`, inline: true },
{ name: "<:sunucular:1173865902618464269> <:siyahnokta:1172333763783569469> Toplam Sunucular :", value: `${interaction.client.guilds.cache.size}`, inline: true },
{ name: "<:zaman:1171528965693919233> <:siyahnokta:1172333763783569469> Bellek Kullanımı :", value: `${(process.memoryUsage().heapUsed / 1024 / 512).toFixed(2)}MB`, inline: true },
{ name: "<a:roket:1172333300895981589> <:siyahnokta:1172333763783569469> Çalışma Süresi :", value: `${uptime}`, inline: true },
{ name: "<a:ates:1172333769894674472> <:siyahnokta:1172333763783569469> Ping :", value: `${interaction.client.ws.ping}`, inline: true },
{ name: `<a:dunya:1172355001553801226> <:siyahnokta:1172333763783569469> Sunucu Hedef Bar :`, value: `${targetBar}\nSunucu Sayısı: ${joinedGuilds} / Hedef: ${targetGuilds}`, inline: true },
{ name: `<a:log:1172332915015823411> <:siyahnokta:1172333763783569469> RAM Bar :`, value: `${ramBar}\nKullanılan RAM: ${usedMemory.toFixed(2)} MB / Toplam RAM: ${totalMemory.toFixed(2)} MB`, inline: true },
//{ name: ``, value: ``, inline: true },
)
.setFooter({ text: `©️ ${interaction.client.user.username} ${new Date().getFullYear()}`, iconURL: interaction.client.user.avatarURL({ size: 2048 }) })
.setTimestamp();
interaction.reply({ embeds: [embed] })
},

module.exports.config = {
    name: "bot-bilgi",
    description: "🤖 Botun İstatistiklerine Bakarsınız.",
    options: []
}
