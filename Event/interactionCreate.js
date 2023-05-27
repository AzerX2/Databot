/**
 * 
 * @param {*} client 
 * @param {*} interaction 
 * @returns 
 * 
 * @description Cette fonction est appelée lorsque un utilisateur intéragit avec un bouton ou un menu déroulant.
 */
let reason = { "Spam": "999308719567417424", "SelfBot": "999308738840248371", "Raid": "999461908409221160", "Incitation à la haine": "999308894176292914", "Harcèlement": "999308931073585282", "Non-respect des TOS Discord": "999309086300577792", "Pub Mp": "999308999163920394", "Mass mp": "999309034098262036", "Menace, comportement cancer": "999462126253002802", "Plagia de Serveur": "999430443042607114", "Arnaque": "1042923823571423252", "Autre": "1042923839962742855" }

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