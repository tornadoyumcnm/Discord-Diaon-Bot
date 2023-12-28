const Discord = require('discord.js')
module.exports.execute = async(channel, client) => {;
    const existingDocument = await db.findOne({ guild: interaction.guild.id});
    if(!existingDocument) return;
    const fetchedLogs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: Discord.AuditLogEvent.ChannelCreate,
    });
    const deletionLog = fetchedLogs.entries.first();

    if(deletionLog) {
        const moment = require('moment')
        require('moment-duration-format')
        moment.locale('tr')

        const { executor, target, createdTimestamp } = deletionLog;
        const channelName = channel.name;
        const createdAt = new Date(createdTimestamp);
      const embed = new Discord.EmbedBuilder()
      .setDescription(`\`>\` <@${excutor.id}> (${excutor.id}) adlı kullanıcı bir kanal sildi`)
      .addFields(
        {name: "> Kanal ismi", value: `${channelName}`},
        {name: "> Kanal Kimliği", value: `${channel.id}`}
      )
    }



 module.exports.config = {
     name: "interactionCreate",
     once: false
 }}