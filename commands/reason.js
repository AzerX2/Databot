const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reason')
        .setDescription('donne la liste des raisons possibles pour un report | give the list of reasons for a report'),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Liste des raisons possibles pour un report')
            .setDescription("1. Spam\n2. SelfBot\n3. Raid/demande de raid\n4. Incitation à la haine\n5. Harcèlement\n7. Non-respect des TOS Discord\n8. Pub Mp (nécessite de voir une invitation sur le screen)\n9. Mass mp (pas besoin de voir une invit)\n10. Menace, comportement cancer\n11. Plagia de Serveur\n12. Autre")
            .setFooter({ text: 'Raison possible' })
        interaction.reply({ embeds: [embed] })
    }
};