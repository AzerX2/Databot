const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('Check the user | Vérifie l\'utilisateur')
        .addStringOption(option =>
            option.setName('userid')
            .setDescription('id of user to check | id de l\'utilisateur à vérifier')
        ),
    async execute(interaction) {
        let blacklist = require('../models/blacklist.js');
        let userid = interaction.options.getString('userid');

        if (userid) {
            blacklist.findOne({
                userid: userid
            }, (err, b) => {
                if (err) console.log(err);
                if (b) {
                    const embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Check')
                        .setDescription(`${userid} est blacklist \n raison : ${b.reason} \n preuve : ${b.preuve}`)
                        .setFooter({ text: 'Check' })
                        .setTimestamp();
                    interaction.reply({ embeds: [embed] });
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Check')
                        .setDescription(`${userid} n'est pas blacklist`)
                        .setFooter({ text: 'Check' })
                        .setTimestamp();
                    interaction.reply({ embeds: [embed] });
                }
            });
        } else {
            blacklist.findOne({
                userid: interaction.user.id
            }, (err, b) => {
                if (err) console.log(err);
                if (b) {
                    const embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Check')
                        .setDescription(`${interaction.user.id} est blacklist \n raison : ${b.reason} \n preuve : ${b.preuve}`)
                        .setFooter({ text: 'Check' })
                        .setTimestamp();
                    interaction.reply({ embeds: [embed] });
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Check')
                        .setDescription(`${interaction.user.id} n'est pas blacklist`)
                        .setFooter({ text: 'Check' })
                        .setTimestamp();
                    interaction.reply({ embeds: [embed] });
                }
            });
        }

    }
};