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

    client.channels.cache.get('997109978471088179').send({
        content: `Le bot a quitté le serveur ${guild.name} (${guild.id})`
    })
};