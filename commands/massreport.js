const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
/*
raisons possibles : 
1. Spam\n2. SelfBot\n3. Raid/demande de raid\n4. Incitation à la haine\n5. Harcèlement\n7. Non-respect des TOS Discord\n8. Pub Mp (nécessite de voir une invitation sur le screen)\n9. Mass mp (pas besoin de voir une invit)\n10. Menace, comportement cancer\n11. Plagia de Serveur\n12. Autre
.addChoices(
				{ name: 'Spam', value: 'Spam' }
			));

*/
module.exports = {
    data: new SlashCommandBuilder()
        .setName('massreport')
        .setDescription('massreport une liste d\'utilisateur | report a list of user')
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('raison du report | reason of the report')
            .setRequired(true)
            .addChoices({ name: 'Spam', value: 'Spam' }, { name: 'SelfBot', value: 'SelfBot' }, { name: 'Raid/demande de raid', value: 'Raid/demande de raid' }, { name: 'Incitation à la haine', value: 'Incitation à la haine' }, { name: 'Harcèlement', value: 'Harcèlement' }, { name: 'Non-respect des TOS Discord', value: 'Non-respect des TOS Discord' }, { name: 'Pub Mp', value: 'Pub Mp' }, { name: 'Mass mp', value: 'Mass mp' }, { name: 'Menace, comportement cancer', value: 'Menace, comportement cancer' }, { name: 'Plagia de Serveur', value: 'Plagia de Serveur' }, { name: 'Autre', value: 'Autre' }))
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
        const listuser = user.split(' ');
        for (let i = 0; i < listuser.length; i++) {
            let idreport = getRandomInt(1000000);
            const channel = interaction.client.channels.cache.get('933642552182210580');
            const embed2 = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Report ' + idreport)
                .setDescription(`${interaction.user.username} a report ${listuser[i]} pour la raison : ${reason} \n\n preuve : ${preuve} \n\n Pour accepter faites /accept ${idreport} \n Pour refuser faites /refuse ${idreport} <reason>`)
                .setFooter({ text: 'Report ' + idreport })
                .setTimestamp();
            await channel.send({ embeds: [embed2] });
            //enregistrement du report dans le fichier json
            report.push({
                "id": idreport,
                "user": listuser[i],
                "reason": reason,
                "preuve": preuve,
                "author": interaction.user.username
            });
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Report')
            .setDescription(`${interaction.user.username} a report ${user} pour la raison : ${reason}`)
            .setFooter({ text: 'Report' })
            .setTimestamp();
        await interaction.reply({ embeds: [embed] });

        fs.writeFileSync("./report.json", JSON.stringify(report), err => {
            if (err) throw err;

        });

    }
};