const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Permet de reporter un membre

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('report un utilisateur | report a user')
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('raison du report | reason of the report')
            .setRequired(true)
            .addChoices({ name: 'Spam', value: 'Spam' }, { name: 'SelfBot', value: 'SelfBot' }, { name: 'Raid/demande de raid', value: 'Raid' }, { name: 'Incitation à la haine', value: 'Incitation à la haine' }, { name: 'Harcèlement', value: 'Harcèlement' }, { name: 'Non-respect des TOS Discord', value: 'Non-respect des TOS Discord' }, { name: 'Pub Mp', value: 'Pub Mp' }, { name: 'Mass mp', value: 'Mass mp' }, { name: 'Menace, comportement cancer', value: 'Menace, comportement cancer' }, { name: 'Plagia de Serveur', value: 'Plagia de Serveur' }, { name: 'Autre', value: 'Autre' }))
        .addStringOption(option =>
            option.setName('user')
            .setDescription('id de l\'utilisateur | id of the user')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('preuve')
            .setDescription('preuve du report | proof of the report')
            .setRequired(true)),
    async execute(interaction) {
        var report = JSON.parse(fs.readFileSync("./report.json", "utf8"));
        const reason = interaction.options.getString('reason');
        const user = interaction.options.getString('user');
        const preuve = interaction.options.getString('preuve');
        let idreport = getRandomInt(1000000);
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Report')
            .setDescription(`${interaction.user.username} a report ${user} pour la raison : ${reason}`)
            .setFooter({ text: 'Report' })
            .setTimestamp();
        await interaction.reply({ embeds: [embed] });
        // on l'envoit dans le channel staff
        const channel = interaction.client.channels.cache.get('933642552182210580');
        const embed2 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Report ' + idreport)
            .setDescription(`${interaction.user.username} a report ${user} pour la raison : ${reason} \n\n preuve : ${preuve} \n\n Pour accepter faites /accept ${idreport} \n Pour refuser faites /refuse ${idreport} <reason>`)
            .setFooter({ text: 'Report ' + idreport })
            .setTimestamp();
        await channel.send({ embeds: [embed2] });
        // on l'ajoute dans le fichier report.json
        report.push({
            "id": idreport,
            "user": user,
            "reason": reason,
            "preuve": preuve,
            "author": interaction.user.username
        });
        fs.writeFileSync("./report.json", JSON.stringify(report), err => {
            if (err) throw err;

        });

    }
};