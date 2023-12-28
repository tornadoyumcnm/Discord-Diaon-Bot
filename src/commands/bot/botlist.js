const db = require('../../db/models/botlist.js')
const Discord = require("discord.js")
module.exports.execute = async(client, interaction) => {


    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) 
    return interaction.reply({ content: "Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısınız.", ephemeral: true })

    const botlistkanal = interaction.options.getChannel('kanal');
    const logkanal = interaction.options.getChannel('log_kanal');
    const ytrol = interaction.options.getRole('yetkili_rol');
    /*const botrol = interaction.options.getRole('bot_rol');*/

    const embed = new Discord.EmbedBuilder()
        .setColor(Discord.Colors.DarkOrange)
        .setDescription(`### ${interaction.client.user.username} BotList Ayarlama

<:yes:1172333306545709096> | Başarı İle Botlist Kanalını (${botlistkanal}) Olarak Ayarladın!

- Diğer ayarlar:
<a:ok:1172333762516885604> Log Kanal: ${logkanal}
<a:ok:1172333762516885604> Yetkili Rol: ${ytrol}`)
    interaction.reply({ embeds: [embed], ephemeral: true })
/*<a:ok:1172333762516885604> Bot Rol: ${botrol}*/
    
    const button1 = new Discord.ButtonBuilder()
    .setCustomId("botekle")
    .setLabel("Botunu Eklet!")
    .setEmoji(`<:auto:1162824698845990962>`)
    .setStyle(Discord.ButtonStyle.Primary)
    const row = new Discord.ActionRowBuilder().addComponents(button1)

    const menu = new Discord.EmbedBuilder()
    .setColor(Discord.Colors.DarkOrange)
    .setThumbnail(interaction.client.user.displayAvatarURL({size: 1024}))
    .setDescription(`### ${interaction.client.user.username} | Botlist Sistemi
    
<a:quasarrednlem:1174999744628674660> Selam, Botunu Sunucuya Mı Ekletmek İstiyorsun?
Tam Aradığın Yerdesin Dostum! Tek Yapman Gereken Şey
Aşşağıdaki Button'a Botunun **ID**'sini Atmak.`)
    await botlistkanal.send({ embeds: [menu], components: [row] })

const existingDocument = await db.findOne({ guild: interaction.guild.id });

if (!existingDocument) {
    const newDocument = new db({
        guild: interaction.guild.id,
        botlisttkanal: botlistkanal.id,
        logskanal: logkanal.id,
        yetkilirol: ytrol.id,
        /*botsrol: botrol*/

    });
    
    await newDocument.save();
} else {
    await db.findOneAndUpdate({ guild: interaction.guild.id }, {
        botlisttkanal: botlistkanal.id,
        logskanal: logkanal.id,
        yetkilirol: ytrol.id,
        /*botsrol: botrol*/
    });
}

},

module.exports.config = {
    name: "botlist",
    description: "🚵 Botlist sistemini ayarlarsınız.",
    options: [
        {
            name: 'kanal',
            description: 'BotList Hangi Kanalda Olsun?',
            type: 7,
            required: true,
        },
        {
            name: 'log_kanal',
            description: `BotList LOG'u Hangi Kanalda Olsun?`,
            type: 7,
            required: true,
        },
        {
            name: 'yetkili_rol',
            description: 'Yetkili Rolü Ne Olsun?',
            type: 8,
            required: true,
        },
        /*{
            name: 'bot_rol',
            description: 'Bot Rolü Ne Olsun?',
            type: 8,
            required: true,
        },*/
    ]
}