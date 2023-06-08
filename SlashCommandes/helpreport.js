const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
let reasonpossible = ["Spam", "Selfbot", "Incitation à la haine", "Raid", "Autre", "Harcèlement", "Non-respect des TOS Discord", "Pub Mp", "Mass mp", "Menace, comportement cancer", "Plagia de Serveur", "Arnaque"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('helpreport')
        .setDescription('Aide pour report'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Aide pour report')
            .setDescription('Pour signaler un utilisateur, utilisez la commande /report <id> <raison> <preuve> \n Pour vérifier un utilisateur, utilisez la commande /check <id> \n Pour vérifier tout les membres du serveur, utilisez la commande /checkserv')
            .addFields({ name: 'id', value: 'id de l\'utilisateur à signaler' }, { name: 'raison', value: 'raison du signalement, les raisons possible : ' + reasonpossible }, { name: 'preuve', value: 'preuve du signalement, vous pouvez mettre un lien imgur ou un lien vers un message discord' })
            .setFooter({ text: 'Help Report' })
            .setTimestamp();
        interaction.reply({ embeds: [embed] });

    }
};