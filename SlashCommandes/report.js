const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('report un utilisateur | report a user')
        .addStringOption(option =>
            option.setName('userid')
            .setDescription('id of user to report | id de l\'utilisateur à report')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('reason of the report | raison du report')
            .setRequired(true)
            .addChoices({ name: 'Spam', value: 'Spam' }, { name: 'Arnaque', value: 'Arnaque' }, { name: 'SelfBot', value: 'SelfBot' }, { name: 'Raid/demande de raid', value: 'Raid' }, { name: 'Incitation à la haine', value: 'Incitation à la haine' }, { name: 'Harcèlement', value: 'Harcèlement' }, { name: 'Non-respect des TOS Discord', value: 'Non-respect des TOS Discord' }, { name: 'Pub Mp', value: 'Pub Mp' }, { name: 'Mass mp', value: 'Mass mp' }, { name: 'Menace, comportement cancer', value: 'Menace, comportement cancer' }, { name: 'Plagia de Serveur', value: 'Plagia de Serveur' }, { name: 'Autre', value: 'Autre' }))
        .addStringOption(option =>
            option.setName('preuve')
            .setDescription('preuve of the report | preuve du report')
            .setRequired(true)),

    async execute(interaction) {
        let userid = interaction.options.getString('userid');
        let reason = interaction.options.getString('reason');
        let preuve = interaction.options.getString('preuve');

        let report = require('../models/report.js');

        let newReport = new report({
            userid: userid,
            reason: reason,
            preuve: preuve.split(' ')
        });
        newReport.save();

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Report')
            .setDescription(`${interaction.user.username} a report ${userid} pour ${reason} avec comme preuve ${preuve}`)
            .setFooter({ text: 'Report' })
            .setTimestamp();

        // on ajoute un bouton pour accepter ou refuser le report
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('accept')
                .setLabel('Accept')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('refuse')
                .setLabel('Refuse')
                .setStyle('DANGER'),
            );


        // on envoie l'embed au channel 905156564665638912
        const channel = interaction.guild.channels.cache.get('1102921650615357501');
        channel.send({ embeds: [embed], components: [row], content: userid });
        interaction.reply({ content: 'Report envoyé', ephemeral: true });

    }
};