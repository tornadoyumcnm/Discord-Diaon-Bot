const Discord = require('discord.js')
module.exports.execute = async(client, interaction) => {

const user = interaction.options.getMember('kullanıcı')
const sebep = interaction.options.getString('sebep')

/*if (!interaction.guild.me.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return interaction.reply({ content: "Bot'un **Üyeleri Yasakla** yetkisi bulunmamaktadır. Lütfen tekrar deneyin.", ephemeral: true });*/
if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return interaction.reply({ content: `**Üyeleri Yasakla** yetkiniz bulunmamaktadır.`, ephemeral: true })
if(user.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return interaction.reply({ content: `Etiketlediğiniz kullanıcının **Üyeleri Yasakla** yetkisi bulunduğu için yasaklama gerçekleştirilemiyor.`, ephemeral: true})
user.ban();

const deletes = new Discord.ButtonBuilder()
.setCustomId('delete_button')
.setEmoji('<:cop:1171595921272864838>')
.setStyle(Discord.ButtonStyle.Danger)
const unbanuser = new Discord.ButtonBuilder()
.setCustomId('unban_user')
.setLabel('Banı Kaldır')
.setEmoji('<:carpi:1171438394149195866>')
.setStyle(Discord.ButtonStyle.Primary)
const actionRow = new Discord.ActionRowBuilder().addComponents(deletes, unbanuser)
const deletes2 = new Discord.ButtonBuilder()
.setCustomId('delete_button2')
.setEmoji('<:cop:1171595921272864838>')
.setStyle(Discord.ButtonStyle.Danger)
const actionRow2 = new Discord.ActionRowBuilder().addComponents(deletes2)

const addFields = [
    { name: `Banlanma sebebi:`, value: `\`\`\`${sebep}\`\`\``, inline: false },
    { name: `Kullanıcının ID:`, value: `\`\`\`${user.id}\`\`\``, inline: false },
    { name: `Kullanıcının Banlandığı Kanal:`, value: `\`\`\`${interaction.channel.id} / ${interaction.channel.name}\`\`\``, inline: false },
]
const embed = new Discord.EmbedBuilder()
.setColor(Discord.Colors.DarkOrange)
.setDescription(`### ${interaction.client.user.username} | Ban Komutu

- <@${user.id}> Adlı kullanıcı başarıyla banlandı!`)
.addFields(addFields)
.setFooter({ text: `©️ ${interaction.client.user.username} ${new Date().getFullYear()}`, iconURL: interaction.client.user.displayAvatarURL() });
await interaction.reply({ embeds: [embed], components: [actionRow], ephemeral: false })
const addFields2 = [
    { name: `Banı açılanın banlanma sebebi:`, value: `\`\`\`${sebep}\`\`\``, inline: false },
    { name: `Banı açılan kullanıcının ID:`, value: `\`\`\`${user.id}\`\`\``, inline: false },
    { name: `Banı açılan kullanıcının Banlandığı Kanal:`, value: `\`\`\`${interaction.channel.id} / ${interaction.channel.name}\`\`\``, inline: false },
]
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'delete_button') {
        await interaction.message.delete();
    } else if (interaction.customId === 'unban_user') {
        interaction.guild.bans.remove(user);
        const embed2 = new Discord.EmbedBuilder()
        .setColor(Discord.Colors.DarkOrange)
        .setDescription(`<@${user.id}> Adlı kullanıcı başarıyla banı kaldırıldı!`)
        .addFields(addFields2)
        .setFooter({ text: `©️ ${interaction.client.user.username} ${new Date().getFullYear()}`, iconURL: interaction.client.user.displayAvatarURL() });
        await interaction.update({ embeds: [embed2], components: [actionRow2], ephemeral: false });
    }        if (interaction.customId === 'delete_button2') {
        await interaction.message.delete();
    } 
});

},

module.exports.config = {
    name: "ban",
    description: "🔨 Birisini sunucudan atarsın/banlarsın.",
    options: [ 
        {
            name: 'kullanıcı',
            description: 'Yasaklamak istediğiniz kullanıcıyı seçin.',
            type: 6,
            required: true,
        },
        {
            name: 'sebep',
            description: 'Yasaklama sebebinizi girin.',
            type: 3,
            required: true,
        }
    ]
}