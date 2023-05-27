/**
 * @param {*} client 
 * @param {*} guild 
 * 
 * @returns {void}
 * 
 * @description Cette fonction est appelée lorsque le bot quitte un serveur.
 */


module.exports = async(client, guild) => {
    console.log("Left a guild : " + guild.name);
    client.user.setActivity(` ${client.guilds.cache.size} servers | /help`, { type: "WATCHING" });
    const embed = new MessageEmbed()
        .setTitle(`Suppression Serveur`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addField('Name :', guild.name, true)
        .addField('Nombre de membres :', guild.memberCount + " membres", true)
        .addField(`ID : `, guild.id, true)
        .setFooter({ text: "DataBot" })
        .setTimestamp()
        .setColor(guild.me.displayHexColor);
    client.channels.cache.get('997109978471088179').send({ embeds: [embed] })
};