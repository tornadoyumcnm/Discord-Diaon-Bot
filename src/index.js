
require("./system/Functions/interactionCreate.js")
require("./system/Functions/interactionCreate.js")

const { Client, Collection, GatewayIntentBits, Events } = require("discord.js");
const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require("fs")
const Discord = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildMessageReactions], messages: { interval: 3600, lifetime: 1800, }, users: { interval: 3600, filter: () => user => user.bot && user.id !== client.user.id, } })
const path = require('path');
const { EmbedBuilder } = require("@discordjs/builders");
const { Colors } = require("discord.js");
const sayaclog = require("./db/models/sayaç-logs.js")
const botlists = require("./db/models/botlist.js")
const db = require("./db/models/room.js")

client.slashCommands = new Collection();
client.registerdCommands = new Collection();

client.slashCommands = new Collection();
client.registeredCommands = new Collection();

const loadCommands = (folderPath) => {
    const commandFolders = fs.readdirSync(folderPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`${folderPath}/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`${folderPath}/${folder}/${file}`)
            client.slashCommands.set(command.config.name, command);
            client.registeredCommands.set(command.config.name, command.config);
            console.log(`⏩ ${command.config.name} komutu başarıyla aktif edildi.`);
        }
    }
}

const loadEvents = () => {
    const Eventsss = path.join(__dirname, 'system/Functions/');
    for (const event of fs.readdirSync(Eventsss).filter(file => file.endsWith(".js"))) {
        const evt = require(`${Eventsss}${event}`);

        if (evt.config.once) {
            client.once(evt.config.name, (...args) => {
                evt.execute(client, ...args);
            });
        } else {
            client.on(evt.config.name, (...args) => {
                evt.execute(client, ...args);
            });
        }
    }
}


const slashCommandsRegister = () => {
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v10");

    client.once("ready", async () => {
        const rest = new REST({ version: "10" }).setToken(process.env.BOTTOKEN);
        try {
            await rest.put(Routes.applicationCommands(process.env.BOTID), {
                body: client.registeredCommands.toJSON(),
            }).then(() => {
                console.log(`🤖 ${process.env.BOTISIM} Toplam Komutları: ${client.registeredCommands.size}`)
            });
        } catch (error) {
            throw error;
        }
    })
};

const commandFolderPath = path.join(__dirname, 'commands');
loadCommands(commandFolderPath);
loadEvents();
slashCommandsRegister();

require('dotenv').config();
client.on("ready", () => {
    require("./db/connect.js")(process.env.MONGO_URL)
    console.log(`👨‍🎓 Database'ler Başarıyla Hazırlandı!`)
})

client.on("ready", () => {
    setInterval(() => {
        client.user.setActivity(`/yardım | ${client.guilds.cache.size} Sunucu`);
    }, 5000);
});

client.login(process.env.BOTTOKEN).then(() => {
    console.log(`🎃 ${process.env.BOTISIM} Başarıyla Bağlandı!`);
}).catch((err) => {
    console.log(`👿 ${process.env.BOTISIM} Bağlanamadı! ${err}`);
});

client.on("guildMemberAdd", async (member) => {
    let text = await sayaclog.findOne({ guild: member.guild.id })
    if (!text) return;
    const sunucu = member.guild;
    if (text.embedyazi === "Embed") {
        sunucu.channels?.cache.get(text.channel).send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor("DarkOrange")
                    .setDescription(`${text.hosgeldinyazi.replaceAll("${member}", member)}`)
                    .setFooter({ text: `NOT: Bu yazılar Diaon'a ait değildir.` })
            ]
        })
    }
    if (text.embedyazi === "Yazı") {
        sunucu.channels?.cache.get(text.channel).send({ content: `${text.hosgeldinyazi.replaceAll("${member}", member)}` })
    }
})

client.on("guildMemberRemove", async (member) => {
    let text = await sayaclog.findOne({ guild: member.guild.id })
    if (!text) return;
    const sunucu = member.guild;
    if (text.embedyazi === "Embed") {
        sunucu.channels?.cache.get(text.channel).send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor("DarkOrange")
                    .setDescription(`${text.gorusuruzyazi.replaceAll("${member}", member)}`)
                    .setFooter({ text: `NOT: Bu yazılar Diaon'a ait değildir.` })
            ]
        })
    }
    if (text.embedyazi === "Yazı") {
        sunucu.channels?.cache.get(text.channel).send({ content: `${text.gorusuruzyazi.replaceAll("${member}", member)}` })
    }
})

