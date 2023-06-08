const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
let reasonpossible = ["Spam", "Selfbot", "Incitation à la haine", "Raid", "Autre", "Harcèlement", "Non-respect des TOS Discord", "Pub Mp", "Mass mp", "Menace, comportement cancer", "Plagia de Serveur", "Arnaque"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('helpreport-en')
        .setDescription('Help for report'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help Report')
            .setDescription('To report a user, use the command /report <id> <reason> <proof> \n To check a user, use the command /check <id> \n To check all members of the server, use the command /checkserv')
            .addFields({ name: 'id', value: 'id of the user to report' }, { name: 'reason', value: 'reason for the report, the possible reasons: ' + reasonpossible }, { name: 'proof', value: 'proof of the report, you can put an imgur link or a link to a discord message' })
            .setFooter({ text: 'Help Report' })
            .setTimestamp();
        interaction.reply({ embeds: [embed] });


    }
};