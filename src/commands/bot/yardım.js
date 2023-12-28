const Discord = require('discord.js')
module.exports.execute = async (client, interaction) => {

    const seçenekler = interaction.options.getString("seçenekler")

    if (seçenekler === "moderasyon-sistemleri") {
        const addFields = [
            { name: `<:BAN:1173475522689376359> /ban <@kullanıcı> <sebep>`, value: `<:siyahnokta:1172333763783569469> Belirttiğiniz kullanıcıyı belirttiğiniz sebeple banlarsınız.`, inline: true },
            { name: `<:kisi:1171551935615213688> /avatar <@kullanıcı>`, value: `<:siyahnokta:1172333763783569469> Belirttiğiniz kullanıcının veya sizin avatar'ı görürsünüz.`, inline: true },
        ]
        const embed = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.DarkOrange)
            .setDescription(`### <:cekic:1171537987553726585> ${interaction.client.user.username} | Moderasyon Menüsü`)
            .addFields(addFields)
            .setFooter({ text: `©️ ${process.env.BOTISIM} 2023`, iconURL: interaction.user.displayAvatarURL() })
        await interaction.reply({ embeds: [embed], ephemeral: false })
    }

    if (seçenekler === "sistem-komutları") {
        const addFields = [
            { name: `<:destek:1172333299537035295> /sayaç-log <#kanal> <embed/yazı>`, value: `<:siyahnokta:1172333763783569469> Sayaç LOG'a bakarak kimin gidip geldiğini görebilirsiniz.`, inline: true },
        ]
        const embed = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.DarkOrange)
            .setDescription(`### ${interaction.client.user.username} | Sistem Komutları\n\nŞuanlık bura kapalıdır, Yakında açılıcaktır.`)
            .addFields(addFields)
            .setFooter({ text: `©️ ${process.env.BOTISIM} 2023`, iconURL: interaction.user.displayAvatarURL() })
        await interaction.reply({ embeds: [embed], ephemeral: false })
    }

    if (seçenekler === "bot-komutları") {
        const addFields = [
          { name: `<:website:1172333765243195402> /yardım <seçenekler>`, value: `<:siyahnokta:1172333763783569469> Botun ana menüsüdür, bütün komutlara burdan erişebilirsin!`, inline: true },
          { name: `<a:log:1172332915015823411> /bot-bilgi`, value: `<:siyahnokta:1172333763783569469> Bot ile ilgili her detaya erişebilirsiniz!`, inline: true },
        ]
        const embed = new Discord.EmbedBuilder()
          .setColor(Discord.Colors.DarkOrange)
          .setDescription(`### ${interaction.client.user.username} | Bot Komutları`)
          .addFields(addFields)
          .setFooter({ text: `©️ ${interaction.client.user.username} 2023`, iconURL: interaction.user.displayAvatarURL() })
        await interaction.reply({ embeds: [embed], ephemeral: false })
      }

},

    module.exports.config = {
        name: "yardım",
        description: "🏡 Bütün komutlarımı burada görebilirsiniz.",
        options: [
            {
                name: "seçenekler",
                description: "Hangisine bakmak istersin?",
                type: 3,
                required: true,
                choices: [
                    { name: "Bot Komutları", value: "bot-komutları" },
                    { name: "Moderasyon Sistemleri", value: "moderasyon-sistemleri" },
                    { name: "Sistem Komutları", value: "sistem-komutları" },
                ]
            },
        ]
    }