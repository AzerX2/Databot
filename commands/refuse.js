const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('refuse')
        .setDescription('refuse a report | refuse un report')
        .addStringOption(option =>
            option.setName('idreport')
            .setDescription('id of the report | id du report')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('reason of the refusal | raison du refus')
            .setRequired(true)),
    async execute(interaction) {
        var report = JSON.parse(fs.readFileSync("./report.json", "utf8"));
        const reportId = interaction.options.getString('idreport');
        const reason = interaction.options.getString('reason');
        const channel = interaction.client.channels.cache.get('905156564665638912');
        const staff = JSON.parse(fs.readFileSync("./staff.json", "utf8"));
        let bool2 = false;
        for (let i = 0; i < staff.length; i++) {
            if (staff[i].id === interaction.user.id) {
                if (staff[i].level === "2" || staff[i].level === "3") {
                    bool2 = true;
                }
            }
        }
        if (bool2 === false) {
            interaction.reply({ content: 'Vous n\'êtes pas un staff' });
        } else {
            const embed2 = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Refuse Report ' + reportId)
                .setDescription(`${interaction.user.username} a refuse le report ${reportId} pour la raison : ${reason}`)
                .setFooter({ text: 'Refuse Report ' + reportId })
                .setTimestamp();
            await channel.send({ embeds: [embed2] });
            //enregistrement du report dans le fichier json




            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Refuse Report')
                .setDescription(`${interaction.user.username} a refuse le report ${reportId} pour la raison : ${reason}`)
                .setFooter({ text: 'Refuse Report' })
                .setTimestamp();

            report.splice(report.findIndex(x => x.id == reportId), 1);
            fs.writeFileSync("./report.json", JSON.stringify(report), err => {
                if (err) throw err;

            });
            await interaction.reply({ embeds: [embed] });
        }




    }
};