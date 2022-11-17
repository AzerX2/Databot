const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkstaff')
        .setDescription('check if a user is a staff member | check if a user is a staff member')
        .addStringOption(option =>
            option.setName('id')
            .setDescription('id of the user to check | id of the user to check')
            .setRequired(false)),
    async execute(interaction) {
        const staff = JSON.parse(fs.readFileSync("./staff.json", "utf8"));
        const idcheck = interaction.options.getString('id');
        let id = 0;
        if (idcheck == null) {
            id = interaction.user.id;
        } else {
            id = idcheck;
        }

        let bool = false;
        let embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Check Staff")
            .setFooter({ text: "DataBot" })

        staff.forEach(function(element) {
            if (element.id == id) {
                bool = true;
                embed.setDescription(`<@${id}> est/is **staff**\n Son rôle est/his role is **${element.role}** \n Son level est/his level is **${element.level}**`);
            }
        })
        if (bool == false) {

            embed.setDescription(`<@${id}> n'est pas/ his not staff`);

        }
        interaction.reply({ embeds: [embed] });


    }
};