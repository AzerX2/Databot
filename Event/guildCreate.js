/**
 * @param {*} client 
 * @param {*} guild 
 * 
 * @returns {void}
 * 
 * @description Cette fonction est appelée lorsque le bot rejoint un serveur.
 */

const { MessageEmbed } = require('discord.js');
module.exports = async(client, guild) => {
    console.log("Joined a new guild : " + guild.name);

    client.user.setActivity(` ${client.guilds.cache.size} servers | /help`, { type: "WATCHING" });
    const embed = new MessageEmbed()
        .setTitle(`Ajout Serveur`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields({ name: 'Nom du serveur :', value: guild.name, inline: true })
        .addFields({ name: 'Nombre de membres :', value: guild.memberCount, inline: true })
        .addFields({ name: 'Nombre de salons :', value: guild.channels.cache.size, inline: true })
        .setFooter({ text: "DataBot" })
        .setTimestamp()
        .setColor('#0099ff');

    client.channels.cache.get('997109978471088179').send({ embeds: [embed] })
};