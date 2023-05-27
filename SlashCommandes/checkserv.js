const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkserv')
        .setDescription('Check the server | Vérifie le serveur'),
    async execute(interaction) {
        let blacklist = require('../models/blacklist.js');

        let guild = interaction.guild;
        // on vérifie tout les membres du serveur et on les compare avec la blacklist
        let messageMemberBlacklist = "";

        guild.members.cache.forEach(member => {
            blacklist.findOne({
                userid: member.id
            }, (err, b) => {
                if (err) console.log(err);
                if (b) {
                    messageMemberBlacklist += `${member.user.tag} est blacklist\n`;
                }
            })
        });

        setTimeout(() => {
            if (messageMemberBlacklist === "") {
                messageMemberBlacklist = "Aucun membre n'est blacklist";
            }
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Check Server')
                .setDescription(messageMemberBlacklist)
                .setFooter({ text: 'Check Server' })
                .setTimestamp();
            interaction.reply({ embeds: [embed] });
        }, 2000);

    }
};