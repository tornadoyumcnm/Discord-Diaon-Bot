const Discord = require('discord.js')
const db = require("../../db/models/room.js")

module.exports.execute = async (client, interaction) => {
    const kanal = interaction.options.getChannel('kanal');

    if (!interaction.member?.permissions?.has(Discord.PermissionFlagsBits.Administrator))
        return interaction.reply({ content: `Bu Komutu Kullanabilmek için \`Yönetici\` Yetkisine Sahip Olmalısınız.`, ephemeral: true })

    const embed = new Discord.EmbedBuilder()
    .setColor(Discord.Colors.DarkOrange)
        .setDescription(`### ${interaction.client.user.username} | Özel Oda
Başarıyla özel oda kanalını ${kanal} olarak seçtiniz!`)
    interaction.reply({ embeds: [embed], ephemeral: true })

    const button1 = new Discord.ButtonBuilder()
        .setCustomId("sesac")
        .setLabel("Ses Kanalını Aç")
        .setStyle(Discord.ButtonStyle.Primary)

    const button2 = new Discord.ButtonBuilder()
        .setCustomId("kisiayarla")
        .setLabel("Kişi Sayısını Ayarla")
        .setStyle(Discord.ButtonStyle.Primary)

    const button3 = new Discord.ButtonBuilder()
        .setCustomId("kitle")
        .setLabel("Ses Kanalını Kitle")
        .setStyle(Discord.ButtonStyle.Primary)

    const button4 = new Discord.ButtonBuilder()
        .setCustomId("kisiekle")
        .setLabel("Kişi Ekle")
        .setStyle(Discord.ButtonStyle.Primary)

    const button5 = new Discord.ButtonBuilder()
        .setCustomId("sespanelkapa")
        .setLabel("Ses Kanalını Kapat")
        .setStyle(Discord.ButtonStyle.Primary)

    const row = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4, button5)

    const embedc = new Discord.EmbedBuilder()
        .setColor(Discord.Colors.DarkOrange)
        .setDescription(`### <a:ekleniyor:1172333302527569923> Diaon Özel Oda Ayarları

<:siyahnokta:1172333763783569469> ● **Ses Kanalı Aç** -> Ses Kanalı Açarsınız
<:siyahnokta:1172333763783569469> ● **Kişi Sayısını Ayarla** -> Ses Kanalına Kaç Kişi Girsin İstersen.
<:siyahnokta:1172333763783569469> ● **Ses Kanalını Kitle** -> Ses Kanalını Kitlersin.
<:siyahnokta:1172333763783569469> ● **Kişi Ekle** -> Kanal Kilitli İse Bu Komutla Birisini Eklersin.
<:siyahnokta:1172333763783569469> ● **Ses Paneli Kapat** -> Ses Paneli Kapatarsınız.
`)

    const kanal2 = interaction.guild.channels.cache.get(kanal.id);
    let am = await kanal2.send({
        embeds: [embedc],
        components: [row]
    });

    let category = await interaction.guild.channels.create({
        name: "Ses Kanalları",
        type: Discord.ChannelType.GuildCategory
    })

    if (!await db.findOne({guild:interaction.guild.id})) {
        new db({
            guild: interaction.guild.id,
            kanal: kanal.id,
            mesaj: am.id,
            kategori: category.id
        }).save()        
    } else {
        await db.findOneAndUpdate({guild: interaction.guild.id,kanal: kanal.id,mesaj: am.id,kategori: category.id})
    }

},

    module.exports.config = {
        name: "özel-oda",
        description: "🛌 Özel Oda Sistemini Kurarsınız.",
        options: [
            {
                name: 'kanal',
                description: 'Özel Oda Hangi Kanalda Olsun?',
                type: 7,
                required: true,
            },
        ]
    }