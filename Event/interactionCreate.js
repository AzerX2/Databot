/**
 * 
 * @param {*} client 
 * @param {*} interaction 
 * @returns 
 * 
 * @description Cette fonction est appelée lorsque un utilisateur intéragit avec un bouton ou un menu déroulant.
 */
let reason = { "Spam": "982915032201449483", "SelfBot": "1095410053365895288", "Raid": "1094309870020341962", "Incitation à la haine": "982915009032106034", "Harcèlement": "1094309748641378325", "Non-respect des TOS Discord": "982915051407179836", "Pub Mp": "1094309803037294714", "Mass mp": "1114973433663606854", "Menace, comportement cancer": "1114973482577571890", "Plagia de Serveur": "1095409729871827025", "Arnaque": "1095410165718724658", "Autre": "1098002608616120371" }

let { MessageEmbed } = require('discord.js');

module.exports = async(client, interaction) => {

    // si c'est un bouton
    if (interaction.isButton()) {
        if (interaction.customId == "accept") {
            let userid = interaction.message.content
            let report = require('../models/report.js');
            let blacklist = require('../models/blacklist.js');
            // on cherche le report dans la base de données
            report.findOne({ userid: userid }, (err, r) => {
                if (err) console.error(err);
                if (r) {
                    // on ajoute l'utilisateur dans la blacklist
                    blacklist.findOne({ userid: userid }, (err, b) => {
                        if (err) console.error(err);
                        if (!b) {
                            setTimeout(() => {
                                let newBlacklist = new blacklist({
                                    userid: userid,
                                    reason: r.reason,
                                    preuve: r.preuve
                                });
                                newBlacklist.save()
                            }, 1000)
                        } else {
                            setTimeout(() => {
                                b.preuve.push(" ")
                                blacklist.findOneAndUpdate({ userid: userid }, { reason: b.reason + " " + r.reason, preuve: b.preuve.concat(r.preuve) }, (err) => {
                                    if (err) console.error(err);
                                })
                            }, 1000)

                        }
                    })
                    setTimeout(() => {
                        let channel = client.channels.cache.get(reason[r.reason]);
                        let embed = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('Report')
                            .setDescription(`L'utilisateur <@${userid}> a été report pour la raison ${r.reason}`)
                            .addFields({ name: 'Preuve', value: " > " + r.preuve })
                            .setFooter({ text: 'Report' })
                            .setTimestamp();
                        channel.send({
                            embeds: [embed]
                        })
                        r.delete();
                        interaction.reply({
                            content: `L'utilisateur ${userid} a bien été ajouté à la blacklist.`
                        })
                    }, 2000)
                } else {
                    setTimeout(() => {
                        interaction.reply({
                            content: `L'utilisateur ${userid} n'a pas été report.`
                        })
                    }, 1000)
                }
                setTimeout(() => {
                    interaction.message.delete()
                }, 3000)
            })
        }
        if (interaction.customId == "refuse") {
            let userid = interaction.message.content
            let report = require('../models/report.js');
            report.findOne({ userid: userid }, (err, report) => {
                    if (err) console.error(err);
                    if (report) {
                        report.delete();
                        interaction.reply({
                            content: `L'utilisateur ${userid} a bien été supprimé de la liste des reports.`
                        })
                    } else {
                        interaction.reply({
                            content: `L'utilisateur ${userid} n'a pas été report.`
                        })
                    }
                })
                // on supprime le message 
            setTimeout(() => {
                interaction.message.delete()
            }, 1000)

        }

    }


    // si c'est une commande
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            if (error) console.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    }
};