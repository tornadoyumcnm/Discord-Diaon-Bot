const { Client, Colors, SlashCommandBuilder, Partials, GatewayIntentBits, StringSelectMenuBuilder, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, ButtonStyle, Events, EmbedBuilder} = require('discord.js');
const db = require('../../db/models/sayaç-logs.js')
module.exports.execute = async(client, interaction) => {

if (!interaction.member?.permissions?.has(PermissionFlagsBits.Administrator))
return interaction.reply({ content: `<:no:1172333760881115177> Bu Komutu Kullanabilmek için **Yönetici** Yetkisine Sahip Olmalısınız.`, ephemeral: true })

const kanal = interaction.options.getChannel('kanal') || `Seçilmedi.`;
const Embed_Veya_Yazı = interaction.options.getString("embed-veya-yazı") || `Seçilmedi.`;
const Hoş_Geldin_Yazı = interaction.options.getString("hosgeldintext") || "${member} Adlı kullanıcı sunucumuza katılmış bulunmakta!";
const Görüşürüz_Yazı = interaction.options.getString("görüsürüztext") || "${member} Adlı kullanıcı sunucumuzdan ayrılmış bulunmakta!";
const user = "${member}"
const kullanım = `<:acik:1172332917385592856>` || `<:kapali:1172333298207436851>`

if (Hoş_Geldin_Yazı.length >= 100) return interaction.reply({ content: `<:no:1172333760881115177> Yazı'yı en fazla **100** karakterli yapabilirsin!`, ephemeral: true })
if (Görüşürüz_Yazı.length >= 100) return interaction.reply({ content: `<:no:1172333760881115177> Yazı'yı en fazla **100** karakterli yapabilirsin!`, ephemeral: true })

let fields = [
 { name: `● Kanal :`, value: `\`\`\`\n${kanal.id}\n\`\`\``, inline: true },
 { name: `● Sayaç Türü :`, value: `\`\`\`\n${Embed_Veya_Yazı}\n\`\`\``, inline: true },
 { name: `● Hoş Geldin Yazısı :`, value: `\`\`\`\n${Hoş_Geldin_Yazı}\n\`\`\``, inline: false },
 { name: `● Görüşmek Üzere Yazısı :`, value: `\`\`\`\n${Görüşürüz_Yazı}\n\`\`\``, inline: false },
]

const embed = new EmbedBuilder()
.setColor(Colors.DarkOrange)
.setDescription(`### <:yes:1172333306545709096> Başarıyla ayarlamalar yapıldı.`)
.addFields(fields)
.setFooter({ text: `©️ ${interaction.client.user.username} ${new Date().getFullYear()}`, iconURL: interaction.client.user.displayAvatarURL() });

const embed2 = new EmbedBuilder()
.setColor(Colors.DarkOrange)
.setDescription(`- **NOT:** Üyeyi etiketlemek istiyorsan \`${user}\` yazmalısın!`)

await interaction.reply({ embeds: [embed, embed2], ephemeral: false })

const existingDocument = await db.findOne({ guild: interaction.guild.id });

if (!existingDocument) {
    const newDocument = new db({
        guild: interaction.guild.id,
        channel: kanal.id,
        embedyazi: Embed_Veya_Yazı,
        hosgeldinyazi: Hoş_Geldin_Yazı,
        gorusuruzyazi: Görüşürüz_Yazı,
        kullanım: kullanım
    });
    
    await newDocument.save();
} else {
    await db.findOneAndUpdate({ guild: interaction.guild.id }, {
        channel: kanal.id,
        embedyazi: Embed_Veya_Yazı,
        hosgeldinyazi: Hoş_Geldin_Yazı,
        gorusuruzyazi: Görüşürüz_Yazı,
        kullanım: kullanım
    });
}

},

module.exports.config = {
    name: "sayaç-log",
    description: "⏳ Sayaç LOG'unu açıp gelen gidenleri görürsünüz.",
    options: [
        {
            name: 'kanal',
            description: 'Sayaç LOG Hangi Kanalda Olsun?',
            type: 7,
            required: true,
        },
        {
            name: "embed-veya-yazı",
            description: "Sayaç embedlimi olsun yoksa yazılı mı?",
            type: 3,
            required: true,
            choices: [
                { name: "Yazı", value: "Yazı" },
                { name: "Embed", value: "Embed" }
            ]
        },
        {
            name: "hosgeldintext",
            description: "Hoş Geldin Embed/Text'inde ne yazıcaksın?",
            type: 3,
        },
        {
            name: "görüsürüztext",
            description: "Görüşürüz Embed/Text'inde ne yazıcaksın?",
            type: 3,
        },
    ]
}