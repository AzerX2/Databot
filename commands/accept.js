const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');
const cf = require('../config.json');

// Permet d'accepter une demande de report

module.exports = {
    data: new SlashCommandBuilder()
        .setName('accept')
        .setDescription('accept a report | accept a report')
        .addStringOption(option =>
            option.setName('idreport')
            .setDescription('id of the report | id of the report')
            .setRequired(true)),

    async execute(interaction) {
        var reason = cf.reason;
        var report = JSON.parse(fs.readFileSync("./report.json", "utf8"));
        const idreport = interaction.options.getString('idreport');
        let idreportint = parseInt(idreport);
        let bool = true;
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

            for (let i = 0; i < report.length; i++) {
                if (report[i].id == idreportint) {
                    bool = false;
                    const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Accept Report')
                        .setDescription(`${interaction.user.username} a accepté le report ${idreport}`)
                        .setFooter({ text: 'Accept Report' })
                        .setTimestamp();
                    await interaction.reply({ embeds: [embed] });
                    const channel = interaction.client.channels.cache.get('905156564665638912');
                    const embed2 = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Accept Report ' + idreport)
                        .setDescription(`${interaction.user.username} a accepté le report ${idreport}`)
                        .setFooter({ text: 'Accept Report ' + idreport })
                        .setTimestamp();
                    await channel.send({ embeds: [embed2] });
                    //enregistrement du report dans le fichier json
                    var blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
                    blacklist.push({
                        "id": report[i].id,
                        "user": report[i].user,
                        "reason": report[i].reason,
                        "preuve": report[i].preuve,
                        "author": report[i].author
                    });
                    fs.writeFileSync("./blacklist.json", JSON.stringify(blacklist), err => {
                        if (err) throw err;
                    });
                    let chan = reason[report[i].reason];

                    const channel2 = interaction.client.channels.cache.get(chan);
                    const embed3 = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('New Blacklist User ' + report[i].user)
                        .setDescription(`${interaction.user.username} a accepté le report pour la raison ${report[i].reason} \n preuve : ${report[i].preuve}`)
                        .setFooter({ text: 'Report ' + idreport })
                        .setTimestamp();
                    await channel2.send({ embeds: [embed3] });
                    report.splice(i, 1);
                    fs.writeFileSync("./report.json", JSON.stringify(report), err => {
                        if (err) throw err;
                    });


                }
            }
        }
        if (bool) {
            interaction.reply('id invalide ou introuvable');
        }

    }
}


// Language: javascript
// Path: commands\accept.js