client.on("interactionCreate", async (i) => {
    if (!i.isButton()) return
    let id = i.customId
    if (id == "sesac") {
        if (await db.findOne({ guild: i.guild.id, "channels.owner": i.user.id })) return i.reply({ content: `Adınıza açılmış bir ses kanalı zaten var. Lütfen kapatıp tekrar deneyin.`, ephemeral: true })
        let am = await db.findOne({ guild: i.guild.id })

        let channel = await i.guild.channels.create({
            name: `Ses ${i.user.username}`,
            type: Discord.ChannelType.GuildVoice,
            parent: am.kategori
        })
        await db.updateOne({ guild: i.guild.id }, { $push: { "channels": { owner: i.user.id, channel: channel.id } } })

        i.reply({ content: `Ses kanalı başarılı bir şekilde oluştu : <#${channel.id}>`, ephemeral: true })
    }

    if (id == "kisiayarla") {
        if (!await db.findOne({ guild: i.guild.id, "channels.owner": i.user.id })) return i.reply({ content: `Adınıza açılmış bir ses kanalı yok.`, ephemeral: true })

        let am = await db.findOne({ guild: i.guild.id })
        am = am.channels.find(x => x.owner == i.user.id)
        let kanal = await client.channels.cache.get(am.channel)
        const modal = new Discord.ModalBuilder()
            .setCustomId('modal')
            .setTitle('Limit Kaç olacak');

        const a = new Discord.TextInputBuilder()
            .setCustomId('naber')
            .setLabel("Limit kaç olacak lütfen sadece sayı belirtin.")
            .setStyle(Discord.TextInputStyle.Short);
        const r = new Discord.ActionRowBuilder().addComponents(a);

        modal.addComponents(r);
        await i.showModal(modal)

        const collector = await i.awaitModalSubmit({ time: 60000 })
        let c = collector.fields.fields.get("naber").value
        if (c > 99 || c < 1 || isNaN(c)) return collector.reply({ content: "Başarısız", ephemeral: true })
        kanal.edit({ userLimit: collector.fields.fields.get("naber").value })
        collector.reply({ content: "Başarılı bir şekilde ayarlandı.", ephemeral: true })
    }

    if (id == "kitle") {
        if (!await db.findOne({ guild: i.guild.id, "channels.owner": i.user.id })) return i.reply({ content: `Adınıza açılmış bir ses kanalı yok.`, ephemeral: true })
        let am = await db.findOne({ guild: i.guild.id })
        am = am.channels.find(x => x.owner == i.user.id)
        let kanal = await client.channels.cache.get(am.channel)
        kanal.permissionOverwrites.create(i.guild.roles.everyone, { Connect: false });
        kanal.permissionOverwrites.create(i.user.id, { Connect: true });
        i.reply({ content: "Başarılı", ephemeral: true })
    }

    if (id == "kisiekle") {
        if (!await db.findOne({ guild: i.guild.id, "channels.owner": i.user.id })) return i.reply({ content: `Adınıza açılmış bir ses kanalı yok.`, ephemeral: true })
        let am = await db.findOne({ guild: i.guild.id })
        am = am.channels.find(x => x.owner == i.user.id)
        let kanal = await client.channels.cache.get(am.channel)

        const modal = new Discord.ModalBuilder()
            .setCustomId('etiket')
            .setTitle('Kullanıcı ID belirt');

        const a = new Discord.TextInputBuilder()
            .setCustomId('a')
            .setLabel("Lütfen bir kullanıcı idsi belirtin.")
            .setMaxLength(20)
            .setMinLength(10)
            .setStyle(Discord.TextInputStyle.Short);
        const r = new Discord.ActionRowBuilder().addComponents(a);
        modal.addComponents(r);
        i.showModal(modal)
        const collector = await i.awaitModalSubmit({ time: 60000 })
        let c = collector.fields.fields.get("a").value
        try {
            kanal.permissionOverwrites.create(c, { Connect: true });
            collector.reply({ content: "Başarılı", ephemeral: true })
        } catch (e) { console.log(e) }
    }

    if (id == "sespanelkapa") {
        //if (!i.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return i.reply({ content: "Admin değilsin" })
        if (!await db.findOne({ guild: i.guild.id, "channels.owner": i.user.id })) return i.reply({ content: `Adınıza açılmış bir ses kanalı yok.`, ephemeral: true })
        let am = await db.findOne({ guild: i.guild.id })
        am = am.channels.find(x => x.owner == i.user.id)
        let kanal = await client.channels.cache.get(am.channel)
        await db.updateOne({ guild: i.guild.id, }, { $pull: { channels: { owner: i.user.id, } } })
        kanal.delete()
        i.reply({ content: "Kapatıldı", ephemeral: true })
    }
})

client.on("interactionCreate", async (i) => {
    if (!i.isButton()) return
    let id = i.customId;
    if (id == "botekle") {

        const modal = new Discord.ModalBuilder()
        .setCustomId('modal')
        .setTitle(`Botunuzun ID ve Prefix'i`)
    
            const a = new Discord.TextInputBuilder()
            .setCustomId('botId')
            .setLabel("Botunuzun ID")
            .setStyle(Discord.TextInputStyle.Short);
    
        const r = new Discord.ActionRowBuilder().addComponents(a);
        
    
        modal.addComponents(r);
        await i.showModal(modal)
    
        const collector = await i.awaitModalSubmit({ time: 60000 })
        let c = collector.fields.fields.get("botId").value;
    
        if (!/^\d+$/.test(c) || c < 1) {
            collector.reply({ content: "Geçersiz bir ID girdiniz.", ephemeral: true });
            return;
        }
    
        if (!/^\d{14,}$/.test(c)) {
        }
    
        collector.reply({ content: "Başarılı bir şekilde isteğiniz gönderildi!", ephemeral: true })
        const herşey = await botlists.findOne({ guild: i.guild.id });
    
        let kanal = herşey.botlisttkanal;
        let yetkili = herşey.yetkilirol;

        const button1 = new Discord.ButtonBuilder()
            .setLabel("Botu Ekle")
            .setEmoji(`<:kimlik:1162824742630338651>`)
            .setStyle(Discord.ButtonStyle.Link)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${c}&permissions=0&scope=bot%20applications.commands`)
        const row = new Discord.ActionRowBuilder().addComponents(button1)

        i.guild.channels.cache.get(kanal).send({ content: `(<@&${yetkili}>)`, components: [row], embeds: [
            new EmbedBuilder()
            .setColor(Discord.Colors.DarkOrange)
            .setDescription(`### ${i.client.user.username} | Yeni Bot Geldi

Yeni Bot Eklendi Aşşağıdaki Button'a Tıklayarak
Botun ID'sini Görüp Sıfır Permissions Ekleyebilirsin!
            
- **NOT:** Direkt Sıfır Permissions Olarak Geliyor Ama Yinede Dikkat Edin! `)

        ] })
    }
})
